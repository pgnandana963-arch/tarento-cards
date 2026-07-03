import { QueryProvider } from './providers/QueryProvider';
import { AuthProvider } from './providers/AuthProvider';
import { AppRouter } from './AppRouter';

export function App() {
  return QueryProvider({
    children: AuthProvider({
      children: AppRouter(),
    }),
  });
}