import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/header";
import Footer from "./components/footer";
import { MoviesProvider } from "./contexts/movies-context";
import ReactQueryProvider from "@/providers/react-query";
import { FetchProvider } from "./contexts/fetch-context";

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
      <body className={`${inter.className}  flex  flex-col`}>
        <ReactQueryProvider>
          <MoviesProvider>
            <FetchProvider>
              <Header />
              <main className="m-auto w-full max-w-screen-2xl flex-1 md:flex md:justify-center">
                {children}
              </main>
              <Footer />
            </FetchProvider>
          </MoviesProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
