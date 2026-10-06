import { Navigation } from './components/Navigation';
import { useHashRoute } from './hooks/useHashRoute';
import { LearningProvider, useLearning } from './state/LearningContext';
import { LearnPage } from './pages/LearnPage';
import { QuestsPage } from './pages/QuestsPage';
import { QuestPage } from './pages/QuestPage';
import { ProfilePage } from './pages/ProfilePage';
function Shell() {
  const { route, navigate } = useHashRoute();
  const { language, setLanguage } = useLearning();
  return (
    <>
      <div
        className="language-switcher"
        role="group"
        aria-label={language === 'en' ? 'Language selector' : 'Selector de idioma'}
      >
        {(['en', 'es'] as const).map((item) => (
          <button
            key={item}
            className={`language-option${item === language ? ' active' : ''}`}
            aria-pressed={item === language}
            onClick={() => setLanguage(item)}
          >
            {item.toUpperCase()}
          </button>
        ))}
      </div>
      <div className="app-shell">
        <aside className="sidebar">
          <Navigation route={route} navigate={navigate} />
        </aside>
        <main>
          <div className="page-area" key={route}>
            {route === 'learn' && <LearnPage start={() => navigate('quest')} />}
            {route === 'quests' && <QuestsPage open={() => navigate('quest')} />}
            {route === 'quest' && <QuestPage back={() => navigate('quests')} />}
            {route === 'profile' && <ProfilePage explore={() => navigate('quests')} />}
          </div>
        </main>
        <Navigation route={route} navigate={navigate} mobile />
      </div>
    </>
  );
}
export default function App() {
  return (
    <LearningProvider>
      <Shell />
    </LearningProvider>
  );
}
