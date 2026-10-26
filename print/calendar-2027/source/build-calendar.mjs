import opentype from 'opentype.js';
import fs from 'fs';
import QRCode from 'qrcode';
import { cat2, paw, sparkle, plane } from './lib2.mjs';

const load = (pkg, subset, w) => { const b = fs.readFileSync(`node_modules/@fontsource/${pkg}/files/${pkg}-${subset}-${w}-normal.woff`); return opentype.parse(b.buffer.slice(b.byteOffset, b.byteOffset + b.byteLength)); };
const F = { 900: [load('nunito', 'cyrillic', 900), load('nunito', 'latin', 900)], 800: [load('nunito', 'cyrillic', 800), load('nunito', 'latin', 800)] };
const r3 = (n) => Math.round(n * 1000) / 1000;
const ser = (a, c) => c.type === 'M' ? a + `M${r3(c.x)} ${r3(c.y)}` : c.type === 'L' ? a + `L${r3(c.x)} ${r3(c.y)}` : c.type === 'Q' ? a + `Q${r3(c.x1)} ${r3(c.y1)} ${r3(c.x)} ${r3(c.y)}` : c.type === 'C' ? a + `C${r3(c.x1)} ${r3(c.y1)} ${r3(c.x2)} ${r3(c.y2)} ${r3(c.x)} ${r3(c.y)}` : c.type === 'Z' ? a + 'Z' : a;
// Текст в контуры: кириллица и латиница/цифры из двух подмножеств одного шрифта
function glyphFor(w, ch) { for (const f of F[w]) { const g = f.charToGlyph(ch); if (g.index !== 0) return { f, g }; } return { f: F[w][0], g: F[w][0].charToGlyph(ch) }; }
function run(w, str, size, x, y, tr = 0) {
  let cx = 0, d = '';
  for (const ch of str) {
    if (ch === ' ') { cx += size * 0.26 + tr; continue; }
    const { f, g } = glyphFor(w, ch);
    d += f.getPath(ch, x + cx, y, size).commands.reduce(ser, '');
    cx += g.advanceWidth * size / f.unitsPerEm + tr;
  }
  return { d, width: cx - tr };
}
const widthOf = (w, s, size, tr = 0) => run(w, s, size, 0, 0, tr).width;
const fit = (w, s, target, tr = 0) => target / widthOf(w, s, 100, tr) * 100;
const K = { ink: '#0b3b4a', coral: '#ff7a3d', coralInk: '#e0551f', teal: '#2bb3b5', cream: '#fbf5ea', white: '#ffffff', muted: '#7a8f96' };
const URL_ = 'https://xn--80aizdcydohn4c.xn--p1ai';
const SHOW_URL = 'хочунаотдых.рф', PHONE = '+7 (965) 2000-701';
const svgWrap = (body, title) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 94 54" width="94mm" height="54mm" role="img" aria-label="${title}"><title>${title}</title>${body}</svg>`;

