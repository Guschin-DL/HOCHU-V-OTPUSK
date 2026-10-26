import opentype from 'opentype.js';
import fs from 'fs';
export const font = (pkg, w) => { const b = fs.readFileSync(`node_modules/@fontsource/${pkg}/files/${pkg}-cyrillic-${w}-normal.woff`); return opentype.parse(b.buffer.slice(b.byteOffset, b.byteOffset + b.byteLength)); };
const r2 = (n) => Math.round(n * 100) / 100;
function ser(acc, c) {
  switch (c.type) {
    case 'M': return acc + `M${r2(c.x)} ${r2(c.y)}`;
    case 'L': return acc + `L${r2(c.x)} ${r2(c.y)}`;
    case 'Q': return acc + `Q${r2(c.x1)} ${r2(c.y1)} ${r2(c.x)} ${r2(c.y)}`;
    case 'C': return acc + `C${r2(c.x1)} ${r2(c.y1)} ${r2(c.x2)} ${r2(c.y2)} ${r2(c.x)} ${r2(c.y)}`;
    case 'Z': return acc + 'Z';
    default: return acc;
  }
}
// Текст в контуры. align: 'l' | 'c' (по ширине w) ; возвращает {d, width}
export function text(f, str, size, x, y, tracking = 0) {
  let cx = 0, d = ''; const sp = size * 0.26;
  for (const ch of str) {
    if (ch === ' ') { cx += sp + tracking; continue; }
    const g = f.charToGlyph(ch);
    d += f.getPath(ch, x + cx, y, size).commands.reduce(ser, '');
    cx += g.advanceWidth * size / f.unitsPerEm + tracking;
  }
  return { d, width: cx - tracking };
}
export const width = (f, str, size, tr = 0) => text(f, str, size, 0, 0, tr).width;
export const svg = (w, h, body, title) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img" aria-label="${title}"><title>${title}</title>${body}</svg>`;
export const save = (name, s) => fs.writeFileSync(`/home/user/HOCHU-V-OTPUSK/public/logo/${name}.svg`, s);

// ---- общие фигуры ----
// Самолёт сверху, нос вправо, размер ~100×40, центр в (0,0)
export const plane = (fill, s = 1, rot = 0, x = 0, y = 0) =>
  `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s}) translate(-50 -20)" fill="${fill}">
    <path d="M4 20Q4 14 22 13.5L80 13Q99 14 99 20Q99 26 80 27L22 26.5Q4 26 4 20Z"/>
    <path d="M58 15L38 -1 29 -1 45 15ZM58 25L38 41 29 41 45 25Z"/>
    <path d="M17 16L8 7 3 7 9 16ZM17 24L8 33 3 33 9 24Z"/></g>`;
