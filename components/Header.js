"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const links = [
  ["/#hot", "Горящие туры"],
  ["/#destinations", "Направления"],
  ["/hotels", "Каталог отелей"],
  ["/journal", "Журнал"],
  ["/#why", "О нас"],
  ["/#reviews", "Отзывы"],
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  const light = usePathname().startsWith("/hotels/");
  useEffect(() => {
    const on = () => setSolid(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <header className={`header ${solid || light ? "solid" : ""} ${open ? "open" : ""}`}>
      <div className="container header-in">
        <Link href="/" className="logo" onClick={() => setOpen(false)}>
          <svg width="30" height="30" viewBox="0 0 32 32" aria-hidden="true"><circle cx="16" cy="16" r="16" fill="#ff7a3d" /><path d="M5 21q5.5-6 11 0t11 0" stroke="#fff" strokeWidth="2.4" fill="none" strokeLinecap="round" /><circle cx="21" cy="11" r="3.4" fill="#ffb02e" /></svg>
          <span>Хочу на отдых</span>
        </Link>
        <nav className="nav" onClick={() => setOpen(false)}>
          {links.map(([h, l]) => <Link key={h} href={h}>{l}</Link>)}
        </nav>
        <a href="tel:+78001234567" className="phone">8 800 123-45-67</a>
        <button className="burger" aria-label="Меню" aria-expanded={open} onClick={() => setOpen(!open)}><i /><i /><i /></button>
      </div>
    </header>
  );
}
