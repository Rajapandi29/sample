
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Azure Static and Dynamic App",
  description: "Next.js static frontend with Azure API backend"
};

export default function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body style={{
        fontFamily: "Arial, sans-serif",
        margin: 0,
        padding: "40px",
        background: "#f3f6fb",
        color: "#172033"
      }}>
        {children}
      </body>
    </html>
  );
}
