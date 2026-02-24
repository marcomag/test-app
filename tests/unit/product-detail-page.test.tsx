import { render, screen } from '@testing-library/react';
import ProductPage from '@/app/products/[id]/page';

describe('ProductPage', () => {
  it('renders the selected product details', () => {
    const { container } = render(<ProductPage params={{ id: '2' }} />);

    expect(screen.getByRole('heading', { name: /travel backpack/i })).toBeInTheDocument();
    expect(screen.getByText(/water-resistant backpack with 20l capacity/i)).toBeInTheDocument();
    expect(screen.getByText('$69.50')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /back to products/i })).toHaveAttribute('href', '/');

    expect(container.querySelector('[data-sp-product-detail-page="2"]')).toBeInTheDocument();
  });
});
