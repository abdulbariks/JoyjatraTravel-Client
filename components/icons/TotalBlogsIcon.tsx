import React, { SVGProps } from "react";

export default function TotalBlogsIcon(props: SVGProps<SVGSVGElement>) {
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

      {/* Document Shape */}
      <rect
        x="9"
        y="7"
        width="12"
        height="16"
        rx="2"
        stroke="#E9201D"
        strokeWidth="1.8"
      />

      {/* Fold Corner */}
      <path
        d="M17 7V11H21"
        stroke="#E9201D"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />

      {/* Text Lines */}
      <path
        d="M11.5 14H18.5M11.5 17H18.5M11.5 20H16"
        stroke="#E9201D"
        strokeWidth="1.6"
        strokeLinecap="round"
      />

      {/* Highlight Dot (blog item) */}
      <circle cx="11.5" cy="11.5" r="1.2" fill="#E9201D" />
    </svg>
  );
}
