// __tests__/components/Layout/Header.test.tsx

import { render, screen, fireEvent } from '@testing-library/react';
import Header from '@components/Layout/Header';

describe('Header', () => {
  it('renderiza logo e links externos', () => {
    render(<Header />);

   
    expect(screen.getByText(/RODRIGOALEXANDRE.DEV/i)).toBeInTheDocument();

  
    expect(screen.getByText(/GitHub/i)).toBeInTheDocument();
    expect(screen.getByText(/LinkedIn/i)).toBeInTheDocument();
    expect(screen.getByText(/Medium/i)).toBeInTheDocument();
  });

  it('abre o menu hamburguer no mobile', () => {
    render(<Header />);

    const menuButton = screen.getByRole('button');
    fireEvent.click(menuButton);

    expect(screen.getByText(/GitHub/i)).toBeVisible();
    expect(screen.getByText(/LinkedIn/i)).toBeVisible();
    expect(screen.getByText(/Medium/i)).toBeVisible();
  });
});
