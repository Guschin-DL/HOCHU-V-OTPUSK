import Link from "next/link";
import { fmt } from "@/lib/data";

export default function HotelCard({ h }) {
  return (
    <Link href={`/hotels/${h.slug}`} className="hotel-card" style={{ "--hg": h.brand.green, "--hb": h.brand.brown }}>
      <div className="hotel-logo"><img src={h.logo} alt={`Логотип: ${h.type} ${h.name}, ${h.place}`} width="160" height="158" /></div>
      <div className="hotel-info">
        {h.pilot && <span className="pilot">Пилотный партнёр каталога</span>}
        <h3>{h.name}</h3>
        <p className="muted">{h.type} · {h.place}</p>
        <p>{h.tagline}</p>
        <b className="more">{h.from ? `от ${fmt(h.from)}` : "Цена по запросу"} · Смотреть отель →</b>
      </div>
    </Link>
  );
}
