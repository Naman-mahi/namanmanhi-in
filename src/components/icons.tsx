export const Logo = (props: React.SVGProps<SVGSVGElement>) => (
    <svg width="180" height="36" viewBox="0 0 180 36" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <defs>
        <linearGradient id="logoIconGradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" style={{stopColor: 'hsl(var(--primary))', stopOpacity: 1}} />
            <stop offset="100%" style={{stopColor: 'hsl(210 90% 55%)', stopOpacity: 1}} />
        </linearGradient>
        <linearGradient id="logoTextGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style={{stopColor: 'hsl(var(--primary))', stopOpacity: 1}} />
          <stop offset="100%" style={{stopColor: 'hsl(210 90% 55%)', stopOpacity: 1}} />
        </linearGradient>
      </defs>
      <path d="M6 29L6 7L15 22L24 7L24 29" stroke="url(#logoIconGradient)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      <text x="34" y="27" fontFamily="'Poppins', sans-serif" fontSize="24" fontWeight="bold" fill="hsl(var(--foreground))">
        NamanMahi
        <tspan fill="url(#logoTextGradient)">.in</tspan>
      </text>
    </svg>
  );