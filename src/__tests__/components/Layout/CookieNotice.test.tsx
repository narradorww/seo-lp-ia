// __tests__/components/Layout/CookieNotice.test.tsx

import { render, screen, fireEvent } from '@testing-library/react';
import CookieNotice from '@components/Layout/CookieNotice';

describe('CookieNotice', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renderiza o aviso quando não há consentimento', () => {
    render(<CookieNotice />);
    expect(screen.getByText(/coleta estatísticas de visita/i)).toBeInTheDocument();
  });

  it('esconde o aviso após clicar em "Ok, entendi"', () => {
    render(<CookieNotice />);
    fireEvent.click(screen.getByRole('button', { name: /ok, entendi/i }));
    expect(screen.queryByText(/coleta estatísticas de visita/i)).not.toBeInTheDocument();
  });

  it('não renderiza o aviso se o consentimento já foi dado', () => {
    localStorage.setItem('cookie_consent', 'true');
    render(<CookieNotice />);
    expect(screen.queryByText(/coleta estatísticas de visita/i)).not.toBeInTheDocument();
  });
});