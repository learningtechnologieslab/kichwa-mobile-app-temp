import { describe, expect, it, vi } from 'vitest';
import { loadProgress, newProgress, progressReducer, STORAGE_KEY, writeStorage } from './progress';
describe('legacy progress and transitions', () => {
  it.each(['null', '[]', '{', '{"stage":"wrong"}', '{"stage":"quiz","animal":"missing"}'])(
    'recovers from invalid save %s',
    (value) => {
      localStorage.setItem(STORAGE_KEY, value);
      expect(loadProgress()).toEqual(newProgress());
    },
  );
  it('resumes legacy progress without changing keys', () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ stage: 'speaking', animal: 'snail', quizDone: true }),
    );
    expect(loadProgress()).toMatchObject({
      stage: 'speaking',
      animal: 'snail',
      quizDone: true,
      speakingDone: false,
    });
  });
  it('recovers legacy saves between delayed transitions', () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ stage: 'finding', animal: 'turtle', findingDone: true }),
    );
    expect(loadProgress()).toMatchObject({ stage: 'ending', complete: true, completedOnce: true });
  });
  it('keeps first completion through replay and animal selection', () => {
    let state = newProgress();
    state = progressReducer(state, { type: 'continue' });
    state = progressReducer(state, { type: 'choose', animal: 'toucan' });
    state = progressReducer(state, { type: 'continue' });
    state = progressReducer(state, { type: 'quizComplete' });
    state = progressReducer(state, { type: 'speakingComplete' });
    expect(state.stage).toBe('translation');
    state = progressReducer(state, { type: 'translationComplete' });
    state = progressReducer(state, { type: 'findingComplete' });
    expect(state.complete).toBe(true);
    state = progressReducer(state, { type: 'replay' });
    state = progressReducer(state, { type: 'continue' });
    state = progressReducer(state, { type: 'choose', animal: 'monkey' });
    expect(state).toMatchObject({
      completedOnce: true,
      complete: false,
      animal: 'monkey',
      quizDone: false,
    });
  });
  it('ignores out-of-order activity completion', () => {
    expect(progressReducer(newProgress(), { type: 'findingComplete' })).toEqual(newProgress());
  });
  it('resumes a translation draft and drops unsupported part-of-speech values', () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        stage: 'translation',
        animal: 'toucan',
        translationDraft: {
          text: 'Ñuka muyuta mikuni.',
          parts: ['pronoun', 'bad', 'verb'],
          labeling: true,
        },
      }),
    );
    expect(loadProgress()).toMatchObject({
      speakingDone: true,
      translationDone: false,
      translationDraft: {
        text: 'Ñuka muyuta mikuni.',
        parts: ['pronoun', '', 'verb'],
        labeling: true,
      },
    });
  });
  it('works when storage is unavailable', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('blocked');
    });
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('blocked');
    });
    expect(loadProgress()).toEqual(newProgress());
    expect(() => writeStorage(STORAGE_KEY, '{}')).not.toThrow();
  });
});
