import { createContext, useContext, useReducer, useEffect, useCallback, type ReactNode } from 'react';
import type { Entry, Schema, Preferences, PageName } from '../utils/types';
import defaultSchema from '../utils/defaultSchema';
import { initFirebase } from '../services/firebase';
import * as storage from '../services/storageService';

interface AppState {
  entries: Entry[];
  schema: Schema;
  preferences: Preferences | null;
  currentPage: PageName;
  isLoading: boolean;
}

type Action =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'INIT'; payload: { entries: Entry[]; schema: Schema; preferences: Preferences | null } }
  | { type: 'SET_PAGE'; payload: PageName }
  | { type: 'SET_ENTRIES'; payload: Entry[] }
  | { type: 'SET_SCHEMA'; payload: Schema }
  | { type: 'SET_PREFERENCES'; payload: Preferences }
  | { type: 'CLEAR_DATA' };

const initialState: AppState = {
  entries: [],
  schema: defaultSchema,
  preferences: null,
  currentPage: 'log',
  isLoading: true,
};

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'SET_LOADING': return { ...state, isLoading: action.payload };
    case 'INIT': return { ...state, ...action.payload, isLoading: false };
    case 'SET_PAGE': return { ...state, currentPage: action.payload };
    case 'SET_ENTRIES': return { ...state, entries: action.payload };
    case 'SET_SCHEMA': return { ...state, schema: action.payload };
    case 'SET_PREFERENCES': return { ...state, preferences: action.payload };
    case 'CLEAR_DATA': return { ...state, entries: [], preferences: null };
    default: return state;
  }
}

interface AppContextValue {
  state: AppState;
  dispatch: React.Dispatch<Action>;
  addEntries: (newEntries: Entry[]) => Promise<void>;
  updateSchema: (schema: Schema) => Promise<void>;
  updatePreferences: (prefs: Preferences) => Promise<void>;
  clearData: () => Promise<void>;
  setPage: (page: PageName) => void;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    async function init() {
      initFirebase();
      const { entries, schema, preferences } = await storage.loadAll();
      dispatch({
        type: 'INIT',
        payload: {
          entries,
          schema: schema ?? defaultSchema,
          preferences,
        },
      });
      // If schema didn't exist, persist the default
      if (!schema) await storage.setSchema(defaultSchema);
    }
    init();
  }, []);

  const addEntries = useCallback(async (newEntries: Entry[]) => {
    const updated = [...state.entries, ...newEntries];
    dispatch({ type: 'SET_ENTRIES', payload: updated });
    await storage.setEntries(updated);
  }, [state.entries]);

  const updateSchema = useCallback(async (schema: Schema) => {
    dispatch({ type: 'SET_SCHEMA', payload: schema });
    await storage.setSchema(schema);
  }, []);

  const updatePreferences = useCallback(async (prefs: Preferences) => {
    dispatch({ type: 'SET_PREFERENCES', payload: prefs });
    await storage.setPreferences(prefs);
  }, []);

  const clearData = useCallback(async () => {
    dispatch({ type: 'CLEAR_DATA' });
    await storage.clearAllData();
  }, []);

  const setPage = useCallback((page: PageName) => {
    dispatch({ type: 'SET_PAGE', payload: page });
  }, []);

  return (
    <AppContext.Provider value={{ state, dispatch, addEntries, updateSchema, updatePreferences, clearData, setPage }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
