export const Logo = (props: React.SVGProps<SVGSVGElement>) => (
    <svg width="150" height="36" viewBox="0 0 150 36" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style={{stopColor: 'hsl(var(--primary))', stopOpacity: 1}} />
          <stop offset="100%" style={{stopColor: 'hsl(260, 100%, 60%)', stopOpacity: 1}} />
        </linearGradient>
      </defs>
      <text x="0" y="27" fontFamily="'Poppins', sans-serif" fontSize="24" fontWeight="bold" fill="hsl(var(--foreground))">
        Naman
        <tspan fill="url(#logoGradient)"> Mahi</tspan>
      </text>
    </svg>
  );
  