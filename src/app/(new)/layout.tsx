import type { Metadata } from "next";
import { Archivo, Archivo_Black } from "next/font/google";
import { cookies } from "next/headers";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getTranslations } from "@/data/api";
import "../globals.css";

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("NEXT_LOCALE")?.value || "pt") as 'pt' | 'en';
  const t = getTranslations(locale);

  return (
    <html lang={locale} className={`${archivo.variable} ${archivoBlack.variable}`}>
      <body className="min-h-screen bg-[#101010] text-white flex flex-col justify-between">
        <div>
          <Header locale={locale} t={t} />
          <main className="w-full">{children}</main>
        </div>
        <Footer t={t} />
      </body>
    </html>
  );
}