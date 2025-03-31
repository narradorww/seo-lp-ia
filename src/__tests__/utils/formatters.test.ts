import { formatDate } from '@utils/formatters';

describe('formatDate', () => {
  it('formata uma data corretamente', () => {
    const date = new Date('2023-01-01');
    expect(formatDate(date)).toBe('2023-01-01T00:00:00.000Z');
  });
});
