import { NextRequest, NextResponse } from 'next/server';
import products from '@/utils/data/products'; // Assuming utils is at the project root

export async function GET(request: NextRequest) {
  const pid = request.nextUrl.searchParams.get('pid');

  const product = products.find((x) => String(x.id) === pid);

  if (product) {
    return NextResponse.json(product, { status: 200 });
  } else {
    // Optional: Handle not found case, although original code didn't explicitly
    // do so, it would return undefined which JSON.stringify handles as null.
    // Let's replicate the original behavior of returning undefined/null product
    // with status 200.
    return NextResponse.json(product, { status: 200 });
  }
}