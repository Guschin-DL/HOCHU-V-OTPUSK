import { useId } from "react";

// Иллюстрации-пейзажи на SVG: фирменный стиль вместо эмодзи и фото.
export default function Scene({ kind = "coast", c1 = "#ffb347", c2 = "#0b3b4a", className = "" }) {
  const id = useId().replace(/:/g, "");
  const sea = ["coast", "beach", "reef", "lagoon", "palm"].includes(kind);
  return (
    <svg className={`scene ${className}`} viewBox="0 0 400 240" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id={`g${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={c2} />
          <stop offset=".7" stopColor={c1} />
          <stop offset="1" stopColor="#fff3dc" />
        </linearGradient>
      </defs>
      <rect width="400" height="240" fill={`url(#g${id})`} />
      <circle cx="300" cy="78" r="30" fill="#fff6d6" opacity=".9" />
      <circle cx="300" cy="78" r="48" fill="#fff6d6" opacity=".18" />
      {(kind === "coast" || kind === "lake" || kind === "reef") && (
        <>
          <path d="M0 150 L70 84 L120 130 L190 60 L260 140 L320 100 L400 150 V240 H0Z" fill="#fff" opacity=".22" />
          <path d="M0 175 L60 120 L110 160 L170 105 L240 172 L310 125 L400 170 V240 H0Z" fill={c2} opacity=".55" />
        </>
      )}
      {kind === "city" && (
        <g fill={c2} opacity=".85">
          {[[30,110,26],[62,80,22],[90,130,30],[126,50,18],[150,100,28],[186,70,20],[214,120,26],[246,90,22],[274,140,30],[310,60,20],[336,110,26],[366,95,24]].map(([x,y,w],i)=>(
            <rect key={i} x={x} y={y+40} width={w} height={240-y-40} rx="2" />
          ))}
        </g>
      )}
      {sea && (
        <>
          <rect y="168" width="400" height="72" fill={c2} opacity=".78" />
          <path d="M0 182 q25 -10 50 0 t50 0 t50 0 t50 0 t50 0 t50 0 t50 0 t50 0" stroke="#fff" strokeWidth="2" fill="none" opacity=".5" />
          <path d="M0 202 q25 -10 50 0 t50 0 t50 0 t50 0 t50 0 t50 0 t50 0 t50 0" stroke="#fff" strokeWidth="2" fill="none" opacity=".3" />
          <path d="M0 224 q25 -10 50 0 t50 0 t50 0 t50 0 t50 0 t50 0 t50 0 t50 0" stroke="#fff" strokeWidth="2" fill="none" opacity=".2" />
        </>
      )}
      {kind === "lake" && (
        <>
          <ellipse cx="200" cy="205" rx="260" ry="46" fill="#7bdff2" opacity=".5" />
          <ellipse cx="200" cy="215" rx="190" ry="26" fill={c2} opacity=".6" />
        </>
      )}
      {(kind === "palm" || kind === "beach" || kind === "lagoon") && (
        <g stroke="#0d2b1d" strokeLinecap="round" fill="none" opacity=".9" transform="translate(250 0)">
          <path d="M92 210 Q98 160 86 118" strokeWidth="5" />
          <path d="M86 118 Q60 100 38 116 M86 118 Q70 90 48 88 M86 118 Q110 96 134 108 M86 118 Q104 86 128 80" strokeWidth="4" />
        </g>
      )}
      {kind === "city" && <rect y="200" width="400" height="40" fill={c2} opacity=".9" />}
    </svg>
  );
}
