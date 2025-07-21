// __tests__/components/Layout/Footer.test.tsx

import { render, screen } from '@testing-library/react';
import Footer from '@components/Layout/Footer';

describe('Footer', () => {
  it('exibe o copyright com o ano atual', () => {
    render(<Footer />);
    const year = new Date().getFullYear();
    expect(screen.getByText(`© ${year} Rodrigo Alexandre. All rights reserved.`)).toBeInTheDocument();
  });
});
