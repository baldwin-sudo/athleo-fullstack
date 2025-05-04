import NavBar from "../ui/custom/navbar/NavBar";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-neutral-800">
        <NavBar />
        <div className="mt-25 lg:mt-20 p-5 ">{children}</div>
      </body>
    </html>
  );
}
