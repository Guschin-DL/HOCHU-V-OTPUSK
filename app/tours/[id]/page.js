import { notFound } from "next/navigation";
import LeadForm from "@/components/LeadForm";
import { hotTours, fmt } from "@/lib/data";

export function generateStaticParams() {
  return hotTours.map((t) => ({ id: String(t.id) }));
}

export default async function TourPage({ params }) {
  const { id } = await params;
  const t = hotTours.find((x) => String(x.id) === id);
  if (!t) notFound();
  return (
    <>
      <section className="hero" style={{ background: `linear-gradient(160deg, ${t.color}, #1e3799)` }}>
        <div className="container">
          <span className="em">{t.emoji}</span>
          <h1>{t.hotel}</h1>
          <p>{t.country}, {t.resort} · {"★".repeat(t.stars)}</p>
        </div>
      </section>
      <section className="section container">
        <div className="price"><b>{fmt(t.price)}</b><s>{fmt(t.old)}</s></div>
        <ul className="facts">
          <li>Вылет: {t.date}</li>
          <li>Ночей: {t.nights}</li>
          <li>Питание: {t.meal}</li>
          <li>Цена за человека при двухместном размещении</li>
        </ul>
      </section>
      <section id="lead" className="section container cta">
        <h2>Забронировать тур</h2>
        <LeadForm source={`tour:${t.id}`} />
      </section>
    </>
  );
}
