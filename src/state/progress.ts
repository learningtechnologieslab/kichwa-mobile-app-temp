import {
  animalIds,
  stages,
  partOfSpeechIds,
  type AnimalId,
  type Progress,
  type TranslationDraft,
} from '../types';
import { translationWords } from '../content/translation';

export const STORAGE_KEY = 'kichwa-first-mother-progress';
export const LANGUAGE_KEY = 'kichwa-language';
export const newProgress = (): Progress => ({
  stage: 'intro',
  animal: '',
  quizDone: false,
  speakingDone: false,
  translationDone: false,
  translationDraft: { text: '', parts: [], labeling: false },
  findingDone: false,
  complete: false,
  completedOnce: false,
});
export function readStorage(key: string) {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}
export function writeStorage(key: string, value: string) {
  try {
    localStorage.setItem(key, value);
  } catch {
    /* Continue in memory when storage is unavailable. */
  }
}
export function loadProgress(): Progress {
  try {
    const saved = JSON.parse(readStorage(STORAGE_KEY) || '{}');
    const initial = newProgress();
    if (!saved || typeof saved !== 'object' || Array.isArray(saved)) return initial;
    const completedOnce = saved.completedOnce === true || saved.complete === true;
    if (!stages.includes(saved.stage)) return { ...initial, completedOnce };
    if (saved.stage === 'intro' || saved.stage === 'choice')
      return { ...initial, stage: saved.stage, completedOnce };
    if (!animalIds.includes(saved.animal)) return { ...initial, completedOnce };
    // Normalize legacy saves made between activity completion and a delayed stage change.
    let stage = saved.stage as Progress['stage'];
    if (stage === 'speaking' && saved.speakingDone === true) stage = 'translation';
    if (stage === 'translation' && saved.translationDone === true) stage = 'finding';
    if (stage === 'finding' && saved.findingDone === true) stage = 'ending';
    const index = stages.indexOf(stage);
    const text =
      typeof saved.translationDraft?.text === 'string' ? saved.translationDraft.text : '';
    const parts = translationWords(text).map((_, wordIndex) => {
      const part = saved.translationDraft?.parts?.[wordIndex];
      return partOfSpeechIds.includes(part) ? part : '';
    });
    return {
      stage,
      animal: saved.animal,
      quizDone: index >= 4,
      speakingDone: index >= 5,
      translationDone: index >= 6,
      translationDraft: {
        text,
        parts,
        labeling: parts.length > 0 && saved.translationDraft?.labeling === true,
      },
      findingDone: stage === 'ending',
      complete: stage === 'ending',
      completedOnce: completedOnce || stage === 'ending',
    };
  } catch {
    return newProgress();
  }
}
export type ProgressAction =
  | { type: 'continue' }
  | { type: 'choose'; animal: AnimalId }
  | { type: 'quizComplete' }
  | { type: 'speakingComplete' }
  | { type: 'translationDraft'; draft: TranslationDraft }
  | { type: 'translationComplete' }
  | { type: 'findingComplete' }
  | { type: 'replay' };
export function progressReducer(state: Progress, action: ProgressAction): Progress {
  switch (action.type) {
    case 'continue':
      return state.stage === 'intro'
        ? { ...state, stage: 'choice' }
        : state.stage === 'animal'
          ? { ...state, stage: 'quiz' }
          : state;
    case 'choose':
      return state.stage === 'choice'
        ? {
            ...newProgress(),
            completedOnce: state.completedOnce,
            animal: action.animal,
            stage: 'animal',
          }
        : state;
    case 'quizComplete':
      return state.stage === 'quiz' ? { ...state, quizDone: true, stage: 'speaking' } : state;
    case 'speakingComplete':
      return state.stage === 'speaking'
        ? { ...state, speakingDone: true, stage: 'translation' }
        : state;
    case 'translationDraft':
      return state.stage === 'translation' ? { ...state, translationDraft: action.draft } : state;
    case 'translationComplete':
      return state.stage === 'translation'
        ? { ...state, translationDone: true, stage: 'finding' }
        : state;
    case 'findingComplete':
      return state.stage === 'finding'
        ? { ...state, findingDone: true, complete: true, completedOnce: true, stage: 'ending' }
        : state;
    case 'replay':
      return { ...newProgress(), completedOnce: state.completedOnce || state.complete };
  }
}
export function progressCount(state: Progress) {
  return state.complete
    ? 6
    : state.findingDone
      ? 5
      : state.translationDone
        ? 4
        : state.speakingDone
          ? 3
          : state.quizDone
            ? 2
            : state.animal
              ? 1
              : state.stage === 'intro'
                ? 0
                : 0.5;
}
export function progressPercent(state: Progress) {
  return Math.round((progressCount(state) / 6) * 100);
}