// ---------- Оборот: календарь 2027 + QR ----------
function back() {
  const qr = QRCode.create(URL_, { errorCorrectionLevel: 'M' });
  const n = qr.modules.size, QS = 17.6, m = QS / n, QX = 8.2, QY = 20.4; let qd = '';
  for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) if (qr.modules.get(r, c)) qd += `M${r3(QX + c * m)} ${r3(QY + r * m)}h${r3(m)}v${r3(m)}h${r3(-m)}z`;
  const holidays = new Set(['1-1','1-2','1-3','1-4','1-5','1-6','1-7','1-8','2-23','3-8','5-1','5-9','6-12','11-4']);
  const MN = ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'];
  // сезонные «язычки» месяцев: зима, весна, лето, осень
  const SEAS = [['#2bb3b5', K.ink], ['#2bb3b5', K.ink], ['#ffb02e', K.ink], ['#ffb02e', K.ink], ['#ffb02e', K.ink], ['#ff7a3d', K.ink], ['#ff7a3d', K.ink], ['#ff7a3d', K.ink], [K.ink, '#fbf5ea'], [K.ink, '#fbf5ea'], [K.ink, '#fbf5ea'], ['#2bb3b5', K.ink]];
  const WD = ['П','В','С','Ч','П','С','В'];
  const mdays = (mo) => new Date(2027, mo + 1, 0).getDate();
  let out = '';
  const x0 = 32, y0 = 5, cw = 14.25, rh = 14.67, pitch = (cw - 0.5) / 7, pw = cw - 0.5;
  for (let mo = 0; mo < 12; mo++) {
    const X = x0 + (mo % 4) * cw, Y = y0 + Math.floor(mo / 4) * rh, [pill, pillText] = SEAS[mo];
    // выходные: мягкие колонки
    out += `<rect x="${r3(X + 0.15 + 5 * pitch)}" y="${Y + 3.15}" width="${r3(2 * pitch)}" height="10.75" rx="0.5" fill="#f4e6cd"/>`;
    out += `<rect x="${X + 0.15}" y="${Y + 0.1}" width="${pw}" height="2.55" rx="1.27" fill="${pill}"/>`;
    out += `<path d="${run(900, MN[mo], 1.62, X + 0.85, Y + 1.9).d}" fill="${pillText}"/>`;
    let hd = '';
    WD.forEach((w, i) => { const wd = run(800, w, 1.1, 0, 0); hd += run(800, w, 1.1, X + 0.15 + i * pitch + (pitch - wd.width) / 2, Y + 4.25).d; });
    out += `<path d="${hd}" fill="${K.muted}"/>`;
    const first = (new Date(2027, mo, 1).getDay() + 6) % 7;
    let dayD = '', offD = '', holD = '';
    for (let d = 1; d <= mdays(mo); d++) {
      const idx = first + d - 1, col = idx % 7, row = Math.floor(idx / 7);
      const wk = col >= 5, hol = holidays.has(`${mo + 1}-${d}`);
      const s2 = String(d), wd = run(800, s2, 1.3, 0, 0).width;
      const px = X + 0.15 + col * pitch + (pitch - wd) / 2, py = Y + 5.95 + row * 1.5;
      const p = run(800, s2, 1.3, px, py).d;
      if (wk || hol) offD += p; else dayD += p;
      if (hol && !wk) holD += `<circle cx="${r3(X + 0.15 + col * pitch + pitch / 2)}" cy="${r3(py + 0.42)}" r="0.2" fill="${K.coralInk}"/>`;
    }
    out += `<path d="${dayD}" fill="${K.ink}"/><path d="${offD}" fill="${K.coralInk}"/>${holD}`;
  }
  // левая колонка: 2027 + самолёт, коты над карточкой с QR
  const year = run(900, '2027', 5.7, 5, 10.1, 0);
  const t1 = run(800, 'Наведи камеру', 1.75, 0, 0), t2 = run(800, 'и выбери отдых', 1.75, 0, 0), u = run(900, SHOW_URL, 1.95, 0, 0);
  const cx = 17;
  const t1p = run(800, 'Наведи камеру', 1.75, cx - t1.width / 2, 41.5).d, t2p = run(800, 'и выбери отдых', 1.75, cx - t2.width / 2, 44.0).d, up = run(900, SHOW_URL, 1.95, cx - u.width / 2, 47.5).d;
  const PT = [26.3, 5.1], EDGE = 16.9;
  const cats = [
    cat2({ x: 10.2, y: EDGE - 0.6, r: 2.55, fur: '#ffb02e', stripe: '#d98a00', mouth: 'smile', glassesUp: 'rgba(11,59,74,.9)', target: PT }),
    cat2({ x: 24.6, y: EDGE - 0.7, r: 2.9, fur: '#fff3e0', mouth: 'o', target: PT }),
    cat2({ x: 17.2, y: EDGE - 1.05, r: 3.5, fur: '#ff7a3d', stripe: '#c95420', mouth: 'o', target: PT }),
  ].join('');
  const paws = paw(8.4, EDGE + 0.05, 1.25, '#ffb02e') + paw(12.2, EDGE + 0.05, 1.25, '#ffb02e') + paw(14.5, EDGE + 0.1, 1.55, '#ff7a3d') + paw(19.9, EDGE + 0.1, 1.55, '#ff7a3d') + paw(22.6, EDGE + 0.05, 1.3, '#fff3e0') + paw(26.6, EDGE + 0.05, 1.3, '#fff3e0');
  const flight = `<path d="M${r3(5 + year.width + 1.3)} 7.6Q22 6.2 25 5.7" fill="none" stroke="${K.teal}" stroke-width="0.28" stroke-dasharray="0.05 0.75" stroke-linecap="round"/>${plane(K.ink, 0.062, -16, 26.9, 5.1)}${sparkle(30.2, 4.3, 0.15, K.coral)}${sparkle(22.4, 3.3, 0.1, K.teal)}`;
  return svgWrap(`<rect width="94" height="54" fill="${K.cream}"/>
    <path d="${year.d}" fill="${K.coral}"/>${flight}${cats}
    <rect x="5" y="${EDGE}" width="24" height="${49 - EDGE}" rx="2.4" fill="${K.white}"/>${paws}
    <path d="${qd}" fill="${K.ink}"/>
    <path d="${t1p}${t2p}" fill="${K.ink}"/><path d="${up}" fill="${K.teal}"/>
    ${out}`, 'Календарик 2027, оборот: календарь и QR-код на сайт');
}

