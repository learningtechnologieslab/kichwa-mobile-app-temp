import { useLearning } from '../state/LearningContext';
export function LearnPage({ start }: { start: () => void }) {
  const { language, t } = useLearning();
  return (
    <section className="view active" id="learn" aria-labelledby="learn-title">
      <div className="learn-hero home-minimal">
        <div className="learn-copy">
          <h1 id="learn-title">
            {language === 'en' ? 'Learn through' : 'Aprende con'}
            <br />
            <span>{language === 'en' ? 'living quests.' : 'retos vivos.'}</span>
          </h1>
          <button className="primary-button" onClick={start}>
            <span>{t('startLearning')}</span>
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>
    </section>
  );
}
