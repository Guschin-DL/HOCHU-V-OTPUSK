import { fmt } from "@/lib/data";

export default function TourCard({ t }) {
  const off = Math.round((1 - t.price / t.old) * 100);
  return (
    <article className="card">
      <div className="card-img" style={{ background: `linear-gradient(135deg, ${t.color}, #1e3799)` }}>
        <span className="badge">−{off}%</span>
        <span className="em">{t.emoji}</span>
      </div>
      <div className="card-body">
        <h3>{t.hotel}</h3>
        <p className="muted">{t.country}, {t.resort} · {"★".repeat(t.stars)}</p>
        <p>{t.date} · {t.nights} ночей · {t.meal}</p>
        <div className="price"><b>{fmt(t.price)}</b><s>{fmt(t.old)}</s></div>
        <a href="#lead" className="btn">Забронировать</a>
      </div>
    </article>
  );
}
