import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import ProductClientPage from './ProductClientPage';
import type { ProductType } from '@/types';

async function getProduct(pid: string): Promise<ProductType | null> {
  // Assuming your API route is correctly migrated to app/api/product/[pid]/route.ts
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/product/${pid}`, {
    next: { revalidate: 3600 }, // Revalidate data every hour
  });

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    // throw new Error('Failed to fetch product data');
    // Or return null and handle notFound below
    return null;
  }

  return res.json();
}

export async function generateMetadata({
  params,
}: {
  params: { pid: string };
}): Promise<Metadata> {
  const product = await getProduct(params.pid);

  if (!product) {
    return {
      title: 'Product Not Found',
    };
  }

  return {
    title: product.name,
    description: product.description,
    // Add other metadata fields as needed (e.g., openGraph, twitter)
  };
}

export default async function ProductPage({
  params,
}: {
  params: { pid: string };
}) {
  const product = await getProduct(params.pid);

  if (!product) {
    notFound(); // Render the not-found.tsx page
  }

  return <ProductClientPage product={product} />;
}