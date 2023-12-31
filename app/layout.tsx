import { AuthContextProvider } from "@/lib/context/authContext";
import { DiaryContextProvider } from "@/lib/context/diaryContext";
import { NavigationEvents } from "@/lib/navEvents";
import NavBar from "@/components/layout/NavBar";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import { Suspense } from "react";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://diary.cqb13.dev"),
  title: "My Online Diary",
  description:
    "Keep track of your thoughts and feelings in your own private and secure diary.",
  keywords: [
    "diary",
    "online diary",
    "private diary",
    "secure diary",
    "online journal",
    "private journal",
    "secure journal",
    "Maksim Straus",
    "cqb13",
  ],
  category: "self-care & wellness",
  generator: "Next.js",
  applicationName: "My Online Diary",
  referrer: "origin-when-cross-origin",
  authors: [{ name: "cqb13", url: "https://cqb13.dev" }],
  colorScheme: "dark",
  creator: "cqb13",
  publisher: "cqb13",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  themeColor: "black",
  manifest: "https://diary.cqb13.dev/manifest.json",
  openGraph: {
    title: "My Online Diary",
    description:
      "Keep track of your thoughts and feelings in your own private and secure diary.",
    url: "https://diary.cqb13.dev/",
    siteName: "My Online Diary",
    images: [
      {
        url: "https://diary.cqb13.dev/icon.png",
        width: 600,
        height: 600,
        alt: "Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  icons: {
    icon: "/icon.png",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": "auto",
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} flex min-h-screen flex-col gap-5 bg-dark-background p-20 text-gray-200 max-xml:px-10 max-sm:p-1`}
      >
        <AuthContextProvider>
          <NavBar />
          <DiaryContextProvider>
            <div className="m-auto w-9/12 flex-1 px-3 max-xml:w-11/12 max-mdl:w-full">
              {children}
            </div>
          </DiaryContextProvider>
        </AuthContextProvider>
        <footer className="mt-40 shrink-0 max-mds:mt-20">
          <p className="text-center">© 2023 My Online Diary</p>
        </footer>
        <Suspense fallback={null}>
          <NavigationEvents />
        </Suspense>
      </body>
    </html>
  );
}
