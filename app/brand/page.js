export const metadata = { title: "Логотип — Хочу на отдых", robots: { index: false } };

const main = [
  { file: "v3-main", name: "Горизонтальный", note: "Основной знак: шапка сайта, письма, баннеры. Надпись читается от 150 px по ширине, подпись — от 320 px.", bg: "light" },
  { file: "v3-main-dark", name: "Для тёмного фона", note: "Светлое кольцо и надпись. Для футера, тёмных баннеров и презентаций.", bg: "dark" },
  { file: "v3-stacked", name: "Вертикальный", note: "Для квадратных мест: соцсети, афиши, визитки.", bg: "light" },
  { file: "v3-emblem", name: "Эмблема", note: "Без надписи: аватар, стикер, печать. Читается от 48 px.", bg: "light" },
  { file: "v3-icon", name: "Иконка 32×32", note: "Кот и самолёт для вкладки браузера и приложений. Упрощена: без пальмы и моря.", bg: "light" },
];

const others = [
  { file: "v2-b-sign", name: "Указатель направлений", idea: "Столб с тремя табличками: горы, пляж, самолёт. Читается от 150 px." },
  { file: "v2-c-sunset", name: "Закат и семья пальм", idea: "Ретро-эмблема из мазков кисти: три пальмы как семья. Читается от 110 px." },
  { file: "v2-d-word", name: "Надпись с пальмой и самолётом", idea: "Компактная надпись для шапки: пальма на «ч», самолёт вылетает из слова. Читается от 120 px." },
];

export default function Brand() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow light">Фирменный стиль</span>
          <h1>Логотип «Хочу на отдых»</h1>
          <p>Семья котов выглядывает из-за дюны и подсматривает за улетающим самолётом: вся семья в ожидании отпуска.</p>
        </div>
      </section>

      <section className="section container brand">
        <div className="sec-head"><span className="eyebrow">Основной</span><h2>Семья ждёт отпуск</h2></div>
        <div className="main-grid">
          {main.map((v, i) => (
            <article key={v.file} className={`mg ${i === 0 ? "wide" : ""}`}>
              <div className={`bv ${v.bg}`}><img src={`/logo/${v.file}.svg`} alt={v.name} style={v.file === "v3-icon" ? { width: 96 } : undefined} /></div>
              <div className="mg-txt"><h3>{v.name}</h3><p className="muted">{v.note}</p><a className="more" href={`/logo/${v.file}.svg`} download>Скачать SVG →</a></div>
            </article>
          ))}
        </div>

        <div className="sec-head" style={{ marginTop: 56 }}><span className="eyebrow">Запасные направления</span><h2>Другие концепции</h2></div>
        <div className="grid">
          {others.map((v) => (
            <article key={v.file} className="mg">
              <div className="bv light"><img src={`/logo/${v.file}.svg`} alt={v.name} /></div>
              <div className="mg-txt"><h3>{v.name}</h3><p className="muted">{v.idea}</p><a className="more" href={`/logo/${v.file}.svg`} download>Скачать SVG →</a></div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
