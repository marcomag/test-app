import { ProductCard } from '@/components/product-card';
import { products } from '@/data/products';

const totalItems = products.length;
const averagePrice = products.reduce((sum, item) => sum + item.price, 0) / products.length;

export default function HomePage() {
  return (
    <main className="mx-auto min-h-screen max-w-6xl p-6 md:p-10">
      <header className="mb-8 rounded-2xl bg-gradient-to-r from-brand to-teal-600 p-8 text-white shadow-lg">
        <p className="text-sm uppercase tracking-widest">Simple Shop</p>
        <h1 className="mt-2 text-4xl font-bold">Minimal E-commerce Webshop</h1>
        <p className="mt-3 max-w-2xl text-teal-50">
          Browse curated essentials in this demo storefront built with Next.js, TypeScript, Tailwind, Jest,
          Playwright, and a custom Node server.
        </p>
      </header>

      <section className="mb-8 grid gap-4 rounded-xl bg-white p-5 shadow-sm sm:grid-cols-2">
        <div>
          <p className="text-sm text-slate-500">Products available</p>
          <p className="text-2xl font-bold">{totalItems}</p>
        </div>
        <div>
          <p className="text-sm text-slate-500">Average price</p>
          <p className="text-2xl font-bold">${averagePrice.toFixed(2)}</p>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </section>
    </main>
  );
}
