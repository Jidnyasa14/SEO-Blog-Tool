

// "use client";

// type AdSlotProps = {
//   slot?: "leaderboard" | "rectangle" | "responsive";
//   label?: string;
// };

// export default function AdSlot({ slot = "leaderboard", label }: AdSlotProps) {
//   const isDev = process.env.NODE_ENV === "development";

//   const sizeMap: Record<string, string> = {
//     leaderboard: "max-w-[728px] h-[90px]",
//     rectangle: "max-w-[300px] h-[250px]",
//     responsive: "w-full min-h-[90px]",
//   };

//   const sizeClass = sizeMap[slot] || sizeMap.leaderboard;

//   return (
//     <div
//       className={`flex items-center justify-center w-full mx-auto ${sizeClass} transition-colors duration-200`}
//       aria-hidden="true"
//     >
//       {isDev ? (
//         <div className="w-full h-full flex flex-col items-center justify-center gap-1.5 bg-slate-100/50 dark:bg-zinc-900/50 border border-dashed border-slate-200 dark:border-zinc-800 rounded-xl">
//           <span className="text-[10px] font-bold tracking-widest uppercase text-violet-600 dark:text-[#A6FF5D] bg-violet-50 dark:bg-white/5 px-2 py-[2px] rounded-md">
//             AD
//           </span>

//           <span className="text-[11px] text-slate-400 dark:text-zinc-500 font-medium">
//             {label || slot} · Google AdSense
//           </span>
//         </div>
//       ) : (
//         <div className="w-full h-full" />
//       )}
//     </div>
//   );
// }


"use client";

import React, { useEffect } from "react";

type AdSlotProps = {
  slot?: "leaderboard" | "rectangle" | "responsive";
  label?: string;
  adClient?: string;
  adSlotId?: string;
};

export default function AdSlot({
  slot = "leaderboard",
  label,
  adClient,
  adSlotId,
}: AdSlotProps) {
  const isDev = process.env.NODE_ENV === "development";
  const client = adClient || process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || "ca-pub-XXXXXXXXXXXXXXXX";
  const slotId = adSlotId || "1234567890";

  const sizeMap: Record<string, string> = {
    leaderboard: "max-w-[728px] h-[90px]",
    rectangle: "max-w-[300px] h-[250px]",
    responsive: "w-full min-h-[90px]",
  };

  const sizeClass = sizeMap[slot] || sizeMap.leaderboard;

  useEffect(() => {
    if (!isDev) {
      try {
        if (typeof window !== "undefined") {
          ((window as unknown as { adsbygoogle: unknown[] }).adsbygoogle =
            (window as unknown as { adsbygoogle: unknown[] }).adsbygoogle || []).push({});
        }
      } catch (err) {
        console.error("AdSense initialization error:", err);
      }
    }
  }, [isDev]);

  return (
    <div
      className={`flex items-center justify-center w-full mx-auto ${sizeClass} transition-colors duration-200 overflow-hidden my-4`}
      aria-hidden="true"
    >
      {isDev ? (
        <div className="w-full h-full flex flex-col items-center justify-center gap-1.5 bg-slate-100/50 dark:bg-zinc-900/50 border border-dashed border-slate-200 dark:border-zinc-800 rounded-xl">
          <span className="text-[10px] font-bold tracking-widest uppercase text-violet-600 dark:text-[#A6FF5D] bg-violet-50 dark:bg-white/5 px-2 py-[2px] rounded-md">
            AD
          </span>
          <span className="text-[11px] text-slate-400 dark:text-zinc-500 font-medium">
            {label || slot} · Google AdSense
          </span>
        </div>
      ) : (
        <ins
          className="adsbygoogle"
          style={{ display: "block", width: "100%", height: "100%" }}
          data-ad-client={client}
          data-ad-slot={slotId}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      )}
    </div>
  );
}