import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "UseMovies",
  description: "Website to search for and bookmark movies.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body className={`${inter.className} flex flex-col`}>
        <main className="flex-1 w-full md:flex md:justify-center">
          {children}
        </main>
      </body>
    </html>
  );
}
