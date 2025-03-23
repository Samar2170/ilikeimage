'use client'
import { Suspense } from "react";
import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import SideNav from "./ui/components/sidenav";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <title>I Like Image</title>
    <body>
    <>
      <div>
        <Suspense fallback={<div>Loading...</div>}>
            <SideNav />
          </Suspense>
        <main className="flex flex-col h-screen bg-white lg:pl-72 px-4 sm:px-6 lg:px-8">
          <div className="px-4 sm:px-6 lg:px-8 bg-white">{children}</div>
        </main>
      </div>
      
    </>
    </body>
    </html>
  );
}


