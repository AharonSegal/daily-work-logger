import { useState } from 'react';
import styled from '@emotion/styled';
import { Plus, Trash2, AlertTriangle, Search } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import useToast from '../../hooks/useToast';
import defaultSchema, { GROUP_LABELS, GROUP_ORDER } from '../../utils/defaultSchema';
import { Card, CardHeader, CardTitle, Button, Input, Chip, Modal, Toast, SearchInput, EmptyState } from '../../ui';
import { colors, spacing, typography, transitions } from '../../theme';

const Section = styled.div`
  margin-bottom: ${spacing.lg};
`;

const ListItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${spacing.xs} ${spacing.sm};
  border-radius: 6px;
  transition: background ${transitions.fast};
  &:hover { background: ${colors.bg.hover}; }
`;

const ItemLabel = styled.span`
  font-size: ${typography.size.md};
  color: ${colors.text.primary};
`;

const RemBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border: none;
  background: transparent;
  color: ${colors.text.tertiary};
  cursor: pointer;
  border-radius: 6px;
  transition: all ${transitions.fast};
  &:hover { background: ${colors.danger.muted}; color: ${colors.danger.primary}; }
  svg { width: 14px; height: 14px; }
`;

const AddRow = styled.div`
  display: flex;
  gap: ${spacing.xs};
  align-items: center;
  margin-top: ${spacing.sm};
`;

const GroupLabel = styled.h4`
  font-size: ${typography.size.xs};
  font-weight: ${typography.weight.semibold};
  color: ${colors.text.tertiary};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin: ${spacing.md} 0 ${spacing.xs};
`;

const TechCard = styled.div`
  background: ${colors.bg.elevated};
  border: 1px solid ${colors.border.default};
  border-radius: 8px;
  padding: ${spacing.sm} ${spacing.md};
  margin-bottom: ${spacing.xs};
  transition: all ${transitions.normal};
  &:hover { border-color: ${colors.border.light}; }
`;

const TechHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${spacing.xs};
`;

const SubTechRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${spacing.xxs};
  margin-top: ${spacing.xs};
`;

const DangerZone = styled.div`
  border: 1px solid ${colors.danger.primary}40;
  border-radius: 12px;
  padding: ${spacing.lg};
  display: flex;
  flex-direction: column;
  gap: ${spacing.sm};
`;

