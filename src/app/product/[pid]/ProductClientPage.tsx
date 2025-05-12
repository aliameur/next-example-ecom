'use client';

import { useState } from 'react';

import Content from '@/components/product-single/content';
import Description from '@/components/product-single/description';
import Gallery from '@/components/product-single/gallery';
import Reviews from '@/components/product-single/reviews';
import ProductsFeatured from '@/components/products-featured';
// types
import type { ProductType } from '@/types';

type ProductPageType = {
  product: ProductType;
};

const ProductClientPage = ({ product }: ProductPageType) => {
  const [showBlock, setShowBlock] = useState('description');

  return (
    <>
      {/* Breadcrumb and Footer are typically handled by the root layout */}
      {/* <Breadcrumb /> */}

      <section className="product-single">
        <div className="container">
          <div className="product-single__content">
            <Gallery images={product.images} />
            <Content product={product} />
          </div>

          <div className="product-single__info">
            <div className="product-single__info-btns">
              <button
                type="button"
                onClick={() => setShowBlock('description')}
                className={`btn btn--rounded ${
                  showBlock === 'description' ? 'btn--active' : ''
                }`}
              >
                Description
              </button>
              <button
                type="button"
                onClick={() => setShowBlock('reviews')}
                className={`btn btn--rounded ${
                  showBlock === 'reviews' ? 'btn--active' : ''
                }`}
              >
                Reviews (2) {/* This count might need dynamic fetching */}
              </button>
            </div>

            {/* Pass product data to Reviews if needed */}
            <Description show={showBlock === 'description'} />
            <Reviews product={product} show={showBlock === 'reviews'} />
          </div>
        </div>
      </section>

      <div className="product-single-page">
        <ProductsFeatured />
      </div>
      {/* Footer is typically handled by the root layout */}
      {/* <Footer /> */}
    </>
  );
};

export default ProductClientPage;