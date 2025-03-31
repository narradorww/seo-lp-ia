import { render, screen } from '@testing-library/react';
import ProjectList from '@components/Portfolio/ProjectList';

describe('ProjectList', () => {
  it('renderiza o título e todos os projetos', () => {
    render(<ProjectList />);
    expect(screen.getByText(/HandsOn 3D/i)).toBeInTheDocument();
    expect(screen.getByText(/Cleanly Redirect System/i)).toBeInTheDocument();
    expect(screen.getByText(/Balaio Rural/i)).toBeInTheDocument();
  });
});
