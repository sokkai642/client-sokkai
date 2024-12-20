import React from 'react';
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";

const ProductGallery = ({ images, onSlide }) => {
  const galleryImages = images.map(img => ({
    original: img.url,
    thumbnail: img.url,
  }));

  return (
    <ImageGallery
      items={galleryImages}
      showPlayButton={false}
      showFullscreenButton={true}
      showNav={true}
      thumbnailPosition="left"
      onSlide={onSlide}
      additionalClass="product-gallery"
    />
  );
};

export default ProductGallery;