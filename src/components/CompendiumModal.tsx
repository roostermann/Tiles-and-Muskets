import React, { useState } from 'react';
import { INFANTRY_DATA, InfantryInfo } from '../data/infantryData';
import { sound } from '../utils/sound';
import { X, Lock, CheckCircle2, Shield, Swords, Calendar } from 'lucide-react';

interface CompendiumModalProps {
  isOpen: boolean;
  onClose: () => void;
  unlockedIds: string[];
  initialSelectedId?: string;
}

export const CompendiumModal: React.FC<CompendiumModalProps> = ({
  isOpen,
  onClose,
  unlockedIds,
  initialSelectedId,
}) => {
  const [selectedId, setSelectedId] = useState<string>(
    initialSelectedId || INFANTRY_DATA[0].id
  );

  if (!isOpen) return null;

  const currentInfantry = INFANTRY_DATA.find((i) => i.id === selectedId) || INFANTRY_DATA[0];
  const isUnlocked = unlockedIds.includes(currentInfantry.id);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-stone-900 border-2 border-stone-700 rounded-xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-800 bg-stone-950">
          <div className="flex items-center gap-2.5">
            <Shield className="w-5 h-5 text-amber-500" />
            <div>
              <h2 className="text-base sm:text-lg font-cinzel font-bold text-amber-100">
                Regimental Field Manual (1803–1815)
              </h2>
              <p className="text-xs text-stone-400">
                {unlockedIds.length} of 8 Line Infantry Regiments Documented
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-100 hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content - Two Column Layout */}
        <div className="flex-1 overflow-y-auto grid grid-cols-1 md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-stone-800">
          {/* Left Column: List of 8 Nations */}
          <div className="md:col-span-5 p-4 space-y-2 bg-stone-900/60 overflow-y-auto">
            <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block px-1 mb-2">
              Select Regiment
            </span>
            <div className="space-y-1.5">
              {INFANTRY_DATA.map((infantry) => {
                const unlocked = unlockedIds.includes(infantry.id);
                const isSelected = infantry.id === selectedId;

                return (
                  <button
                    key={infantry.id}
                    type="button"
                    onClick={() => {
                      sound.playClick();
                      setSelectedId(infantry.id);
                    }}
                    className={`w-full flex items-center justify-between p-2.5 rounded-lg border text-left transition-all ${
                      isSelected
                        ? 'border-amber-500 bg-amber-500/10 text-amber-100'
                        : 'border-stone-800 bg-stone-850 hover:border-stone-700 text-stone-300'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-9 h-9 rounded bg-stone-900 border border-stone-700 flex items-center justify-center p-0.5 shrink-0">
                        {unlocked ? (
                          <img
                            src={infantry.image}
                            alt={infantry.country}
                            className="w-full h-full object-contain pixelated"
                          />
                        ) : (
                          <Lock className="w-4 h-4 text-stone-600" />
                        )}
                      </div>
                      <div className="truncate">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs">{infantry.flagEmoji}</span>
                          <span className="text-xs font-semibold truncate">
                            {infantry.country}
                          </span>
                        </div>
                        <span className="text-[10px] text-stone-400 block truncate">
                          {infantry.regimentName.split(' ')[0]}
                        </span>
                      </div>
                    </div>

                    {unlocked ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    ) : (
                      <span className="text-[10px] font-mono text-stone-500 shrink-0">
                        Locked
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Detailed Dossier */}
          <div className="md:col-span-7 p-6 space-y-4 bg-stone-900">
            {/* Top Dossier Header */}
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{currentInfantry.flagEmoji}</span>
                  <h3 className="text-lg font-cinzel font-bold text-amber-100">
                    {currentInfantry.country}
                  </h3>
                </div>
                <p className="text-xs text-stone-400 mt-0.5 font-medium">
                  {currentInfantry.regimentName}
                </p>
                <div className="flex items-center gap-2 text-[11px] text-stone-400 mt-1 font-mono">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Era: {currentInfantry.era}</span>
                </div>
              </div>

              {/* Pixel Art Sprite Frame */}
              <div className="w-20 h-20 rounded-lg bg-stone-950 border-2 border-stone-700 p-1 flex items-center justify-center shrink-0 shadow-lg">
                {isUnlocked ? (
                  <img
                    src={currentInfantry.image}
                    alt={currentInfantry.country}
                    className="w-full h-full object-contain pixelated"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center text-stone-600">
                    <Lock className="w-6 h-6 mb-1" />
                    <span className="text-[9px] font-pixel">LOCKED</span>
                  </div>
                )}
              </div>
            </div>

            {/* Status notice if locked */}
            {!isUnlocked && (
              <div className="p-3 rounded-lg bg-amber-950/30 border border-amber-800/40 text-amber-300 text-xs flex items-center gap-2">
                <Lock className="w-4 h-4 shrink-0 text-amber-400" />
                <span>
                  Match this regiment's tiles in the memory game to decrypt full battlefield intel! Previewing summary below.
                </span>
              </div>
            )}

            {/* Fun Fact Section */}
            <div className="space-y-3">
              <div className="p-3.5 rounded-lg bg-stone-850 border border-stone-750">
                <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5 mb-1.5 font-cinzel">
                  <Swords className="w-3.5 h-3.5 text-amber-400" />
                  Regimental Fun Fact
                </h4>
                <p className="text-xs text-stone-200 leading-relaxed">
                  {currentInfantry.funFact}
                </p>
              </div>

              {/* Extended Historical Analysis */}
              <div className="p-3.5 rounded-lg bg-stone-850 border border-stone-750 space-y-2">
                <h4 className="text-xs font-bold text-stone-300 uppercase tracking-wider font-cinzel">
                  Tactics & History
                </h4>
                <p className="text-xs text-stone-300 leading-relaxed">
                  {currentInfantry.extendedFact}
                </p>
                <div className="pt-2 border-t border-stone-750 text-xs space-y-1">
                  <p className="text-stone-300">
                    <span className="text-stone-400 font-semibold">Uniform Details:</span>{' '}
                    {currentInfantry.uniformDetail}
                  </p>
                  <p className="text-stone-300">
                    <span className="text-stone-400 font-semibold">Decisive Battles:</span>{' '}
                    {currentInfantry.notableBattle}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 bg-stone-950 border-t border-stone-800 flex items-center justify-between text-xs text-stone-400">
          <span>Tip: Master the 4x4 grid in under 12 moves for Field Marshal rank.</span>
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="px-4 py-1.5 rounded bg-stone-800 hover:bg-stone-700 text-stone-200 font-medium transition-colors"
          >
            Close Manual
          </button>
        </div>
      </div>
    </div>
  );
};
