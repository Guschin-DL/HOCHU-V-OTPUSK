import Link from "next/link";
import SearchForm from "@/components/SearchForm";
import LeadForm from "@/components/LeadForm";
import TourCard from "@/components/TourCard";
import HeroArt from "@/components/HeroArt";
import Reveal from "@/components/Reveal";
import Scene from "@/components/Scene";
import { ArticleCard } from "@/components/JournalList";
import HotelCard from "@/components/HotelCard";
import { hotels, destinations, hotTours, benefits, reviews, stats, steps, places, articles, fmt } from "@/lib/data";

const cats = [["/destinations/abkhazia", "🌊 Море"], ["/#abkhazia", "⛰️ Горы"], ["/#hot", "🔥 Горящие"], ["/destinations/turkey", "🍹 Всё включено"], ["/journal", "📖 Журнал"]];
const marq = ["Абхазия", "Турция", "Египет", "ОАЭ", "Таиланд", "Мальдивы", "Сочи"];

export default function Home() {
  return (
    <>
      <section className="hero">
        <HeroArt />
        <div className="container hero-in">
          <div className="hero-copy">
            <span className="pill-rate"><b>4,9 ★</b> 2 300+ отзывов путешественников</span>
            <h1>Отпуск, который <em>хочется</em> повторить</h1>
            <p>Подбираем туры без переплат за 15 минут — и рассказываем, куда поехать, в журнале для тех, кто любит путешествовать.</p>
            <SearchForm />
            <div className="cats">
              {cats.map(([href, label]) => <Link key={label} href={href} className="cat">{label}</Link>)}
            </div>
          </div>
          <aside className="hero-float" aria-label="Выгодное предложение">
            <Link href="/tours/7" className="glass">
              <span className="live"><i /> Горит · осталось 3 места</span>
              <b>Гагра, Абхазия</b>
              <span>7 ночей · завтраки и ужины</span>
              <strong>{fmt(38500)} <s>{fmt(46000)}</s></strong>
            </Link>
            <Link href="/journal/ritsa-za-den" className="glass sm">
              <span className="muted-l">Из журнала</span>
              <b>Рица за один день</b>
            </Link>
          </aside>
        </div>
        <a href="#hot" className="scroll-cue" aria-label="Вниз"><i /></a>
      </section>

      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {[...marq, ...marq].map((m, i) => <span key={i}>{m}<i>✦</i></span>)}
        </div>
      </div>

      <section className="container stats">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 90}><b>{s.value}</b><span>{s.label}</span></Reveal>
        ))}
      </section>

      <section id="hot" className="section">
        <div className="container sec-head row">
          <div><span className="eyebrow">Выгодно сейчас</span><h2>Горящие туры</h2></div>
          <span className="muted hint">Листайте →</span>
        </div>
        <div className="rail">
          {hotTours.map((t) => <TourCard key={t.id} t={t} />)}
        </div>
      </section>

      <section id="destinations" className="section alt">
        <div className="container">
          <Reveal className="sec-head"><span className="eyebrow">Куда полететь</span><h2>Популярные направления</h2></Reveal>
          <div className="grid dests">
            {destinations.map((d, i) => (
              <Link href={`/destinations/${d.slug}`} key={d.slug} className={`dest ${i === 0 ? "wide" : ""}`}>
                <Scene kind={d.kind} c1={d.color} c2={d.c2} />
                <div className="dest-txt">
                  <h3>{d.name}</h3>
                  <p>{d.text}</p>
                  <b>от {fmt(d.from)}</b>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="catalog" className="section container">
        <Reveal className="sec-head"><span className="eyebrow">Каталог отелей</span><h2>Отели, в которых мы уверены</h2></Reveal>
        <div className="hotel-list">{hotels.map((h) => <HotelCard key={h.slug} h={h} />)}</div>
      </section>

      <section id="abkhazia" className="section container">
        <Reveal className="sec-head"><span className="eyebrow">Спецтема</span><h2>Абхазия: четыре места, ради которых стоит ехать</h2></Reveal>
        <div className="grid four">
          {places.map((p) => (
            <article key={p.name} className="place">
              <Scene kind={p.kind} c1={p.c1} c2={p.c2} />
              <div className="place-txt"><span className="chip-loc">{p.tag}</span><h3>{p.name}</h3><p>{p.text}</p></div>
            </article>
          ))}
        </div>
      </section>

      <section id="journal" className="section alt">
        <div className="container">
          <div className="sec-head row">
            <div><span className="eyebrow">Журнал</span><h2>Истории и советы путешественников</h2></div>
            <Link href="/journal" className="btn ghost">Все статьи</Link>
          </div>
          <div className="journal-top">
            <ArticleCard a={articles[0]} big />
            <div className="journal-side">
              {articles.slice(1, 4).map((a) => <ArticleCard key={a.slug} a={a} />)}
            </div>
          </div>
        </div>
      </section>

      <section id="why" className="section container">
        <Reveal className="sec-head"><span className="eyebrow">О нас</span><h2>Почему выбирают нас</h2></Reveal>
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

      <section className="section steps-sec">
        <div className="container">
          <Reveal className="sec-head"><span className="eyebrow light">Просто</span><h2>Как это работает</h2></Reveal>
          <ol className="steps">
            {steps.map((st, i) => (
              <li key={st.title}><span className="num">{i + 1}</span><h3>{st.title}</h3><p>{st.text}</p></li>
            ))}
          </ol>
        </div>
      </section>

      <section id="reviews" className="section container">
        <Reveal className="sec-head"><span className="eyebrow">Отзывы</span><h2>Что говорят туристы</h2></Reveal>
        <div className="grid">
          {reviews.map((r) => (
            <blockquote key={r.name} className="review">
              <p>«{r.text}»</p>
              <footer><b>{r.name}</b> · {r.trip}</footer>
            </blockquote>
          ))}
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
