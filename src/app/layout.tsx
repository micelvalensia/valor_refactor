import type { Metadata } from "next";
import { Geist, Geist_Mono, Source_Code_Pro } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { Provider } from "./provider";
import { Toaster } from "@/components/ui/sonner"

const sourceCodePro = Source_Code_Pro({
  variable: "--font-source-code",
  subsets: ["latin"]
})

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Valor Refactory",
  description: "Where every developers met",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${sourceCodePro.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-source">
        <Provider>
          {children}
        </Provider>
        <Toaster />
      </body>
    </html>
  );
}
