import type { Metadata } from "next";
import { Archivo, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import "./globals.css";

const THEME_INIT = `(function(){try{if(localStorage.getItem('golc-theme')==='dark'){document.documentElement.setAttribute('data-theme','dark');}}catch(e){}})();`;

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const description =
  "Cross-platform desktop lighting control with deterministic Art-Net playback, TypeScript automation, a public API, and autonomous LLM control — built in Go.";

export const metadata: Metadata = {
  metadataBase: new URL("https://golc-site.netlify.app"),
  title: {
    default: "GOLC — Lighting control that behaves.",
    template: "%s · GOLC",
  },
  description,
  applicationName: "GOLC",
  alternates: { canonical: "/" },
  keywords: [
    "GOLC",
    "lighting control",
    "Art-Net",
    "DMX",
    "stage lighting software",
    "show programming",
    "Go",
  ],
  authors: [{ name: "Lawrence Norton" }],
  openGraph: {
    siteName: "GOLC",
    title: "GOLC — Lighting control that behaves.",
    description,
    type: "website",
    locale: "en_US",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "GOLC — Lighting control that behaves.",
    description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-page text-text">
        <Script id="theme-init" strategy="beforeInteractive">
          {THEME_INIT}
        </Script>
        <SiteHeader />
        <main id="main-content" tabIndex={-1} className="flex-1 outline-none">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
