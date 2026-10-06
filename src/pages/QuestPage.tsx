import { useLearning } from '../state/LearningContext';
import { progressPercent } from '../state/progress';
import { IntroStage, ChoiceStage, AnimalStage, EndingStage } from '../quest/NarrativeStages';
import { QuizStage } from '../quest/QuizStage';
import { SpeakingStage } from '../quest/SpeakingStage';
import { FindingStage } from '../quest/FindingStage';
import { TranslationStage } from '../quest/TranslationStage';
export function QuestPage({ back }: { back: () => void }) {
  const { state, t, language, status } = useLearning();
  return (
    <section className="view active quest-view" id="quest" aria-labelledby="quest-title">
      <header className="quest-header">
        <button className="back-button" onClick={back} aria-label={t('backQuests')}>
          ←
        </button>
        <div>
          <h2 id="quest-title">{t('questBegins')}</h2>
        </div>
        <button className="exit-quest" onClick={back}>
          {t('saveExit')}
        </button>
      </header>
      <div className="progress-wrap">
        <div
          className="progress-bar"
          role="progressbar"
          aria-label={language === 'en' ? 'Quest progress' : 'Progreso del reto'}
          aria-valuenow={progressPercent(state)}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuetext={status}
        >
          <span style={{ width: `${progressPercent(state)}%` }} />
        </div>
        <span>{status}</span>
      </div>
      <article className="quest-panel">
        {state.stage === 'intro' && <IntroStage />}
        {state.stage === 'choice' && <ChoiceStage />}
        {state.stage === 'animal' && <AnimalStage />}
        {state.stage === 'quiz' && <QuizStage />}
        {state.stage === 'speaking' && <SpeakingStage />}
        {state.stage === 'translation' && <TranslationStage />}
        {state.stage === 'finding' && <FindingStage />}
        {state.stage === 'ending' && <EndingStage back={back} />}
      </article>
    </section>
  );
}
