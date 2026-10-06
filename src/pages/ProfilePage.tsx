import { useLearning } from '../state/LearningContext';
export function ProfilePage({ explore }: { explore: () => void }) {
  const { state, t, status, questName } = useLearning();
  const complete = state.complete || state.completedOnce;
  const note = complete
    ? t('completedQuest')
    : state.stage !== 'intro'
      ? `${status} · ${questName}`
      : t('chooseQuest');
  return (
    <section className="view active profile-view" id="profile" aria-labelledby="profile-title">
      <div className="profile-card">
        <h1 id="profile-title">{t('hello')}</h1>
        <div className="profile-stats">
          <div>
            <strong>{complete ? 1 : 0}</strong>
            <span>{t('quests')}</span>
          </div>
          <div>
            <strong>
              {
                [
                  state.quizDone,
                  state.speakingDone,
                  state.translationDone,
                  state.findingDone,
                ].filter(Boolean).length
              }
            </strong>
            <span>{t('activities')}</span>
          </div>
          <div>
            <strong>{state.animal ? 3 : 0}</strong>
            <span>{t('words')}</span>
          </div>
        </div>
        <p className="profile-note">{note}</p>
        <button className="primary-button" onClick={explore}>
          <span>{t('exploreQuests')}</span>
          <span aria-hidden="true">→</span>
        </button>
      </div>
    </section>
  );
}
