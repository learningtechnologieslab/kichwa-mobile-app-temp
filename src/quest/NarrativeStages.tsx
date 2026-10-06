import { useLearning } from '../state/LearningContext';
import { animalIds } from '../types';
export function IntroStage() {
  const { quest, t, dispatch } = useLearning();
  return (
    <div className="quest-copy">
      <h1>{t('standTitle')}</h1>
      {quest.intro.map((text) => (
        <p key={text}>{text}</p>
      ))}
      <button className="primary-button quest-next" onClick={() => dispatch({ type: 'continue' })}>
        {t('continueArrow')} <span aria-hidden="true">→</span>
      </button>
    </div>
  );
}
export function ChoiceStage() {
  const { quest, t, dispatch } = useLearning();
  return (
    <div className="quest-copy choice-copy">
      <h1>{t('chooseTitle')}</h1>
      <p>{quest.choice}</p>
      <div className="animal-grid">
        {animalIds.map((id) => (
          <button
            key={id}
            className={`animal-choice ${quest.animals[id].color}`}
            onClick={() => dispatch({ type: 'choose', animal: id })}
          >
            <strong>{quest.animals[id].label}</strong>
            <small>{quest.animals[id].kichwa}</small>
          </button>
        ))}
      </div>
    </div>
  );
}
export function AnimalStage() {
  const { quest, state, t, dispatch } = useLearning();
  if (!state.animal) return null;
  const animal = quest.animals[state.animal];
  return (
    <>
      <div className={`animal-banner ${animal.color}`}>
        <div>
          <h2>{animal.label}</h2>
          <p>{animal.kichwa}</p>
        </div>
      </div>
      <div className="quest-copy">
        <h1>{t('forestTitle')}</h1>
        <p>{animal.scene}</p>
        <button
          className="primary-button quest-next"
          onClick={() => dispatch({ type: 'continue' })}
        >
          {t('beginQuests')} <span aria-hidden="true">→</span>
        </button>
      </div>
    </>
  );
}
export function EndingStage({ back }: { back: () => void }) {
  const { quest, state, t, dispatch } = useLearning();
  if (!state.animal) return null;
  return (
    <div className="quest-copy ending-copy">
      <h1>{t('endingTitle')}</h1>
      {quest.ending.map((text) => (
        <p key={text}>{text}</p>
      ))}
      <div className="completion-note">
        <div>
          <strong>{t('questComplete')}</strong>
          <p>{t('learnedPath', { animal: quest.animals[state.animal].label.toLowerCase() })}</p>
        </div>
      </div>
      <div className="completion-actions">
        <button className="secondary-button" onClick={() => dispatch({ type: 'replay' })}>
          {t('playAgain')} <span aria-hidden="true">↻</span>
        </button>
        <button className="primary-button" onClick={back}>
          {t('backQuests')} <span aria-hidden="true">→</span>
        </button>
      </div>
    </div>
  );
}
