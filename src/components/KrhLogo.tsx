import React from 'react';

interface KrhLogoProps {
  className?: string;
  variant?: 'full' | 'icon' | 'compact' | 'minimal';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  tone?: 'warm-dark' | 'cream' | 'gold';
}

export const KrhLogo: React.FC<KrhLogoProps> = ({
  className = '',
  variant = 'full',
  size = 'md',
  tone = 'warm-dark',
}) => {
  // Dimensions based on size
  const iconSize = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  }[size];

  const textSize = {
    sm: 'text-base',
    md: 'text-lg sm:text-xl',
    lg: 'text-2xl',
    xl: 'text-3xl',
  }[size];

  const subtextSize = {
    sm: 'text-[9px]',
    md: 'text-[10px]',
    lg: 'text-xs',
    xl: 'text-sm',
  }[size];

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {/* The Krh Monogram Emblem */}
      <div
        className={`${iconSize} relative shrink-0 rounded-xl flex items-center justify-center transition-transform hover:scale-105 shadow-xs`}
        style={{
          background:
            tone === 'cream'
              ? 'linear-gradient(135deg, #FFFDF9 0%, #F5ECE1 100%)'
              : 'linear-gradient(135deg, #2D1B13 0%, #1A0F0A 100%)',
          border:
            tone === 'cream'
              ? '1px solid #DFD2C2'
              : '1px solid #4D3324',
          boxShadow: '0 2px 8px rgba(45, 27, 19, 0.12)',
        }}
        title="KRH - Kenya Rental Homes"
      >
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-[75%] h-[75%]"
          aria-label="krh logo mark"
        >
          <defs>
            <linearGradient id="krhGold" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#F5D09D" />
              <stop offset="45%" stopColor="#D48B47" />
              <stop offset="100%" stopColor="#A65F22" />
            </linearGradient>
            <linearGradient id="krhAccent" x1="0" y1="100" x2="100" y2="0" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#C27835" />
              <stop offset="100%" stopColor="#F9E2BF" />
            </linearGradient>
          </defs>

          {/* Architectural roof line subtle peak */}
          <path
            d="M 20 28 L 50 14 L 80 28"
            stroke="url(#krhGold)"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.85"
          />

          {/* Letter 'k' */}
          <g>
            {/* vertical stem of k */}
            <path
              d="M 24 35 L 24 76"
              stroke="url(#krhGold)"
              strokeWidth="5"
              strokeLinecap="round"
            />
            {/* upper arm */}
            <path
              d="M 40 45 L 26 57"
              stroke="url(#krhGold)"
              strokeWidth="4.5"
              strokeLinecap="round"
            />
            {/* lower leg */}
            <path
              d="M 28 55 L 42 76"
              stroke="url(#krhGold)"
              strokeWidth="4.5"
              strokeLinecap="round"
            />
          </g>

          {/* Letter 'r' */}
          <g>
            {/* vertical stem of r */}
            <path
              d="M 49 46 L 49 76"
              stroke="url(#krhAccent)"
              strokeWidth="4.8"
              strokeLinecap="round"
            />
            {/* arc of r */}
            <path
              d="M 49 54 C 52 47, 60 45, 65 49"
              stroke="url(#krhAccent)"
              strokeWidth="4.5"
              strokeLinecap="round"
            />
          </g>

          {/* Letter 'h' */}
          <g>
            {/* tall stem of h */}
            <path
              d="M 72 32 L 72 76"
              stroke="url(#krhGold)"
              strokeWidth="4.8"
              strokeLinecap="round"
            />
            {/* arch of h */}
            <path
              d="M 72 55 C 76 47, 86 47, 88 56 L 88 76"
              stroke="url(#krhGold)"
              strokeWidth="4.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>

          {/* Foundation baseline dot */}
          <circle cx="50" cy="85" r="2.5" fill="url(#krhGold)" opacity="0.9" />
        </svg>
      </div>

      {/* Typography Lockup */}
      {variant !== 'icon' && (
        <div className="flex flex-col text-left">
          <div className="flex items-center gap-1.5 leading-none">
            <span
              className={`font-black tracking-tight ${textSize}`}
              style={{
                color: tone === 'cream' ? '#FFFFFF' : '#27170F',
                letterSpacing: '-0.02em',
              }}
            >
              krh
            </span>
            <span
              className="text-xs uppercase font-extrabold tracking-widest px-1.5 py-0.5 rounded-sm"
              style={{
                backgroundColor: '#F3E9DD',
                color: '#8A5023',
                fontSize: '9px',
              }}
            >
              Rentals
            </span>
          </div>
          {variant !== 'minimal' && (
            <span
              className={`font-medium ${subtextSize} tracking-tight mt-0.5`}
              style={{ color: tone === 'cream' ? '#E4D5C5' : '#735F52' }}
            >
              Kenya Rental Homes
            </span>
          )}
        </div>
      )}
    </div>
  );
};
