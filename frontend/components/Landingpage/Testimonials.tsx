'use client';

import React from 'react';

type TestimonialCard = {
  image: string;
  name: string;
  handle: string;
  date: string;
  quote: string;
};

const TESTIMONIALS_DATA: TestimonialCard[] = [
  {
    image: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200',
    name: 'Briar Martin',
    handle: '@neilstellar',
    date: 'April 20, 2025',
    quote: 'Toolverse made tracking and scaling our web platforms an absolute breeze.'
  },
  {
    image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200',
    name: 'Avery Johnson',
    handle: '@averywrites',
    date: 'May 10, 2025',
    quote: 'Accessing ultra-fast diagnostic tools optimization features helped our conversion goals tenfold.'
  },
  {
    image: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=200&auto=format&fit=crop&q=60',
    name: 'Jordan Lee',
    handle: '@jordantalks',
    date: 'June 5, 2025',
    quote: 'Clean interfaces combined with actionable strategy layouts. Outstanding codebase.'
  },
  {
    image: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&auto=format&fit=crop&q=60',
    name: 'Morgan Smith',
    handle: '@morgandev',
    date: 'July 14, 2025',
    quote: 'The automated platform audits saved our engineering team dozens of manual hours.'
  },
];

function Card({ card }: { card: TestimonialCard }) {
  return (
    <div className="p-5 rounded-xl mx-4 bg-white/80 dark:bg-zinc-900/50 border border-violet-100 dark:border-white/5 shadow-xs hover:shadow-md transition-all duration-300 w-76 shrink-0 backdrop-blur-xs select-none">
      <div className="flex gap-3">
        <img className="size-11 rounded-full object-cover" src={card.image} alt={`${card.name}'s avatar`} />
        <div className="flex flex-col">
          <div className="flex items-center gap-1">
            <p className="font-semibold text-sm text-slate-800 dark:text-slate-100">{card.name}</p>
            <svg width="14" height="14" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M4.555.72a4 4 0 0 1-.297.24c-.179.12-.38.202-.59.244a4 4 0 0 1-.38.041c-.48.039-.721.058-.922.129a1.63 1.63 0 0 0-.992.992c-.071.2-.09.441-.129.922a4 4 0 0 1-.041.38 1.6 1.6 0 0 1-.245.59 3 3 0 0 1-.239.297c-.313.368-.47.551-.56.743-.213.444-.213.96 0 1.404.09.192.247.375.56.743.125.146.187.219.24.297.12.179.202.38.244.59.018.093.026.189.041.38.039.48.058.721.129.922.163.464.528.829.992.992.2.071.441.09.922.129.191.015.287.023.38.041.21.042.411.125.59.245.078.052.151.114.297.239.368.313.551.47.743.56.444.213.96.213 1.404 0 .192-.09.375-.247.743-.56.146-.125.219-.187.297-.24.179-.12.38-.202.59-.244a4 4 0 0 1 .38-.041c.48-.039.721-.058.922-.129.464-.163.829-.528.992-.992.071-.2.09-.441.129-.922a4 4 0 0 1 .041-.38c.042-.21.125-.411.245-.59.052-.078.114-.151.239-.297.313-.368.47-.551.56-.743.213-.444.213-.96 0-1.404-.09-.192-.247-.375-.56-.743a4 4 0 0 1-.24-.297 1.6 1.6 0 0 1-.244-.59 3 3 0 0 1-.041-.38c-.039-.48-.058-.721-.129-.922a1.63 1.63 0 0 0-.992-.992c-.2-.071-.441-.09-.922-.129a4 4 0 0 1-.38-.041 1.6 1.6 0 0 1-.59-.245A3 3 0 0 1 7.445.72C7.077.407 6.894.25 6.702.16a1.63 1.63 0 0 0-1.404 0c-.192.09-.375.247-.743.56m4.07 3.998a.488.488 0 0 0-.691-.69l-2.91 2.91-.958-.957a.488.488 0 0 0-.69.69l1.302 1.302c.19.191.5.191.69 0z" fill="#7c3aed" />
            </svg>
          </div>
          <span className="text-xs text-slate-400 dark:text-zinc-500">{card.handle}</span>
        </div>
      </div>
      <p className="text-sm py-4 text-slate-600 dark:text-zinc-300 leading-relaxed">{card.quote}</p>
      <div className="flex items-center justify-between text-slate-400 dark:text-zinc-500 text-xs">
        <div className="flex items-center gap-1">
          <span>Posted on</span>
          <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="hover:text-violet-600 dark:hover:text-[#A6FF5D] transition-colors">
            <svg width="11" height="10" viewBox="0 0 11 10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="m.027 0 4.247 5.516L0 10h.962l3.742-3.926L7.727 10H11L6.514 4.174 10.492 0H9.53L6.084 3.616 3.3 0zM1.44.688h1.504l6.64 8.624H8.082z" fill="currentColor" />
            </svg>
          </a>
        </div>
        <p>{card.date}</p>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const doubleRowData = [...TESTIMONIALS_DATA, ...TESTIMONIALS_DATA, ...TESTIMONIALS_DATA];

  return (
    <>
      <style jsx global>{`
        @keyframes marqueeScroll {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-33.333%); }
        }
        .animate-marquee {
          animation: marqueeScroll 30s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
        .direction-reverse {
          animation-direction: reverse;
        }
      `}</style>

      <section className="w-full bg-gradient-to-b from-[#F3F1FF] to-white dark:from-black dark:to-neutral-950 py-16 overflow-hidden transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 mb-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-800 dark:text-white">
            Trusted by Builders Globally
          </h2>
        </div>

        {/* Row 1: Forward Direction Marquee */}
        <div className="w-full mx-auto max-w-6xl overflow-hidden relative group">
          {/* Edge Blur Faders matching background flow colors */}
          <div className="absolute left-0 top-0 h-full w-24 z-10 pointer-events-none bg-gradient-to-r from-[#F3F1FF] dark:from-black to-transparent"></div>
          <div className="absolute right-0 top-0 h-full w-24 z-10 pointer-events-none bg-gradient-to-l from-[#F3F1FF] dark:from-black to-transparent"></div>
          
          <div className="animate-marquee flex transform-gpu pt-6 pb-4 w-max">
            {doubleRowData.map((card, idx) => (
              <Card key={`row1-${idx}`} card={card} />
            ))}
          </div>
        </div>

        {/* Row 2: Reverse Direction Marquee */}
        <div className="w-full mx-auto max-w-6xl overflow-hidden relative group mt-4">
          <div className="absolute left-0 top-0 h-full w-24 z-10 pointer-events-none bg-gradient-to-r from-white dark:from-neutral-950 to-transparent"></div>
          <div className="absolute right-0 top-0 h-full w-24 z-10 pointer-events-none bg-gradient-to-l from-white dark:from-neutral-950 to-transparent"></div>
          
          <div className="animate-marquee direction-reverse flex transform-gpu pt-4 pb-6 w-max">
            {doubleRowData.map((card, idx) => (
              <Card key={`row2-${idx}`} card={card} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}