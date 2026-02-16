import { useState } from 'react';
import styled from '@emotion/styled';
import { Plus } from 'lucide-react';
import { useApp } from '../../../context/AppContext';
import { Select, Button, Input } from '../../../ui';
import { colors, spacing } from '../../../theme';

interface Props {
  value: string;
  onChange: (val: string) => void;
}

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.sm};
`;

const AddRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.xs};
  margin-top: ${spacing.xs};
`;

export default function ProjectSelector({ value, onChange }: Props) {
  const { state, updateSchema } = useApp();
  const [adding, setAdding] = useState(false);
  const [newName, setNewName] = useState('');

  const handleAdd = async () => {
    const trimmed = newName.trim();
    if (!trimmed || state.schema.projects.includes(trimmed)) return;
    const updated = { ...state.schema, projects: [...state.schema.projects, trimmed] };
    await updateSchema(updated);
    onChange(trimmed);
    setNewName('');
    setAdding(false);
  };

  return (
    <div>
      <Row>
        <Select value={value} onChange={(e) => onChange(e.target.value)} style={{ flex: 1 }}>
          {state.schema.projects.map((p) => (
            <option key={p} value={p}>{p}</option>
          ))}
        </Select>
        <Button variant="secondary" size="sm" onClick={() => setAdding(!adding)} type="button">
          <Plus /> New
        </Button>
      </Row>
      {adding && (
        <AddRow>
          <Input
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="Project name..."
            onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
            autoFocus
            style={{ flex: 1 }}
          />
          <Button size="sm" onClick={handleAdd} type="button">Add</Button>
          <Button variant="ghost" size="sm" onClick={() => { setAdding(false); setNewName(''); }} type="button">Cancel</Button>
        </AddRow>
      )}
    </div>
  );
}
