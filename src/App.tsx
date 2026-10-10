/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { INFANTRY_DATA, InfantryInfo } from './data/infantryData';
import { CardTile, CardItem } from './components/CardTile';
import { Header } from './components/Header';
import { FunFactCard } from './components/FunFactCard';
import { CompendiumModal } from './components/CompendiumModal';
import { RulesModal } from './components/RulesModal';
import { VictoryModal } from './components/VictoryModal';
import { sound } from './utils/sound';
import { Clock, Footprints, RotateCcw, BookOpen, Trophy, ShieldCheck, Sparkles } from 'lucide-react';

export default function App() {
  // Game State
  const [cards, setCards] = useState<CardItem[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [moves, setMoves] = useState<number>(0);
  const [timerSeconds, setTimerSeconds] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [isBusy, setIsBusy] = useState<boolean>(false);
  const [isVictory, setIsVictory] = useState<boolean>(false);

  // Intelligence & Unlocked Data
  const [latestMatchedInfantry, setLatestMatchedInfantry] = useState<InfantryInfo | null>(null);
  const [unlockedInfantryIds, setUnlockedInfantryIds] = useState<string[]>([]);

  // Modals & Sound
  const [isManualOpen, setIsManualOpen] = useState<boolean>(false);
  const [manualInitialId, setManualInitialId] = useState<string | undefined>(undefined);
  const [isRulesOpen, setIsRulesOpen] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(() => sound.getMuted());

  // Personal Best Records (stored in localStorage)
  const [bestMoves, setBestMoves] = useState<number | null>(() => {
    const val = localStorage.getItem('napoleonic_memory_best_moves');
    return val ? parseInt(val, 10) : null;
  });
  const [bestTime, setBestTime] = useState<number | null>(() => {
    const val = localStorage.getItem('napoleonic_memory_best_time');
    return val ? parseInt(val, 10) : null;
  });
  const [isNewBestMoves, setIsNewBestMoves] = useState<boolean>(false);
  const [isNewBestTime, setIsNewBestTime] = useState<boolean>(false);

  const timerRef = useRef<number | null>(null);

  // Initialize and shuffle a fresh 4x4 grid (16 tiles, 8 pairs)
  const initGame = useCallback(() => {
    // 8 pairs = 16 cards
    const deck: CardItem[] = [];
    INFANTRY_DATA.forEach((infantry) => {
      // First card of pair
      deck.push({
        uid: `${infantry.id}-1`,
        infantry,
        isFlipped: false,
        isMatched: false,
      });
      // Second card of pair
      deck.push({
        uid: `${infantry.id}-2`,
        infantry,
        isFlipped: false,
        isMatched: false,
      });
    });

    // Fisher-Yates shuffle
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }

    setCards(deck);
    setFlippedIndices([]);
    setMoves(0);
    setTimerSeconds(0);
    setIsTimerRunning(false);
    setIsBusy(false);
    setIsVictory(false);
    setLatestMatchedInfantry(null);
    setIsNewBestMoves(false);
    setIsNewBestTime(false);

    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  // Run on mount
  useEffect(() => {
    initGame();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [initGame]);

  // Stopwatch timer interval
  useEffect(() => {
    if (isTimerRunning && !isVictory) {
      timerRef.current = window.setInterval(() => {
        setTimerSeconds((prev) => prev + 1);
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isTimerRunning, isVictory]);

  // Handle Card Click
  const handleCardClick = (index: number) => {
    if (isBusy) return;
    const card = cards[index];
    if (card.isFlipped || card.isMatched) return;
    if (flippedIndices.includes(index)) return;

    // Start timer on first move
    if (!isTimerRunning && !isVictory) {
      setIsTimerRunning(true);
    }

    // Play flip sound
    sound.playCardFlip();

    // Flip the clicked card
    const newCards = [...cards];
    newCards[index].isFlipped = true;
    setCards(newCards);

    const newFlipped = [...flippedIndices, index];
    setFlippedIndices(newFlipped);

    // If 2 cards are now flipped, evaluate match
    if (newFlipped.length === 2) {
      const firstIdx = newFlipped[0];
      const secondIdx = newFlipped[1];
      const firstCard = newCards[firstIdx];
      const secondCard = newCards[secondIdx];

      setMoves((prev) => prev + 1);
      setIsBusy(true);

      if (firstCard.infantry.id === secondCard.infantry.id) {
        // MATCH FOUND!
        setTimeout(() => {
          sound.playMatchSuccess();

          const matchedCards = [...newCards];
          matchedCards[firstIdx].isMatched = true;
          matchedCards[secondIdx].isMatched = true;
          matchedCards[firstIdx].isFlipped = true;
          matchedCards[secondIdx].isFlipped = true;

          setCards(matchedCards);
          setFlippedIndices([]);
          setIsBusy(false);

          // Update latest fun fact
          setLatestMatchedInfantry(firstCard.infantry);
          setUnlockedInfantryIds((prev) =>
            prev.includes(firstCard.infantry.id) ? prev : [...prev, firstCard.infantry.id]
          );

          // Check if game is complete (all 16 cards matched)
          const allMatched = matchedCards.every((c) => c.isMatched);
          if (allMatched) {
            handleVictory();
          }
        }, 350);
      } else {
        // MISMATCH
        setTimeout(() => {
          sound.playMismatch();
        }, 400);

        setTimeout(() => {
          const resetCards = [...newCards];
          resetCards[firstIdx].isFlipped = false;
          resetCards[secondIdx].isFlipped = false;
          setCards(resetCards);
          setFlippedIndices([]);
          setIsBusy(false);
        }, 950);
      }
    }
  };

  // Handle Victory Celebration
  const handleVictory = () => {
    setIsVictory(true);
    setIsTimerRunning(false);
    if (timerRef.current) clearInterval(timerRef.current);

    sound.playVictory();

    // Calculate final moves & time
    const finalMoves = moves + 1; // plus current matching move
    const finalTime = timerSeconds;

    // Check Best Moves
    let newBestMovesFlag = false;
    if (bestMoves === null || finalMoves < bestMoves) {
      setBestMoves(finalMoves);
      localStorage.setItem('napoleonic_memory_best_moves', finalMoves.toString());
      newBestMovesFlag = true;
      setIsNewBestMoves(true);
    }

    // Check Best Time
    if (bestTime === null || finalTime < bestTime) {
      setBestTime(finalTime);
      localStorage.setItem('napoleonic_memory_best_time', finalTime.toString());
      setIsNewBestTime(true);
    }
  };

  // Sound toggle
  const handleToggleMute = () => {
    const nextMuted = sound.toggleMute();
    setIsMuted(nextMuted);
  };

  // Open manual with specific infantry
  const handleOpenManualWithId = (id?: string) => {
    setManualInitialId(id);
    setIsManualOpen(true);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const matchedPairsCount = cards.filter((c) => c.isMatched).length / 2;

  return (
    <div className="min-h-screen bg-stone-900 text-stone-100 flex flex-col font-sans">
      {/* Universal Top Bar */}
      <Header
        onRestart={initGame}
        onOpenManual={() => handleOpenManualWithId()}
        onOpenRules={() => setIsRulesOpen(true)}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
      />

      {/* Main Game Stage */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 md:py-8 flex flex-col">
        {/* HUD: Score, Timer, and Progress */}
        <section aria-label="Game Status Bar" className="mb-6">
          <div className="bg-stone-850 border border-stone-800 rounded-xl p-4 sm:p-5 shadow-lg flex flex-wrap items-center justify-between gap-4">
            {/* Left: Pairs Matched Progress */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-stone-900 border border-stone-700 flex items-center justify-center text-amber-400">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block">
                  Battlefield Intel
                </span>
                <span className="text-sm sm:text-base font-cinzel font-bold text-amber-200">
                  {matchedPairsCount} of 8 Regiments Matched
                </span>
              </div>
            </div>

            {/* Center/Right: Moves, Time, and Best Records */}
            <div className="flex items-center gap-4 sm:gap-6 text-sm">
              {/* Moves */}
              <div className="flex items-center gap-2">
                <Footprints className="w-4 h-4 text-sky-400" />
                <div>
                  <span className="text-[10px] text-stone-400 uppercase tracking-wider block">
                    Moves
                  </span>
                  <span className="font-mono font-bold text-base text-stone-100 tabular-nums">
                    {moves}
                  </span>
                </div>
              </div>

              {/* Time */}
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-400" />
                <div>
                  <span className="text-[10px] text-stone-400 uppercase tracking-wider block">
                    Time
                  </span>
                  <span className="font-mono font-bold text-base text-stone-100 tabular-nums">
                    {formatTime(timerSeconds)}
                  </span>
                </div>
              </div>

              {/* Personal Best Divider */}
              <div className="hidden sm:flex items-center gap-4 border-l border-stone-750 pl-4">
                <div className="flex items-center gap-2 text-stone-400">
                  <Trophy className="w-4 h-4 text-amber-400/80" />
                  <div>
                    <span className="text-[10px] uppercase tracking-wider block">Best Record</span>
                    <span className="font-mono text-xs text-amber-300 font-medium tabular-nums">
                      {bestMoves !== null ? `${bestMoves} moves` : '—'}
                      {bestTime !== null ? ` · ${formatTime(bestTime)}` : ''}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2-Column Responsive Workspace: 4x4 Grid (Left/Center) + Intelligence Dossier (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 items-start">
          {/* LEFT: 4 by 4 Memory Tile Grid */}
          <div className="lg:col-span-7 flex flex-col items-center">
            <div className="w-full max-w-[540px] bg-stone-950/80 border-2 border-stone-800 rounded-2xl p-4 sm:p-5 shadow-2xl relative">
              {/* Decorative Corner Ornaments */}
              <div className="absolute top-2 left-2 text-[9px] font-pixel text-stone-600 select-none">
                GRID [4x4]
              </div>
              <div className="absolute top-2 right-2 text-[9px] font-pixel text-stone-600 select-none">
                16 TILES
              </div>

              {/* The 4x4 Grid Container */}
              <div
                className="grid grid-cols-4 gap-2.5 sm:gap-3.5 mt-4"
                role="grid"
                aria-label="4 by 4 Napoleonic Memory Grid"
              >
                {cards.map((card, idx) => (
                  <CardTile
                    key={card.uid}
                    card={card}
                    onClick={() => handleCardClick(idx)}
                    disabled={isBusy || card.isMatched}
                  />
                ))}
              </div>

              {/* Bottom Quick Controls Bar */}
              <div className="mt-4 pt-3 border-t border-stone-800/80 flex items-center justify-between text-xs text-stone-400">
                <span className="text-[11px] font-mono text-stone-500">
                  Click any two tiles to match
                </span>
                <button
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    initGame();
                  }}
                  className="hover:text-amber-300 transition-colors flex items-center gap-1 font-medium cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reshuffle</span>
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT: Fun Fact Intelligence & Regimental Compendium */}
          <div className="lg:col-span-5 space-y-5">
            {/* Fun Fact Card for Matched Regiment */}
            <FunFactCard
              infantry={latestMatchedInfantry}
              onDismiss={() => setLatestMatchedInfantry(null)}
              onOpenManual={handleOpenManualWithId}
              matchedCount={matchedPairsCount}
            />

            {/* Roster of 8 Regiments Quick Bar */}
            <div className="bg-stone-850 border border-stone-800 rounded-xl p-4 shadow-lg">
              <div className="flex items-center justify-between pb-3 border-b border-stone-750">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-amber-500" />
                  <h3 className="text-xs font-bold text-stone-300 uppercase tracking-wider font-cinzel">
                    Campaign Roster (8 Nations)
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => handleOpenManualWithId()}
                  className="text-[11px] text-amber-400 hover:text-amber-300 font-medium hover:underline cursor-pointer"
                >
                  View Field Manual
                </button>
              </div>

              {/* Pixel Badge Miniatures */}
              <div className="grid grid-cols-4 gap-2 pt-3">
                {INFANTRY_DATA.map((infantry) => {
                  const isUnlocked = unlockedInfantryIds.includes(infantry.id);
                  const isCurrent = latestMatchedInfantry?.id === infantry.id;

                  return (
                    <button
                      key={infantry.id}
                      type="button"
                      onClick={() => {
                        sound.playClick();
                        handleOpenManualWithId(infantry.id);
                      }}
                      className={`flex flex-col items-center p-2 rounded-lg border text-center transition-all cursor-pointer ${
                        isCurrent
                          ? 'border-amber-500 bg-amber-500/15'
                          : isUnlocked
                          ? 'border-stone-700 bg-stone-900 hover:border-amber-600/50'
                          : 'border-stone-800 bg-stone-900/40 opacity-50 hover:opacity-80'
                      }`}
                      title={`${infantry.country} (${isUnlocked ? 'Unlocked' : 'Locked'})`}
                    >
                      <div className="w-10 h-10 rounded bg-stone-950 border border-stone-800 flex items-center justify-center p-0.5 relative">
                        <img
                          src={infantry.image}
                          alt={infantry.country}
                          className={`w-full h-full object-contain pixelated ${
                            !isUnlocked ? 'grayscale brightness-50 contrast-125' : ''
                          }`}
                        />
                        {isUnlocked && (
                          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-stone-900" />
                        )}
                      </div>
                      <span className="text-[10px] font-medium text-stone-300 truncate w-full mt-1.5">
                        {infantry.country.split(' ')[0]}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Tactical Notes / Historical Context Strip */}
            <div className="p-3.5 bg-stone-900/60 border border-stone-800 rounded-xl text-xs text-stone-400 space-y-1.5">
              <div className="flex items-center gap-1.5 text-stone-300 font-semibold font-cinzel text-xs">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                Line Infantry in the Napoleonic Era
              </div>
              <p className="text-[11px] leading-relaxed text-stone-400">
                During the Napoleonic Wars (1803–1815), line infantry formed the steadfast backbone of European battlefields. Deployed in tightly drilled formations, battalions relied on smoothbore flintlock muskets, steady volley discipline, and bayonet charges to break enemy lines.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Regimental Field Manual Modal */}
      <CompendiumModal
        isOpen={isManualOpen}
        onClose={() => setIsManualOpen(false)}
        unlockedIds={unlockedInfantryIds}
        initialSelectedId={manualInitialId}
      />

      {/* Rules & Tactics Modal */}
      <RulesModal isOpen={isRulesOpen} onClose={() => setIsRulesOpen(false)} />

      {/* Victory Celebration Modal */}
      <VictoryModal
        isOpen={isVictory}
        moves={moves}
        timeSeconds={timerSeconds}
        isNewBestMoves={isNewBestMoves}
        isNewBestTime={isNewBestTime}
        onPlayAgain={initGame}
        onOpenManual={() => {
          setIsVictory(false);
          setIsManualOpen(true);
        }}
      />
    </div>
  );
}
