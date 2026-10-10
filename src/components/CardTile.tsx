import React from 'react';
import { InfantryInfo } from '../data/infantryData';

export interface CardItem {
  uid: string;
  infantry: InfantryInfo;
  isFlipped: boolean;
  isMatched: boolean;
}

interface CardTileProps {
  card: CardItem;
  onClick: () => void;
  disabled: boolean;
}

export const CardTile: React.FC<CardTileProps> = ({ card, onClick, disabled }) => {
  const isRevealed = card.isFlipped || card.isMatched;

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled || isRevealed}
      aria-label={isRevealed ? `${card.infantry.country} infantry tile` : 'Unflipped card tile'}
      className={`relative w-full aspect-square cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded-lg perspective-1000 select-none transition-transform duration-100 active:scale-95 ${
        card.isMatched ? 'cursor-default ring-2 ring-emerald-500/70' : ''
      }`}
    >
      <div
        className={`w-full h-full duration-300 transform-style-preserve-3d transition-transform ${
          isRevealed ? 'rotate-y-180' : ''
        }`}
      >
        {/* CARD BACK (Unflipped State) */}
        <div className="absolute inset-0 w-full h-full backface-hidden rounded-lg bg-stone-800 border-2 border-stone-700 hover:border-amber-600/80 p-2 flex flex-col items-center justify-center shadow-lg transition-colors group">
          {/* Retro Pixel Card Back Pattern */}
          <div className="w-full h-full rounded border border-stone-600/60 bg-stone-850 flex flex-col items-center justify-center relative overflow-hidden">
            {/* Corner pixel brackets */}
            <span className="absolute top-1 left-1 w-1.5 h-1.5 bg-amber-500/70" />
            <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-amber-500/70" />
            <span className="absolute bottom-1 left-1 w-1.5 h-1.5 bg-amber-500/70" />
            <span className="absolute bottom-1 right-1 w-1.5 h-1.5 bg-amber-500/70" />

            {/* Center Crossed Rifles / Imperial Seal Icon */}
            <div className="flex flex-col items-center justify-center text-stone-500 group-hover:text-amber-400/90 transition-colors">
              <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                <circle cx="12" cy="12" r="9" strokeWidth="1.5" strokeDasharray="2 2" />
                <path d="M7 17L17 7M7 7l10 10" strokeLinecap="round" />
                <circle cx="12" cy="12" r="2.5" fill="currentColor" />
              </svg>
              <span className="text-[10px] font-pixel tracking-wider text-stone-400 mt-1 uppercase group-hover:text-amber-300 transition-colors">
                1805
              </span>
            </div>
          </div>
        </div>

        {/* CARD FRONT (Flipped / Revealed State) */}
        <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 rounded-lg bg-stone-900 border-2 border-amber-600/60 p-1.5 flex flex-col items-center justify-between shadow-xl">
          {/* Header Tag with Flag and Country */}
          <div className="w-full flex items-center justify-between px-1 text-[11px] leading-tight font-medium text-stone-300 truncate">
            <span className="text-xs">{card.infantry.flagEmoji}</span>
            <span className="truncate text-[10px] text-amber-200/90 font-semibold tracking-wide ml-1">
              {card.infantry.country}
            </span>
          </div>

          {/* Sprite container - Display the exact pixel art untouched */}
          <div className="relative w-full flex-1 flex items-center justify-center p-0.5 overflow-hidden">
            <img
              src={card.infantry.image}
              alt={`${card.infantry.country} Line Infantry pixel art`}
              className="w-full h-full max-w-[90px] max-h-[90px] object-contain pixelated pointer-events-none drop-shadow-md"
              loading="eager"
            />
          </div>

          {/* Subtext */}
          <div className="w-full text-center pb-0.5">
            <span className="text-[9px] font-pixel tracking-tight text-stone-400 block truncate">
              {card.infantry.regimentName.split(' ')[0]}
            </span>
          </div>

          {/* Matched Checkmark Glow */}
          {card.isMatched && (
            <div className="absolute top-1 right-1 w-4 h-4 rounded-full bg-emerald-500 text-stone-950 flex items-center justify-center shadow">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          )}
        </div>
      </div>
    </button>
  );
};
