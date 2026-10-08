import { NextResponse } from "next/server";

const clean = (v, max) => String(v ?? "").trim().slice(0, max);

export async function POST(req) {
  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Некорректный запрос" }, { status: 400 });
  }
  const lead = {
    name: clean(body.name, 100),
    phone: clean(body.phone, 30),
    wish: clean(body.wish, 500),
    source: clean(body.source, 50),
  };
  if (!lead.name || lead.phone.replace(/\D/g, "").length < 10) {
    return NextResponse.json({ error: "Укажите имя и телефон" }, { status: 400 });
  }
  // TODO: отправка в Telegram / почту / CRM. Пока заявка пишется в лог сервера.
  console.log("NEW LEAD", lead);
  return NextResponse.json({ ok: true });
}