export default function SchemaManagerPage() {
  const { state, updateSchema, clearData } = useApp();
  const { toasts, addToast, removeToast } = useToast();
  const schema = state.schema;

  const [newProject, setNewProject] = useState('');
  const [addingProject, setAddingProject] = useState(false);
  const [newCat, setNewCat] = useState('');
  const [addingCat, setAddingCat] = useState(false);
  const [techSearch, setTechSearch] = useState('');
  const [addingTech, setAddingTech] = useState(false);
  const [newTechName, setNewTechName] = useState('');
  const [newTechGroup, setNewTechGroup] = useState('languages');
  const [addingSubFor, setAddingSubFor] = useState<string | null>(null);
  const [newSub, setNewSub] = useState('');

  const [confirmModal, setConfirmModal] = useState<{ type: string; name?: string } | null>(null);

  // --- Projects ---
  const addProject = () => {
    const t = newProject.trim();
    if (!t || schema.projects.includes(t)) return;
    updateSchema({ ...schema, projects: [...schema.projects, t] });
    setNewProject('');
    setAddingProject(false);
    addToast('success', `Project "${t}" added`);
  };

  const removeProject = (name: string) => {
    updateSchema({ ...schema, projects: schema.projects.filter((p) => p !== name) });
    addToast('success', `Project "${name}" removed`);
    setConfirmModal(null);
  };

  // --- Categories ---
  const addCategory = () => {
    const t = newCat.trim().toLowerCase();
    if (!t || schema.categories.includes(t)) return;
    updateSchema({ ...schema, categories: [...schema.categories, t] });
    setNewCat('');
    setAddingCat(false);
    addToast('success', `Category "${t}" added`);
  };

  const removeCategory = (name: string) => {
    updateSchema({ ...schema, categories: schema.categories.filter((c) => c !== name) });
    addToast('success', `Category "${name}" removed`);
    setConfirmModal(null);
  };

  // --- Technologies ---
  const addTech = () => {
    const t = newTechName.trim();
    if (!t || schema.technologies.some((x) => x.name === t)) return;
    updateSchema({ ...schema, technologies: [...schema.technologies, { name: t, group: newTechGroup, subTechs: [] }] });
    setNewTechName('');
    setAddingTech(false);
    addToast('success', `Technology "${t}" added`);
  };

  const removeTech = (name: string) => {
    updateSchema({ ...schema, technologies: schema.technologies.filter((t) => t.name !== name) });
    addToast('success', `Technology "${name}" removed`);
    setConfirmModal(null);
  };

  const addSubTech = (techName: string) => {
    const t = newSub.trim();
    if (!t) return;
    updateSchema({
      ...schema,
      technologies: schema.technologies.map((tech) =>
        tech.name === techName && !tech.subTechs.includes(t)
          ? { ...tech, subTechs: [...tech.subTechs, t] }
          : tech
      ),
    });
    setNewSub('');
    setAddingSubFor(null);
  };

  const removeSubTech = (techName: string, sub: string) => {
    updateSchema({
      ...schema,
      technologies: schema.technologies.map((tech) =>
        tech.name === techName ? { ...tech, subTechs: tech.subTechs.filter((s) => s !== sub) } : tech
      ),
    });
  };

  // Filter techs
  const filteredTechs = techSearch
    ? schema.technologies.filter((t) => t.name.toLowerCase().includes(techSearch.toLowerCase()))
    : schema.technologies;

  const techsByGroup: Record<string, typeof schema.technologies> = {};
  filteredTechs.forEach((t) => {
    if (!techsByGroup[t.group]) techsByGroup[t.group] = [];
    techsByGroup[t.group].push(t);
  });

  // In-use checks
  const projectInUse = (name: string) => state.entries.some((e) => e.project === name);
  const categoryInUse = (name: string) => state.entries.some((e) => e.categories.includes(name));
  const techInUse = (name: string) => state.entries.some((e) => e.technologies.some((t) => t.tech === name));

  return (
    <div>
      <Toast toasts={toasts} removeToast={removeToast} />

      {/* Confirm Modal */}
      <Modal
        open={!!confirmModal}
        onClose={() => setConfirmModal(null)}
        title="Confirm Deletion"
        footer={
          <>
            <Button variant="ghost" onClick={() => setConfirmModal(null)}>Cancel</Button>
            <Button
              variant="danger"
              onClick={() => {
                if (!confirmModal) return;
                if (confirmModal.type === 'project') removeProject(confirmModal.name!);
                else if (confirmModal.type === 'category') removeCategory(confirmModal.name!);
                else if (confirmModal.type === 'tech') removeTech(confirmModal.name!);
                else if (confirmModal.type === 'resetData') { clearData(); addToast('success', 'All data cleared'); setConfirmModal(null); }
                else if (confirmModal.type === 'resetSchema') { updateSchema(defaultSchema); addToast('success', 'Schema reset to defaults'); setConfirmModal(null); }
              }}
            >
              Delete
            </Button>
          </>
        }
      >
        <p style={{ color: colors.text.secondary }}>
          {confirmModal?.type === 'resetData' && 'This will delete all entries and preferences. Schema will be kept. This cannot be undone.'}
          {confirmModal?.type === 'resetSchema' && 'This will reset the schema to defaults. All custom projects, categories, and technologies will be lost.'}
          {confirmModal?.name && `Are you sure you want to remove "${confirmModal.name}"?`}
          {confirmModal?.name && (
            (confirmModal.type === 'project' && projectInUse(confirmModal.name)) ||
            (confirmModal.type === 'category' && categoryInUse(confirmModal.name)) ||
            (confirmModal.type === 'tech' && techInUse(confirmModal.name))
          ) && (
            <span style={{ display: 'block', marginTop: spacing.xs, color: colors.warning.text }}>
              <AlertTriangle size={14} style={{ verticalAlign: 'middle', marginRight: '4px' }} />
              This item is used in existing entries.
            </span>
          )}
        </p>
      </Modal>

      {/* Projects */}
      <Section>
        <Card>
          <CardHeader>
            <CardTitle>Projects</CardTitle>
            <Button variant="secondary" size="sm" onClick={() => setAddingProject(!addingProject)} type="button">
              <Plus /> Add
            </Button>
          </CardHeader>
          {schema.projects.map((p) => (
            <ListItem key={p}>
              <ItemLabel>{p}</ItemLabel>
              <RemBtn onClick={() => setConfirmModal({ type: 'project', name: p })} type="button"><Trash2 /></RemBtn>
            </ListItem>
          ))}
          {addingProject && (
            <AddRow>
              <Input value={newProject} onChange={(e) => setNewProject(e.target.value)} placeholder="Project name..." onKeyDown={(e) => e.key === 'Enter' && addProject()} autoFocus style={{ flex: 1 }} />
              <Button size="sm" onClick={addProject} type="button">Add</Button>
            </AddRow>
          )}
        </Card>
      </Section>

      {/* Categories */}
      <Section>
        <Card>
          <CardHeader>
            <CardTitle>Categories</CardTitle>
            <Button variant="secondary" size="sm" onClick={() => setAddingCat(!addingCat)} type="button">
              <Plus /> Add
            </Button>
          </CardHeader>
          {schema.categories.map((c) => (
            <ListItem key={c}>
              <ItemLabel>{c}</ItemLabel>
              <RemBtn onClick={() => setConfirmModal({ type: 'category', name: c })} type="button"><Trash2 /></RemBtn>
            </ListItem>
          ))}
          {addingCat && (
            <AddRow>
              <Input value={newCat} onChange={(e) => setNewCat(e.target.value)} placeholder="Category name..." onKeyDown={(e) => e.key === 'Enter' && addCategory()} autoFocus style={{ flex: 1 }} />
              <Button size="sm" onClick={addCategory} type="button">Add</Button>
            </AddRow>
          )}
        </Card>
      </Section>

      {/* Technologies */}
      <Section>
        <Card>
          <CardHeader>
            <CardTitle>Technologies</CardTitle>
            <Button variant="secondary" size="sm" onClick={() => setAddingTech(!addingTech)} type="button">
              <Plus /> Add
            </Button>
          </CardHeader>

          <div style={{ marginBottom: spacing.md }}>
            <SearchInput value={techSearch} onChange={setTechSearch} placeholder="Filter technologies..." />
          </div>

          {GROUP_ORDER.map((group) => {
            const techs = techsByGroup[group];
            if (!techs?.length) return null;
            return (
              <div key={group}>
                <GroupLabel>{GROUP_LABELS[group]}</GroupLabel>
                {techs.map((tech) => (
                  <TechCard key={tech.name}>
                    <TechHeader>
                      <span style={{ fontWeight: typography.weight.medium, color: colors.text.primary }}>{tech.name}</span>
                      <RemBtn onClick={() => setConfirmModal({ type: 'tech', name: tech.name })} type="button"><Trash2 /></RemBtn>
                    </TechHeader>
                    <SubTechRow>
                      {tech.subTechs.map((sub) => (
                        <Chip key={sub} label={sub} onRemove={() => removeSubTech(tech.name, sub)} />
                      ))}
                    </SubTechRow>
                    {addingSubFor === tech.name ? (
                      <AddRow>
                        <Input value={newSub} onChange={(e) => setNewSub(e.target.value)} placeholder={`Add sub-tech for ${tech.name}...`} onKeyDown={(e) => e.key === 'Enter' && addSubTech(tech.name)} autoFocus style={{ flex: 1, height: '30px', fontSize: typography.size.sm }} />
                        <Button size="sm" onClick={() => addSubTech(tech.name)} type="button">Add</Button>
                      </AddRow>
                    ) : (
                      <Button variant="ghost" size="sm" onClick={() => setAddingSubFor(tech.name)} type="button" style={{ marginTop: spacing.xs }}>
                        <Plus /> Add sub-tech
                      </Button>
                    )}
                  </TechCard>
                ))}
              </div>
            );
          })}

          {addingTech && (
            <AddRow style={{ marginTop: spacing.md }}>
              <Input value={newTechName} onChange={(e) => setNewTechName(e.target.value)} placeholder="Tech name..." autoFocus style={{ flex: 1 }} />
              <select
                value={newTechGroup}
                onChange={(e) => setNewTechGroup(e.target.value)}
                style={{
                  background: colors.bg.secondary, border: `1px solid ${colors.border.default}`,
                  borderRadius: '8px', color: colors.text.primary, padding: `${spacing.xs} ${spacing.sm}`,
                  fontSize: typography.size.sm, height: '40px',
                }}
              >
                {GROUP_ORDER.map((g) => <option key={g} value={g}>{GROUP_LABELS[g]}</option>)}
              </select>
              <Button size="sm" onClick={addTech} type="button">Add</Button>
            </AddRow>
          )}
        </Card>
      </Section>

      {/* Danger Zone */}
      <Section>
        <DangerZone>
          <h3 style={{ color: colors.danger.text, fontSize: typography.size.lg, fontWeight: typography.weight.semibold }}>
            Danger Zone
          </h3>
          <Button variant="danger" onClick={() => setConfirmModal({ type: 'resetData' })} type="button">
            <Trash2 /> Reset All Data
          </Button>
          <Button variant="danger" onClick={() => setConfirmModal({ type: 'resetSchema' })} type="button">
            <Trash2 /> Reset Schema to Defaults
          </Button>
        </DangerZone>
      </Section>
    </div>
  );
}
