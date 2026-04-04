import React, { SVGProps } from "react";

export default function TotalEventsIcon(props: SVGProps<SVGSVGElement>) {
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

      {/* Calendar Body */}
      <rect
        x="7"
        y="9"
        width="16"
        height="12"
        rx="2"
        stroke="#E9201D"
        strokeWidth="1.8"
      />

      {/* Calendar Top Line */}
      <path
        d="M7 12H23"
        stroke="#E9201D"
        strokeWidth="1.8"
        strokeLinecap="round"
      />

      {/* Calendar Rings */}
      <path
        d="M10 7V10M20 7V10"
        stroke="#E9201D"
        strokeWidth="1.8"
        strokeLinecap="round"
      />

      {/* Event Dot */}
      <circle cx="15" cy="16" r="1.8" fill="#E9201D" />

      {/* Small Indicators (events) */}
      <circle cx="11" cy="16" r="1" fill="#E9201D" opacity="0.6" />
      <circle cx="19" cy="16" r="1" fill="#E9201D" opacity="0.6" />
    </svg>
  );
}
