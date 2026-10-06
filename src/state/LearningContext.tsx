import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
  type Dispatch,
  type ReactNode,
} from 'react';
import { copy, type CopyKey } from '../content/copy';
import { activeQuest } from '../content/quest';
import type { Language, Progress, Quest } from '../types';
import {
  LANGUAGE_KEY,
  STORAGE_KEY,
  loadProgress,
  progressReducer,
  readStorage,
  writeStorage,
  type ProgressAction,
} from './progress';

interface Learning {
  state: Progress;
  dispatch: Dispatch<ProgressAction>;
  language: Language;
  setLanguage: (language: Language) => void;
  quest: Quest;
  t: (key: CopyKey, values?: Record<string, string>) => string;
  questName: string;
  status: string;
}
const LearningContext = createContext<Learning | null>(null);
export function LearningProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(progressReducer, undefined, loadProgress);
  const [language, setLanguage] = useState<Language>(() =>
    readStorage(LANGUAGE_KEY) === 'es' ? 'es' : 'en',
  );
  useEffect(() => {
    writeStorage(STORAGE_KEY, JSON.stringify(state));
  }, [state]);
  useEffect(() => {
    document.documentElement.lang = language;
    writeStorage(LANGUAGE_KEY, language);
  }, [language]);
  const t: Learning['t'] = (key, values = {}) =>
    copy[language][key].replace(/\{(\w+)\}/g, (_, name: string) => values[name] ?? '');
  const labels = {
    intro: t('notStarted'),
    choice: t('chooseAnimal'),
    animal: t('meetForm'),
    quiz: `${t('quest')} 1 / 4`,
    speaking: `${t('quest')} 2 / 4`,
    translation: `${t('quest')} 3 / 4`,
    finding: `${t('quest')} 4 / 4`,
    ending: t('endingAwaits'),
  };
  return (
    <LearningContext.Provider
      value={{
        state,
        dispatch,
        language,
        setLanguage,
        t,
        quest: activeQuest(language),
        questName: language === 'es' ? 'La Primera Madre' : 'First Mother',
        status: state.complete ? t('completed') : labels[state.stage],
      }}
    >
      {children}
    </LearningContext.Provider>
  );
}
export function useLearning() {
  const context = useContext(LearningContext);
  if (!context) throw new Error('LearningProvider is required');
  return context;
}
