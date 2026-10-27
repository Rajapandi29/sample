
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Azure Application",
  description: "Next.js and Express on Azure App Service"
};

export default function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
