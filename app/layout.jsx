import "./globals.css";

export const metadata = {
  title: "PB-LED — Caribbean LED B2B",
  description:
    "Leverancier van professionele LED-verlichting voor het Caribisch gebied. Import, lichtplannen en BIM-integratie voor B2B projecten.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="nl">
      <body>{children}</body>
    </html>
  );
}

