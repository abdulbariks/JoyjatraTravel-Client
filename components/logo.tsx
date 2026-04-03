export const Logo = () => (
  <svg
    fill="none"
    height="32"
    width="124"
    viewBox="0 0 124 32"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="g1" x1="0" y1="0" x2="0" y2="32">
        <stop offset="0%" stopColor="#ff6a00" />
        <stop offset="100%" stopColor="#ffd500" />
      </linearGradient>
    </defs>

    <circle
      cx="16"
      cy="16"
      r="14"
      fill="url(#g1)"
      stroke="black"
      strokeWidth="2"
    />

    <path d="M6 20 Q12 16 18 20 T26 20 L26 28 L6 28 Z" fill="black" />

    <text x="36" y="18" fontSize="20" fontWeight="bold" fill="currentColor">
      Joyjatra
    </text>

    <text x="36" y="32" fontSize="12" fill="currentColor">
      Travel
    </text>
  </svg>
);
