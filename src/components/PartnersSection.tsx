import React from 'react';

const partners = [
  {
    name: 'Akademia Nauk Stosowanych TWP w Szczecinie',
    logo: '/TWP.jpg',
    alt: 'Akademia Nauk Stosowanych Towarzystwa Wiedzy Powszechnej w Szczecinie',
  },
  {
    name: 'Klaster IT',
    logo: '/klaster.png',
    alt: 'Klaster IT',
  },
  {
    name: 'Uniwersytet WSB Merito Szczecin',
    logo: '/merito.png',
    alt: 'Uniwersytet WSB Merito Szczecin',
  },
];

export default function PartnersSection() {
  return (
    <section className="py-14 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm font-montserrat font-medium text-gray-400 uppercase tracking-widest mb-10">
          Partnerzy
        </p>
        <div className="flex flex-wrap items-center justify-center gap-12 md:gap-20">
          {partners.map((partner) => (
            <div key={partner.name} className="flex items-center justify-center">
              <img
                src={partner.logo}
                alt={partner.alt}
                className="h-16 md:h-20 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
