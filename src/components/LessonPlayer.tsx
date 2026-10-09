import { useState } from 'react';
import useModalFocus from '../hooks/useModalFocus';
import { Lesson } from '../types';
import { speak } from '../utils/store';
import { soundManager } from '../utils/sounds';

export interface SimpleLesson {
  id: string;
  title: string;
  unit: string;
  duration: number;
  difficulty: 'easy' | 'medium' | 'hard';
  explanation: string;
  examples: string[];
  activities: string[];
  questions: { id: string; type: string; question: string; options?: string[]; answer: string }[];
}

interface LessonPlayerProps {
  lesson: Lesson | SimpleLesson;
  subjectColor: string; // tailwind gradient e.g. "from-orange-400 to-red-500"
  onClose: () => void;
  onComplete?: (scorePercent: number) => void;
}

type Step = 'learn' | 'examples' | 'practice' | 'done';

export default function LessonPlayer({ lesson, subjectColor, onClose, onComplete }: LessonPlayerProps) {
  const [step, setStep] = useState<Step>('learn');
  const [qIndex, setQIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [fillValue, setFillValue] = useState('');
  const [answered, setAnswered] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);

  const questions = (lesson.questions || []) as { id: string; type: string; question: string; options?: string[]; answer: string }[];
  const q = questions[qIndex];
  const totalSteps = questions.length;

  const isCorrect = (answer: string): boolean => {
    if (!q) return false;
    return answer.trim().toLowerCase() === q.answer.trim().toLowerCase();
  };

  const submitAnswer = () => {
    if (!q || answered) return;
    const answer = q.type === 'fill' ? fillValue : selected;
    if (answer == null || answer === '') return;
    setAnswered(true);
    if (isCorrect(answer)) {
      setCorrectCount((c) => c + 1);
      soundManager.correct();
    } else {
      soundManager.wrong();
    }
  };

  const nextQuestion = () => {
    setAnswered(false);
    setSelected(null);
    setFillValue('');
    if (qIndex + 1 < totalSteps) {
      setQIndex(qIndex + 1);
    } else {
      const pct = Math.round((correctCount / Math.max(totalSteps, 1)) * 100);
      onComplete?.(pct);
      setStep('done');
      if (totalSteps > 0 && correctCount === totalSteps) soundManager.celebrate();
    }
  };

  const restart = () => {
    setStep('learn');
    setQIndex(0);
    setSelected(null);
    setFillValue('');
    setAnswered(false);
    setCorrectCount(0);
  };

  const stepIndex = ['learn', 'examples', 'practice', 'done'].indexOf(step);
  const stars = step === 'done' ? (correctCount === totalSteps ? 3 : correctCount >= totalSteps / 2 ? 2 : 1) : 0;

  const overlayRef = useModalFocus(true, onClose);

  return (
    <div
      ref={overlayRef}
      tabIndex={-1}
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 bg-black/60 overflow-y-auto outline-none"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="bg-white rounded-3xl shadow-2xl w-full max-w-lg my-4 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className={`bg-gradient-to-r ${subjectColor} p-4 sm:p-5 text-white relative`}>
          <button
            onClick={onClose}
            aria-label="Close lesson"
            className="absolute top-2 right-2 w-10 h-10 rounded-full bg-white/20 text-white text-xl font-black flex items-center justify-center active:bg-white/40"
          >
            ✕
          </button>
          <div className="flex items-center gap-3 pr-10">
            <span className="text-3xl">{lesson.difficulty === 'easy' ? '🌱' : lesson.difficulty === 'medium' ? '⭐' : '🏆'}</span>
            <div>
              <h3 className="text-lg sm:text-xl font-black leading-tight">{lesson.title}</h3>
              <p className="text-white/80 text-xs">{lesson.unit} • {lesson.duration} min</p>
            </div>
          </div>
          {/* Progress dots */}
          <div className="flex gap-2 mt-3">
            {['Learn', 'Examples', 'Practice', 'Done'].map((label, i) => (
              <div key={label} className="flex-1">
                <div className={`h-2 rounded-full ${i <= stepIndex ? 'bg-white' : 'bg-white/30'}`} />
                <p className="text-[10px] text-white/80 mt-1 text-center">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Body */}
        <div className="p-4 sm:p-6 max-h-[60vh] overflow-y-auto overscroll-contain">
          {step === 'learn' && (
            <>
              <h4 className="font-black text-gray-800 mb-2 text-lg">📖 Let's Learn</h4>
              <p className="text-gray-700 text-base leading-relaxed mb-4">{lesson.explanation}</p>
              <button
                onClick={() => speak(lesson.explanation)}
                className="mb-4 px-4 py-2 rounded-xl bg-blue-100 text-blue-700 font-bold text-sm active:scale-95 transition-transform"
              >
                🔊 Listen to me read it
              </button>
              <div className="bg-purple-50 border-2 border-purple-100 rounded-2xl p-4 mb-2">
                <h5 className="font-black text-purple-700 mb-2 text-sm">🎨 Try this activity:</h5>
                <ul className="space-y-1.5">
                  {lesson.activities.map((a, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                      <span>{i + 1}.</span><span>{a}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <button
                onClick={() => { soundManager.click(); setStep('examples'); }}
                className={`w-full mt-4 py-4 rounded-2xl bg-gradient-to-r ${subjectColor} text-white font-black text-lg shadow-lg active:scale-95 transition-transform`}
              >
                Next: Examples →
              </button>
            </>
          )}

          {step === 'examples' && (
            <>
              <h4 className="font-black text-gray-800 mb-3 text-lg">💡 Examples</h4>
              <ul className="space-y-2.5 mb-4">
                {lesson.examples.map((ex, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-3"
                  >
                    <button
                      onClick={() => speak(ex)}
                      aria-label="Read example aloud"
                      className="shrink-0 w-8 h-8 rounded-full bg-yellow-400 text-white text-sm flex items-center justify-center active:scale-90 transition-transform"
                    >
                      🔊
                    </button>
                    <span className="text-gray-800 text-sm sm:text-base pt-1">{ex}</span>
                  </li>
                ))}
              </ul>
              <div className="flex gap-3">
                <button
                  onClick={() => { soundManager.click(); setStep('learn'); }}
                  className="px-5 py-3 rounded-2xl bg-gray-100 text-gray-700 font-bold active:scale-95 transition-transform"
                >
                  ← Back
                </button>
                <button
                  onClick={() => { soundManager.click(); setStep('practice'); }}
                  className={`flex-1 py-3 rounded-2xl bg-gradient-to-r ${subjectColor} text-white font-black text-lg shadow-lg active:scale-95 transition-transform`}
                >
                  Start Practice ({totalSteps} question{totalSteps === 1 ? '' : 's'}) →
                </button>
              </div>
            </>
          )}

          {step === 'practice' && q && (
            <>
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-black text-gray-800 text-lg">✏️ Question {qIndex + 1} of {totalSteps}</h4>
                <span className="text-sm font-bold text-green-600">✓ {correctCount}</span>
              </div>
              <p className="text-gray-800 text-base sm:text-lg font-bold mb-4">{q.question}</p>

              {q.type === 'fill' ? (
                <input
                  type="text"
                  value={fillValue}
                  onChange={(e) => setFillValue(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') { answered ? nextQuestion() : submitAnswer(); } }}
                  disabled={answered}
                  placeholder="Type your answer..."
                  className="w-full p-4 rounded-2xl border-4 border-gray-200 focus:border-purple-400 outline-none text-lg font-bold mb-3 disabled:bg-gray-50"
                  autoFocus
                />
              ) : (
                <div className="grid gap-2.5 mb-3">
                  {(q.options && q.options.length > 0 ? q.options : [q.answer]).map((opt) => {
                    let cls = 'bg-white border-gray-200 text-gray-800 active:scale-[0.98]';
                    if (answered) {
                      if (opt.toLowerCase() === q.answer.toLowerCase()) cls = 'bg-green-100 border-green-500 text-green-800';
                      else if (opt === selected) cls = 'bg-red-100 border-red-400 text-red-700';
                      else cls = 'bg-white border-gray-100 text-gray-400';
                    } else if (opt === selected) {
                      cls = 'bg-purple-100 border-purple-500 text-purple-800';
                    }
                    return (
                      <button
                        key={opt}
                        onClick={() => { if (!answered) { soundManager.click(); setSelected(opt); } }}
                        disabled={answered}
                        className={`w-full text-left p-4 rounded-2xl border-4 font-bold transition-all ${cls}`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              )}

              {answered && (
                <div className={`rounded-2xl p-3 mb-3 font-bold ${isCorrect(q.type === 'fill' ? fillValue : (selected ?? '')) ? 'bg-green-100 text-green-700' : 'bg-red-50 text-red-600'}`}>
                  {isCorrect(q.type === 'fill' ? fillValue : (selected ?? ''))
                    ? '🎉 Correct! Well done!'
                    : `❌ Not quite. The answer is: ${q.answer}`}
                </div>
              )}

              {!answered ? (
                <button
                  onClick={submitAnswer}
                  disabled={q.type === 'fill' ? !fillValue.trim() : !selected}
                  className={`w-full py-4 rounded-2xl font-black text-lg shadow-lg transition-transform active:scale-95 ${
                    (q.type === 'fill' ? !fillValue.trim() : !selected)
                      ? 'bg-gray-200 text-gray-400'
                      : `bg-gradient-to-r ${subjectColor} text-white`
                  }`}
                >
                  Check Answer ✓
                </button>
              ) : (
                <button
                  onClick={nextQuestion}
                  className={`w-full py-4 rounded-2xl bg-gradient-to-r ${subjectColor} text-white font-black text-lg shadow-lg active:scale-95 transition-transform`}
                >
                  {qIndex + 1 < totalSteps ? 'Next Question →' : 'Finish Lesson 🏁'}
                </button>
              )}
            </>
          )}

          {step === 'done' && (
            <div className="text-center py-4">
              <div className="text-6xl mb-3">{stars === 3 ? '🏆' : stars >= 2 ? '🎉' : '💪'}</div>
              <h4 className="text-2xl font-black text-gray-800 mb-1">Lesson Complete!</h4>
              <div className="text-4xl mb-3">
                {'★'.repeat(stars)}{'☆'.repeat(3 - stars)}
              </div>
              <p className="text-gray-600 mb-1">
                You got <b className="text-green-600">{correctCount}</b> out of <b>{totalSteps}</b> correct!
              </p>
              <p className="text-gray-500 text-sm mb-6">
                {stars === 3 ? 'Perfect! You are a superstar! ⭐' : stars >= 2 ? 'Great job! Keep practicing!' : 'Good try! Review the examples and try again!'}
              </p>
              <div className="flex gap-3">
                <button
                  onClick={restart}
                  className="flex-1 py-3 rounded-2xl bg-gray-100 text-gray-700 font-black active:scale-95 transition-transform"
                >
                  🔄 Try Again
                </button>
                <button
                  onClick={onClose}
                  className={`flex-1 py-3 rounded-2xl bg-gradient-to-r ${subjectColor} text-white font-black shadow-lg active:scale-95 transition-transform`}
                >
                  Back to Lessons
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
