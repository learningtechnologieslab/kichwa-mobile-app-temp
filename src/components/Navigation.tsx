import type { Route } from '../types';
import { useLearning } from '../state/LearningContext';
export type NavigationProps = { route: Route; navigate: (route: Route) => void };
export function Navigation({
  route,
  navigate,
  mobile = false,
}: NavigationProps & { mobile?: boolean }) {
  const { t, language } = useLearning();
  const active = route === 'quest' ? 'quests' : route;
  return (
    <nav
      className={mobile ? 'mobile-nav' : 'main-nav'}
      aria-label={language === 'es' ? 'Navegación principal' : 'Primary navigation'}
    >
      {(['learn', 'quests', 'profile'] as const).map((item, i) => (
        <a
          key={item}
          href={`#${item}`}
          className={`${mobile ? 'mobile-link' : 'nav-link'}${active === item ? ' active' : ''}`}
          aria-current={active === item ? 'page' : undefined}
          onClick={(event) => {
            event.preventDefault();
            navigate(item);
          }}
        >
          <span className={mobile ? undefined : 'nav-icon'} aria-hidden="true">
            {['⌂', '▤', '◔'][i]}
          </span>
          {mobile ? <b>{t(item)}</b> : <span>{t(item)}</span>}
        </a>
      ))}
    </nav>
  );
}
