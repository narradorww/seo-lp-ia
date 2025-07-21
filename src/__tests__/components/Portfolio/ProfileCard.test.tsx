// __tests__/components/Portfolio/ProfileCard.test.tsx

import { render, screen } from '@testing-library/react';
import ProfileCard from '@components/Portfolio/ProfileCard';

describe('ProfileCard', () => {
  it('renderiza o nome e a descrição corretamente', () => {
    render(<ProfileCard />);
    expect(screen.getByText(/Rodrigo Alexandre/i)).toBeInTheDocument();
    expect(screen.getByText((content, element) => element?.tagName.toLowerCase() === 'p' && content.startsWith('Tech Lead'))).toBeInTheDocument();
  });
});
