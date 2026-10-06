import { useCallback, useEffect, useState } from 'react';
import type { Route } from '../types';
const routes: Route[] = ['learn', 'quests', 'quest', 'profile'];
const readRoute = (): Route =>
  routes.includes(location.hash.slice(1) as Route) ? (location.hash.slice(1) as Route) : 'learn';
export function useHashRoute() {
  const [route, setRoute] = useState<Route>(readRoute);
  const navigate = useCallback((next: Route) => {
    setRoute(next);
    if (location.hash !== `#${next}`) history.replaceState(null, '', `#${next}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);
  useEffect(() => {
    const sync = () => navigate(readRoute());
    sync();
    window.addEventListener('hashchange', sync);
    return () => window.removeEventListener('hashchange', sync);
  }, [navigate]);
  return { route, navigate };
}
