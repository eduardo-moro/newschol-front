import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="
        flex 
        bg-gray-300 
        min-h-[100vh] 
        w-full 
        justify-center 
        items-center
        px-12
        py-8
      ">
        <header></header>
        <main>{children}</main>
        <footer></footer>
      </body>
    </html>
  );
}
