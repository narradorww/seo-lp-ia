import { render, screen } from '@testing-library/react';
import VisitorStats from '@/components/Stats/VisitorStats';
import { ModalProvider } from '@/contexts/ModalContext';

// Simula userAgent e referrer
Object.defineProperty(window, 'navigator', {
  value: { userAgent: 'MockedAgent' },
  writable: true,
});

Object.defineProperty(document, 'referrer', {
  value: 'https://google.com',
  configurable: true,
});

const mockGeo = {
  ip: '192.168.0.1',
  geo: { city: 'São Paulo', region: 'SP', country: 'Brasil' },
};
const mockStats = { stats: { totalVisitors: 100, uniqueVisitors: 80 } };

describe('VisitorStats', () => {
  beforeEach(() => {
    global.fetch = jest.fn((input: RequestInfo | URL) => {
      const url = String(input);
      if (url === '/api/geo') {
        return Promise.resolve({
          ok: true,
          headers: new Headers({ 'Content-Type': 'application/json' }),
          json: () => Promise.resolve(mockGeo),
        } as Response);
      }
      if (url === '/api/stats') {
        return Promise.resolve({
          ok: true,
          headers: new Headers({ 'Content-Type': 'application/json' }),
          json: () => Promise.resolve(mockStats),
        } as Response);
      }
      return Promise.resolve({ ok: true } as Response);
    }) as jest.Mock;
  });

  it('mostra estatísticas simuladas corretamente', async () => {
    render(<ModalProvider><VisitorStats /></ModalProvider>);
    expect(await screen.findByText('192.168.0.1')).toBeInTheDocument();
    expect(screen.getByText('São Paulo, Brasil')).toBeInTheDocument();
    expect(screen.getByText('https://google.com')).toBeInTheDocument();
    expect(await screen.findByText('100')).toBeInTheDocument();
    expect(screen.getByText('6')).toBeInTheDocument();
  });
});
