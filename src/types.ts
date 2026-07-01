export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  tags: string[];
  githubFrontend?: string;
  githubBackend?: string;
  liveUrl?: string;
  category: 'Full-Stack' | 'Frontend' | 'Backend' | 'System';
  highlights: string[];
  architecture?: {
    frontend: string[];
    backend: string[];
    database: string[];
  };
}

export interface SkillCategory {
  title: string;
  skills: {
    name: string;
    level: number; // 0-100
    description: string;
    iconName: string;
    category: 'language' | 'frontend' | 'backend' | 'database' | 'tool';
  }[];
}

export interface TimelineItem {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
  bullets: string[];
  type: 'experience' | 'education';
  logoText: string;
  badge?: string;
}

export interface ApiEndpoint {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  path: string;
  description: string;
  requestBody?: string;
  responseBody: string;
  dbQuery: string;
}
