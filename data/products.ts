export type Product = {
  id: number;
  name: string;
  price: number;
  category: string;
  description: string;
};

export const products: Product[] = [
  {
    id: 1,
    name: 'Cotton Hoodie',
    price: 49.99,
    category: 'Apparel',
    description: 'Soft brushed-cotton hoodie for cool evenings.'
  },
  {
    id: 2,
    name: 'Travel Backpack',
    price: 69.5,
    category: 'Accessories',
    description: 'Water-resistant backpack with 20L capacity.'
  },
  {
    id: 3,
    name: 'Desk Lamp',
    price: 34,
    category: 'Home',
    description: 'Adjustable LED desk lamp with warm and cool tones.'
  },
  {
    id: 4,
    name: 'Running Shoes',
    price: 89,
    category: 'Footwear',
    description: 'Lightweight trainers made for daily runs.'
  }
];
