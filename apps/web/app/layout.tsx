import type { Metadata } from "next";
import localFont from "next/font/local";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header/Header";
import { isAuthenticated } from "@/utils/auth";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});
const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "700"], // Specify weights you want to use
});

export const metadata: Metadata = {
  title: "Millipore App",
  description: "Millipore App",
};

import "devextreme/dist/css/dx.material.blue.light.css";
import { Toaster } from "react-hot-toast";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isAuth: boolean = await isAuthenticated();
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${openSans.className} antialiased`}
      >
        
        {isAuth && <Header />}
        {children}
        <Toaster position="bottom-center" reverseOrder={false} />
      </body>
    </html>
  );
}
