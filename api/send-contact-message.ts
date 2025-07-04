// import { VercelRequest, VercelResponse } from '@vercel/node';

// export default async function handler(req: VercelRequest, res: VercelResponse) {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

//   if (req.method === 'OPTIONS') {
//     return res.status(200).end();
//   }

//   if (req.method !== 'POST') {
//     return res.status(405).json({ error: 'Method not allowed' });
//   }

//   const { name, email, subject, message } = req.body;

//   if (!name || !email || !subject || !message) {
//     return res.status(400).json({ error: 'Brakuje danych w formularzu' });
//   }

//   const resendApiKey = process.env.RESEND_API_KEY;
//   const notionApiKey = process.env.NOTION_API_KEY;
//   const notionDatabaseId = process.env.NOTION_DATABASE_ID;

//   if (!resendApiKey || !notionApiKey || !notionDatabaseId) {
//     return res.status(500).json({ error: 'Brakuje konfiguracji środowiskowej' });
//   }

//   try {
//     // 1. Wyślij mail do biuro@on-ai.pl
//     const notify = await fetch('https://api.resend.com/emails', {
//       method: 'POST',
//       headers: {
//         Authorization: `Bearer ${resendApiKey}`,
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         from: 'noreply@on-ai.pl',
//         to: ['biuro@on-ai.pl'],
//         subject: `📬 Nowa wiadomość: ${subject}`,
//         html: `
//           <p><strong>Imię:</strong> ${name}</p>
//           <p><strong>Email:</strong> ${email}</p>
//           <p><strong>Temat:</strong> ${subject}</p>
//           <p><strong>Wiadomość:</strong><br/>${message}</p>
//         `,
//         reply_to: email,
//       }),
//     });

//     if (!notify.ok) {
//       const errText = await notify.text();
//       throw new Error(`Błąd wysyłania do Resend (biuro): ${errText}`);
//     }

//     // 2. Potwierdzenie dla użytkownika
//     const confirm = await fetch('https://api.resend.com/emails', {
//       method: 'POST',
//       headers: {
//         Authorization: `Bearer ${resendApiKey}`,
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         from: 'biuro@on-ai.pl',
//         to: [email],
//         subject: 'Dziękujemy za kontakt – ON.AI',
//         html: `
//           <p>Cześć <strong>${name}</strong>,</p>
//           <p>Dziękujemy za Twoją wiadomość o tytule: <strong>${subject}</strong>.</p>
//           <p>Postaramy się odpowiedzieć w ciągu 24–48 godzin.</p>
//           <p>– Zespół ON.AI</p>
//         `,
//       }),
//     });

//     if (!confirm.ok) {
//       const errText = await confirm.text();
//       throw new Error(`Błąd wysyłania do Resend (użytkownik): ${errText}`);
//     }

//     // 3. Zapisz do Notion
//     const notion = await fetch('https://api.notion.com/v1/pages', {
//       method: 'POST',
//       headers: {
//         Authorization: `Bearer ${notionApiKey}`,
//         'Content-Type': 'application/json',
//         'Notion-Version': '2022-06-28',
//       },
//       body: JSON.stringify({
//         parent: { database_id: notionDatabaseId },
//         properties: {
//           'Data': { date: { start: new Date().toISOString() } },
//           'Imię i nazwisko': { title: [{ text: { content: name } }] },
//           'Email': { email },
//           'Temat': { rich_text: [{ text: { content: subject } }] },
//           'Wiadomość': { rich_text: [{ text: { content: message } }] },
//           'Status': { select: { name: 'Nowa' } },
//         },
//       }),
//     });

//     if (!notion.ok) {
//       const errText = await notion.text();
//       throw new Error(`Błąd zapisu do Notion: ${errText}`);
//     }

//     return res.status(200).json({ success: true, message: 'Wiadomość wysłana pomyślnie.' });
//   } catch (error: any) {
//     console.error('API error:', error);
//     return res.status(500).json({
//       success: false,
//       error: 'Wystąpił błąd po stronie serwera',
//       details: error?.message || error?.toString(),
//     });
//   }
// }
