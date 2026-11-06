import { render, screen } from '@testing-library/react';
import ProjectList from '@/components/Portfolio/ProjectList';

const mockRepos = [
  { id: 1, html_url: 'https://github.com/example/hands-on', name: 'HandsOn 3D', description: 'A 3D project', stargazers_count: 10 },
  { id: 2, html_url: 'https://github.com/example/cleanly', name: 'Cleanly Redirect System', description: 'A redirect system', stargazers_count: 20 },
  { id: 3, html_url: 'https://github.com/example/balaio', name: 'Balaio Rural', description: 'An e-commerce platform', stargazers_count: 30 },
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
    expect(screen.getByText('Principais Projetos')).toBeInTheDocument();

    // Use getAllByText for items that are duplicated by the carousel
    expect((await screen.findAllByText(/HandsOn 3D/i)).length).toBeGreaterThan(0);
    expect((await screen.findAllByText(/Cleanly Redirect System/i)).length).toBeGreaterThan(0);
    expect((await screen.findAllByText(/Balaio Rural/i)).length).toBeGreaterThan(0);
  });
});
