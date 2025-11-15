// src/data/events.ts
// Łatwo edytowalny plik z wydarzeniami

export interface Event {
  id: string;
  title: string;
  date: string; // Może być: 'YYYY-MM-DD' lub tekst jak 'grudzień 2025', 'Do ustalenia'
  time?: string; // np. "18:00"
  category: 'spotkania' | 'eventy' | 'ogolne';
  type: 'past' | 'upcoming';
  description: string;
  location?: string;
  link?: string; // Link do zapisu lub relacji
  image?: string; // Opcjonalne zdjęcie
}

export const events: Event[] = [
  // ===== PRZYSZŁE WYDARZENIA =====
  {
    id: '1',
    title: 'AI przy kawie',
    date: 'grudzień 2025',
    time: '17:00',
    category: 'spotkania',
    type: 'upcoming',
    description: 'Tylko kawa, ciekawość i pytania, których nikt nie zadaje na „poważnych" eventach.',
    location: 'Szczecin',
    // link: 'https://forms.google.com/zapisy'
  },
  {
    id: '2',
    title: 'Kulturalnie o AI',
    date: 'styczeń 2026',
    time: '17:00',
    category: 'eventy',
    type: 'upcoming',
    description: 'Wydarzenie z cyklu "Kulturalnie o AI". Rozmawiamy o wpływie AI na kulturę, media, muzykę, literaturę i twórczość.',
    location: 'Szczecin',
    // link: 'https://forms.google.com/ai-prawo'
  },
  {
    id: '3',
    title: 'Meetup ON.AI - Networking',
    date: 'Do ustalenia',
    time: '18:00',
    category: 'spotkania',
    type: 'upcoming',
    description: 'Comiesięczne spotkanie członków stowarzyszenia. Networking, wymiana doświadczeń i planowanie wspólnych projektów.',
    location: 'Szczecin'
  },

  // ===== PRZESZŁE WYDARZENIA =====
  {
    id: '4',
    title: 'Pionierki Profilaktyki: AI dla zdrowia kobiet',
    date: '2025-10-26',
    time: '9:00',
    category: 'eventy',
    type: 'past',
    description: 'Oficjalne rozpoczęcie projektu wspierającego kobiety w profilaktyce zdrowotnej z wykorzystaniem AI.',
    location: 'Słowianin Szczecin',
    link: 'https://www.facebook.com/profile.php?id=61579756386835'   },
  {
    id: '5',
    title: 'Lecim na AI Szczecin: AI i prawo w praktyce',
    date: '2025-11-05',
    time: '17:00',
    category: 'eventy',
    type: 'past',
    description: 'Wydarzenie z cyklu "Lecim na AI Szczecin" organizowanego przez Stowarzyszenie ON.AI, aby odkryć, jak bezpiecznie, zgodnie z przepisami i z pełnym potencjałem wykorzystać AI w swojej firmie.',
    location: 'Grand Focus Hotel Szczecin',
  },
  {
    id: '6',
    title: 'Założenie Stowarzyszenia ON.AI',
    date: '2024-10-15',
    category: 'ogolne',
    type: 'past',
    description: 'Historyczny moment - oficjalna rejestracja Stowarzyszenia ON.AI w KRS. Początek naszej misji edukacyjnej.',
    location: 'Szczecin'
  }
];

// Funkcje pomocnicze
export const getUpcomingEvents = () => 
  events.filter(e => e.type === 'upcoming');

export const getPastEvents = () => 
  events.filter(e => e.type === 'past').sort((a, b) => {
    // Sortuj tylko te z prawdziwą datą YYYY-MM-DD
    const dateA = a.date.match(/^\d{4}-\d{2}-\d{2}$/) ? new Date(a.date).getTime() : 0;
    const dateB = b.date.match(/^\d{4}-\d{2}-\d{2}$/) ? new Date(b.date).getTime() : 0;
    return dateB - dateA;
  });

export const getEventsByCategory = (category: Event['category']) => 
  events.filter(e => e.category === category);

export const categoryLabels: Record<Event['category'], string> = {
  'spotkania': 'Spotkania',
  'eventy': 'Eventy',
  'ogolne': 'Ogólne'
};

export const categoryColors: Record<Event['category'], string> = {
  'spotkania': 'bg-green-100 text-green-800',
  'eventy': 'bg-purple-100 text-purple-800',
  'ogolne': 'bg-gray-100 text-gray-800'
};