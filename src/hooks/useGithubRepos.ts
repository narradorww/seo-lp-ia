// src/hooks/useGitHubRepos.ts
import { useEffect, useState } from 'react';
import { GitHubRepo } from '@/types/GitHubRepo';

const REPOS_TO_DISPLAY = 5;

export function useGitHubRepos(username: string) {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRepos() {
      try {
        const response = await fetch(`https://api.github.com/users/${username}/repos?sort=stars&direction=desc`);
        
        if (!response.ok) {
          throw new Error(`GitHub API failed: ${response.status} ${response.statusText}`);
        }
        
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          const text = await response.text();
          console.error('GitHub API returned non-JSON:', contentType, text.substring(0, 200));
          throw new Error('Invalid GitHub API response format');
        }
        
        const data: GitHubRepo[] = await response.json();
        const topRepos = data.slice(0, REPOS_TO_DISPLAY);
        setRepos(topRepos);
      } catch (error) {
        console.error('Erro ao buscar repositórios:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchRepos();
  }, [username]);

  return { repos, loading };
}
