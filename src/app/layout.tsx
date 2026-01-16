import type { Metadata } from "next";
import { Cinzel, Montserrat } from "next/font/google";
import "./globals.css";

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  weight: ["400", "600", "700", "900"],
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Sparsh Sharma | Visual Storyteller & AI Designer",
  description: "Cinematographer and AI-Powered Web Designer portfolio.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning={true}>
      <body
        className={`${cinzel.variable} ${montserrat.variable} bg-background text-foreground antialiased overflow-x-hidden selection:bg-gold selection:text-black`}
        suppressHydrationWarning={true}
      >
        {children}
      </body>
    </html>
  );
}

