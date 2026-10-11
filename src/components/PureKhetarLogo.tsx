import React from 'react';

interface PureKhetarLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  withText?: boolean;
  withTagline?: boolean;
  withUniversityBadge?: boolean;
}

export const PureKhetarLogo: React.FC<PureKhetarLogoProps> = ({
  className = '',
  size = 'md',
  withText = true,
  withTagline = false,
  withUniversityBadge = false
}) => {
  const iconDimensions = {
    sm: { box: 36, stroke: 2 },
    md: { box: 46, stroke: 2.2 },
    lg: { box: 64, stroke: 2.5 },
    xl: { box: 88, stroke: 3 }
  }[size];

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Circular Emblem Icon Matching Gemini_Generated_Image_ygkhvwygkhvwygkh-500kb.jpeg */}
      <div
        className="relative shrink-0 flex items-center justify-center rounded-full bg-[#FAF7EE] dark:bg-[#1B291D] shadow-sm transition-transform hover:scale-105"
        style={{ width: iconDimensions.box, height: iconDimensions.box }}
      >
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full p-1"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Outer Brand Ring */}
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke="#1E3F20"
            strokeWidth="3.2"
            className="dark:stroke-[#4D8052]"
          />

          {/* Earth Soil Mound Arc (Terracotta Clay) */}
          <path
            d="M 28 64 Q 50 48 72 64"
            stroke="#C86D3B"
            strokeWidth="3.2"
            strokeLinecap="round"
          />

          {/* Sprouting Plant Stem and Leaves */}
          {/* Main Stem */}
          <path
            d="M 50 63 C 49.5 54 48 44 45 35"
            stroke="#1E3F20"
            strokeWidth="3"
            strokeLinecap="round"
            className="dark:stroke-[#65A46B]"
          />

          {/* Left Leaf */}
          <path
            d="M 47 43 C 38 41 33 46 36 53 C 41 53 45 49 47 43 Z"
            fill="#2D5A30"
            stroke="#1E3F20"
            strokeWidth="1.5"
            className="dark:fill-[#4E8854] dark:stroke-[#65A46B]"
          />

          {/* Right Leaf (Larger) */}
          <path
            d="M 48 37 C 54 28 65 29 67 36 C 65 44 54 44 48 37 Z"
            fill="#2D5A30"
            stroke="#1E3F20"
            strokeWidth="1.5"
            className="dark:fill-[#4E8854] dark:stroke-[#65A46B]"
          />
        </svg>
      </div>

      {/* Typography: Pure (Forest Green) + Khetar (Terracotta Clay) */}
      {withText && (
        <div className="flex flex-col text-left">
          <div className="flex items-center gap-1.5 leading-none">
            <span
              className={`font-serif font-extrabold tracking-tight text-[#1E3F20] dark:text-[#65A46B] ${
                size === 'sm'
                  ? 'text-lg'
                  : size === 'lg'
                  ? 'text-3xl'
                  : size === 'xl'
                  ? 'text-4xl'
                  : 'text-2xl'
              }`}
            >
              Pure<span className="text-[#C86D3B] dark:text-[#E0854E]">Khetar</span>
            </span>
          </div>

          {withTagline && (
            <span className="text-[10.5px] font-medium tracking-wide text-[#5A4A3B] dark:text-[#B8AC9D] mt-0.5">
              Rooted in Nature, Cultivated with Care
            </span>
          )}

          {withUniversityBadge && (
            <span className="text-[9px] font-semibold text-[#C86D3B] dark:text-[#E0854E] uppercase tracking-wider mt-0.5">
              SPU Student Startup · Sankalchand Patel Univ.
            </span>
          )}
        </div>
      )}
    </div>
  );
};
