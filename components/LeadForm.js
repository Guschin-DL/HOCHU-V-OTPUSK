"use client";
import { useState } from "react";

export default function LeadForm({ source = "home" }) {
  const [state, setState] = useState("idle");
  const [error, setError] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    setState("sending");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, source }),
      });
      if (!res.ok) throw new Error((await res.json()).error || "Ошибка");
      setState("sent");
    } catch (err) {
      setError(err.message);
      setState("idle");
    }
  }

  if (state === "sent") return <p className="ok big">Заявка отправлена! Мы перезвоним в течение 15 минут.</p>;
  return (
    <form className="lead" onSubmit={onSubmit}>
      <input required name="name" placeholder="Ваше имя" />
      <input required name="phone" type="tel" placeholder="+7 (___) ___-__-__" />
      <input name="wish" placeholder="Пожелания: страна, даты, бюджет" />
      <button type="submit" disabled={state === "sending"}>{state === "sending" ? "Отправка…" : "Подобрать тур"}</button>
      {error && <p className="err">{error}</p>}
      <small>Нажимая кнопку, вы соглашаетесь на обработку персональных данных.</small>
    </form>
  );
}
