import { render, screen } from '@testing-library/react';
import VisitorStats from '@components/Stats/VisitorStats';

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

describe('VisitorStats', () => {
  beforeEach(() => {
    global.fetch = jest.fn()
      // Primeira chamada: /api/visitor
      .mockResolvedValueOnce({
        json: () => Promise.resolve(mockedVisitorInfo),
      })
      // Segunda chamada: /api/notify
      .mockResolvedValueOnce({
        ok: true,
      });
  });

  it('mostra estatísticas simuladas corretamente', async () => {
    render(<VisitorStats />);

    // Aguarda a renderização com os dados
    expect(await screen.findByText(/192.168.0.1/)).toBeInTheDocument();
    expect(screen.getByText(/MockedAgent/)).toBeInTheDocument();
    expect(screen.getByText(/https:\/\/google.com/)).toBeInTheDocument();
    expect(screen.getByText(/São Paulo, SP, Brasil/)).toBeInTheDocument();
    expect(screen.getByText(/-23.55052/)).toBeInTheDocument();
    expect(screen.getByText(/-46.633308/)).toBeInTheDocument();
    expect(screen.getByText(/Mocked ISP/)).toBeInTheDocument();
  });
});
