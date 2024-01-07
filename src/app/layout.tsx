import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/header";
import Footer from "./components/footer";
import { MoviesProvider } from "./contexts/movies-context";
import ReactQueryProvider from "@/providers/react-query";

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
        <ReactQueryProvider>
          <MoviesProvider>
            <Header />
            <main className="w-full flex-1 md:flex md:justify-center">
              {children}
            </main>
            <Footer />
          </MoviesProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
