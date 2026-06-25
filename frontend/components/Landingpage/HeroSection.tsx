'use client';

import React, { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';

export default function HeroSection() {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const handle = requestAnimationFrame(() => {
      setMounted(true);
    });
    return () => cancelAnimationFrame(handle);
  }, []);

  const isDark = mounted && (theme === 'dark' || resolvedTheme === 'dark');

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap');
        * {
          font-family: 'Poppins', sans-serif;
        }
      `}</style>

      <section
        className={`relative flex flex-col items-center px-4 py-4 min-h-screen w-full transition-all duration-300 overflow-hidden
          ${isDark
            ? 'bg-gradient-to-b from-black to-black dark:bg-black dark:bg-[url(\'https://assets.prebuiltui.com/images/components/hero-section/hero-background-image.png\')] bg-no-repeat bg-center bg-cover'
            : 'bg-gradient-to-b from-[#E8E8FF] via-[#EAE9FF] to-[#F3F1FF]'
          }`}
      >
        {/* Dynamic Mesh Glow Blobs (Visible in Light Mode) */}
        {!isDark && (
          <div className="absolute inset-0 pointer-events-none transition-opacity duration-500">
            {/* Top Left: Shifting down and into the center-left */}
            <div className="absolute -top-32 -left-20 w-[550px] h-[550px] rounded-full bg-gradient-to-br from-violet-600/20 to-pink-500/20 blur-[100px]" />
            
            {/* Top Right: Shifting down and into the center-right */}
            <div className="absolute -top-32 -right-20 w-[550px] h-[550px] rounded-full bg-gradient-to-bl from-violet-600/20 to-pink-500/15 blur-[100px]" />
          </div>
        )}

        {/* Content Wrapper */}
        <div className="relative z-10 flex flex-col items-center w-full max-w-7xl mx-auto">
          
          {/* Trust Badge */}
          <div className={`flex flex-wrap items-center justify-center gap-2 pl-2 pr-4 py-1.5 mt-20 md:mt-30 rounded-full backdrop-blur-md border
            ${isDark
              ? 'bg-white/10 border-white/10'
              : 'bg-white/70 border-violet-200/60 shadow-xs'
            }`}
          >
            <div className="relative flex size-3.5 items-center justify-center">
              <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping duration-300"></span>
              <span className={`relative inline-flex size-2 rounded-full ${isDark ? 'bg-[#A6FF5D]' : 'bg-green-500'}`}></span>
            </div>
            <p className={`text-xs font-semibold tracking-wide uppercase px-1 ${isDark ? 'text-zinc-300' : 'text-slate-600'}`}>
              100+ Tools
            </p>
          </div>

          {/* Headline */}
          <h1 className={`text-4xl md:text-[66px] text-center max-w-4xl mt-8 leading-tight font-bold tracking-tight pb-2
            ${isDark ? 'text-white' : 'text-[#1E2238]'}`}
          >
            Online Tools and Guides for Everyone
          </h1>

          {/* Subparagraph */}
          <p className={`text-sm md:text-base text-center max-w-[630px] mt-4 leading-relaxed font-normal
            ${isDark ? 'text-zinc-400' : 'text-slate-600'}`}
          >
            We have designed high-impact tools that can give better results. From sleek interfaces to full stack experiences, we bring your brand to life online.
          </p>

          {/* CTA Buttons */}
          <div className="flex gap-3 mt-10">
            <button className={`text-xs md:text-sm px-6 py-3 rounded-xl transition cursor-pointer font-medium shadow-md hover:scale-[1.02] active:scale-95 duration-200
              ${isDark
                ? 'bg-[#A6FF5D] hover:bg-[#A6FF5D]/90 text-gray-900'
                : 'bg-violet-600 hover:bg-violet-700 text-white'
              }`}
            >
              Get Started
            </button>
            <button className={`text-xs md:text-sm px-5 py-3 rounded-xl transition cursor-pointer font-medium shadow-sm border hover:scale-[1.02] active:scale-95 duration-200
              ${isDark
                ? 'bg-zinc-900/40 hover:bg-zinc-900 border-zinc-800 text-zinc-300'
                : 'bg-white hover:bg-gray-50 border-slate-200 text-slate-700'
              }`}
            >
              Explore Tools
            </button>
          </div>

          {/* Divider Line */}
          <div className={`w-full max-w-[800px] h-[1px] mt-16 bg-gradient-to-r from-transparent to-transparent opacity-40
            ${isDark ? 'via-[#A6FF5D]' : 'via-violet-400'}`}
          ></div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-14 max-w-[930px] w-full mt-4">
            {[
              { value: '20+', label: 'Years Experience' },
              { value: '12k+', label: 'Projects Completed' },
              { value: '5k+', label: 'Happy Customers' },
              { value: '5+', label: 'Countries' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <h2 className={`font-bold text-2xl md:text-3xl ${isDark ? 'text-white' : 'text-slate-800'}`}>
                  {stat.value}
                </h2>
                <p className={`text-xs md:text-sm mt-1 ${isDark ? 'text-zinc-500' : 'text-slate-500'}`}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>
    </>
  );
}
// 'use client';

// import React, { useState, useEffect } from 'react';
// import { useTheme } from 'next-themes';

// export default function HeroSection() {
//   const { theme, resolvedTheme } = useTheme();
//   const [mounted, setMounted] = useState(false);

//   useEffect(() => {
//     const handle = requestAnimationFrame(() => {
//       setMounted(true);
//     });
//     return () => cancelAnimationFrame(handle);
//   }, []);

//   const isDark = mounted && (theme === 'dark' || resolvedTheme === 'dark');

//   return (
//     <>
//       <style jsx global>{`
//         @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap');
//         * {
//           font-family: 'Poppins', sans-serif;
//         }
//       `}</style>

