import { Header } from "@/src/app/components/layout/header";
import { Footer } from "./components/layout/footer";
import { Figtree } from 'next/font/google';
import { AuthProvider } from "./authContext";

const figtree = Figtree({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-figtree'
})

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en" className={figtree.variable}>
      <body className="font-figtree flex flex-col min-h-screen">
      <AuthProvider>
        <Header />
          <main className="flex-grow">{children}</main>
        <Footer />
      </AuthProvider>
      </body>
    </html>
  );
}
