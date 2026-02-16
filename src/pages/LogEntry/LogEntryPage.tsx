import { useState } from 'react';
import styled from '@emotion/styled';
import { Plus, Send, RotateCcw, Calendar } from 'lucide-react';
import useLogEntry from '../../hooks/useLogEntry';
import useToast from '../../hooks/useToast';
import { Button, Toast } from '../../ui';
import { colors, spacing, typography } from '../../theme';
import { media } from '../../theme/breakpoints';
import { formatDate } from '../../utils/helpers';
import ProjectSelector from './components/ProjectSelector';
import TaskCard from './components/TaskCard';

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: ${spacing.sm};
  margin-bottom: ${spacing.lg};
  padding: ${spacing.md};
  background: ${colors.bg.tertiary};
  border: 1px solid ${colors.border.default};
  border-radius: 12px;
`;

const DateInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.sm};
  color: ${colors.text.primary};
  font-weight: ${typography.weight.semibold};
  svg { color: ${colors.accent.primary}; }
`;

const DayBadge = styled.span`
  background: ${colors.accent.muted};
  color: ${colors.accent.primary};
  padding: 2px ${spacing.xs};
  border-radius: 6px;
  font-size: ${typography.size.sm};
  font-weight: ${typography.weight.semibold};
`;

const ProjectRow = styled.div`
  margin-bottom: ${spacing.lg};
`;

const ProjectLabel = styled.label`
  display: block;
  font-size: ${typography.size.sm};
  font-weight: ${typography.weight.medium};
  color: ${colors.text.secondary};
  margin-bottom: ${spacing.xs};
`;

const TaskList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.md};
`;

const Actions = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.sm};
  margin-top: ${spacing.lg};
`;

const SubmitBar = styled.div`
  margin-top: ${spacing.lg};
  ${media.mobile} {
    position: fixed;
    bottom: 60px;
    left: 0;
    right: 0;
    padding: ${spacing.sm} ${spacing.md};
    background: ${colors.bg.secondary};
    border-top: 1px solid ${colors.border.default};
    z-index: 50;
    margin-top: 0;
  }
`;

export default function LogEntryPage() {
  const log = useLogEntry();
  const { toasts, addToast, removeToast } = useToast();
  const [lastAdded, setLastAdded] = useState<string | null>(null);

  const handleSubmit = async () => {
    const ok = await log.submit();
    if (ok) {
      addToast('success', 'Day log submitted successfully!');
    } else {
      addToast('error', 'Please fill in all required fields.');
    }
  };

  const handleAddTask = () => {
    log.addTask();
    // Track which task was just added for scroll animation
    setTimeout(() => {
      setLastAdded(log.tasks[log.tasks.length - 1]?.id ?? null);
    }, 0);
  };

  return (
    <div>
      <Toast toasts={toasts} removeToast={removeToast} />

      <Header>
        <DateInfo>
          <Calendar size={18} />
          {formatDate(log.todayStr)}
          <DayBadge>Day #{log.dayNumber}</DayBadge>
        </DateInfo>
        <Button variant="ghost" size="sm" onClick={log.clearAll} type="button">
          <RotateCcw size={14} /> Clear Page
        </Button>
      </Header>

      <ProjectRow>
        <ProjectLabel>Project</ProjectLabel>
        <ProjectSelector value={log.project} onChange={log.setProject} />
      </ProjectRow>

      <TaskList>
        {log.tasks.map((task, i) => (
          <TaskCard
            key={task.id}
            task={task}
            index={i}
            error={log.errors[task.id]}
            canRemove={log.tasks.length > 1}
            onUpdate={(updates) => log.updateTask(task.id, updates)}
            onClear={() => log.clearTask(task.id)}
            onRemove={() => log.removeTask(task.id)}
            isNew={task.id === lastAdded}
          />
        ))}
      </TaskList>

      <Actions>
        <Button variant="secondary" onClick={handleAddTask} type="button" fullWidth>
          <Plus /> Add Task
        </Button>
      </Actions>

      <SubmitBar>
        <Button
          variant="success"
          size="lg"
          onClick={handleSubmit}
          disabled={log.isSubmitting}
          fullWidth
          type="button"
        >
          <Send /> {log.isSubmitting ? 'Submitting...' : 'Submit Day Log'}
        </Button>
      </SubmitBar>
    </div>
  );
}
