// src/components/EventsSection.tsx
import React, { useState } from 'react';
import { Calendar, MapPin, Clock, ExternalLink, ArrowRight } from 'lucide-react';
import {
  getUpcomingEvents,
  getPastEvents,
  categoryLabels,
  categoryColors,
  Event
} from '../data/events';

const EventsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');
  const [selectedCategory, setSelectedCategory] = useState<Event['category'] | 'all'>('all');

  const filteredEvents = (activeTab === 'upcoming' ? getUpcomingEvents() : getPastEvents())
    .filter(event => selectedCategory === 'all' || event.category === selectedCategory);

  const formatDate = (dateString: string) => {
    // Sprawdź czy to format YYYY-MM-DD
    if (dateString.match(/^\d{4}-\d{2}-\d{2}$/)) {
      const date = new Date(dateString);
      return date.toLocaleDateString('pl-PL', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
    }
    // Jeśli nie, zwróć tekst jak jest (np. "grudzień 2025", "Do ustalenia")
    return dateString;
  };

  return (
    <section id="events" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-accent-blue/10 rounded-full flex items-center justify-center">
              <Calendar className="h-8 w-8 text-accent-blue" />
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-anton text-black mb-4">
            Nasze Wydarzenia
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto font-montserrat font-light">
            Warsztaty, panele dyskusyjne i spotkania edukacyjne. Dołącz do nas i rozwijaj się z AI.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`px-6 py-2 rounded-md font-montserrat font-medium transition-all ${activeTab === 'upcoming'
                  ? 'bg-white text-black shadow-sm'
                  : 'text-gray-600 hover:text-black'
                }`}
            >
              Nadchodzące
            </button>
            <button
              onClick={() => setActiveTab('past')}
              className={`px-6 py-2 rounded-md font-montserrat font-medium transition-all ${activeTab === 'past'
                  ? 'bg-white text-black shadow-sm'
                  : 'text-gray-600 hover:text-black'
                }`}
            >
              Przeszłe
            </button>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-full font-montserrat text-sm transition-all ${selectedCategory === 'all'
                ? 'bg-black text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
          >
            Wszystkie
          </button>
          <button
            onClick={() => setSelectedCategory('spotkania')}
            className={`px-4 py-2 rounded-full font-montserrat text-sm transition-all ${selectedCategory === 'spotkania'
                ? 'bg-green-600 text-white'
                : 'bg-green-100 text-green-800 hover:bg-green-200'
              }`}
          >
            Spotkania
          </button>
          <button
            onClick={() => setSelectedCategory('eventy')}
            className={`px-4 py-2 rounded-full font-montserrat text-sm transition-all ${selectedCategory === 'eventy'
                ? 'bg-purple-600 text-white'
                : 'bg-purple-100 text-purple-800 hover:bg-purple-200'
              }`}
          >
            Eventy
          </button>
          <button
            onClick={() => setSelectedCategory('ogolne')}
            className={`px-4 py-2 rounded-full font-montserrat text-sm transition-all ${selectedCategory === 'ogolne'
                ? 'bg-gray-700 text-white'
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
          >
            Ogólne
          </button>
        </div>

        {/* Events Grid */}
        {filteredEvents.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
              <div
                key={event.id}
                className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
              >
                {/* Category Badge */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-montserrat font-medium ${categoryColors[event.category]}`}>
                      {categoryLabels[event.category]}
                    </span>
                    {activeTab === 'past' && (
                      <span className="text-xs text-gray-500 font-montserrat">Zakończone</span>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-anton text-black mb-3">
                    {event.title}
                  </h3>

                  {/* Date & Time */}
                  <div className="flex items-center text-gray-600 mb-2">
                    <Calendar className="h-4 w-4 mr-2 text-accent-blue" />
                    <span className="font-montserrat text-sm">{formatDate(event.date)}</span>
                    {event.time && (
                      <>
                        <Clock className="h-4 w-4 ml-4 mr-2 text-accent-blue" />
                        <span className="font-montserrat text-sm">{event.time}</span>
                      </>
                    )}
                  </div>

                  {/* Location */}
                  {event.location && (
                    <div className="flex items-center text-gray-600 mb-4">
                      <MapPin className="h-4 w-4 mr-2 text-accent-blue" />
                      <span className="font-montserrat text-sm">{event.location}</span>
                    </div>
                  )}

                  {/* Description */}
                  <p className="text-gray-700 font-montserrat font-light text-sm mb-4">
                    {event.description}
                  </p>

                  {/* CTA Button */}
                  {event.link && (
                    <a
                      href={event.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center font-montserrat font-medium text-sm transition-colors ${activeTab === 'upcoming'
                          ? 'text-accent-blue hover:text-blue-700'
                          : 'text-gray-600 hover:text-black'
                        }`}
                    >
                      {activeTab === 'upcoming' ? (
                        <>
                          Zapisz się <ArrowRight className="ml-2 h-4 w-4" />
                        </>
                      ) : (
                        <>
                          Zobacz relację <ExternalLink className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="h-8 w-8 text-gray-400" />
            </div>
            <p className="text-gray-600 font-montserrat">
              Brak wydarzeń w wybranej kategorii.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default EventsSection;