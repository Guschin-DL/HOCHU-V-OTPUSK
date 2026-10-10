// Закатный пейзаж для первого экрана: слои гор, солнце с бликом на воде, анимированные волны.
export default function HeroArt() {
  const wave = (y, o, d) => (
    <g className="wv" style={{ animationDuration: `${d}s` }} opacity={o}>
      <path d={`M-200 ${y} q90 -26 180 0 t180 0 t180 0 t180 0 t180 0 t180 0 t180 0 t180 0 t180 0 t180 0 V900 H-200Z`} fill="#17808a" />
    </g>
  );
  return (
    <svg className="hero-art" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#bfe8e6" />
          <stop offset=".45" stopColor="#d9f1ee" />
          <stop offset=".7" stopColor="#fbf5ea" />
          <stop offset=".85" stopColor="#ffe6b8" />
          <stop offset="1" stopColor="#ffe6b8" />
        </linearGradient>
        <radialGradient id="glow" cx=".5" cy=".5" r=".5">
          <stop offset="0" stopColor="#fff3d6" stopOpacity="1" />
          <stop offset=".35" stopColor="#ffb02e" stopOpacity=".5" />
          <stop offset="1" stopColor="#ff7a3d" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="sea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2bb3b5" />
          <stop offset="1" stopColor="#17808a" />
        </linearGradient>
      </defs>
      <rect width="1440" height="900" fill="url(#sky)" />
      <circle cx="1110" cy="636" r="340" fill="url(#glow)" />
      <circle cx="1110" cy="636" r="150" fill="#ff7a3d" />
      <path d="M0 610 L120 520 L230 585 L380 470 L520 590 L640 540 L760 610 L900 560 L1040 620 L1200 540 L1330 600 L1440 560 V700 H0Z" fill="#2bb3b5" opacity=".3" />
      <path d="M0 650 L90 590 L200 640 L330 540 L470 650 L560 610 L700 670 L820 640 V720 H0Z" fill="#2bb3b5" opacity=".55" />
      <path d="M1000 690 L1130 610 L1220 660 L1330 590 L1440 640 V720 H1000Z" fill="#17808a" opacity=".85" />
      <rect y="640" width="1440" height="260" fill="url(#sea)" />
      <g stroke="#ffe6b8" strokeLinecap="round" opacity=".75">
        {[[1110,782,230],[1110,804,170],[1110,828,120],[1110,854,80],[1110,882,48]].map(([x,y,w],i)=><line key={i} x1={x-w/2} x2={x+w/2} y1={y} y2={y} strokeWidth={4-i*.5} />)}
      </g>
      {wave(740, .5, 14)}
      {wave(800, .75, 10)}
      {wave(860, 1, 7)}
      <g className="hero-emblem">
        <image href="/logo/v3-emblem.svg" x="992" y="518" width="236" height="236" style={{ filter: "drop-shadow(0 14px 22px rgba(11,59,74,.35))" }} />
      </g>
      <g stroke="#0b3b4a" strokeLinecap="round" fill="none">
        <path d="M150 900 Q170 760 140 640" strokeWidth="9" />
        <path d="M140 640 Q80 600 20 640 M140 640 Q100 570 40 560 M140 640 Q190 580 250 590 M140 640 Q180 560 250 520 M140 640 Q150 570 160 520" strokeWidth="7" />
      </g>
      <g stroke="#fff" strokeWidth="2" fill="none" opacity=".8" strokeLinecap="round">
        <path d="M520 220 q10 -10 20 0 q10 -10 20 0" /><path d="M580 260 q8 -8 16 0 q8 -8 16 0" />
      </g>
    </svg>
  );
}
