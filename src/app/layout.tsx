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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://bodapauypablo.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Paula & Pablo | Nuestra Boda",
  description:
    "Paula y Pablo te invitamos a celebrar nuestro casamiento. 13 de febrero de 2027, Río Cuarto.",
  keywords: ["boda", "casamiento", "Paula", "Pablo", "invitación", "Río Cuarto"],
  openGraph: {
    title: "Paula & Pablo | Nuestra Boda",
    description: "13 de febrero de 2027 · Te esperamos para celebrar este gran día.",
    url: siteUrl,
    siteName: "Paula & Pablo | Nuestra Boda",
    images: [
      {
        url: `${siteUrl}/og-image.jpg`,
        secureUrl: `${siteUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        type: "image/jpeg",
        alt: "Paula & Pablo - Nuestra Boda",
      },
    ],
    locale: "es_AR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Paula & Pablo | Nuestra Boda",
    description: "13 de febrero de 2027 · Te esperamos para celebrar este gran día.",
    images: [`${siteUrl}/og-image.jpg`],
  },
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
        <meta property="og:image" content={`${siteUrl}/og-image.jpg`} />
        <meta property="og:image:secure_url" content={`${siteUrl}/og-image.jpg`} />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
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