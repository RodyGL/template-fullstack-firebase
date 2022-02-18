import { AppProvider } from './AppProvider';
import { Router } from './routes';

export function App() {
  return (
    <AppProvider>
      <Router />
    </AppProvider>
  );
}
