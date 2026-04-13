import { Suspense } from 'react';
import { useRoutes } from 'react-router-dom';
import { appRoutes } from './routes';
import { CursorGlow } from './components/common/CursorGlow';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import { AppShellLoader } from './components/common/Loader';

function App() {
  const routes = useRoutes(appRoutes);

  return (
    <ErrorBoundary>
      <CursorGlow />
      <Suspense fallback={<AppShellLoader />}>{routes}</Suspense>
    </ErrorBoundary>
  );
}

export default App;
