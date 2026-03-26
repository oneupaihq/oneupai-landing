import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter, Outfit } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { PopupProvider } from "./components/sections/PopupContext";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "AI Websites with Bookings, Social Media & Payments | OneUpAI",
  description: "AI Websites with Bookings, Social Media & Payments | OneUpAI",
   icons: {
    icon: '/favicon.png',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Crisp Chat Widget */}
        <Script
          id="crisp-chat"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.$crisp=[];
              window.CRISP_WEBSITE_ID="28962ab4-98ec-4a85-aa74-e7fe142ad303";
              (function(){
                d=document;
                s=d.createElement("script");
                s.src="https://client.crisp.chat/l.js";
                s.async=1;
                d.getElementsByTagName("head")[0].appendChild(s);
              })();
            `,
          }}
        />
      </head>
      <body className={`${plusJakartaSans.variable} ${inter.variable} ${outfit.variable}`}>
        <PopupProvider>
          {children}
        </PopupProvider>
      </body>
    </html>
  );
}
