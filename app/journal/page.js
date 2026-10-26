import JournalList from "@/components/JournalList";
import LeadForm from "@/components/LeadForm";

export const metadata = { title: "Журнал — Хочу на отдых", description: "Маршруты, еда, советы и идеи для отдыха." };

export default function Journal() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Журнал путешествий</span>
          <h1>Истории, маршруты и советы</h1>
          <p>Пишем о местах, где сами бывали: что посмотреть, где поесть и когда ехать.</p>
        </div>
      </section>
      <section className="section container"><JournalList /></section>
      <section id="lead" className="section container cta">
        <h2>Вдохновились? Подберём тур</h2>
        <LeadForm source="journal" />
      </section>
    </>
  );
}
