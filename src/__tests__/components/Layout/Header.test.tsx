import { render, screen, fireEvent } from '@testing-library/react';
import Header from '@/components/Layout/Header';

describe('Header', () => {
  it('renderiza o logo', () => {
    render(<Header />);
    expect(screen.getByText(/Rodrigo/i)).toBeInTheDocument();
    expect(screen.getByText(/Alexandre/i)).toBeInTheDocument();
  });

  it('abre o menu hamburguer no mobile e exibe os links', () => {
    render(<Header />);

    const menuButton = screen.getByRole('button', { name: /Toggle menu/i });
    fireEvent.click(menuButton);

    expect(screen.getByText(/Profile/i)).toBeVisible();
    expect(screen.getByText(/Projects/i)).toBeVisible();
    expect(screen.getByText(/Achievements/i)).toBeVisible();
    expect(screen.getByText(/Blog/i)).toBeVisible();
    expect(screen.getByText(/Apps/i)).toBeVisible();
    expect(screen.getByText(/Contact Me/i)).toBeVisible();
  });
});