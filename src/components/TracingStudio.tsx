// Handwriting & Phonics Studio — finger tracing for English letters, Hindi
// अक्षर and numbers, plus free drawing. Touch + mouse via Pointer Events.
// No stroke-recognition claims: guides are visual only; child traces over them.
import { useEffect, useRef, useState } from 'react';
import { soundManager } from '../utils/sounds';
import { tts } from '../utils/speech';
import { recordLessonCompletion, loadRewards } from '../utils/rewards';
import { ENGLISH_TRACES, HINDI_TRACES, NUMBER_TRACES, TraceItem } from '../data/tracing';

type Tab = 'english' | 'hindi' | 'numbers' | 'draw';

const TABS: { id: Tab; label: string; emoji: string }[] = [
  { id: 'english', label: 'A–Z', emoji: '🔤' },
  { id: 'hindi', label: 'अक्षर', emoji: '✍️' },
  { id: 'numbers', label: '1–20', emoji: '🔢' },
  { id: 'draw', label: 'Free Draw', emoji: '🎨' },
];

export default function TracingStudio({ onBack }: { onBack: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const drawing = useRef(false);
  const last = useRef<{ x: number; y: number } | null>(null);
  const [tab, setTab] = useState<Tab>('english');
  const [idx, setIdx] = useState(0);
  const [color, setColor] = useState('#7c3aed');
  const [size, setSize] = useState(10);
  const [tracedCount, setTracedCount] = useState(() => loadRewards().totalActivities);

  const list: TraceItem[] = tab === 'english' ? ENGLISH_TRACES : tab === 'hindi' ? HINDI_TRACES : NUMBER_TRACES;
  const item = list[Math.min(idx, list.length - 1)];

  // Resize canvas to container (device-pixel aware) and repaint guide
  useEffect(() => {
    const cv = canvasRef.current, wrap = wrapRef.current;
    if (!cv || !wrap) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = wrap.clientWidth, h = wrap.clientHeight;
    cv.width = w * dpr; cv.height = h * dpr;
    const ctx = cv.getContext('2d')!;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    redraw(ctx, w, h);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab, idx]);

  const redraw = (ctx: CanvasRenderingContext2D, w: number, h: number) => {
    ctx.clearRect(0, 0, w, h);
    // paper lines
    ctx.strokeStyle = '#e5e7eb'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(10, h * 0.8); ctx.lineTo(w - 10, h * 0.8); ctx.stroke();
    ctx.setLineDash([8, 8]); ctx.beginPath(); ctx.moveTo(10, h * 0.25); ctx.lineTo(w - 10, h * 0.25); ctx.stroke(); ctx.setLineDash([]);
    if (tab !== 'draw' && item) {
      ctx.fillStyle = 'rgba(148, 163, 184, 0.35)';
      ctx.font = `900 ${Math.min(w, h) * 0.6}px Nunito, 'Noto Sans Devanagari', sans-serif`;
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText(item.char, w / 2, h / 2);
      // start dot
      ctx.fillStyle = '#f97316';
      ctx.beginPath(); ctx.arc(w / 2 - Math.min(w, h) * 0.18, h / 2 - Math.min(w, h) * 0.2, 7, 0, Math.PI * 2); ctx.fill();
    }
  };

  const pos = (e: React.PointerEvent) => {
    const r = canvasRef.current!.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  };

  const down = (e: React.PointerEvent) => {
    e.preventDefault();
    canvasRef.current?.setPointerCapture(e.pointerId);
    drawing.current = true;
    last.current = pos(e);
  };
  const move = (e: React.PointerEvent) => {
    if (!drawing.current || !last.current) return;
    const cv = canvasRef.current!;
    const ctx = cv.getContext('2d')!;
    const p = pos(e);
    ctx.strokeStyle = color; ctx.lineWidth = size; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    ctx.beginPath(); ctx.moveTo(last.current.x, last.current.y); ctx.lineTo(p.x, p.y); ctx.stroke();
    last.current = p;
  };
  const up = () => { drawing.current = false; last.current = null; };

  const clear = () => {
    const cv = canvasRef.current!;
    const ctx = cv.getContext('2d')!;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    redraw(ctx, cv.width / dpr, cv.height / dpr);
  };

  const erase = () => { // eraser = white thick pen
    setColor('#ffffff');
  };

  const navigate = (delta: number) => {
    soundManager.click();
    setIdx((i) => {
      const n = Math.max(0, Math.min(list.length - 1, i + delta));
      setTimeout(() => tts(list[n].say, list[n].lang), 150);
      return n;
    });
    requestAnimationFrame(clearSoon);
  };
  const clearSoon = () => { const cv = canvasRef.current; if (cv) { const ctx = cv.getContext('2d')!; const dpr = Math.min(window.devicePixelRatio || 1, 2); redraw(ctx, cv.width / dpr, cv.height / dpr); } };

  const done = () => {
    soundManager.celebrate();
    recordLessonCompletion(`trace-${tab}-${item?.char ?? 'draw'}`, 100);
    setTracedCount(loadRewards().totalActivities);
    navigate(1);
  };

  const COLORS = ['#7c3aed', '#2563eb', '#059669', '#dc2626', '#f59e0b', '#0f172a', '#ffffff'];

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      <div className="flex items-center gap-3">
        <button onClick={() => { soundManager.click(); onBack(); }} aria-label="Go back"
          className="w-11 h-11 bg-white rounded-full shadow flex items-center justify-center text-xl font-black active:scale-95 transition-transform cursor-pointer">←</button>
        <h2 className="text-2xl sm:text-3xl font-black text-gray-800 flex-1">✍️ Handwriting Studio</h2>
        <div className="bg-white rounded-2xl px-3 py-1.5 shadow text-sm font-black text-purple-600">⭐ {tracedCount}</div>
      </div>

      {/* Tabs */}
      <div className="grid grid-cols-4 gap-2">
        {TABS.map(t => (
          <button key={t.id} onClick={() => { soundManager.click(); setTab(t.id); setIdx(0); }}
            className={`rounded-2xl py-2.5 font-black text-sm sm:text-base transition-all cursor-pointer active:scale-95 ${tab === t.id ? 'bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white shadow-lg' : 'bg-white text-gray-600 shadow'}`}>
            {t.emoji} {t.label}
          </button>
        ))}
      </div>

      {/* Guide header */}
      {tab !== 'draw' && item && (
        <div className="bg-white rounded-2xl shadow p-3 flex items-center gap-3">
          <button onClick={() => tts(item.say, item.lang)} aria-label="Hear the sound"
            className="w-12 h-12 shrink-0 rounded-full bg-cyan-100 text-2xl active:scale-90 transition-transform cursor-pointer">🔊</button>
          <div className="flex-1 min-w-0">
            <p className="font-black text-gray-800 truncate text-lg">{item.label}</p>
            <p className="text-xs text-gray-500">Trace over the grey letter with your finger ✨</p>
          </div>
          <span className="text-xs font-black text-gray-400 whitespace-nowrap">{Math.min(idx + 1, list.length)}/{list.length}</span>
        </div>
      )}

      {/* Canvas */}
      <div ref={wrapRef} className="relative bg-white rounded-3xl shadow-lg border-4 border-purple-100 overflow-hidden" style={{ height: 'min(58vw, 340px)' }}>
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full touch-none cursor-crosshair"
          onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerLeave={up} />
      </div>

      {/* Tools */}
      <div className="bg-white rounded-2xl shadow p-3 space-y-3">
        <div className="flex items-center gap-2 flex-wrap">
          {COLORS.map(c => (
            <button key={c} onClick={() => setColor(c)} aria-label={`Colour ${c}`}
              className={`w-9 h-9 rounded-full border-2 cursor-pointer active:scale-90 transition-transform ${color === c ? 'ring-4 ring-purple-300 border-purple-500' : 'border-gray-200'}`}
              style={{ background: c }} />
          ))}
          <div className="flex items-center gap-1 ml-auto">
            {[6, 10, 18].map(s => (
              <button key={s} onClick={() => setSize(s)} aria-label={`Pen size ${s}`}
                className={`w-9 h-9 rounded-xl flex items-center justify-center cursor-pointer active:scale-90 ${size === s ? 'bg-purple-100' : 'bg-gray-50'}`}>
                <span className="rounded-full bg-gray-700" style={{ width: s, height: s }} />
              </button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-4 gap-2">
          <button onClick={() => { soundManager.click(); navigate(-1); }} className="py-3 rounded-xl bg-gray-100 font-black text-gray-700 active:scale-95 transition-transform cursor-pointer">⬅️ Prev</button>
          <button onClick={() => { soundManager.click(); clear(); }} className="py-3 rounded-xl bg-amber-100 font-black text-amber-700 active:scale-95 transition-transform cursor-pointer">🧽 Clear</button>
          <button onClick={() => { soundManager.click(); erase(); }} className="py-3 rounded-xl bg-sky-100 font-black text-sky-700 active:scale-95 transition-transform cursor-pointer">🩹 Eraser</button>
          <button onClick={() => { soundManager.click(); navigate(1); }} className="py-3 rounded-xl bg-gray-100 font-black text-gray-700 active:scale-95 transition-transform cursor-pointer">Next ➡️</button>
        </div>
        {tab !== 'draw' && (
          <button onClick={done} className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-black text-lg shadow-lg active:scale-[0.98] transition-transform cursor-pointer">
            ✅ I traced it! Earn a star ⭐
          </button>
        )}
      </div>
    </div>
  );
}
