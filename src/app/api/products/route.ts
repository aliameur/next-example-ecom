import { NextResponse } from 'next/server';

// Assuming products is located at the root level /utils/data/products
// Adjust the import path if necessary based on your project structure
import products from '@/utils/data/products';

export async function GET() {
  // fake loading time
  await new Promise(resolve => setTimeout(resolve, 800));

  return NextResponse.json(products, { status: 200 });
}