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
  icons: {
    icon: [
      { url: "/favicon.svg?v=anillos", type: "image/svg+xml" },
      { url: "/favicon-32x32.png?v=anillos", sizes: "32x32", type: "image/png" },
      { url: "/favicon.ico?v=anillos", sizes: "any" },
    ],
    apple: "/apple-touch-icon.png?v=anillos",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${jost.variable} ${millerstone.variable} h-full antialiased`}
    >
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg?v=anillos" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png?v=anillos" />
        <link rel="icon" type="image/png" sizes="64x64" href="/favicon-64x64.png?v=anillos" />
        <link rel="shortcut icon" href="/favicon.ico?v=anillos" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png?v=anillos" />
      </head>
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}