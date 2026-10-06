import { useEffect, useState } from 'react';
import { useLearning } from '../state/LearningContext';
import { mockTranscripts } from '../content/mocks/mockTranscripts';
function TranscriptionReview({ initialText }: { initialText: string }) {
  const { t, dispatch } = useLearning();
  const [ready, setReady] = useState(false);
  const [transcript, setTranscript] = useState(initialText);
  useEffect(() => {
    // Simulate processing for the feature test. No transcription service or speech API is used.
    const timer = window.setTimeout(() => setReady(true), 900);
    return () => window.clearTimeout(timer);
  }, []);
  if (!ready)
    return (
      <p className="transcribing" role="status">
        {t('transcribing')}
      </p>
    );
  return (
    <form
      className="transcription-review"
      onSubmit={(event) => {
        event.preventDefault();
        if (transcript.trim()) dispatch({ type: 'speakingComplete' });
      }}
    >
      <label className="field-label" htmlFor="transcription">
        {t('transcription')}
      </label>
      <p id="transcription-hint" className="activity-hint">
        {t('reviewTranscription')}
      </p>
      <textarea
        id="transcription"
        className="answer-input"
        aria-describedby="transcription-hint"
        value={transcript}
        lang="qu"
        spellCheck={false}
        rows={3}
        onChange={(event) => setTranscript(event.target.value)}
      />
      <button className="primary-button media-next" disabled={!transcript.trim()}>
        {t('confirmTranscription')} <span aria-hidden="true">→</span>
      </button>
    </form>
  );
}
export function SpeakingStage() {
  const { state, quest, t } = useLearning();
  // HCI experiment: these states simulate recording without accessing a microphone.
  const [status, setStatus] = useState<'idle' | 'recording' | 'review'>('idle');
  if (!state.animal) return null;
  const animal = quest.animals[state.animal];
  return (
    <>
      <div className="quest-top">
        <span className="quest-number">02</span>
        <h1>{t('sayAloud')}</h1>
      </div>
      <div className="practice-card">
        {status !== 'review' && (
          <>
            <p className="phrase">“{animal.phrase}”</p>
            <p className="translation">{animal.translation}</p>
          </>
        )}
        <div className="recording-actions">
          <button
            className={`record-button${status === 'recording' ? ' recording' : ''}`}
            onClick={() => setStatus(status === 'recording' ? 'review' : 'recording')}
          >
            <span />
            {t(
              status === 'recording'
                ? 'stopRecording'
                : status === 'review'
                  ? 'recordAgain'
                  : 'record',
            )}
          </button>
        </div>
        {status !== 'review' && (
          <div className="recording-status">
            <p role="status">{t(status === 'recording' ? 'recording' : 'practiceHint')}</p>
          </div>
        )}
        {status === 'review' && <TranscriptionReview initialText={mockTranscripts[state.animal]} />}
      </div>
    </>
  );
}
