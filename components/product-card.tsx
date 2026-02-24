import Link from 'next/link';
import { Product } from '@/data/products';

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  return (
    <article
      className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md"
      data-sp-product-detail={product.id}
    >
      <p className="text-xs font-semibold uppercase tracking-wide text-brand">{product.category}</p>
      <h2 className="mt-2 text-xl font-bold">{product.name}</h2>
      <p className="mt-2 text-sm text-slate-600">{product.description}</p>
      <div className="mt-4 flex items-center justify-between gap-2">
        <span className="text-lg font-semibold">${product.price.toFixed(2)}</span>
        <div className="flex items-center gap-2">
          <Link
            href={`/products/${product.id}`}
            className="rounded-md border border-brand px-3 py-2 text-sm font-medium text-brand hover:bg-teal-50"
            data-sp-clickable={`view-product-${product.id}`}
          >
            View details
          </Link>
          <button
            type="button"
            className="rounded-md bg-brand px-3 py-2 text-sm font-medium text-white hover:bg-teal-800"
            data-sp-clickable={`add-to-cart-${product.id}`}
          >
            Add to cart
          </button>
        </div>
      </div>
    </article>
  );
}
