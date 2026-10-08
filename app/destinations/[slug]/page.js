import { notFound } from "next/navigation";
import TourCard from "@/components/TourCard";
import LeadForm from "@/components/LeadForm";
import { destinations, hotTours, fmt } from "@/lib/data";

export function generateStaticParams() {
  return destinations.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const d = destinations.find((x) => x.slug === slug);
  return { title: d ? `Туры: ${d.name} — Хочу в отпуск` : "Не найдено" };
}

export default async function DestinationPage({ params }) {
  const { slug } = await params;
  const d = destinations.find((x) => x.slug === slug);
  if (!d) notFound();
  const tours = hotTours.filter((t) => t.country === d.name);
  return (
    <>
      <section className="hero" style={{ background: `linear-gradient(160deg, ${d.color}, #1e3799)` }}>
        <div className="container">
          <span className="em">{d.emoji}</span>
          <h1>Туры: {d.name}</h1>
          <p>{d.text} Цены от {fmt(d.from)}</p>
        </div>
      </section>
      <section className="section container">
        <h2>Горящие туры</h2>
        {tours.length ? (
          <div className="grid">{tours.map((t) => <TourCard key={t.id} t={t} />)}</div>
        ) : (
          <p className="muted">Сейчас горящих туров нет — оставьте заявку, подберём индивидуально.</p>
        )}
      </section>
      <section id="lead" className="section container cta">
        <h2>Подберём тур: {d.name}</h2>
        <LeadForm source={`direction:${d.slug}`} />
      </section>
    </>
  );
}
