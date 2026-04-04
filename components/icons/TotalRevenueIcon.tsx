import React, { SVGProps } from "react";

export default function TotalRevenueIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
      {...props}
    >
      {/* Background Circle */}
      <circle cx="15" cy="15" r="14" fill="#FEE2E2" />

      {/* Dollar Symbol */}
      <path
        d="M15 8V22M12.5 10.5C12.5 9.67 13.17 9 14 9H16C16.83 9 17.5 9.67 17.5 10.5C17.5 11.33 16.83 12 16 12H14C13.17 12 12.5 12.67 12.5 13.5C12.5 14.33 13.17 15 14 15H16C16.83 15 17.5 15.67 17.5 16.5C17.5 17.33 16.83 18 16 18H14C13.17 18 12.5 17.33 12.5 16.5"
        stroke="#E9201D"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Upward Trend Line */}
      <path
        d="M9 18L13 14L16 17L21 12"
        stroke="#E9201D"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Arrow Head */}
      <path
        d="M19.5 12H21V13.5"
        stroke="#E9201D"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
