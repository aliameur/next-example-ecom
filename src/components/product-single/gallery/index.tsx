import Image from 'next/image';

type GalleryProductType = {
  images: string[];
};

const Gallery = ({ images }: GalleryProductType) => {
  const featImage = images[0];

  // Consider adding `width`, `height`, or the `fill` prop to the `Image` components below for optimal performance.
  return (
    <section className="product-gallery">
      <div className="product-gallery__thumbs">
        {images.map((image) => (
          <div key={image} className="product-gallery__thumb">
            <Image src={image} alt="" />
          </div>
        ))}
      </div>

      <div className="product-gallery__image">
        <Image src={featImage} alt="" />
      </div>
    </section>
  );
};

export default Gallery;