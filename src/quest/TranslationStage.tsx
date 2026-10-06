import { useLearning } from '../state/LearningContext';
import { translationWords } from '../content/translation';
import { partOfSpeechIds, type PartOfSpeech, type TranslationDraft } from '../types';

export function TranslationStage() {
  const { state, quest, t, dispatch } = useLearning();
  if (!state.animal) return null;
  const draft = state.translationDraft;
  const words = translationWords(draft.text);
  const labeled = draft.parts.filter(Boolean).length;
  const update = (changes: Partial<TranslationDraft>) =>
    dispatch({ type: 'translationDraft', draft: { ...draft, ...changes } });

  return (
    <>
      <div className="quest-top">
        <span className="quest-number">03</span>
        <h1>{t('translateTitle')}</h1>
      </div>
      <div className="challenge-card translation-card">
        <p className="activity-hint">{t('translateHint')}</p>
        <p className="question source-sentence">“{quest.animals[state.animal].translation}”</p>
        {!draft.labeling ? (
          <form
            onSubmit={(event) => {
              event.preventDefault();
              if (words.length)
                update({
                  labeling: true,
                  parts: words.map((_, index) => draft.parts[index] || ''),
                });
            }}
          >
            <label className="field-label" htmlFor="kichwa-translation">
              {t('yourTranslation')}
            </label>
            <textarea
              id="kichwa-translation"
              className="answer-input"
              rows={3}
              lang="qu"
              spellCheck={false}
              placeholder={t('translationPlaceholder')}
              value={draft.text}
              onChange={(event) => update({ text: event.target.value, parts: [] })}
            />
            <button className="primary-button media-next" disabled={!words.length}>
              {t('labelWords')} <span aria-hidden="true">→</span>
            </button>
          </form>
        ) : (
          <div className="word-labeling">
            <p className="written-translation" lang="qu">
              {draft.text}
            </p>
            <button
              className="text-button edit-translation"
              onClick={() => update({ labeling: false })}
            >
              {t('editTranslation')}
            </button>
            <h2>{t('labelTitle')}</h2>
            <p className="activity-hint">{t('labelHint')}</p>
            <div className="word-label-list">
              {words.map((word, index) => (
                <div className="word-label-row" key={`${index}-${word}`}>
                  <label htmlFor={`word-part-${index}`}>
                    <span className="word-index">{index + 1}</span>
                    <span lang="qu">{word}</span>
                  </label>
                  <select
                    id={`word-part-${index}`}
                    aria-label={t('partOfSpeech', { number: String(index + 1), word })}
                    value={draft.parts[index] || ''}
                    onChange={(event) => {
                      const parts = [...draft.parts];
                      parts[index] = event.target.value as PartOfSpeech | '';
                      update({ parts });
                    }}
                  >
                    <option value="">{t('selectPart')}</option>
                    {partOfSpeechIds.map((part) => (
                      <option key={part} value={part}>
                        {t(part)}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
            <p className="label-progress" role="status">
              {t('wordsLabeled', { done: String(labeled), total: String(words.length) })}
            </p>
            <button
              className="primary-button media-next"
              disabled={!words.length || labeled !== words.length}
              onClick={() => dispatch({ type: 'translationComplete' })}
            >
              {t('continue')} <span aria-hidden="true">→</span>
            </button>
          </div>
        )}
      </div>
    </>
  );
}
