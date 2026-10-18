"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useVoteStore, MAX_VOTES_PER_CONTESTANT, remainingToday } from "@/lib/store";

type Props = {
  contestantId: string;
  size?: "sm" | "lg";
};

export function VoteButton({ contestantId, size = "sm" }: Props) {
  const [mounted, setMounted] = useState(false);
  const [burst, setBurst] = useState(0);
  const vote = useVoteStore((s) => s.vote);
  const count = useVoteStore((s) => s.votes[contestantId] ?? 0);
  const remaining = useVoteStore(remainingToday);

  useEffect(() => setMounted(true), []);

  const maxed = count >= MAX_VOTES_PER_CONTESTANT;
  const budgetOut = remaining <= 0;
  const lg = size === "lg";

  const handle = () => {
    if (maxed || budgetOut) return;
    vote(contestantId);
    setBurst((b) => b + 1);
  };

  return (
    <button
      type="button"
      onClick={handle}
      disabled={mounted && (maxed || budgetOut)}
      aria-label="Cast a free vote"
      className={`relative inline-flex items-center gap-2 rounded-full font-medium transition-all duration-300 ${
        lg ? "px-7 py-3.5 text-base" : "px-4 py-2 text-sm"
      } ${
        mounted && count > 0
          ? "bg-orchid/15 border border-orchid text-orchid-bright"
          : "bg-gradient-to-r from-orchid to-orchid-bright text-white border border-transparent hover:-translate-y-0.5 shadow-[0_8px_30px_-10px_rgba(215,60,150,0.7)]"
      } ${mounted && (maxed || budgetOut) ? "opacity-70 cursor-default" : ""}`}
    >
      <span className={lg ? "text-lg" : "text-base"}>♥</span>
      <span>
        {!mounted
          ? "Vote"
          : maxed
            ? "Maxed out"
            : budgetOut
              ? "Balik bukas ♥"
              : count > 0
                ? "Voted"
                : "Vote"}
      </span>
      {mounted && count > 0 && (
        <span className="tabular-nums rounded-full bg-white/15 px-1.5 text-xs">{count}</span>
      )}

      <AnimatePresence>
        {burst > 0 && (
          <motion.span
            key={burst}
            initial={{ opacity: 1, y: 0, scale: 0.6 }}
            animate={{ opacity: 0, y: -28, scale: 1.1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
            className="pointer-events-none absolute left-1/2 -translate-x-1/2 -top-1 text-orchid-bright"
          >
            ♥
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}
