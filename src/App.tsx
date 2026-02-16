import { Global } from '@emotion/react';
import { globalStyles } from './theme';
import { AppProvider, useApp } from './context/AppContext';
import { SkeletonCard } from './ui';
import PageLayout from './layouts/PageLayout';
import LogEntryPage from './pages/LogEntry/LogEntryPage';
import DashboardPage from './pages/Dashboard/DashboardPage';
import SchemaManagerPage from './pages/SchemaManager/SchemaManagerPage';
import { spacing } from './theme';

function PageRouter() {
  const { state } = useApp();

  if (state.isLoading) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.md }}>
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
    );
  }

  switch (state.currentPage) {
    case 'log': return <LogEntryPage />;
    case 'dashboard': return <DashboardPage />;
    case 'schema': return <SchemaManagerPage />;
    default: return <LogEntryPage />;
  }
}

export default function App() {
  return (
    <AppProvider>
      <Global styles={globalStyles} />
      <PageLayout>
        <PageRouter />
      </PageLayout>
    </AppProvider>
  );
}
