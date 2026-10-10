import Link from "next/link";
import { notFound } from "next/navigation";
import LeadForm from "@/components/LeadForm";
import { hotels, fmt } from "@/lib/data";

export function generateStaticParams() {
  return hotels.map((h) => ({ slug: h.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const h = hotels.find((x) => x.slug === slug);
  return { title: h ? `${h.type} ${h.name}, ${h.place} — Хочу в отпуск` : "Не найдено", description: h?.tagline };
}

export default async function HotelPage({ params }) {
  const { slug } = await params;
  const h = hotels.find((x) => x.slug === slug);
  if (!h) notFound();
  return (
    <div className="hotel-page" style={{ "--hg": h.brand.green, "--hb": h.brand.brown }}>
      <section className="hotel-hero">
        <div className="container hotel-hero-in">
          <div>
            <Link href="/hotels" className="back-d">← Каталог отелей</Link>
            {h.pilot && <span className="pilot">Пилотный партнёр каталога</span>}
            <h1>{h.name}</h1>
            <p className="hotel-sub">{h.type} · {h.place}</p>
            <p className="hotel-lead">{h.tagline}</p>
            <div className="hotel-actions">
              <a href="#lead" className="btn brand">Узнать цены и даты</a>
              <span className="muted">{h.from ? `от ${fmt(h.from)}` : "Цена по запросу"}</span>
            </div>
          </div>
          <div className="hotel-logo big"><img src={h.logo} alt={`Логотип: ${h.type} ${h.name}, ${h.place}`} width="360" height="355" /></div>
        </div>
        <div className="pines" aria-hidden="true">
          {Array.from({ length: 14 }).map((_, i) => <i key={i} style={{ left: `${i * 7.4}%`, height: `${36 + ((i * 37) % 40)}px` }} />)}
        </div>
      </section>

      <section className="section container">
        <div className="sec-head"><span className="eyebrow brand">Почему здесь хорошо</span><h2>Тишина, сосны и море</h2></div>
        <div className="grid">
          {h.highlights.map((x) => (
            <div key={x.title} className="benefit hl">
              <span className="em">{x.icon}</span><h3>{x.title}</h3><p>{x.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="lead" className="section container cta">
        <h2>Забронировать в «{h.name}»</h2>
        <p className="muted">Менеджер уточнит даты и наличие номеров и пришлёт актуальную цену</p>
        <LeadForm source={`hotel:${h.slug}`} />
      </section>
    </div>
  );
}
