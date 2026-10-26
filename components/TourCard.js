import Link from "next/link";
import Scene from "./Scene";
import { fmt, sceneFor } from "@/lib/data";

export default function TourCard({ t }) {
  const off = Math.round((1 - t.price / t.old) * 100);
  const d = sceneFor(t);
  return (
    <article className="card">
      <div className="card-img">
        <Scene kind={d.kind} c1={d.color} c2={d.c2} />
        <span className="badge">−{off}%</span>
        <span className="chip-loc">{t.country} · {t.resort}</span>
      </div>
      <div className="card-body">
        <h3>{t.hotel}</h3>
        <p className="muted stars">{"★".repeat(t.stars)} · {t.meal}</p>
        <p className="meta"><span>📅 {t.date}</span><span>🌙 {t.nights} ночей</span></p>
        <div className="price"><b>{fmt(t.price)}</b><s>{fmt(t.old)}</s></div>
        <Link href={`/tours/${t.id}`} className="btn">Подробнее</Link>
      </div>
    </article>
  );
}
