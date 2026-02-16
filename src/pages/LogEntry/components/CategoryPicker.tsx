import { useState } from 'react';
import styled from '@emotion/styled';
import { Plus } from 'lucide-react';
import { useApp } from '../../../context/AppContext';
import { Pill, Button, Input } from '../../../ui';
import { spacing } from '../../../theme';

interface Props {
  selected: string[];
  onChange: (cats: string[]) => void;
}

const Wrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${spacing.xs};
  align-items: center;
`;

const AddRow = styled.div`
  display: flex;
  gap: ${spacing.xs};
  align-items: center;
  margin-top: ${spacing.xs};
`;

export default function CategoryPicker({ selected, onChange }: Props) {
  const { state, updateSchema } = useApp();
  const [adding, setAdding] = useState(false);
  const [newCat, setNewCat] = useState('');

  const toggle = (cat: string) => {
    onChange(selected.includes(cat) ? selected.filter((c) => c !== cat) : [...selected, cat]);
  };

  const handleAdd = async () => {
    const trimmed = newCat.trim().toLowerCase();
    if (!trimmed || state.schema.categories.includes(trimmed)) return;
    await updateSchema({ ...state.schema, categories: [...state.schema.categories, trimmed] });
    onChange([...selected, trimmed]);
    setNewCat('');
    setAdding(false);
  };

  return (
    <div>
      <Wrap>
        {state.schema.categories.map((cat) => (
          <Pill key={cat} label={cat} selected={selected.includes(cat)} onClick={() => toggle(cat)} />
        ))}
        <Button variant="ghost" size="sm" onClick={() => setAdding(!adding)} type="button" iconOnly>
          <Plus />
        </Button>
      </Wrap>
      {adding && (
        <AddRow>
          <Input
            value={newCat}
            onChange={(e) => setNewCat(e.target.value)}
            placeholder="Category name..."
            onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
            autoFocus
            style={{ flex: 1, height: '32px' }}
          />
          <Button size="sm" onClick={handleAdd} type="button">Add</Button>
        </AddRow>
      )}
    </div>
  );
}
