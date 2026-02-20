import { render, screen } from '@testing-library/react';
import HomePage from '@/app/page';

describe('HomePage', () => {
  it('renders webshop heading and products', () => {
    render(<HomePage />);

    expect(screen.getByRole('heading', { name: /minimal e-commerce webshop/i })).toBeInTheDocument();
    expect(screen.getByText(/travel backpack/i)).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: /add to cart/i })).toHaveLength(4);
  });
});
