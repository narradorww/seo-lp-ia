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
        const response = await fetch(`https://api.github.com/users/${username}/repos`);
        if (!response.ok) throw new Error(`Erro: ${response.status}`);
        const data: GitHubRepo[] = await response.json();
        const sortedRepos = data
          .sort((a, b) => b.stargazers_count - a.stargazers_count)
          .slice(0, REPOS_TO_DISPLAY);
        setRepos(sortedRepos);
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
