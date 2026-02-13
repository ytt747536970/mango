import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "剧本转漫画 - Script to Comic",
  description: "将你的剧本自动转换成精美漫画",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
