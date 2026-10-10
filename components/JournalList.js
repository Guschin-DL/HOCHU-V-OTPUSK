"use client";
import { useState } from "react";
import Link from "next/link";
import Scene from "./Scene";
import { articles, categories } from "@/lib/data";

export function ArticleCard({ a, big = false }) {
  return (
    <Link href={`/journal/${a.slug}`} className={`art ${big ? "big" : ""}`}>
      <div className="art-img"><Scene kind={a.kind} c1={a.c1} c2={a.c2} /><span className="chip-loc">{a.cat}</span></div>
      <div className="art-body">
        <span className="muted">{a.date} · {a.read} мин чтения</span>
        <h3>{a.title}</h3>
        <p>{a.lead}</p>
        <b className="more">Читать →</b>
      </div>
    </Link>
  );
}

export default function JournalList() {
  const [cat, setCat] = useState("Все");
  const list = cat === "Все" ? articles : articles.filter((a) => a.cat === cat);
  return (
    <>
      <div className="chips" role="tablist">
        {categories.map((c) => (
          <button key={c} role="tab" aria-selected={cat === c} className={`chip ${cat === c ? "on" : ""}`} onClick={() => setCat(c)}>{c}</button>
        ))}
      </div>
      <div className="grid">{list.map((a) => <ArticleCard key={a.slug} a={a} />)}</div>
      {!list.length && <p className="muted">В этой рубрике скоро появятся статьи.</p>}
    </>
  );
}
