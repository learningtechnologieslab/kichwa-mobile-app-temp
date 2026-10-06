import { useLearning } from '../state/LearningContext';
import { progressPercent } from '../state/progress';
export function QuestsPage({ open }: { open: () => void }) {
  const { state, language, t, questName } = useLearning();
  const unlocked = state.complete || state.completedOnce;
  const percent = progressPercent(state);
  return (
    <section className="view active" id="quests" aria-labelledby="quests-title">
      <header className="section-heading">
        <h1 id="quests-title">
          {language === 'en' ? 'Choose your' : 'Elige tu'}
          <br />
          <span>{language === 'en' ? 'next quest.' : 'próximo reto.'}</span>
        </h1>
        <p>{t('questsIntro')}</p>
      </header>
      <div className="quest-grid">
        <article className="quest-card">
          <div className="quest-card-content">
            <div className="quest-card-meta">
              <span className={`quest-status${unlocked ? ' done' : ''}`}>
                {t(unlocked ? 'completed' : 'locked')}
              </span>
              <span>{unlocked ? '6 / 6' : `${percent}%`}</span>
            </div>
            <h2>{questName}</h2>
            <p>{t(unlocked ? 'cardDescription' : 'completeToUnlock')}</p>
            <div className="card-progress" aria-hidden="true">
              <span style={{ width: `${unlocked ? 100 : percent}%` }} />
            </div>
            <button className="secondary-button quest-launch" disabled={!unlocked} onClick={open}>
              {t(unlocked ? 'readAgain' : 'unlockQuest')} <span aria-hidden="true">→</span>
            </button>
          </div>
        </article>
      </div>
    </section>
  );
}
