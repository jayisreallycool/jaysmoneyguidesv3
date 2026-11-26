'use client';

import { useEffect, useRef, useState } from 'react';
import { Headphones, Pause, Play, Square } from 'lucide-react';
import audioManifest from '@/lib/audio-manifest.json';

/**
 * "Listen to this article" bar, shown at the top of every guide.
 *
 * Two modes, chosen by lib/audio-manifest.json:
 *  - The slug has a manifest entry → a recorded narration (real <audio>
 *    element) with seek and a live progress bar.
 *  - No entry → the browser's speechSynthesis reads the article body aloud,
 *    using the most natural en-US voice available. No seek (speechSynthesis
 *    can't), but pause / resume / stop and speed all work, and the bar
 *    shows reading progress through the article's sentences.
 */
const RECORDED = audioManifest as Record<string, string>;
const SPEEDS: number[] = [0.75, 1, 1.25, 1.5, 2];

function formatTime(sec: number): string {
  if (!Number.isFinite(sec) || sec < 0) return '0:00';
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

/** The most human-sounding English voice the browser offers. */
function pickVoice(): SpeechSynthesisVoice | null {
  const voices = window.speechSynthesis
    .getVoices()
    .filter((v) => v.lang && v.lang.toLowerCase().startsWith('en'));
  if (voices.length === 0) return null;
  const prefs = ['google us english', 'natural', 'samantha', 'aria', 'jenny'];
  for (const p of prefs) {
    const hit = voices.find((v) => v.name.toLowerCase().includes(p));
    if (hit) return hit;
  }
  return voices.find((v) => v.lang === 'en-US') ?? voices[0];
}

/** Text of the article body only — ad blocks stripped, no nav/footer. */
function getArticleText(): string {
  const article = document.querySelector('article');
  if (!article) return '';
  const clone = article.cloneNode(true) as HTMLElement;
  clone
    .querySelectorAll('.ad-block, [aria-label="Advertisement"]')
    .forEach((el) => el.remove());
  return (clone.innerText || '').replace(/[ \t]+/g, ' ').trim();
}

/** Split article text into short utterance chunks (~220 chars each). */
function splitIntoChunks(text: string): string[] {
  const flat = text.replace(/\s+/g, ' ').trim();
  if (!flat) return [];
  const sentences = flat.match(/[^.!?]+[.!?]+["')\]]*\s*/g) ?? [flat];
  const chunks: string[] = [];
  let cur = '';
  for (const raw of sentences) {
    const s = raw.trim();
    if (!s) continue;
    if (cur && cur.length + s.length > 220) {
      chunks.push(cur);
      cur = s;
    } else {
      cur = cur ? `${cur} ${s}` : s;
    }
  }
  if (cur) chunks.push(cur);
  return chunks;
}

type TtsStatus = 'idle' | 'speaking' | 'paused';

export function ListenToArticle({ slug }: { slug: string }) {
  const src = RECORDED[slug];
  const recorded = Boolean(src);

  // Shared
  const [speedIdx, setSpeedIdx] = useState(1); // SPEEDS[1] === 1×

  // Recorded-audio mode
  const audioRef = useRef<HTMLAudioElement>(null);
  const [aPlaying, setAPlaying] = useState(false);
  const [aTime, setATime] = useState(0);
  const [aDuration, setADuration] = useState(0);

  // speechSynthesis fallback mode
  const [ttsStatus, setTtsStatus] = useState<TtsStatus>('idle');
  const [ttsProgress, setTtsProgress] = useState(0); // chunks finished
  const [ttsTotal, setTtsTotal] = useState(0);
  const chunksRef = useRef<string[]>([]);
  const idxRef = useRef(0);
  const sessionRef = useRef(0);
  const rateRef = useRef(1);
  const statusRef = useRef<TtsStatus>('idle');
  useEffect(() => {
    statusRef.current = ttsStatus;
  }, [ttsStatus]);

  const speakFrom = (startIdx: number) => {
    const synth = window.speechSynthesis;
    const chunks = chunksRef.current;
    if (startIdx >= chunks.length) {
      setTtsStatus('idle');
      setTtsProgress(0);
      idxRef.current = 0;
      return;
    }
    const session = sessionRef.current;
    const utter = new SpeechSynthesisUtterance(chunks[startIdx]);
    const voice = pickVoice();
    if (voice) utter.voice = voice;
    utter.lang = 'en-US';
    utter.rate = rateRef.current;
    const advance = () => {
      if (sessionRef.current !== session) return; // stopped / restarted
      idxRef.current = startIdx + 1;
      setTtsProgress(startIdx + 1);
      speakFrom(startIdx + 1);
    };
    utter.onend = advance;
    utter.onerror = advance;
    synth.speak(utter);
  };

  const ttsToggle = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    const synth = window.speechSynthesis;
    if (ttsStatus === 'speaking') {
      synth.pause();
      setTtsStatus('paused');
      return;
    }
    if (ttsStatus === 'paused') {
      synth.resume();
      setTtsStatus('speaking');
      return;
    }
    // idle → start from the top
    chunksRef.current = splitIntoChunks(getArticleText());
    setTtsTotal(chunksRef.current.length);
    setTtsProgress(0);
    idxRef.current = 0;
    sessionRef.current += 1;
    synth.cancel();
    setTtsStatus('speaking');
    speakFrom(0);
  };

  const ttsStop = () => {
    if (!('speechSynthesis' in window)) return;
    sessionRef.current += 1;
    window.speechSynthesis.cancel();
    idxRef.current = 0;
    setTtsProgress(0);
    setTtsStatus('idle');
  };

  // Chrome can silently stall long speechSynthesis sessions; a periodic
  // resume() while speaking keeps it going. Harmless when not stalled.
  useEffect(() => {
    if (recorded || ttsStatus !== 'speaking') return;
    const t = window.setInterval(() => {
      if (statusRef.current === 'speaking') window.speechSynthesis.resume();
    }, 10000);
    return () => window.clearInterval(t);
  }, [recorded, ttsStatus]);

  // Cleanup on unmount / navigation.
  useEffect(() => {
    return () => {
      sessionRef.current += 1;
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
      audioRef.current?.pause();
    };
  }, []);

  const cycleSpeed = () => {
    const next = (speedIdx + 1) % SPEEDS.length;
    setSpeedIdx(next);
    rateRef.current = SPEEDS[next];
    if (audioRef.current) audioRef.current.playbackRate = SPEEDS[next];
  };

  const playing = recorded ? aPlaying : ttsStatus === 'speaking';
  const active = recorded ? aPlaying || aTime > 0 : ttsStatus !== 'idle';

  const toggle = () => {
    if (recorded) {
      const el = audioRef.current;
      if (!el) return;
      if (el.paused) void el.play().catch(() => undefined);
      else el.pause();
    } else {
      ttsToggle();
    }
  };

  const stop = () => {
    if (recorded) {
      const el = audioRef.current;
      if (el) {
        el.pause();
        el.currentTime = 0;
      }
      setATime(0);
    } else {
      ttsStop();
    }
  };

  const statusText = recorded
    ? aDuration > 0
      ? `${formatTime(aTime)} of ${formatTime(aDuration)}`
      : 'Recorded narration by a real voice'
    : ttsStatus === 'speaking'
      ? 'Reading the article aloud…'
      : ttsStatus === 'paused'
        ? 'Paused'
        : 'Read aloud by your device';

  return (
    <section
      aria-label="Listen to this article"
      className="not-prose mb-8 rounded-2xl border border-slate-800 bg-slate-900/60 px-4 py-4 sm:px-5"
    >
      <div className="flex items-center gap-3 sm:gap-4">
        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? 'Pause narration' : 'Play narration'}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-slate-950 transition-colors hover:bg-emerald-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
        >
          {playing ? (
            <Pause className="h-5 w-5" aria-hidden="true" />
          ) : (
            <Play className="ml-0.5 h-5 w-5" aria-hidden="true" />
          )}
        </button>

        <div className="min-w-0 flex-1">
          <p className="flex flex-wrap items-center gap-2 text-sm font-bold text-white">
            <Headphones className="h-4 w-4 text-emerald-400" aria-hidden="true" />
            Listen to this article
            <span className="inline-flex items-center rounded-full border border-emerald-500/25 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-400">
              {recorded ? 'Recorded voice' : 'Read aloud'}
            </span>
          </p>
          <p className="mt-0.5 text-xs text-slate-400" aria-live="polite">
            {statusText}
          </p>
        </div>

        {active && (
          <button
            type="button"
            onClick={stop}
            aria-label="Stop narration"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-slate-700 text-slate-300 transition-colors hover:border-slate-500 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
          >
            <Square className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
        )}

        <button
          type="button"
          onClick={cycleSpeed}
          aria-label={`Playback speed ${SPEEDS[speedIdx]} times — activate to change`}
          className="shrink-0 rounded-full border border-slate-700 px-3 py-1.5 text-xs font-bold text-slate-200 transition-colors hover:border-slate-500 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
        >
          {SPEEDS[speedIdx]}×
        </button>
      </div>

      {recorded ? (
        <div className="mt-3 flex items-center gap-3">
          <span className="text-[11px] font-medium tabular-nums text-slate-500">
            {formatTime(aTime)}
          </span>
          <input
            type="range"
            min={0}
            max={aDuration || 0}
            step={0.1}
            value={Math.min(aTime, aDuration || 0)}
            onChange={(e) => {
              const v = Number(e.target.value);
              if (audioRef.current) audioRef.current.currentTime = v;
              setATime(v);
            }}
            aria-label="Seek through the narration"
            className="h-1.5 flex-1 cursor-pointer appearance-none rounded-full bg-slate-800 accent-emerald-500"
          />
          <span className="text-[11px] font-medium tabular-nums text-slate-500">
            {formatTime(aDuration)}
          </span>
          <audio
            ref={audioRef}
            src={src}
            preload="metadata"
            onLoadedMetadata={(e) => {
              setADuration(e.currentTarget.duration);
              e.currentTarget.playbackRate = SPEEDS[speedIdx];
            }}
            onTimeUpdate={(e) => setATime(e.currentTarget.currentTime)}
            onPlay={() => setAPlaying(true)}
            onPause={() => setAPlaying(false)}
            onEnded={() => {
              setAPlaying(false);
              setATime(0);
            }}
          />
        </div>
      ) : (
        ttsStatus !== 'idle' &&
        ttsTotal > 0 && (
          <div
            className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-slate-800"
            role="progressbar"
            aria-label="Reading progress"
            aria-valuemin={0}
            aria-valuemax={ttsTotal}
            aria-valuenow={ttsProgress}
          >
            <div
              className="h-full rounded-full bg-emerald-500 transition-all duration-500"
              style={{ width: `${Math.round((ttsProgress / ttsTotal) * 100)}%` }}
            />
          </div>
        )
      )}
    </section>
  );
}
