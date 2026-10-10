import React from 'react';
import { INFANTRY_DATA } from '../data/infantryData';
import { sound } from '../utils/sound';
import { Trophy, Clock, Footprints, RotateCcw, Award, BookOpen } from 'lucide-react';

interface VictoryModalProps {
  isOpen: boolean;
  moves: number;
  timeSeconds: number;
  isNewBestMoves: boolean;
  isNewBestTime: boolean;
  onPlayAgain: () => void;
  onOpenManual: () => void;
}

export const VictoryModal: React.FC<VictoryModalProps> = ({
  isOpen,
  moves,
  timeSeconds,
  isNewBestMoves,
  isNewBestTime,
  onPlayAgain,
  onOpenManual,
}) => {
  if (!isOpen) return null;

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Determine military rank
  let rank = 'Field Marshal';
  let rankColor = 'text-amber-400';
  let rankDesc = 'Flawless strategic memory! Napoleon would be proud.';

  if (moves > 18) {
    rank = 'Gallant Captain';
    rankColor = 'text-stone-300';
    rankDesc = 'A hard-fought victory through determined courage.';
  } else if (moves > 14) {
    rank = 'Colonel of the Line';
    rankColor = 'text-blue-400';
    rankDesc = 'Steady drill and regimental order carried the day.';
  } else if (moves > 10) {
    rank = 'General of Division';
    rankColor = 'text-emerald-400';
    rankDesc = 'Decisive command and rapid tactical battlefield execution.';
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-stone-900 border-2 border-amber-500/80 rounded-2xl max-w-xl w-full p-6 sm:p-8 text-center shadow-2xl relative overflow-hidden">
        {/* Glow backdrop effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-32 bg-amber-500/10 blur-3xl pointer-events-none" />

        {/* Victory Laurel Icon */}
        <div className="mx-auto w-16 h-16 rounded-full bg-amber-500/10 border-2 border-amber-500/50 flex items-center justify-center text-amber-400 mb-4 shadow-lg animate-bounce">
          <Trophy className="w-8 h-8" />
        </div>

        <span className="text-xs font-pixel uppercase tracking-widest text-amber-400 block mb-1">
          Battlefield Decisive Victory!
        </span>
        <h2 className="text-2xl sm:text-3xl font-cinzel font-bold text-amber-100 tracking-wide">
          All 8 Regiments Reconciled
        </h2>

        {/* Rank Badge */}
        <div className="mt-4 p-3.5 bg-stone-850 border border-stone-750 rounded-xl max-w-md mx-auto">
          <div className="flex items-center justify-center gap-2">
            <Award className={`w-5 h-5 ${rankColor}`} />
            <span className={`text-base font-cinzel font-bold ${rankColor}`}>
              Awarded Rank: {rank}
            </span>
          </div>
          <p className="text-xs text-stone-400 mt-1">{rankDesc}</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 my-6 max-w-md mx-auto">
          <div className="p-3.5 bg-stone-950 border border-stone-800 rounded-xl relative">
            <div className="flex items-center justify-center gap-1.5 text-stone-400 text-xs mb-1">
              <Clock className="w-4 h-4 text-emerald-400" />
              <span>Completion Time</span>
            </div>
            <div className="text-xl sm:text-2xl font-mono font-bold text-stone-100 tabular-nums">
              {formatTime(timeSeconds)}
            </div>
            {isNewBestTime && (
              <span className="inline-block mt-1 text-[10px] font-pixel text-amber-400 uppercase tracking-tight">
                ★ New Record!
              </span>
            )}
          </div>

          <div className="p-3.5 bg-stone-950 border border-stone-800 rounded-xl relative">
            <div className="flex items-center justify-center gap-1.5 text-stone-400 text-xs mb-1">
              <Footprints className="w-4 h-4 text-sky-400" />
              <span>Total Moves</span>
            </div>
            <div className="text-xl sm:text-2xl font-mono font-bold text-stone-100 tabular-nums">
              {moves}
            </div>
            {isNewBestMoves && (
              <span className="inline-block mt-1 text-[10px] font-pixel text-amber-400 uppercase tracking-tight">
                ★ New Record!
              </span>
            )}
          </div>
        </div>

        {/* All 8 Regimental Badges Parade */}
        <div className="mb-6">
          <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block mb-2 font-cinzel">
            The Coalition & Imperial Regiments
          </span>
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-2 bg-stone-950/60 p-2.5 rounded-xl border border-stone-800">
            {INFANTRY_DATA.map((infantry) => (
              <div
                key={infantry.id}
                className="flex flex-col items-center group"
                title={`${infantry.country} - ${infantry.regimentName}`}
              >
                <div className="w-10 h-10 rounded bg-stone-900 border border-stone-700 p-0.5 flex items-center justify-center">
                  <img
                    src={infantry.image}
                    alt={infantry.country}
                    className="w-full h-full object-contain pixelated"
                  />
                </div>
                <span className="text-[9px] text-stone-400 truncate w-full mt-1 text-center font-medium">
                  {infantry.country.split(' ')[0]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              onPlayAgain();
            }}
            className="w-full sm:w-auto px-6 py-2.5 bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-xs uppercase tracking-wider rounded-lg border border-amber-400 transition-colors shadow-lg cursor-pointer flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Play Again</span>
          </button>
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              onOpenManual();
            }}
            className="w-full sm:w-auto px-5 py-2.5 bg-stone-800 hover:bg-stone-700 text-stone-200 font-semibold text-xs uppercase tracking-wider rounded-lg border border-stone-700 transition-colors cursor-pointer flex items-center justify-center gap-2"
          >
            <BookOpen className="w-4 h-4 text-amber-400" />
            <span>Review Field Manual</span>
          </button>
        </div>
      </div>
    </div>
  );
};
