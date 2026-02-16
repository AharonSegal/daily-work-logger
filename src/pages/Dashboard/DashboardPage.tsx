import styled from '@emotion/styled';
import { FileText, FileJson } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import useDashboard from '../../hooks/useDashboard';
import { Button, Select, EmptyState } from '../../ui';
import { colors, spacing, typography } from '../../theme';
import { media } from '../../theme/breakpoints';
import { exportCSV, exportSchemaJSON } from '../../services/exportService';
import { BarChart3 } from 'lucide-react';
import StatCards from './components/StatCards';
import Charts from './components/Charts';
import EntryHistory from './components/EntryHistory';

const ExportRow = styled.div`
  display: flex;
  gap: ${spacing.sm};
  flex-wrap: wrap;
  margin-bottom: ${spacing.lg};
`;

const FilterRow = styled.div`
  display: flex;
  gap: ${spacing.sm};
  flex-wrap: wrap;
  margin-bottom: ${spacing.lg};

  ${media.mobile} {
    flex-direction: column;
  }

  > * { flex: 1; min-width: 140px; }
`;

const Section = styled.div`
  margin-bottom: ${spacing.lg};
`;

const SectionTitle = styled.h2`
  font-size: ${typography.size.xl};
  font-weight: ${typography.weight.semibold};
  color: ${colors.text.primary};
  margin-bottom: ${spacing.md};
`;

export default function DashboardPage() {
  const { state } = useApp();
  const dash = useDashboard();

  if (state.entries.length === 0) {
    return (
      <EmptyState
        icon={BarChart3}
        title="No data yet"
        description="Start logging your daily work to see analytics and charts here."
      />
    );
  }

  return (
    <div>
      <ExportRow>
        <Button variant="secondary" size="sm" onClick={() => exportCSV(state.entries)} type="button">
          <FileText size={16} /> Export CSV
        </Button>
        <Button variant="secondary" size="sm" onClick={() => exportSchemaJSON(state.schema)} type="button">
          <FileJson size={16} /> Export Schema
        </Button>
      </ExportRow>

      <Section>
        <StatCards stats={dash.stats} />
      </Section>

      <FilterRow>
        <Select value={dash.dateFilter} onChange={(e) => dash.setDateFilter(e.target.value)}>
          <option value="all">All Time</option>
          <option value="week">This Week</option>
          <option value="month">This Month</option>
          <option value="30days">Last 30 Days</option>
          <option value="90days">Last 90 Days</option>
        </Select>
        <Select value={dash.projectFilter} onChange={(e) => dash.setProjectFilter(e.target.value)}>
          <option value="all">All Projects</option>
          {state.schema.projects.map((p) => <option key={p} value={p}>{p}</option>)}
        </Select>
        <Select value={dash.categoryFilter} onChange={(e) => dash.setCategoryFilter(e.target.value)}>
          <option value="all">All Categories</option>
          {state.schema.categories.map((c) => <option key={c} value={c}>{c}</option>)}
        </Select>
      </FilterRow>

      <Section>
        <Charts {...dash.chartData} />
      </Section>

      <Section>
        <EntryHistory history={dash.history} />
      </Section>
    </div>
  );
}