// Лист пальмы: от (0,0) вдоль +x, провисает вниз
const leaf = (L, W, rot, fill) => `<path transform="rotate(${rot})" d="M0 0C${L * .25} ${-W} ${L * .7} ${-W * .9} ${L} ${L * .22}C${L * .7} ${-W * .1} ${L * .35} ${-W * .15} 0 0Z" fill="${fill}"/>`;
export const palm = (x, y, h, lean, fill, s = 1) => {
  const tx = x + lean, ty = y - h;
  const fr = [[-170, 1], [-140, 1.1], [-105, 1], [-75, 1], [-40, 1.1], [-10, 1]].map(([a, k]) => leaf(70 * s * k, 22 * s, a, fill)).join('');
  return `<path d="M${x} ${y}Q${x + lean * 0.2} ${y - h * 0.55} ${tx} ${ty}" fill="none" stroke="${fill}" stroke-width="${7 * s}" stroke-linecap="round"/>
    <g transform="translate(${tx} ${ty})">${fr}<circle r="${4 * s}" fill="${fill}"/></g>`;
};
// Кот: голова с ушами, смотрит вверх-вправо. r — радиус головы
export const cat = ({ x, y, r, fur, stripe, cheek = '#ff7a59', inner = '#ffb4a2', ink = '#0b3b4a', look = [0.35, -0.55], glasses = null }) => {
  const e = (sx) => `<path d="M${sx * 0.88 * r} ${-0.2 * r}L${sx * 0.8 * r} ${-1.2 * r}L${sx * 0.18 * r} ${-0.85 * r}Z" fill="${fur}" stroke="${fur}" stroke-width="${r * 0.12}" stroke-linejoin="round"/>
    <path d="M${sx * 0.7 * r} ${-0.42 * r}L${sx * 0.67 * r} ${-0.98 * r}L${sx * 0.32 * r} ${-0.78 * r}Z" fill="${inner}" stroke="${inner}" stroke-width="${r * 0.05}" stroke-linejoin="round"/>`;
  const eye = (sx) => glasses
    ? ''
    : `<circle cx="${sx * 0.38 * r}" cy="${-0.04 * r}" r="${0.25 * r}" fill="#fff"/><circle cx="${sx * 0.38 * r + look[0] * 0.13 * r}" cy="${-0.04 * r + look[1] * 0.13 * r}" r="${0.125 * r}" fill="${ink}"/><circle cx="${sx * 0.38 * r + look[0] * 0.13 * r + 0.04 * r}" cy="${-0.04 * r + look[1] * 0.13 * r - 0.045 * r}" r="${0.04 * r}" fill="#fff"/>`;
  const gl = glasses ? `<g fill="${glasses}" stroke="${ink}" stroke-width="${r * 0.05}"><rect x="${-0.74 * r}" y="${-0.22 * r}" width="${0.62 * r}" height="${0.42 * r}" rx="${0.14 * r}"/><rect x="${0.12 * r}" y="${-0.22 * r}" width="${0.62 * r}" height="${0.42 * r}" rx="${0.14 * r}"/><path d="M${-0.12 * r} ${-0.08 * r}Q0 ${-0.16 * r} ${0.12 * r} ${-0.08 * r}" fill="none"/></g>` : '';
  const str = stripe ? `<g stroke="${stripe}" stroke-width="${r * 0.07}" stroke-linecap="round"><path d="M0 ${-0.88 * r}V${-0.6 * r}M${-0.2 * r} ${-0.85 * r}L${-0.15 * r} ${-0.62 * r}M${0.2 * r} ${-0.85 * r}L${0.15 * r} ${-0.62 * r}"/></g>` : '';
  return `<g transform="translate(${x} ${y})">${e(-1)}${e(1)}<ellipse rx="${r}" ry="${0.9 * r}" fill="${fur}"/>${str}
    <ellipse cx="${-0.62 * r}" cy="${0.3 * r}" rx="${0.17 * r}" ry="${0.11 * r}" fill="${cheek}" opacity=".45"/><ellipse cx="${0.62 * r}" cy="${0.3 * r}" rx="${0.17 * r}" ry="${0.11 * r}" fill="${cheek}" opacity=".45"/>
    ${eye(-1)}${eye(1)}${gl}
    <path d="M${-0.07 * r} ${0.2 * r}L${0.07 * r} ${0.2 * r}L0 ${0.29 * r}Z" fill="${cheek}"/>
    <path d="M${-0.1 * r} ${0.38 * r}Q${-0.05 * r} ${0.32 * r} 0 ${0.36 * r}Q${0.05 * r} ${0.32 * r} ${0.1 * r} ${0.38 * r}" fill="none" stroke="${ink}" stroke-width="${r * 0.035}" stroke-linecap="round"/>
    <g stroke="${ink}" stroke-width="${r * 0.025}" stroke-linecap="round" opacity=".7"><path d="M${-0.7 * r} ${0.22 * r}L${-1.18 * r} ${0.14 * r}M${-0.7 * r} ${0.32 * r}L${-1.16 * r} ${0.38 * r}M${0.7 * r} ${0.22 * r}L${1.18 * r} ${0.14 * r}M${0.7 * r} ${0.32 * r}L${1.16 * r} ${0.38 * r}"/></g></g>`;
};

