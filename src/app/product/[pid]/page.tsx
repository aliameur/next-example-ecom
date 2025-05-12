import Breadcrumb from "@/components/breadcrumb";
import Footer from "@/components/footer";
import ProductsFeatured from "@/components/products-featured";
import ProductClientPage from "./ProductClientPage";
import { server } from "@/utils/server";
import type { ProductType } from "@/types";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

type ProductPageProps = {
  params: {
    pid: string;
  };
};

async function getProduct(pid: string): Promise<ProductType | null> {
  try {
    const res = await fetch(`${server}/api/product/${pid}`);
    if (!res.ok) {
      if (res.status === 404) {
        return null; // Indicate not found
      }
      throw new Error(`Failed to fetch product: ${res.statusText}`);
    }
    const product = await res.json();
    return product as ProductType;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const product = await getProduct(params.pid);

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  return {
    title: product.name || "Product Details",
    description: product.description || "View product details",
    // Add other metadata like opengraph, twitter cards etc.
  };
}

const ProductPage = async ({ params }: ProductPageProps) => {
  const product = await getProduct(params.pid);

  if (!product) {
    notFound(); // Render Next.js not-found page
  }

  return (
    <>
      <Breadcrumb />
      <ProductClientPage product={product} />
      <div className="product-single-page">
        <ProductsFeatured />
      </div>
      <Footer />
    </>
  );
};

export default ProductPage;