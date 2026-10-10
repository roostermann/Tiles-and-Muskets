import React from 'react';
import { sound } from '../utils/sound';
import { Volume2, VolumeX, RotateCcw, BookOpen } from 'lucide-react';

interface HeaderProps {
  onRestart: () => void;
  onOpenManual: () => void;
  onOpenRules: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onRestart,
  onOpenManual,
  onOpenRules,
  isMuted,
  onToggleMute,
}) => {
  return (
    <header className="w-full bg-stone-900 border-b border-stone-800 text-stone-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between gap-8">
        {/* ZONE 1: Single Brand Wordmark */}
        <div className="flex items-center gap-2.5 shrink-0">
          <div className="w-7 h-7 rounded bg-amber-600/20 border border-amber-500/40 flex items-center justify-center text-amber-400 font-pixel text-xs">
            ⚔
          </div>
          <span className="text-base sm:text-lg font-cinzel font-bold tracking-wider text-amber-100 whitespace-nowrap">
            Napoleonic Line Infantry
          </span>
        </div>

        {/* ZONE 2: Concise single-line navigation controls */}
        <nav className="hidden md:flex items-center gap-6 text-xs uppercase tracking-wider font-semibold text-stone-400">
          <button
            type="button"
            onClick={onOpenManual}
            className="flex items-center gap-1.5 hover:text-amber-400 transition-colors whitespace-nowrap cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5" />
            Field Manual
          </button>
          <button
            type="button"
            onClick={onOpenRules}
            className="hover:text-amber-400 transition-colors whitespace-nowrap cursor-pointer"
          >
            Rules & History
          </button>
          <button
            type="button"
            onClick={onToggleMute}
            aria-label={isMuted ? "Unmute game audio" : "Mute game audio"}
            className="flex items-center gap-1.5 hover:text-amber-400 transition-colors whitespace-nowrap cursor-pointer"
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5 text-stone-500" /> : <Volume2 className="w-3.5 h-3.5 text-amber-400" />}
            <span>{isMuted ? "Muted" : "Sound On"}</span>
          </button>
        </nav>

        {/* ZONE 3: Single Primary Action */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={onToggleMute}
            aria-label={isMuted ? "Unmute sound" : "Mute sound"}
            className="md:hidden p-2 text-stone-400 hover:text-amber-300 rounded border border-stone-700 bg-stone-800"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-amber-400" />}
          </button>
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              onRestart();
            }}
            className="flex items-center gap-2 px-3.5 py-1.5 bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-xs uppercase tracking-wider rounded border border-amber-400 transition-colors whitespace-nowrap cursor-pointer shadow-sm active:translate-y-0.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>New Game</span>
          </button>
        </div>
      </div>
    </header>
  );
};
