import { useState, useMemo } from 'react';
import styled from '@emotion/styled';
import { ChevronDown, ChevronRight, Plus, X } from 'lucide-react';
import { useApp } from '../../../context/AppContext';
import type { TechSelection } from '../../../utils/types';
import { GROUP_LABELS, GROUP_ORDER } from '../../../utils/defaultSchema';
import { SearchInput, Checkbox, Chip, Button, Input } from '../../../ui';
import { colors, spacing, typography, transitions } from '../../../theme';
import { media } from '../../../theme/breakpoints';

interface Props {
  selected: TechSelection[];
  onChange: (techs: TechSelection[]) => void;
}

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.sm};
`;

const ChipsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${spacing.xxs};
`;

const TopRow = styled.div`
  display: flex;
  gap: ${spacing.xs};
  align-items: center;
`;

const GroupHeader = styled.button`
  display: flex;
  align-items: center;
  gap: ${spacing.xs};
  background: none;
  border: none;
  cursor: pointer;
  color: ${colors.text.secondary};
  font-size: ${typography.size.xs};
  font-weight: ${typography.weight.semibold};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  padding: ${spacing.xs} 0;
  transition: color ${transitions.fast};
  &:hover { color: ${colors.text.primary}; }
  svg { width: 14px; height: 14px; }
`;

const TechGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0 ${spacing.xs};
`;

const SubTechBox = styled.div`
  background: ${colors.bg.elevated};
  border: 1px solid ${colors.border.default};
  border-radius: 8px;
  padding: ${spacing.sm};
  margin-top: ${spacing.xs};
  display: flex;
  flex-direction: column;
  gap: ${spacing.xs};
`;

const SubLabel = styled.span`
  font-size: ${typography.size.xs};
  font-weight: ${typography.weight.semibold};
  color: ${colors.accent.primary};
`;

const AddRow = styled.div`
  display: flex;
  gap: ${spacing.xs};
  align-items: center;
`;

export default function TechSelector({ selected, onChange }: Props) {
  const { state, updateSchema } = useApp();
  const [search, setSearch] = useState('');
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});
  const [addingSub, setAddingSub] = useState<string | null>(null);
  const [newSub, setNewSub] = useState('');

  const grouped = useMemo(() => {
    const techsByGroup: Record<string, typeof state.schema.technologies> = {};
    state.schema.technologies.forEach((t) => {
      if (!techsByGroup[t.group]) techsByGroup[t.group] = [];
      if (!search || t.name.toLowerCase().includes(search.toLowerCase())) {
        techsByGroup[t.group].push(t);
      }
    });
    return techsByGroup;
  }, [state.schema.technologies, search]);

  const isSelected = (name: string) => selected.some((s) => s.tech === name);

  const toggleTech = (name: string) => {
    if (isSelected(name)) {
      onChange(selected.filter((s) => s.tech !== name));
    } else {
      onChange([...selected, { tech: name, subTechs: [] }]);
    }
  };

  const toggleSub = (techName: string, sub: string) => {
    onChange(
      selected.map((s) => {
        if (s.tech !== techName) return s;
        const has = s.subTechs.includes(sub);
        return { ...s, subTechs: has ? s.subTechs.filter((x) => x !== sub) : [...s.subTechs, sub] };
      })
    );
  };

  const clearAll = () => onChange([]);

  const handleAddSub = async (techName: string) => {
    const trimmed = newSub.trim();
    if (!trimmed) return;
    const updatedTechs = state.schema.technologies.map((t) =>
      t.name === techName && !t.subTechs.includes(trimmed)
        ? { ...t, subTechs: [...t.subTechs, trimmed] }
        : t
    );
    await updateSchema({ ...state.schema, technologies: updatedTechs });
    toggleSub(techName, trimmed);
    setNewSub('');
    setAddingSub(null);
  };

  const toggleGroup = (g: string) => {
    setCollapsed((prev) => ({ ...prev, [g]: !prev[g] }));
  };

  return (
    <Section>
      <TopRow>
        <SearchInput value={search} onChange={setSearch} placeholder="Search technologies..." />
        {selected.length > 0 && (
          <Button variant="ghost" size="sm" onClick={clearAll} type="button">Clear</Button>
        )}
      </TopRow>

      {selected.length > 0 && (
        <ChipsRow>
          {selected.map((s) => (
            <Chip key={s.tech} label={s.tech} onRemove={() => toggleTech(s.tech)} />
          ))}
        </ChipsRow>
      )}

      {GROUP_ORDER.map((group) => {
        const techs = grouped[group];
        if (!techs?.length) return null;
        const isCollapsed = collapsed[group];

        return (
          <div key={group}>
            <GroupHeader onClick={() => toggleGroup(group)} type="button">
              {isCollapsed ? <ChevronRight /> : <ChevronDown />}
              {GROUP_LABELS[group]}
            </GroupHeader>
            {!isCollapsed && (
              <TechGrid>
                {techs.map((t) => (
                  <Checkbox
                    key={t.name}
                    checked={isSelected(t.name)}
                    onChange={() => toggleTech(t.name)}
                    label={t.name}
                  />
                ))}
              </TechGrid>
            )}
          </div>
        );
      })}

      {/* Sub-tech boxes for selected techs */}
      {selected.map((sel) => {
        const schemaTech = state.schema.technologies.find((t) => t.name === sel.tech);
        if (!schemaTech) return null;

        return (
          <SubTechBox key={sel.tech}>
            <SubLabel>Sub-techs: {sel.tech}</SubLabel>
            {schemaTech.subTechs.length > 0 ? (
              <TechGrid>
                {schemaTech.subTechs.map((sub) => (
                  <Checkbox
                    key={sub}
                    checked={sel.subTechs.includes(sub)}
                    onChange={() => toggleSub(sel.tech, sub)}
                    label={sub}
                  />
                ))}
              </TechGrid>
            ) : (
              <span style={{ fontSize: typography.size.sm, color: colors.text.tertiary }}>
                No sub-technologies defined yet
              </span>
            )}
            {addingSub === sel.tech ? (
              <AddRow>
                <Input
                  value={newSub}
                  onChange={(e) => setNewSub(e.target.value)}
                  placeholder={`Add sub-tech for ${sel.tech}...`}
                  onKeyDown={(e) => e.key === 'Enter' && handleAddSub(sel.tech)}
                  autoFocus
                  style={{ flex: 1, height: '30px', fontSize: typography.size.sm }}
                />
                <Button size="sm" onClick={() => handleAddSub(sel.tech)} type="button">Add</Button>
                <Button variant="ghost" size="sm" onClick={() => { setAddingSub(null); setNewSub(''); }} type="button">
                  <X />
                </Button>
              </AddRow>
            ) : (
              <Button variant="ghost" size="sm" onClick={() => setAddingSub(sel.tech)} type="button">
                <Plus /> Add sub-tech
              </Button>
            )}
          </SubTechBox>
        );
      })}
    </Section>
  );
}
