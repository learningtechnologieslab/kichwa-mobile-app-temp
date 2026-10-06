export type Language = 'en' | 'es';
export type Route = 'learn' | 'quests' | 'quest' | 'profile';
export const animalIds = [
  'toucan',
  'monkey',
  'squirrel',
  'snail',
  'crab',
  'woodpecker',
  'turtle',
] as const;
export type AnimalId = (typeof animalIds)[number];
export const stages = [
  'intro',
  'choice',
  'animal',
  'quiz',
  'speaking',
  'translation',
  'finding',
  'ending',
] as const;
export type Stage = (typeof stages)[number];
export const partOfSpeechIds = [
  'noun',
  'verb',
  'adjective',
  'adverb',
  'pronoun',
  'determiner',
  'numeral',
  'conjunction',
  'postposition',
  'interjection',
  'other',
  'unsure',
] as const;
export type PartOfSpeech = (typeof partOfSpeechIds)[number];
export interface TranslationDraft {
  text: string;
  parts: (PartOfSpeech | '')[];
  labeling: boolean;
}
export interface Animal {
  label: string;
  kichwa: string;
  color: string;
  scene: string;
  question: string;
  choices: string[];
  answer: number;
  phrase: string;
  translation: string;
  finding: string;
}
export interface Quest {
  title: string;
  intro: string[];
  choice: string;
  ending: string[];
  animals: Record<AnimalId, Animal>;
}
export interface Progress {
  stage: Stage;
  animal: AnimalId | '';
  quizDone: boolean;
  speakingDone: boolean;
  translationDone: boolean;
  translationDraft: TranslationDraft;
  findingDone: boolean;
  complete: boolean;
  completedOnce: boolean;
}