// ---------- Лицо: вектор по вашему макету ----------
function front() {
  const raw = fs.readFileSync('/home/user/HOCHU-V-OTPUSK/public/logo/v3-emblem.svg', 'utf8');
  const inner = raw.slice(raw.indexOf('>', raw.indexOf('<svg')) + 1, raw.lastIndexOf('</svg>')).replace(/<title>.*?<\/title>/, '');
  const emblem = `<g transform="translate(4.5 7.5) scale(${39 / 400})">${inner}</g>`;
  const tx = 47.5, W = 41.5;
  // «Пусть папа и мама» / «знают»
  const hs = fit(800, 'Пусть папа и мама', W);
  const segs = [['Пусть ', K.ink], ['папа', K.coral], [' и ', K.ink], ['мама', K.coral]];
  let off = 0, hd = {};
  segs.forEach(([s, col]) => { const w = widthOf(800, s.replace(/ /g, ' '), hs); hd[col] = (hd[col] || '') + run(800, s, hs, tx + off, 9.4).d; off += widthOf(800, s, hs) + (s.endsWith(' ') ? 0 : 0); });
  // пробелы внутри сегментов учитывает run(); смещение считаем тем же способом
  let off2 = 0; hd = {};
  segs.forEach(([s, col]) => { const r = run(800, s, hs, tx + off2, 9.4); hd[col] = (hd[col] || '') + r.d; off2 += r.width; });
  const know = run(800, 'знают', hs, tx, 9.4 + hs * 1.18);
  const s1 = fit(900, 'Хочу', 29), a = run(900, 'Хочу', s1, tx - 0.4, 28.6, -0.3);
  const s2 = fit(900, 'на отдых', 36), b = run(900, 'на отдых', s2, tx, 28.6 + s2 * 0.88, -0.2);
  const tg = run(800, 'ТУРЫ ДЛЯ ВСЕЙ СЕМЬИ', 1.55, tx + 0.2, 38.4, 0.55);
  const ph = run(900, PHONE, 3.15, tx, 44.2), ur = run(900, SHOW_URL, 3.1, tx, 48.4);
  const glow = `<circle cx="24" cy="27" r="26.5" fill="#ffe9bd" opacity=".75"/><circle cx="24" cy="27" r="23.2" fill="#fff3d6" opacity=".9"/>`;
  const sp = sparkle(43.2, 6.6, 0.2, K.coral) + sparkle(3.6, 47, 0.16, K.teal) + sparkle(91.2, 6.2, 0.14, K.teal) + sparkle(44.6, 49.5, 0.12, K.coral);
  return svgWrap(`<rect width="94" height="54" fill="${K.cream}"/>${glow}${emblem}${sp}
    <path d="${hd[K.ink]}" fill="${K.ink}"/><path d="${hd[K.coral]}" fill="${K.coral}"/><path d="${know.d}" fill="${K.ink}"/>
    <path d="${a.d}" fill="${K.coral}"/><path d="${b.d}" fill="${K.ink}"/><path d="${tg.d}" fill="${K.teal}"/>
    <path d="${ph.d}" fill="${K.coral}"/><path d="${ur.d}" fill="${K.teal}"/>`, 'Календарик 2027, лицо: Хочу на отдых');
}
const OUT = process.argv[2];
fs.mkdirSync(OUT, { recursive: true });
fs.writeFileSync(`${OUT}/calendar-2027-front.svg`, front());
fs.writeFileSync(`${OUT}/calendar-2027-back.svg`, back());
console.log('ok');
