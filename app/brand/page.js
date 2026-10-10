export const metadata = { title: "Логотип — Хочу в отпуск", robots: { index: false } };

const variants = [
  { n: 1, file: "hv-1-door", name: "Табличка «Не беспокоить»", idea: "Универсальный знак отпуска: бирка на ручке двери с ушком. Один взгляд — и понятно, что человек уехал. Самое прямое попадание в смысл «уехал в отпуск».", pick: "Рекомендуем как основной" },
  { n: 2, file: "hv-2-suitcase", name: "Чемодан с закатом", idea: "Чемодан, в котором лежит море: солнце над волной. Дружелюбно и узнаваемо, хорошо масштабируется в иконку." },
  { n: 3, file: "hv-3-sun", name: "Солнце вместо «о»", idea: "Чисто шрифтовое решение: буква «о» в слове «отпуск» уходит солнцем в волну. Минимум деталей, лучший вариант для мелких размеров.", pick: "Рекомендуем как компактный" },
  { n: 4, file: "hv-4-check", name: "Галочка-самолёт", idea: "Галочка «готово», превращающаяся в самолёт: заявка принята, вылет подтверждён. Вызывает доверие и подчёркивает сервис." },
  { n: 5, file: "hv-5-stamp", name: "Штамп «Вылет разрешён»", idea: "Печать как в паспорте после пограничного контроля. Официальный, надёжный образ — подходит для документов и писем." },
];

export default function Brand() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow light">Фирменный стиль</span>
          <h1>Логотип «Хочу в отпуск»</h1>
          <p>Пять вариантов плашки. Каждый — векторный SVG, буквы переведены в контуры, шрифты не нужны.</p>
        </div>
      </section>
      <section className="section container brand">
        {variants.map((v) => (
          <article key={v.n} className="brand-row">
            <div className="brand-txt">
              <span className="num">{v.n}</span>
              <h2>{v.name}</h2>
              <p>{v.idea}</p>
              {v.pick && <span className="pilot">{v.pick}</span>}
              <a className="more" href={`/logo/${v.file}.svg`} download>Скачать SVG →</a>
            </div>
            <div className="brand-view">
              <div className="bv light"><img src={`/logo/${v.file}.svg`} alt={v.name} /></div>
              <div className="bv dark"><img src={`/logo/${v.file}.svg`} alt={v.name} /></div>
              <div className="bv small"><img src={`/logo/${v.file}.svg`} alt="" style={{ height: 36 }} /><span className="muted">в шапке сайта</span></div>
            </div>
          </article>
        ))}
      </section>
    </>
  );
}
