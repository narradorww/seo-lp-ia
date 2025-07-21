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

const mockedVisitorInfo = {
  ip: '192.168.0.1',
  userAgent: 'MockedAgent',
  referrer: 'https://google.com',
  geo: {
    city: 'São Paulo',
    region: 'SP',
    country_name: 'Brasil',
    latitude: -23.55052,
    longitude: -46.633308,
    org: 'Mocked ISP',
  },
};

const mockStats = { stats: { totalVisitors: 100, uniqueVisitors: 80 } };

describe('VisitorStats', () => {
  beforeEach(() => {
    global.fetch = jest.fn()
      .mockResolvedValueOnce({ // /api/visitor
        json: () => Promise.resolve(mockedVisitorInfo),
      })
      .mockResolvedValueOnce({ // /api/stats
        ok: true,
        headers: new Headers({ 'Content-Type': 'application/json' }),
        json: () => Promise.resolve(mockStats),
      })
      .mockResolvedValueOnce({ // /api/notify
        ok: true,
      });
  });

  it('mostra estatísticas simuladas corretamente', async () => {
    render(
      <ModalProvider>
        <VisitorStats />
      </ModalProvider>
    );

    // Aguarda a renderização com os dados
    expect(await screen.findByText(/192.168.0.1/)).toBeInTheDocument();
    expect(screen.getByText(/MockedAgent/)).toBeInTheDocument();
    expect(screen.getByText(/https:\/\/google.com/)).toBeInTheDocument();
    expect(screen.getByText(/São Paulo, Brasil/)).toBeInTheDocument();
    expect(await screen.findByText(/100/)).toBeInTheDocument(); // Total Visits
    expect(screen.getByText(/8/)).toBeInTheDocument(); // Current Visitors (8% of unique)
  });
});
