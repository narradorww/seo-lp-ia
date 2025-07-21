import { render, screen } from '@testing-library/react';
import ProjectList from '@/components/Portfolio/ProjectList';

const mockRepos = [
  { name: 'HandsOn 3D', description: 'A 3D project', stargazers_count: 10 },
  { name: 'Cleanly Redirect System', description: 'A redirect system', stargazers_count: 20 },
  { name: 'Balaio Rural', description: 'An e-commerce platform', stargazers_count: 30 },
];

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(mockRepos),
  })
) as jest.Mock;

describe('ProjectList', () => {
  it('renderiza o título e todos os projetos', async () => {
    render(<ProjectList />);
    // Use findByText for the first item to wait for the async fetch
    expect(await screen.findByText('Principais Projetos')).toBeInTheDocument();

    // Use getAllByText for items that are duplicated by the carousel
    expect(screen.getAllByText(/HandsOn 3D/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Cleanly Redirect System/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Balaio Rural/i).length).toBeGreaterThan(0);
  });
});
