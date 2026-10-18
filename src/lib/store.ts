"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

type VoteState = {
  /** lifetime votes this visitor has cast per contestant id (free, attention-only) */
  votes: Record<string, number>;
  favorites: string[];
  totalCast: number;
  /** YYYY-MM-DD the daily budget belongs to */
  dailyDate: string;
  /** votes spent today across all contestants */
  dailyUsed: number;
  /** consecutive days with at least one vote */
  streak: number;
  /** YYYY-MM-DD of the last day a vote was cast */
  lastVoteDay: string;
  vote: (id: string) => void;
  toggleFavorite: (id: string) => void;
  votesFor: (id: string) => number;
  isFavorite: (id: string) => boolean;
};

// ponytail: free voting only — cap per contestant so the demo can't be spammed silly
const MAX_PER_CONTESTANT = 10;
/** free votes per day across all contestants — the come-back-tomorrow hook */
export const DAILY_BUDGET = 15;

const dayKey = (d: Date) => d.toISOString().slice(0, 10);

/** votes still available today — usable as a zustand selector */
export function remainingToday(s: Pick<VoteState, "dailyDate" | "dailyUsed">): number {
  return s.dailyDate === dayKey(new Date())
    ? Math.max(0, DAILY_BUDGET - s.dailyUsed)
    : DAILY_BUDGET;
}

export const useVoteStore = create<VoteState>()(
  persist(
    (set, get) => ({
      votes: {},
      favorites: [],
      totalCast: 0,
      dailyDate: "",
      dailyUsed: 0,
      streak: 0,
      lastVoteDay: "",
      vote: (id) =>
        set((s) => {
          const today = dayKey(new Date());
          const used = s.dailyDate === today ? s.dailyUsed : 0;
          const current = s.votes[id] ?? 0;
          if (used >= DAILY_BUDGET || current >= MAX_PER_CONTESTANT) {
            // persist the day rollover even on reject so remainingToday reads fresh
            return s.dailyDate === today ? s : { dailyDate: today, dailyUsed: 0 };
          }
          const yesterday = dayKey(new Date(Date.now() - 86_400_000));
          const firstOfDay = s.lastVoteDay !== today;
          return {
            votes: { ...s.votes, [id]: current + 1 },
            totalCast: s.totalCast + 1,
            dailyDate: today,
            dailyUsed: used + 1,
            streak: firstOfDay ? (s.lastVoteDay === yesterday ? s.streak + 1 : 1) : s.streak,
            lastVoteDay: today,
          };
        }),
      toggleFavorite: (id) =>
        set((s) => ({
          favorites: s.favorites.includes(id)
            ? s.favorites.filter((f) => f !== id)
            : [...s.favorites, id],
        })),
      votesFor: (id) => get().votes[id] ?? 0,
      isFavorite: (id) => get().favorites.includes(id),
    }),
    {
      name: "binibini-ai-votes",
      version: 2,
      migrate: (persisted) => {
        // v1 had only { votes, favorites, totalCast } — carry over, default the rest
        const old = (persisted ?? {}) as Partial<VoteState>;
        return {
          votes: old.votes ?? {},
          favorites: old.favorites ?? [],
          totalCast: old.totalCast ?? 0,
          dailyDate: old.dailyDate ?? "",
          dailyUsed: old.dailyUsed ?? 0,
          streak: old.streak ?? 0,
          lastVoteDay: old.lastVoteDay ?? "",
        } as VoteState;
      },
    },
  ),
);

export const MAX_VOTES_PER_CONTESTANT = MAX_PER_CONTESTANT;
