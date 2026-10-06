import { useLearning } from '../state/LearningContext';
import { usePhoto } from '../hooks/usePhoto';
export function FindingStage() {
  const { state, quest, t, dispatch } = useLearning();
  const { photoUrl, select } = usePhoto();
  if (!state.animal) return null;
  return (
    <>
      <div className="quest-top">
        <span className="quest-number">04</span>
        <h1>{t('findNearby')}</h1>
      </div>
      <div className="finding-card">
        <p>{quest.animals[state.animal].finding}</p>
        <label className="upload-button" htmlFor="photoInput">
          {t('takePhoto')} <span aria-hidden="true">→</span>
          <input
            id="photoInput"
            className="photo-input"
            type="file"
            accept="image/*"
            capture="environment"
            onChange={(event) => {
              select(event.target.files?.[0]);
              event.target.value = '';
            }}
          />
        </label>
        <button
          className="text-button finding-skip"
          onClick={() => dispatch({ type: 'findingComplete' })}
        >
          {t('foundIt')}
        </button>
        <div id="photoPreview">
          {photoUrl && (
            <>
              <img src={photoUrl} alt={t('foundIt')} />
              <span role="status">{t('photoAdded')}</span>
              <button
                className="primary-button media-next"
                onClick={() => dispatch({ type: 'findingComplete' })}
              >
                {t('continue')} <span aria-hidden="true">→</span>
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}
