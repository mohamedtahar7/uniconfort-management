import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import QueryProvider from "@/contexts/QueryContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Uniconfort Management",
  description: "a web app to manage Uniconfort's Orders",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <QueryProvider>
        <body className={inter.className}>
          <div className="relative md:flex">
            <Sidebar />
            <main className="flex-1 p-4 bg-gray-100">{children}</main>
          </div>
        </body>
      </QueryProvider>
    </html>
  );
}