// Кот v2: смотрит на точку (tx,ty), варианты рта, очки на лбу, брови
export const cat2 = ({ x, y, r, fur, stripe, target, mouth = 'w', glassesUp = null, ink = '#0b3b4a', cheek = '#ff7a59', inner = '#ffb4a2' }) => {
  const dx = target[0] - x, dy = target[1] - y, L = Math.hypot(dx, dy) || 1, ox = (dx / L) * 0.12 * r, oy = (dy / L) * 0.12 * r;
  const ear = (sx) => `<path d="M${sx * 0.9 * r} ${-0.15 * r}L${sx * 0.82 * r} ${-1.22 * r}L${sx * 0.16 * r} ${-0.86 * r}Z" fill="${fur}" stroke="${fur}" stroke-width="${r * 0.14}" stroke-linejoin="round"/>
    <path d="M${sx * 0.7 * r} ${-0.4 * r}L${sx * 0.67 * r} ${-1.0 * r}L${sx * 0.32 * r} ${-0.8 * r}Z" fill="${inner}" stroke="${inner}" stroke-width="${r * 0.05}" stroke-linejoin="round"/>`;
  const eye = (sx) => { const cx = sx * 0.38 * r, cy = -0.02 * r;
    return `<ellipse cx="${cx}" cy="${cy}" rx="${0.27 * r}" ry="${0.3 * r}" fill="#fff" stroke="${ink}" stroke-width="${r * 0.03}"/><circle cx="${cx + ox}" cy="${cy + oy}" r="${0.15 * r}" fill="${ink}"/><circle cx="${cx + ox + 0.05 * r}" cy="${cy + oy - 0.06 * r}" r="${0.05 * r}" fill="#fff"/><circle cx="${cx + ox - 0.04 * r}" cy="${cy + oy + 0.05 * r}" r="${0.025 * r}" fill="#fff"/>
    <path d="M${cx - 0.2 * r} ${cy - 0.42 * r}Q${cx} ${cy - 0.52 * r} ${cx + 0.2 * r} ${cy - 0.4 * r}" fill="none" stroke="${ink}" stroke-width="${r * 0.04}" stroke-linecap="round" opacity=".55"/>`; };
  const str = stripe ? `<g stroke="${stripe}" stroke-width="${r * 0.075}" stroke-linecap="round"><path d="M0 ${-0.9 * r}V${-0.64 * r}M${-0.22 * r} ${-0.86 * r}L${-0.17 * r} ${-0.64 * r}M${0.22 * r} ${-0.86 * r}L${0.17 * r} ${-0.64 * r}"/></g>` : '';
  const m = mouth === 'o' ? `<ellipse cx="0" cy="${0.4 * r}" rx="${0.07 * r}" ry="${0.09 * r}" fill="${ink}"/>`
    : mouth === 'smile' ? `<path d="M${-0.14 * r} ${0.34 * r}Q0 ${0.5 * r} ${0.14 * r} ${0.34 * r}" fill="none" stroke="${ink}" stroke-width="${r * 0.04}" stroke-linecap="round"/>`
    : `<path d="M${-0.1 * r} ${0.38 * r}Q${-0.05 * r} ${0.32 * r} 0 ${0.36 * r}Q${0.05 * r} ${0.32 * r} ${0.1 * r} ${0.38 * r}" fill="none" stroke="${ink}" stroke-width="${r * 0.035}" stroke-linecap="round"/>`;
  const gl = glassesUp ? `<g fill="${glassesUp}" stroke="${ink}" stroke-width="${r * 0.04}"><rect x="${-0.66 * r}" y="${-0.86 * r}" width="${0.58 * r}" height="${0.34 * r}" rx="${0.12 * r}"/><rect x="${0.08 * r}" y="${-0.86 * r}" width="${0.58 * r}" height="${0.34 * r}" rx="${0.12 * r}"/><path d="M${-0.08 * r} ${-0.74 * r}H${0.08 * r}" fill="none"/></g>` : '';
  return `<g transform="translate(${x} ${y})">${ear(-1)}${ear(1)}<ellipse rx="${r}" ry="${0.92 * r}" fill="${fur}"/>${str}${gl}
    <ellipse cx="${-0.66 * r}" cy="${0.3 * r}" rx="${0.18 * r}" ry="${0.115 * r}" fill="${cheek}" opacity=".5"/><ellipse cx="${0.66 * r}" cy="${0.3 * r}" rx="${0.18 * r}" ry="${0.115 * r}" fill="${cheek}" opacity=".5"/>
    ${eye(-1)}${eye(1)}<path d="M${-0.07 * r} ${0.17 * r}L${0.07 * r} ${0.17 * r}L0 ${0.27 * r}Z" fill="${cheek}"/>${m}
    <g stroke="${ink}" stroke-width="${r * 0.025}" stroke-linecap="round" opacity=".6"><path d="M${-0.74 * r} ${0.22 * r}L${-1.22 * r} ${0.12 * r}M${-0.74 * r} ${0.32 * r}L${-1.2 * r} ${0.38 * r}M${0.74 * r} ${0.22 * r}L${1.22 * r} ${0.12 * r}M${0.74 * r} ${0.32 * r}L${1.2 * r} ${0.38 * r}"/></g></g>`;
};
export const paw = (x, y, w, fur, ink = '#0b3b4a') => `<g transform="translate(${x} ${y})"><ellipse rx="${w}" ry="${w * 0.62}" fill="${fur}"/><path d="M${-w * 0.3} ${w * 0.05}V${w * 0.4}M${w * 0.3} ${w * 0.05}V${w * 0.4}" stroke="${ink}" stroke-width="${w * 0.07}" stroke-linecap="round" opacity=".35"/></g>`;
export const sparkle = (x, y, s, fill) => `<path transform="translate(${x} ${y}) scale(${s})" d="M0-10Q1.5-1.5 10 0Q1.5 1.5 0 10Q-1.5 1.5-10 0Q-1.5-1.5 0-10Z" fill="${fill}"/>`;
