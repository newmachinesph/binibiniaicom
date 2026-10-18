"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  title: string;
  path: string;
  small?: boolean;
};

const BASE = "https://www.binibiniai.com";

export function ShareBar({ title, path, small }: Props) {
  const [copied, setCopied] = useState(false);
  const [canNative, setCanNative] = useState(false);
  const copyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const url = BASE + path;

  useEffect(() => {
    setCanNative(typeof navigator !== "undefined" && "share" in navigator);
    return () => {
      if (copyTimer.current) clearTimeout(copyTimer.current);
    };
  }, []);

  const pop = (href: string) =>
    window.open(href, "_blank", "noopener,noreferrer,width=600,height=540");

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      if (copyTimer.current) clearTimeout(copyTimer.current);
      copyTimer.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard blocked — nothing sensible to do in a demo
    }
  };

  const btn = `inline-flex items-center justify-center gap-1.5 rounded-full border border-line text-mist hover:border-gold hover:text-gold-bright hover:bg-white/[0.03] transition-colors ${
    small ? "px-3 py-1.5 text-xs" : "px-4 py-2 text-sm"
  }`;

  return (
    <div className="flex flex-wrap items-center gap-2">
      {!small && <span className="text-xs text-faint mr-1">Share</span>}
      <button
        type="button"
        className={btn}
        aria-label="Share on Facebook"
        onClick={() =>
          pop(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`)
        }
      >
        FB
      </button>
      <button
        type="button"
        className={btn}
        aria-label="Share on X"
        onClick={() =>
          pop(
            `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
          )
        }
      >
        X
      </button>
      <button type="button" className={btn} aria-label="Copy link" onClick={copy}>
        {copied ? "Copied!" : "Copy"}
      </button>
      {canNative && (
        <button
          type="button"
          className={btn}
          aria-label="Share via device"
          onClick={() => navigator.share({ title, url }).catch(() => {})}
        >
          Share
        </button>
      )}
    </div>
  );
}
