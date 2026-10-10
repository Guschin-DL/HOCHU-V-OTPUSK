import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Хочу на отдых — туры и журнал путешествий",
  description: "Горящие туры, отдых в Абхазии и по миру, журнал путешественников. Подбор за 15 минут.",
};

export const viewport = { themeColor: "#0b3b4a" };

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;1,700;1,800&family=Forum&family=Manrope:wght@400;500;700;800&display=swap" rel="stylesheet" />
      </head>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
