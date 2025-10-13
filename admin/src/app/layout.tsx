import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rosa Chic Admin",
  description: "Painel administrativo Rosa Chic",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
