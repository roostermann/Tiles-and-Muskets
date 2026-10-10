import React from 'react';
import { InfantryInfo } from '../data/infantryData';
import { Sparkles, BookOpen, ChevronRight, X } from 'lucide-react';

interface FunFactCardProps {
  infantry: InfantryInfo | null;
  onDismiss: () => void;
  onOpenManual: (infantryId?: string) => void;
  matchedCount: number;
}

export const FunFactCard: React.FC<FunFactCardProps> = ({
  infantry,
  onDismiss,
  onOpenManual,
  matchedCount,
}) => {
  if (!infantry) {
    return (
      <div className="bg-stone-850 border border-stone-750 rounded-xl p-5 text-center flex flex-col items-center justify-center min-h-[220px]">
        <div className="w-12 h-12 rounded-full border border-stone-700 bg-stone-800 flex items-center justify-center text-stone-500 mb-3">
          <Sparkles className="w-5 h-5 text-amber-500/60" />
        </div>
        <h3 className="text-sm font-semibold text-stone-300 font-cinzel">
          Match Regiments to Unlock Intel
        </h3>
        <p className="text-xs text-stone-400 mt-1.5 max-w-xs leading-relaxed">
          Flip any two matching tiles to reveal military history and tactics from the Napoleonic Wars.
        </p>
        <div className="mt-4 flex items-center gap-2 text-[11px] text-stone-500 font-mono">
          <span>{matchedCount} / 8 Regiments Unlocked</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-stone-850 border-2 border-amber-600/70 rounded-xl p-5 shadow-2xl relative overflow-hidden transition-all duration-200 animate-in fade-in zoom-in-95">
      {/* Top Banner Bar */}
      <div className="flex items-center justify-between pb-3 border-b border-stone-750">
        <div className="flex items-center gap-2">
          <span className="text-xl" role="img" aria-label={infantry.country}>
            {infantry.flagEmoji}
          </span>
          <div>
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block font-cinzel">
              Regimental Intelligence · {infantry.country}
            </span>
            <span className="text-[11px] text-stone-400 block truncate max-w-[220px] sm:max-w-[300px]">
              {infantry.regimentName}
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={onDismiss}
          className="text-stone-400 hover:text-stone-200 p-1 rounded-md hover:bg-stone-800 transition-colors"
          title="Dismiss fun fact banner"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Main Content Area */}
      <div className="pt-4 flex flex-col sm:flex-row items-center sm:items-start gap-4">
        {/* Pixel Sprite Container - Display pixel art without alterations */}
        <div className="shrink-0 w-20 h-20 bg-stone-900 border-2 border-stone-700 rounded-lg flex items-center justify-center p-1 shadow-inner relative group">
          <img
            src={infantry.image}
            alt={`${infantry.country} infantry sprite`}
            className="w-full h-full object-contain pixelated pointer-events-none drop-shadow"
          />
          <div className="absolute -bottom-2 -right-2 bg-emerald-600 text-[9px] font-pixel text-white px-1 py-0.5 rounded border border-emerald-400">
            MATCH!
          </div>
        </div>

        {/* Fun Fact Narrative */}
        <div className="flex-1 space-y-2 text-left">
          <div className="bg-stone-900/80 border border-stone-750 rounded-lg p-3">
            <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wide flex items-center gap-1.5 mb-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Did You Know?
            </h4>
            <p className="text-xs text-stone-200 leading-relaxed font-sans">
              {infantry.funFact}
            </p>
          </div>

          <div className="text-[11px] text-stone-400 space-y-1 pt-1">
            <p>
              <span className="text-stone-300 font-semibold">Uniform:</span> {infantry.uniformDetail}
            </p>
            <p>
              <span className="text-stone-300 font-semibold">Famous Battles:</span> {infantry.notableBattle}
            </p>
          </div>
        </div>
      </div>

      {/* Footer link to manual */}
      <div className="mt-4 pt-3 border-t border-stone-750 flex items-center justify-between text-xs">
        <span className="text-[11px] text-stone-500 font-mono">
          Pair Matched! ({matchedCount}/8 Total)
        </span>
        <button
          type="button"
          onClick={() => onOpenManual(infantry.id)}
          className="text-amber-400 hover:text-amber-300 font-medium flex items-center gap-1 hover:underline cursor-pointer"
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Full Regimental Dossier</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
