import type { Metadata } from "next";
import { Archivo, Archivo_Black } from "next/font/google";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { notFound } from 'next/navigation';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "@/app/globals.css";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
});

const archivoBlack = Archivo_Black({
  variable: "--font-archivo-black",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Fração Ilustre | Vanguarda na Construção",
  description: "Inovação, qualidade absoluta e uma herança de 30 anos. De família para família, elevamos o padrão da construção em Viseu.",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}>) {
  const { locale } = await params;
  
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }
  
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} className={`${archivo.variable} ${archivoBlack.variable}`}>
      <body className="min-h-screen bg-primary-bg text-text-primary flex flex-col justify-between">
        <NextIntlClientProvider messages={messages}>
          <div>
            <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-accent-gold focus:text-black">
              Skip to main content
            </a>
            <Header />
            <main id="main-content" className="w-full">{children}</main>
          </div>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}