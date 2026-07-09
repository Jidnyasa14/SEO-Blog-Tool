import { ThemeProvider } from "next-themes";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // suppressHydrationWarning is REQUIRED on <html> when using next-themes
    <html lang="en" suppressHydrationWarning>
      <body>
        {/* Wrapping children directly inside ThemeProvider resolves the script injection warning */}
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}


// import React from "react";
// //import Navbar from "@/components/Landingpage/Navbar";

// export default function ToolsLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <div className="min-h-screen bg-white text-black dark:bg-black dark:text-[#A6FF5D] transition-colors duration-200">
//       {/* Top sticky/fixed positioning for your landing page navbar */}
//       {/* <Navbar /> */}
      
//       {/* The individual tool page is mounted cleanly below */}
//       <div className="w-full">
//         {children}
//       </div>
//     </div>
//   );
// }