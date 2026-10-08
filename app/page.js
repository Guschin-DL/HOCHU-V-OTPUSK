import Link from "next/link";
import SearchForm from "@/components/SearchForm";
import LeadForm from "@/components/LeadForm";
import TourCard from "@/components/TourCard";
import { destinations, hotTours, benefits, reviews, stats, steps, fmt } from "@/lib/data";

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="container">
          <h1>Хочу в отпуск!</h1>
          <p>Подберём тур мечты под ваш бюджет — быстро и без переплат</p>
          <SearchForm />
        </div>
        <svg className="waves" viewBox="0 0 1440 120" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0,64 C240,120 480,0 720,48 C960,96 1200,16 1440,64 L1440,120 L0,120 Z" fill="#fff7ec" />
        </svg>
      </section>

      <section className="container stats">
        {stats.map((s) => (
          <div key={s.label}><b>{s.value}</b><span>{s.label}</span></div>
        ))}
      </section>

      <section id="hot" className="section container">
        <h2>🔥 Горящие туры</h2>
        <div className="grid">{hotTours.map((t) => <TourCard key={t.id} t={t} />)}</div>
      </section>

      <section id="destinations" className="section alt">
        <div className="container">
          <h2>Популярные направления</h2>
          <div className="grid">
            {destinations.map((d) => (
              <Link href={`/destinations/${d.slug}`} key={d.slug} className="dest" style={{ background: `linear-gradient(135deg, ${d.color}, #1e3799)` }}>
                <span className="em">{d.emoji}</span>
                <h3>{d.name}</h3>
                <p>{d.text}</p>
                <b>от {fmt(d.from)}</b>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="why" className="section container">
        <h2>Почему выбирают нас</h2>
        <div className="grid four">
          {benefits.map((b) => (
            <div key={b.title} className="benefit">
              <span className="em">{b.icon}</span>
              <h3>{b.title}</h3>
              <p>{b.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section container">
        <h2>Как это работает</h2>
        <ol className="steps">
          {steps.map((st, i) => (
            <li key={st.title}><span className="num">{i + 1}</span><h3>{st.title}</h3><p>{st.text}</p></li>
          ))}
        </ol>
      </section>

      <section id="reviews" className="section alt">
        <div className="container">
          <h2>Отзывы туристов</h2>
          <div className="grid">
            {reviews.map((r) => (
              <blockquote key={r.name} className="review">
                <p>«{r.text}»</p>
                <footer><b>{r.name}</b> · {r.trip}</footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      <section id="lead" className="section container cta">
        <h2>Оставьте заявку на подбор тура</h2>
        <p className="muted">Менеджер перезвонит и предложит лучшие варианты</p>
        <LeadForm />
      </section>
    </>
  );
}
