import "./globals.css";

export const metadata = {
  title: "Athleo",
  description: "the fitness app ",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-neutral-950">{children}</body>
    </html>
  );
}
