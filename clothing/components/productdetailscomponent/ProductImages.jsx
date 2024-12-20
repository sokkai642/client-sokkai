import React from 'react';
import Image from 'next/image';
import ReactImageMagnify from 'react-image-magnify';

const ProductImages = ({ images, selectedImage, setSelectedImage, productName }) => {
  return (
    <div className="relative">
      <div className="sticky top-24">
        <div className="relative">
          <ReactImageMagnify
            {...{
              smallImage: {
                alt: productName,
                isFluidWidth: true,
                src: images[selectedImage].url,
              },
              largeImage: {
                src: images[selectedImage].url,
                width: 1200,
                height: 1800,
              },
              enlargedImageContainerDimensions: {
                width: '150%',
                height: '150%',
              },
              isHintEnabled: true,
              shouldHideHintAfterFirstActivation: false,
            }}
          />
        </div>
        <div className="grid grid-cols-4 gap-4 mt-4">
          {images.map((image, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedImage(idx)}
              className={`border-2 rounded-lg overflow-hidden ${
                selectedImage === idx ? 'border-black' : 'border-gray-200'
              }`}
            >
              <img
                src={image.url}
                alt={`${productName} - ${idx + 1}`}
                width={100}
                height={100}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductImages;