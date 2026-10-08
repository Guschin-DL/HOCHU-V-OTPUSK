import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Хочу в отпуск — подбор и бронирование туров",
  description: "Горящие туры, подбор отдыха под ваш бюджет, поддержка 24/7.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
