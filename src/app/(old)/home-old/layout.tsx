import type { Metadata } from "next";
import { Archivo, Archivo_Black } from "next/font/google";
// import { cookies } from "next/headers";
import "../../globals.css";

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
  // TODO: add cookies
  // const cookieStore = await cookies();
  const locale = 'pt' // cookieStore.get("NEXT_LOCALE")?.value || "pt";

  return (
    <html lang={locale} className={`${archivo.variable} ${archivoBlack.variable}`}>
      <body className="min-h-screen bg-primary-bg">
        {children}
      </body>
    </html>
  );
}
