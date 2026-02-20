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
      <div className="mt-4 flex items-center justify-between">
        <span className="text-lg font-semibold">${product.price.toFixed(2)}</span>
        <button
          type="button"
          className="rounded-md bg-brand px-3 py-2 text-sm font-medium text-white hover:bg-teal-800"
          data-sp-clickable={`add-to-cart-${product.id}`}
        >
          Add to cart
        </button>
      </div>
    </article>
  );
}
