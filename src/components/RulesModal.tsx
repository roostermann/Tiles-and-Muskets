import React from 'react';
import { sound } from '../utils/sound';
import { X, HelpCircle, Trophy, Target, Clock, Shuffle } from 'lucide-react';

interface RulesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RulesModal: React.FC<RulesModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-stone-900 border-2 border-stone-700 rounded-xl max-w-lg w-full p-6 shadow-2xl relative">
        <div className="flex items-center justify-between pb-4 border-b border-stone-800">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-amber-500" />
            <h2 className="text-lg font-cinzel font-bold text-amber-100">
              Rules of Engagement
            </h2>
          </div>
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="p-1 rounded-md text-stone-400 hover:text-stone-200 hover:bg-stone-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="py-4 space-y-4 text-xs text-stone-300">
          <div className="flex items-start gap-3 p-3 bg-stone-850 rounded-lg border border-stone-800">
            <Target className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-stone-200 mb-0.5">The Objective</h3>
              <p className="text-stone-400 leading-relaxed">
                The battlefield consists of a 4 by 4 grid containing 16 face-down tiles (8 matching pairs of Napoleonic-era line infantry from 8 historic nations).
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-stone-850 rounded-lg border border-stone-800">
            <Shuffle className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-stone-200 mb-0.5">Flipping & Matching</h3>
              <p className="text-stone-400 leading-relaxed">
                Click any tile to flip it and reveal the pixel art infantryman. Then select a second tile. If they match, they remain face up and unlock a historical fun fact about that nation's line infantry. If they do not match, both flip back over.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-stone-850 rounded-lg border border-stone-800">
            <Clock className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-stone-200 mb-0.5">Time & Move Tracking</h3>
              <p className="text-stone-400 leading-relaxed">
                The battlefield stopwatch begins on your very first card flip. Every attempt to match two tiles counts as 1 move. Your personal best moves and fastest time are automatically saved.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-stone-850 rounded-lg border border-stone-800">
            <Trophy className="w-5 h-5 text-yellow-400 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-stone-200 mb-0.5">Field Marshal Ranks</h3>
              <ul className="text-stone-400 space-y-1 list-disc list-inside mt-1 font-mono text-[11px]">
                <li><span className="text-amber-300 font-semibold">8–10 Moves:</span> Field Marshal (Grand Cross)</li>
                <li><span className="text-amber-300 font-semibold">11–14 Moves:</span> General of Division</li>
                <li><span className="text-amber-300 font-semibold">15–18 Moves:</span> Colonel of the Line</li>
                <li><span className="text-amber-300 font-semibold">19+ Moves:</span> Gallant Captain</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="pt-3 border-t border-stone-800 flex justify-end">
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="px-4 py-1.5 bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-xs uppercase tracking-wider rounded"
          >
            Understood, Marshal!
          </button>
        </div>
      </div>
    </div>
  );
};
