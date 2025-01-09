import { Header } from "@/src/app/components/layout/header";
import { Footer } from "./components/layout/footer";
import { isLoggedIn } from "../lib/services/authentication/isLoggedIn";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const loggedIn = await isLoggedIn();

  return (
    <html lang="en">
      <body>
      <Header loggedIn={loggedIn} />
        {children}
      <Footer />
      </body>
    </html>
  );
}
