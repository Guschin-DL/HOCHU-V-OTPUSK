import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container foot-grid">
        <div>
          <b className="foot-logo">Хочу на отдых</b>
          <p>Подбираем туры без переплат и пишем о местах, куда хочется вернуться.</p>
        </div>
        <div>
          <h4>Разделы</h4>
          <Link href="/#hot">Горящие туры</Link>
          <Link href="/#destinations">Направления</Link>
          <Link href="/hotels">Каталог отелей</Link>
          <Link href="/journal">Журнал</Link>
        </div>
        <div>
          <h4>Связаться</h4>
          <a href="tel:+78001234567">8 800 123-45-67</a>
          <a href="mailto:info@example.com">info@example.com</a>
          <span>Ежедневно, 9:00–21:00</span>
        </div>
      </div>
      <div className="container foot-bottom">© {new Date().getFullYear()} Хочу на отдых. Все права защищены.</div>
    </footer>
  );
}
