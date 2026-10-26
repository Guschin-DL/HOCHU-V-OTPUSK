import HotelCard from "@/components/HotelCard";
import LeadForm from "@/components/LeadForm";
import { hotels } from "@/lib/data";

export const metadata = { title: "Каталог отелей — Хочу на отдых", description: "Проверенные отели и мини-отели наших партнёров. Пилотный партнёр — Гринвуд СПА, Пицунда." };

export default function Hotels() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow light">Каталог отелей</span>
          <h1>Отели, в которых мы уверены</h1>
          <p>Каталог «Хочу на отдых» запускается с пилотного партнёра. Каждый отель добавляем после знакомства и проверки.</p>
        </div>
      </section>
      <section className="section container">
        <div className="hotel-list">{hotels.map((h) => <HotelCard key={h.slug} h={h} />)}</div>
        <p className="muted soon">Новые отели появятся в каталоге скоро. Хотите предложить свой отель — оставьте заявку ниже.</p>
      </section>
      <section id="lead" className="section container cta">
        <h2>Подберём отель под вас</h2>
        <LeadForm source="hotels" />
      </section>
    </>
  );
}
