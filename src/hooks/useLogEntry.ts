import { useState, useEffect, useCallback } from 'react';
import { useApp } from '../context/AppContext';
import type { TaskFormState, TechSelection, Entry, Preferences } from '../utils/types';
import { generateId, getTodayStr, getDayNumber } from '../utils/helpers';

function createEmptyTask(): TaskFormState {
  return {
    id: generateId(),
    categories: [],
    title: '',
    description: '',
    technologies: [],
    teamType: 'solo',
  };
}

function applyDefaults(prefs: Preferences | null): TaskFormState {
  if (!prefs) return createEmptyTask();
  return {
    id: generateId(),
    categories: prefs.lastCategories || [],
    title: '',
    description: '',
    technologies: prefs.lastTechnologies || [],
    teamType: prefs.lastTeamType || 'solo',
  };
}

export default function useLogEntry() {
  const { state, addEntries, updatePreferences } = useApp();
  const todayStr = getTodayStr();
  const dayNumber = getDayNumber(state.entries, todayStr);

  const [project, setProject] = useState('');
  const [tasks, setTasks] = useState<TaskFormState[]>([createEmptyTask()]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Apply smart defaults when preferences load
  useEffect(() => {
    if (state.preferences) {
      setProject(state.preferences.lastProject || state.schema.projects[0] || '');
      const count = state.preferences.lastTaskCount || 1;
      setTasks(Array.from({ length: count }, () => applyDefaults(state.preferences)));
    } else if (state.schema.projects.length > 0) {
      setProject(state.schema.projects[0]);
    }
  }, [state.preferences, state.schema.projects]);

  const updateTask = useCallback((taskId: string, updates: Partial<TaskFormState>) => {
    setTasks((prev) => prev.map((t) => (t.id === taskId ? { ...t, ...updates } : t)));
    if (updates.title !== undefined) {
      setErrors((prev) => { const next = { ...prev }; delete next[taskId]; return next; });
    }
  }, []);

  const addTask = useCallback(() => {
    setTasks((prev) => [...prev, createEmptyTask()]);
  }, []);

  const removeTask = useCallback((taskId: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
  }, []);

  const clearTask = useCallback((taskId: string) => {
    setTasks((prev) => prev.map((t) => (t.id === taskId ? { ...createEmptyTask(), id: t.id } : t)));
  }, []);

  const clearAll = useCallback(() => {
    setProject(state.schema.projects[0] || '');
    setTasks([createEmptyTask()]);
    setErrors({});
  }, [state.schema.projects]);

  const validate = useCallback((): boolean => {
    const newErrors: Record<string, string> = {};
    tasks.forEach((t) => {
      if (!t.title.trim()) newErrors[t.id] = 'Title is required';
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [tasks]);

  const submit = useCallback(async (): Promise<boolean> => {
    if (!validate()) return false;
    setIsSubmitting(true);
    try {
      const entries: Entry[] = tasks.map((t) => ({
        id: generateId(),
        date: todayStr,
        dayNumber,
        project,
        categories: t.categories,
        title: t.title.trim(),
        description: t.description.trim(),
        technologies: t.technologies,
        teamType: t.teamType,
        createdAt: new Date().toISOString(),
      }));

      await addEntries(entries);

      const prefs: Preferences = {
        lastProject: project,
        lastCategories: tasks[0]?.categories || [],
        lastTechnologies: tasks[0]?.technologies || [],
        lastTeamType: tasks[0]?.teamType || 'solo',
        lastTaskCount: tasks.length,
      };
      await updatePreferences(prefs);

      // Reset form
      setTasks([applyDefaults(prefs)]);
      setErrors({});
      return true;
    } finally {
      setIsSubmitting(false);
    }
  }, [validate, tasks, todayStr, dayNumber, project, addEntries, updatePreferences]);

  return {
    todayStr, dayNumber, project, setProject, tasks, errors, isSubmitting,
    updateTask, addTask, removeTask, clearTask, clearAll, submit,
  };
}