//       <section
//         className={`flex flex-col items-center px-4 py-4 min-h-screen w-full transition-all duration-300
//           ${isDark
//             ? 'bg-gradient-to-b from-black to-black dark:bg-black dark:bg-[url(\'https://assets.prebuiltui.com/images/components/hero-section/hero-background-image.png\')] bg-no-repeat bg-center bg-cover'
//             : 'bg-gradient-to-b from-[#E8E8FF] via-[#EAE9FF] to-[#F3F1FF]'
//           }`}
//       >
//         {/* Trust Badge */}
//         <div className={`flex flex-wrap items-center justify-center gap-2 pl-2 pr-4 py-1.5 mt-20 md:mt-30 rounded-full backdrop-blur-md border
//           ${isDark
//             ? 'bg-white/10 border-white/10'
//             : 'bg-white/60 border-white/80 shadow-xs'
//           }`}
//         >
//           <div className="relative flex size-3.5 items-center justify-center">
//             <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping duration-300"></span>
//             <span className={`relative inline-flex size-2 rounded-full ${isDark ? 'bg-[#A6FF5D]' : 'bg-green-500'}`}></span>
//           </div>
//           <p className={`text-xs font-semibold tracking-wide uppercase px-1 ${isDark ? 'text-zinc-300' : 'text-slate-600'}`}>
//             100+ Tools
//           </p>
//         </div>

//         {/* Headline */}
//         <h1 className={`text-4xl md:text-[66px] text-center max-w-4xl mt-8 leading-tight font-semibold tracking-tight pb-2
//           ${isDark ? 'text-white' : 'text-[#1E2238]'}`}
//         >
//           Online Tools and Guides for Everyone
//         </h1>

//         <p className={`text-sm md:text-base text-center max-w-[630px] mt-4 leading-relaxed font-normal
//           ${isDark ? 'text-zinc-400' : 'text-slate-600'}`}
//         >
//           We have designed high-impact tools that can give better results. From sleek interfaces to full stack experiences, we bring your brand to life online.
//         </p>

//         {/* CTA Buttons */}
//         <div className="flex gap-3 mt-10">
//           <button className={`text-xs md:text-sm px-6 py-3 rounded-xl transition cursor-pointer font-medium shadow-md hover:scale-[1.02] active:scale-95 duration-200
//             ${isDark
//               ? 'bg-[#A6FF5D] hover:bg-[#A6FF5D]/90 text-gray-900'
//               : 'bg-violet-600 hover:bg-violet-700 text-white'
//             }`}
//           >
//             Get Started
//           </button>
//           <button className={`text-xs md:text-sm px-5 py-3 rounded-xl transition cursor-pointer font-medium shadow-sm border hover:scale-[1.02] active:scale-95 duration-200
//             ${isDark
//               ? 'bg-zinc-900/40 hover:bg-zinc-900 border-zinc-800 text-zinc-300'
//               : 'bg-white hover:bg-gray-50 border-slate-200 text-slate-700'
//             }`}
//           >
//             Explore Tools
//           </button>
//         </div>

//         {/* Divider */}
//         <div className={`w-full max-w-[800px] h-[1px] mt-16 bg-gradient-to-r from-transparent to-transparent opacity-40
//           ${isDark ? 'via-[#A6FF5D]' : 'via-violet-300'}`}
//         ></div>

//         {/* Stats Grid */}
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-14 max-w-[930px] w-full mt-4">
//           {[
//             { value: '20+', label: 'Years Experience' },
//             { value: '12k+', label: 'Projects Completed' },
//             { value: '5k+', label: 'Happy Customers' },
//             { value: '5+', label: 'Countries' },
//           ].map((stat) => (
//             <div key={stat.label} className="text-center">
//               <h2 className={`font-bold text-2xl md:text-3xl ${isDark ? 'text-white' : 'text-slate-800'}`}>
//                 {stat.value}
//               </h2>
//               <p className={`text-xs md:text-sm mt-1 ${isDark ? 'text-zinc-500' : 'text-slate-500'}`}>
//                 {stat.label}
//               </p>
//             </div>
//           ))}
//         </div>
//       </section>
//     </>
//   );
// }
