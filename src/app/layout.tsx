import type { Metadata } from "next";
import {Providers} from "./providers";
import "./globals.css";


export const metadata: Metadata = {
  title: "Learn Match",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light w-full h-full">
      <body className="w-full h-full">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
