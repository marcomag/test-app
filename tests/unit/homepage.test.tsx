import { render, screen } from '@testing-library/react';
import HomePage from '@/app/page';

describe('HomePage', () => {
  it('renders webshop heading and products', () => {
    const { container } = render(<HomePage />);

    expect(screen.getByRole('heading', { name: /minimal e-commerce webshop/i })).toBeInTheDocument();
    expect(screen.getByText(/travel backpack/i)).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: /add to cart/i })).toHaveLength(4);
    expect(screen.getAllByRole('link', { name: /view details/i })).toHaveLength(4);

    expect(container.querySelectorAll('[data-sp-product-detail]').length).toBe(4);
    expect(container.querySelectorAll('[data-sp-clickable^="add-to-cart"]').length).toBe(4);
    expect(container.querySelectorAll('[data-sp-clickable^="view-product"]').length).toBe(4);
  });
});
