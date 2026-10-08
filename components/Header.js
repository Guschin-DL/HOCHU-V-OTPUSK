import Link from "next/link";

export default function Header() {
  return (
    <header className="header">
      <div className="container header-in">
        <Link href="/" className="logo">✈️ Хочу в отпуск</Link>
        <nav className="nav">
          <Link href="/#hot">Горящие туры</Link>
          <Link href="/#destinations">Направления</Link>
          <Link href="/#why">О нас</Link>
          <Link href="/#reviews">Отзывы</Link>
        </nav>
        <a href="tel:+78001234567" className="phone">8 800 123-45-67</a>
      </div>
    </header>
  );
}
