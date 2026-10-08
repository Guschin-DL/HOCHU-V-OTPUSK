export const destinations = [
  { slug: "turkey", name: "Турция", from: 42000, emoji: "🏖️", color: "#ff9f43", text: "Всё включено, песчаные пляжи и тёплое море с мая по октябрь." },
  { slug: "egypt", name: "Египет", from: 48000, emoji: "🐠", color: "#ee5a24", text: "Красное море, коралловые рифы и дайвинг круглый год." },
  { slug: "uae", name: "ОАЭ", from: 65000, emoji: "🏙️", color: "#0abde3", text: "Небоскрёбы, шопинг и белоснежные пляжи Дубая и Рас-эль-Хаймы." },
  { slug: "thailand", name: "Таиланд", from: 78000, emoji: "🌴", color: "#10ac84", text: "Пхукет, Самуи и Паттайя: экзотика, острова и тайская кухня." },
  { slug: "maldives", name: "Мальдивы", from: 135000, emoji: "🏝️", color: "#00d2d3", text: "Бунгало над водой и лазурные лагуны для идеального отдыха." },
  { slug: "sochi", name: "Сочи", from: 28000, emoji: "⛰️", color: "#5f27cd", text: "Море и горы без визы и перелётов за границу." },
];

export const hotTours = [
  { id: 1, hotel: "Rixos Premium Belek", country: "Турция", resort: "Белек", stars: 5, nights: 7, date: "15 июня", meal: "Ultra All Inclusive", price: 118000, old: 142000, emoji: "🏖️", color: "#ff9f43" },
  { id: 2, hotel: "Sunrise Aqua Joy", country: "Египет", resort: "Хургада", stars: 5, nights: 10, date: "22 июня", meal: "All Inclusive", price: 86500, old: 104000, emoji: "🐠", color: "#ee5a24" },
  { id: 3, hotel: "Rotana Beach Resort", country: "ОАЭ", resort: "Рас-эль-Хайма", stars: 5, nights: 7, date: "3 июля", meal: "Завтраки", price: 97000, old: 118000, emoji: "🏙️", color: "#0abde3" },
  { id: 4, hotel: "Centara Grand Beach", country: "Таиланд", resort: "Пхукет", stars: 5, nights: 12, date: "10 июля", meal: "Завтраки", price: 142000, old: 169000, emoji: "🌴", color: "#10ac84" },
  { id: 5, hotel: "Gural Premier Tekirova", country: "Турция", resort: "Кемер", stars: 5, nights: 9, date: "18 июля", meal: "Ultra All Inclusive", price: 104000, old: 125000, emoji: "🏖️", color: "#ff9f43" },
  { id: 6, hotel: "Radisson Blu Resort", country: "Россия", resort: "Сочи", stars: 4, nights: 7, date: "1 августа", meal: "Завтраки", price: 61000, old: 72000, emoji: "⛰️", color: "#5f27cd" },
];

export const benefits = [
  { icon: "💸", title: "Лучшие цены", text: "Работаем напрямую с туроператорами — без лишних наценок." },
  { icon: "🛡️", title: "Безопасно", text: "Договор, страхование и гарантии по каждому туру." },
  { icon: "🎧", title: "Поддержка 24/7", text: "Остаёмся на связи до возвращения домой." },
  { icon: "⚡", title: "Подбор за 15 минут", text: "Подберём варианты под бюджет, даты и пожелания." },
];

export const reviews = [
  { name: "Анна и Дмитрий", trip: "Турция, Белек", text: "Подобрали отель за вечер, всё сошлось по цене и датам. Отдохнули прекрасно!" },
  { name: "Мария К.", trip: "Египет, Хургада", text: "Менеджер ответила на все вопросы, помогла с трансфером. Рекомендую." },
  { name: "Сергей П.", trip: "Таиланд, Пхукет", text: "Первый раз летели так далеко — всё организовали, ни одной проблемы." },
];

export const stats = [
  { value: "12 000+", label: "довольных туристов" },
  { value: "45", label: "стран и курортов" },
  { value: "15 мин", label: "на подбор вариантов" },
  { value: "24/7", label: "поддержка в поездке" },
];

export const steps = [
  { title: "Оставляете заявку", text: "Рассказываете, куда хотите, когда и на какой бюджет." },
  { title: "Получаете подборку", text: "Менеджер присылает лучшие варианты с честной ценой." },
  { title: "Оплачиваете удобно", text: "Договор, оплата онлайн или в офисе, документы на почту." },
  { title: "Улетаете в отпуск", text: "Мы на связи до самого возвращения домой." },
];

export const fmt = (n) => n.toLocaleString("ru-RU") + " ₽";
