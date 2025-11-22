import React from 'react'

export const MetroBoysLogo = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Train Body */}
    <path
      d="M5 5C5 3.5 6.5 2.5 8 2.5H16C17.5 2.5 19 3.5 19 5V16C19 18 17.5 19 16 19H8C6.5 19 5 18 5 16V5Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Windshield Area */}
    <rect x="7" y="5" width="10" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" fill="none" />
    
    {/* The Boys (Heads in window) */}
    <circle cx="9.5" cy="8.5" r="1.2" fill="currentColor" />
    <circle cx="12" cy="7.5" r="1.2" fill="currentColor" />
    <circle cx="14.5" cy="8.5" r="1.2" fill="currentColor" />

    {/* Lights */}
    <circle cx="7" cy="16" r="1" fill="currentColor" className="text-yellow-500" />
    <circle cx="17" cy="16" r="1" fill="currentColor" className="text-yellow-500" />
    
    {/* Tracks/Wheels */}
    <path d="M3 21.5H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M7 19V21.5" stroke="currentColor" strokeWidth="1.5" />
    <path d="M17 19V21.5" stroke="currentColor" strokeWidth="1.5" />
  </svg>
)
