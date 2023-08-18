import Head from "next/head";
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Heatmap",
  description: "",
  icons: {icon : "/favicon.ico"}
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Head>
        <script src="https://www.gstatic.com/charts/loader.js"></script>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>{children}</body>
    </html>
  );
}
