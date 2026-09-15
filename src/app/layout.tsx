import type { Metadata } from "next";
import { Geist, Geist_Mono, Source_Code_Pro } from "next/font/google";
import "./globals.css";
import { Provider } from "./provider";
import { Toaster } from "@/components/ui/sonner";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const sourceCodePro = Source_Code_Pro({
  variable: "--font-source-code",
  subsets: ["latin"],
});

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  console.log("[SERVER ROOT LAYOUT] session user:", session?.user?.name || "(no session)");

  return (
    <html
      lang="en"
      className={`${sourceCodePro.variable} ${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className={`${sourceCodePro.className} min-h-full flex flex-col font-sans`}>
        <Provider session={session}>
          {children}
        </Provider>
        <Toaster />
      </body>
    </html>
  );
}
