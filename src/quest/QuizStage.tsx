import { useState } from 'react';
import { useLearning } from '../state/LearningContext';
export function QuizStage() {
  const { state, quest, t, dispatch } = useLearning();
  const [answer, setAnswer] = useState<number | null>(null);
  if (!state.animal) return null;
  const animal = quest.animals[state.animal];
  const correct = answer === animal.answer;
  return (
    <>
      <div className="quest-top">
        <span className="quest-number">01</span>
        <h1>{t('findWord')}</h1>
      </div>
      <div className="challenge-card">
        <p className="question">{animal.question}</p>
        <div className="answer-list">
          {animal.choices.map((choice, index) => (
            <button
              key={choice}
              disabled={answer !== null}
              className={`answer-option${answer !== null && index === animal.answer ? ' correct' : answer === index ? ' incorrect' : ''}`}
              onClick={() => setAnswer(index)}
            >
              <span>{String.fromCharCode(65 + index)}</span> {choice}
            </button>
          ))}
        </div>
        <p
          className={`answer-feedback${answer === null ? '' : correct ? ' is-correct' : ' is-incorrect'}`}
          aria-live="polite"
        >
          {answer !== null &&
            (correct ? t('correct') : t('answerIs', { answer: animal.choices[animal.answer] }))}
        </p>
        {answer !== null && (
          <button
            className="primary-button challenge-next"
            onClick={() => dispatch({ type: 'quizComplete' })}
          >
            {t('nextQuest')} <span aria-hidden="true">→</span>
          </button>
        )}
      </div>
    </>
  );
}
