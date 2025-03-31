import { render, screen } from '@testing-library/react';
import VisitorStats from '@components/Stats/VisitorStats';

Object.defineProperty(window, 'navigator', {
  value: { userAgent: 'MockedAgent' },
  writable: true,
});

Object.defineProperty(document, 'referrer', {
  value: 'https://google.com',
  configurable: true,
});

describe('VisitorStats', () => {
  it('mostra estatísticas simuladas corretamente', async () => {
    render(<VisitorStats />);
    expect(await screen.findByText(/192.168.0.1/)).toBeInTheDocument();
    expect(screen.getByText(/MockedAgent/)).toBeInTheDocument();
    expect(screen.getByText(/https:\/\/google.com/)).toBeInTheDocument();
  });
});
