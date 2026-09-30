import { useState } from 'react';

export interface LessonInfo {
  title: string;
  description: string;
  duration: string;
  emoji: string;
  points: string[]; // what the child will learn
}

interface LessonModalProps {
  lesson: LessonInfo;
  subjectColor: string; // tailwind gradient e.g. "from-orange-400 to-red-500"
  onClose: () => void;
}

export default function LessonModal({ lesson, subjectColor, onClose }: LessonModalProps) {
  const [started, setStarted] = useState(false);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className={`bg-gradient-to-r ${subjectColor} p-6 text-white relative`}>
          <button
            onClick={onClose}
            aria-label="Close lesson"
            className="absolute top-3 right-3 w-10 h-10 rounded-full bg-white/20 text-white text-xl font-black flex items-center justify-center active:bg-white/40"
          >
            ✕
          </button>
          <div className="text-5xl mb-2">{lesson.emoji}</div>
          <h3 className="text-2xl font-black">{lesson.title}</h3>
          <p className="text-white/90 text-sm mt-1">{lesson.description}</p>
          <div className="flex items-center gap-2 text-xs text-white/80 mt-2">
            <span>⏱️ {lesson.duration}</span>
            <span>•</span>
            <span>📖 Interactive lesson</span>
          </div>
        </div>

        {/* Body */}
        <div className="p-6">
          {!started ? (
            <>
              <h4 className="font-black text-gray-800 mb-3">In this lesson you will learn:</h4>
              <ul className="space-y-2 mb-6">
                {lesson.points.map((p, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-700">
                    <span className="text-green-500 font-black">✓</span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => setStarted(true)}
                className={`w-full py-4 rounded-2xl bg-gradient-to-r ${subjectColor} text-white font-black text-lg shadow-lg active:scale-95 transition-transform`}
              >
                ▶ Start Lesson
              </button>
            </>
          ) : (
            <div className="text-center py-6">
              <div className="text-6xl mb-4">🎉</div>
              <h4 className="text-xl font-black text-gray-800 mb-2">Lesson started!</h4>
              <p className="text-gray-600 mb-6">
                Great choice! The full interactive lesson for <b>{lesson.title}</b> is coming soon.
                Meanwhile, try practicing with our games and flashcards!
              </p>
              <button
                onClick={onClose}
                className="px-8 py-3 rounded-2xl bg-purple-500 text-white font-black shadow-lg active:scale-95 transition-transform"
              >
                Back to Lessons
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
