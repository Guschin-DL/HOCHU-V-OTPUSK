"use client";
import { useState } from "react";

export default function LeadForm() {
  const [sent, setSent] = useState(false);
  if (sent) return <p className="ok big">Заявка отправлена! Мы перезвоним в течение 15 минут.</p>;
  return (
    <form className="lead" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
      <input required name="name" placeholder="Ваше имя" />
      <input required name="phone" type="tel" placeholder="+7 (___) ___-__-__" />
      <input name="wish" placeholder="Пожелания: страна, даты, бюджет" />
      <button type="submit">Подобрать тур</button>
      <small>Нажимая кнопку, вы соглашаетесь на обработку персональных данных.</small>
    </form>
  );
}
