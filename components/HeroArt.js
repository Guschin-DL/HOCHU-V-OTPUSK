// Закатный пейзаж для первого экрана: слои гор, солнце с бликом на воде, анимированные волны.
export default function HeroArt() {
  const wave = (y, o, d) => (
    <g className="wv" style={{ animationDuration: `${d}s` }} opacity={o}>
      <path d={`M-200 ${y} q90 -26 180 0 t180 0 t180 0 t180 0 t180 0 t180 0 t180 0 t180 0 t180 0 t180 0 V900 H-200Z`} fill="#08303d" />
    </g>
  );
  return (
    <svg className="hero-art" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0b3b4a" />
          <stop offset=".4" stopColor="#1f8f95" />
          <stop offset=".62" stopColor="#8fd3d0" />
          <stop offset=".8" stopColor="#ffe6b8" />
          <stop offset="1" stopColor="#ffe6b8" />
        </linearGradient>
        <radialGradient id="glow" cx=".5" cy=".5" r=".5">
          <stop offset="0" stopColor="#fff3d6" stopOpacity="1" />
          <stop offset=".35" stopColor="#ffb02e" stopOpacity=".5" />
          <stop offset="1" stopColor="#ff7a3d" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="sea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2bb3b5" />
          <stop offset="1" stopColor="#0b3b4a" />
        </linearGradient>
      </defs>
      <rect width="1440" height="900" fill="url(#sky)" />
      <circle cx="1110" cy="650" r="340" fill="url(#glow)" />
      <circle cx="1110" cy="650" r="92" fill="#ff7a3d" />
      <path d="M0 610 L120 520 L230 585 L380 470 L520 590 L640 540 L760 610 L900 560 L1040 620 L1200 540 L1330 600 L1440 560 V700 H0Z" fill="#0b3b4a" opacity=".28" />
      <path d="M0 650 L90 590 L200 640 L330 540 L470 650 L560 610 L700 670 L820 640 V720 H0Z" fill="#0b3b4a" opacity=".55" />
      <path d="M1000 690 L1130 610 L1220 660 L1330 590 L1440 640 V720 H1000Z" fill="#0b3b4a" opacity=".8" />
      <rect y="640" width="1440" height="260" fill="url(#sea)" />
      <g stroke="#ffe6b8" strokeLinecap="round" opacity=".75">
        {[[1110,664,170],[1110,686,126],[1110,710,92],[1110,736,64],[1110,764,40]].map(([x,y,w],i)=><line key={i} x1={x-w/2} x2={x+w/2} y1={y} y2={y} strokeWidth={4-i*.5} />)}
      </g>
      {wave(740, .5, 14)}
      {wave(800, .75, 10)}
      {wave(860, 1, 7)}
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
