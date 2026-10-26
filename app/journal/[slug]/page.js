import Link from "next/link";
import { notFound } from "next/navigation";
import Scene from "@/components/Scene";
import LeadForm from "@/components/LeadForm";
import { ArticleCard } from "@/components/JournalList";
import { articles } from "@/lib/data";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const a = articles.find((x) => x.slug === slug);
  return { title: a ? `${a.title} — Журнал` : "Не найдено", description: a?.lead };
}

export default async function Article({ params }) {
  const { slug } = await params;
  const a = articles.find((x) => x.slug === slug);
  if (!a) notFound();
  const more = articles.filter((x) => x.slug !== a.slug).slice(0, 3);
  return (
    <>
      <section className="art-hero">
        <Scene kind={a.kind} c1={a.c1} c2={a.c2} />
        <div className="container">
          <Link href="/journal" className="back">← Журнал</Link>
          <span className="eyebrow">{a.cat}</span>
          <h1>{a.title}</h1>
          <p>{a.date} · {a.read} мин чтения</p>
        </div>
      </section>
      <article className="container prose">
        <p className="lede">{a.lead}</p>
        {a.body.map((p, i) => <p key={i}>{p}</p>)}
      </article>
      <section className="section container">
        <h2>Читайте также</h2>
        <div className="grid">{more.map((x) => <ArticleCard key={x.slug} a={x} />)}</div>
      </section>
      <section id="lead" className="section container cta">
        <h2>Хотите так же?</h2>
        <LeadForm source={`article:${a.slug}`} />
      </section>
    </>
  );
}
