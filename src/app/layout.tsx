import type { Metadata } from "next";
import { Jost } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const millerstone = localFont({
  src: "../../public/fonts/Millerstone-DEMO.ttf",
  variable: "--font-millerstone",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Paula & Pablo | Nuestra Boda",
  description:
    "Paula y Pablo te invitamos a celebrar nuestro casamiento. 13 de febrero de 2027, Río Cuarto.",
  keywords: ["boda", "casamiento", "Paula", "Pablo", "invitación", "Río Cuarto"],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${jost.variable} ${millerstone.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}