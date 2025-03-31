import { render, screen, fireEvent } from '@testing-library/react';
import MagicMirror from '@components/MagicMirror/MagicMirror';

describe('MagicMirror', () => {
  it('renderiza e responde ao input do usuário', () => {
    render(<MagicMirror />);
    const input = screen.getByPlaceholderText(/Digite sua pergunta/i);
    fireEvent.change(input, { target: { value: 'o futuro do dev' } });
    fireEvent.click(screen.getByText(/Perguntar/i));
    expect(screen.getByText(/Vejo que você procura/i)).toBeInTheDocument();
  });
});
