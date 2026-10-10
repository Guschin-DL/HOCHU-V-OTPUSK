import { notFound } from "next/navigation";
import LeadForm from "@/components/LeadForm";
import Scene from "@/components/Scene";
import { hotTours, fmt, sceneFor } from "@/lib/data";

export function generateStaticParams() {
  return hotTours.map((t) => ({ id: String(t.id) }));
}

export default async function TourPage({ params }) {
  const { id } = await params;
  const t = hotTours.find((x) => String(x.id) === id);
  if (!t) notFound();
  return (
    <>
      <section className="page-hero scenic">
        <Scene kind={sceneFor(t).kind} c1={sceneFor(t).color} c2={sceneFor(t).c2} />
        <div className="container">
          <span className="eyebrow">Тур</span>
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
