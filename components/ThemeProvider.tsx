import type { Metadata } from "next";
import { ThemeProvider } from "next-themes"; // Make sure this is installed!
import "./globals.css";

export const metadata: Metadata = {
  title: "Toolverse",
  description: "Online Web Tools",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        {/* This wrapper must envelop {children} to pass down the toggle functions */}
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}