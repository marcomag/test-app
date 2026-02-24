import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProductById } from '@/data/products';

type ProductPageProps = {
  params: {
    id: string;
  };
};

export default function ProductPage({ params }: ProductPageProps) {
  const productId = Number(params.id);

  if (!Number.isInteger(productId)) {
    notFound();
  }

  const product = getProductById(productId);

  if (!product) {
    notFound();
  }

  return (
    <main className="mx-auto min-h-screen max-w-4xl p-6 md:p-10">
      <Link href="/" className="text-sm font-medium text-brand hover:underline">
        ← Back to products
      </Link>

      <article className="mt-6 rounded-xl border border-slate-200 bg-white p-8 shadow-sm" data-sp-product-detail-page={product.id}>
        <p className="text-sm font-semibold uppercase tracking-wider text-brand">{product.category}</p>
        <h1 className="mt-2 text-4xl font-bold">{product.name}</h1>
        <p className="mt-4 text-lg text-slate-600">{product.description}</p>

        <div className="mt-8 flex items-center justify-between border-t border-slate-200 pt-6">
          <p className="text-3xl font-bold">${product.price.toFixed(2)}</p>
          <button
            type="button"
            className="rounded-md bg-brand px-4 py-2 text-sm font-medium text-white hover:bg-teal-800"
            data-sp-clickable={`add-to-cart-${product.id}`}
          >
            Add to cart
          </button>
        </div>
      </article>
    </main>
  );
}
