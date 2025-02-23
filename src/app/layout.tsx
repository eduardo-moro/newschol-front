import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex">
        <nav className="bg-gray-500/30 w-72 min-h-[100vh] h-full pl-12 pr-4 py-12">
          <a>Home</a>
        </nav>

        <main className="w-full pl-4 pr-12 py-12">
            <div className="h-full w-full">
              <p>olá!</p>
            </div>
            {children}
        </main>
      </body>
    </html>
  );
}
