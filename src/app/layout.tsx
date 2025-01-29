import { Header } from "@/src/app/components/layout/header";
import { Footer } from "./components/layout/footer";
import { isLoggedIn } from "../lib/services/authentication/isLoggedIn";
import { Figtree } from 'next/font/google';

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
  const loggedIn = await isLoggedIn();

  return (
    <html lang="en" className={figtree.variable}>
      <body className="font-figtree">
      <Header loggedIn={loggedIn} />
        {children}
      <Footer />
      </body>
    </html>
  );
}
