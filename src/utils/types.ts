export interface TechSelection {
  tech: string;
  subTechs: string[];
}

export interface Entry {
  id: string;
  date: string;
  dayNumber: number;
  project: string;
  categories: string[];
  title: string;
  description: string;
  technologies: TechSelection[];
  teamType: 'solo' | 'team';
  teamSize?: number;
  codingLanguages?: string[];
  createdAt: string;
}

export interface SchemaTech {
  name: string;
  group: string;
  subTechs: string[];
}

export interface Schema {
  projects: string[];
  categories: string[];
  technologies: SchemaTech[];
}

export interface Preferences {
  lastProject: string;
  lastCategories: string[];
  lastTechnologies: TechSelection[];
  lastTeamType: 'solo' | 'team';
  lastTaskCount: number;
  lastCodingLanguages?: string[];
  lastTeamSize?: number;
}

export interface TaskFormState {
  id: string;
  categories: string[];
  title: string;
  description: string;
  technologies: TechSelection[];
  teamType: 'solo' | 'team';
  teamSize?: number;
  codingLanguages?: string[];
}

export type PageName = 'log' | 'dashboard' | 'schema' | 'logs';
