"use client";
import { useState } from "react";
import { destinations } from "@/lib/data";

export default function SearchForm() {
  const [done, setDone] = useState(false);
  const onSubmit = (e) => { e.preventDefault(); setDone(true); };
  return (
    <form className="search" onSubmit={onSubmit}>
      <label>Куда
        <select name="country" defaultValue="">
          <option value="">Куда угодно</option>
          {destinations.map((d) => <option key={d.slug}>{d.name}</option>)}
        </select>
      </label>
      <label>Вылет с
        <input type="date" name="date" />
      </label>
      <label>Ночей
        <select name="nights" defaultValue="7">
          {[3, 5, 7, 10, 14].map((n) => <option key={n}>{n}</option>)}
        </select>
      </label>
      <label>Туристов
        <select name="adults" defaultValue="2">
          {[1, 2, 3, 4, 5].map((n) => <option key={n}>{n}</option>)}
        </select>
      </label>
      <button type="submit">Найти тур</button>
      {done && <p className="ok">Спасибо! Менеджер подберёт варианты и свяжется с вами.</p>}
    </form>
  );
}
