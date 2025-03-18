import type { SVGProps } from "react";

type SVGPropsType = SVGProps<SVGSVGElement>;

export function Views(props: SVGPropsType) {
  return (
    <svg width={58} height={58} viewBox="0 0 58 58" fill="none" {...props}>
      {/* Cercle de fond */}
      <circle cx={29} cy={29} r={29} fill="#3FD97F" />

      {/* Écran du laptop */}
      <rect x="16" y="18" width="26" height="16" rx="2" fill="white" stroke="white" strokeWidth="2" />

      {/* Clavier/base du laptop */}
      <rect x="14" y="36" width="30" height="4" rx="1" fill="white" />

      {/* Charnière */}
      <line x1="14" y1="36" x2="44" y2="36" stroke="white" strokeWidth="2" />

      {/* Petite caméra au-dessus de l’écran */}
      <circle cx="29" cy="20" r="1" fill="#3FD97F" />
    </svg>
  );
}

export function Profit(props: SVGPropsType) {
  return (
    <svg width={58} height={58} viewBox="0 0 58 58" fill="none" {...props}>
      <circle cx={29} cy={29} r={29} fill="#FF9C55" />
      {/* Ampoule */}
      <path
        d="M29 18c-4.418 0-8 3.582-8 8 0 2.761 1.215 5.19 3.135 6.81a3.89 3.89 0 011.365 2.928V37a1 1 0 001 1h6a1 1 0 001-1v-1.262c0-1.13.498-2.207 1.365-2.928C35.785 31.19 37 28.761 37 26c0-4.418-3.582-8-8-8zm-2 22h4v2h-4v-2z"
        fill="#fff"
      />
      {/* Rayons lumineux */}
      <line x1="29" y1="10" x2="29" y2="14" stroke="white" strokeWidth="2" strokeLinecap="round" />
      <line x1="29" y1="44" x2="29" y2="48" stroke="white" strokeWidth="2" strokeLinecap="round" />
      <line x1="18" y1="15" x2="21" y2="18" stroke="white" strokeWidth="2" strokeLinecap="round" />
      <line x1="40" y1="15" x2="37" y2="18" stroke="white" strokeWidth="2" strokeLinecap="round" />
      <line x1="14" y1="29" x2="18" y2="29" stroke="white" strokeWidth="2" strokeLinecap="round" />
      <line x1="44" y1="29" x2="40" y2="29" stroke="white" strokeWidth="2" strokeLinecap="round" />
    </svg>);
}

export function Product(props: SVGPropsType) {
  return (
    <svg width={58} height={58} viewBox="0 0 58 58" fill="none" {...props}>
      <circle cx={29} cy={29} r={29} fill="#8155FF" />
      <path
        d="M29 18c-4.418 0-8 3.582-8 8 0 2.761 1.215 5.19 3.135 6.81a3.89 3.89 0 011.365 2.928V37a1 1 0 001 1h6a1 1 0 001-1v-1.262c0-1.13.498-2.207 1.365-2.928C35.785 31.19 37 28.761 37 26c0-4.418-3.582-8-8-8zm-2 22h4v2h-4v-2z"
        fill="#fff"
      />
      <line x1="29" y1="44" x2="29" y2="48" stroke="white" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function Users(props: SVGPropsType) {
  return (
    <svg width={58} height={58} viewBox="0 0 58 58" fill="none" {...props}>
      <circle cx={29} cy={29} r={29} fill="#18BFFF" />
      <ellipse
        cx={25.7511}
        cy={22.4998}
        rx={4.33333}
        ry={4.33333}
        fill="#fff"
      />
      <ellipse
        cx={25.7511}
        cy={34.4178}
        rx={7.58333}
        ry={4.33333}
        fill="#fff"
      />
      <path
        d="M38.75 34.417c0 1.795-2.206 3.25-4.898 3.25.793-.867 1.339-1.955 1.339-3.248 0-1.295-.547-2.384-1.342-3.252 2.693 0 4.9 1.455 4.9 3.25zM35.5 22.501a3.25 3.25 0 01-4.364 3.054 6.163 6.163 0 00.805-3.055c0-1.11-.293-2.152-.804-3.053A3.25 3.25 0 0135.5 22.5z"
        fill="#fff"
      />
    </svg>
  );
}
