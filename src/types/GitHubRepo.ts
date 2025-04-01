export interface GitHubRepo {
    id: number;
    name: string;
    html_url: string;
    description: string | null;
    language: string | null;
    topics?: string[];
    stargazers_count: number;
    forks_count: number;
    created_at: string;
    updated_at: string;
  }
  