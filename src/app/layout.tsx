import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex bg-gray-300 h-full w-full">
        {children}
      </body>
    </html>
  );
}
