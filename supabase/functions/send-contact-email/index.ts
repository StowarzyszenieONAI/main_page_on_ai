import { corsHeaders } from '../_shared/cors.ts'

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface GoogleSheetsResponse {
  success: boolean;
  error?: string;
}

Deno.serve(async (req: Request) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    if (req.method !== 'POST') {
      return new Response(
        JSON.stringify({ error: 'Method not allowed' }),
        {
          status: 405,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    const { name, email, subject, message }: ContactFormData = await req.json();

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return new Response(
        JSON.stringify({ error: 'All fields are required' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ error: 'Invalid email format' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // Sanitize inputs to prevent XSS
    const sanitizedData = {
      name: name.trim().replace(/<[^>]*>/g, ''),
      email: email.trim().toLowerCase(),
      subject: subject.trim().replace(/<[^>]*>/g, ''),
      message: message.trim().replace(/<[^>]*>/g, '')
    };

    const currentDate = new Date().toISOString();

    // Prepare email content
    const emailContent = {
      to: ['biuro@on-ai.pl'],
      subject: `[Kontakt ON.AI] ${sanitizedData.subject}`,
      html: `
        <div style="font-family: 'Montserrat', Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff;">
          <div style="background-color: #000000; color: #ffffff; padding: 20px; text-align: center;">
            <h1 style="margin: 0; font-family: 'Anton', sans-serif; font-size: 24px;">
              Stowarzyszenie ON.AI
            </h1>
            <p style="margin: 5px 0 0 0; font-size: 14px; color: #cccccc;">
              Nowa wiadomość z formularza kontaktowego
            </p>
          </div>
          
          <div style="padding: 30px 20px;">
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #3c76c4;">
              <h2 style="color: #000000; margin: 0 0 15px 0; font-family: 'Anton', sans-serif; font-size: 18px;">
                Dane kontaktowe
              </h2>
              <p style="margin: 8px 0; color: #333333;"><strong>Imię i nazwisko:</strong> ${sanitizedData.name}</p>
              <p style="margin: 8px 0; color: #333333;"><strong>Email:</strong> ${sanitizedData.email}</p>
              <p style="margin: 8px 0; color: #333333;"><strong>Temat:</strong> ${sanitizedData.subject}</p>
              <p style="margin: 8px 0; color: #333333;"><strong>Data:</strong> ${new Date(currentDate).toLocaleString('pl-PL')}</p>
            </div>
            
            <div style="margin: 20px 0;">
              <h3 style="color: #000000; font-family: 'Anton', sans-serif; font-size: 16px; margin-bottom: 10px;">
                Wiadomość:
              </h3>
              <div style="background-color: #ffffff; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px; line-height: 1.6;">
                ${sanitizedData.message.replace(/\n/g, '<br>')}
              </div>
            </div>
          </div>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 14px; text-align: center;">
            <p style="margin: 0;">
              Ta wiadomość została wysłana przez formularz kontaktowy na stronie 
              <strong>Stowarzyszenia ON.AI</strong>
            </p>
            <p style="margin: 10px 0 0 0;">
              Aby odpowiedzieć, wyślij email bezpośrednio na adres: 
              <a href="mailto:${sanitizedData.email}" style="color: #3c76c4; text-decoration: none;">
                ${sanitizedData.email}
              </a>
            </p>
          </div>
        </div>
      `,
      reply_to: sanitizedData.email,
    };

    // Send email using Resend API
    const resendApiKey = Deno.env.get('RESEND_API_KEY');
    let emailSuccess = false;
    let emailError = '';

    if (resendApiKey) {
      try {
        const resendResponse = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${resendApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: 'Formularz Kontaktowy ON.AI <noreply@on-ai.pl>',
            ...emailContent,
          }),
        });

        if (resendResponse.ok) {
          emailSuccess = true;
        } else {
          const errorData = await resendResponse.text();
          emailError = `Resend API error: ${errorData}`;
          console.error('Resend API error:', errorData);
        }
      } catch (error) {
        emailError = `Email sending failed: ${error.message}`;
        console.error('Email sending error:', error);
      }
    } else {
      emailError = 'RESEND_API_KEY not configured';
      console.error('RESEND_API_KEY not found');
    }

    // Save to Google Sheets
    const googleSheetsApiKey = Deno.env.get('GOOGLE_SHEETS_API_KEY');
    const spreadsheetId = Deno.env.get('GOOGLE_SHEETS_SPREADSHEET_ID');
    let sheetsSuccess = false;
    let sheetsError = '';

    if (googleSheetsApiKey && spreadsheetId) {
      try {
        const sheetsData = [
          [
            new Date(currentDate).toLocaleString('pl-PL'),
            sanitizedData.name,
            sanitizedData.email,
            sanitizedData.subject,
            sanitizedData.message
          ]
        ];

        const sheetsResponse = await fetch(
          `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/Messages from the ON.AI website:append?valueInputOption=RAW&key=${googleSheetsApiKey}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              values: sheetsData,
            }),
          }
        );

        if (sheetsResponse.ok) {
          sheetsSuccess = true;
        } else {
          const errorData = await sheetsResponse.text();
          sheetsError = `Google Sheets API error: ${errorData}`;
          console.error('Google Sheets API error:', errorData);
        }
      } catch (error) {
        sheetsError = `Google Sheets saving failed: ${error.message}`;
        console.error('Google Sheets error:', error);
      }
    } else {
      sheetsError = 'Google Sheets API not configured';
      console.error('Google Sheets API credentials not found');
    }

    // Determine response based on success/failure
    if (emailSuccess || sheetsSuccess) {
      let successMessage = 'Dziękujemy za kontakt! Odpowiemy najszybciej jak to możliwe.';
      
      if (emailSuccess && sheetsSuccess) {
        successMessage = 'Dziękujemy za kontakt! Wiadomość została wysłana i zapisana pomyślnie.';
      } else if (emailSuccess && !sheetsSuccess) {
        successMessage = 'Dziękujemy za kontakt! Wiadomość została wysłana pomyślnie.';
      } else if (!emailSuccess && sheetsSuccess) {
        successMessage = 'Dziękujemy za kontakt! Wiadomość została zapisana pomyślnie.';
      }

      return new Response(
        JSON.stringify({ 
          success: true, 
          message: successMessage,
          details: {
            email: emailSuccess,
            sheets: sheetsSuccess
          }
        }),
        {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    } else {
      // Both failed
      console.error('Both email and sheets failed:', { emailError, sheetsError });
      return new Response(
        JSON.stringify({ 
          error: 'Wystąpił błąd podczas wysyłania wiadomości. Spróbuj ponownie.',
          details: {
            emailError,
            sheetsError
          }
        }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

  } catch (error) {
    console.error('Error in send-contact-email function:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Wystąpił błąd podczas przetwarzania żądania. Spróbuj ponownie.' 
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});