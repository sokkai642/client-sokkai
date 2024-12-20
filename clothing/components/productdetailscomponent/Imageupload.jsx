'use client';

import React, { useState } from 'react';
import { Camera, X } from 'lucide-react';
import Image from 'next/image';

const ImageUpload = ({ images, onImageUpload, onImageRemove }) => {
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFiles = (files) => {
    const validFiles = Array.from(files).slice(0, 5 - images.length);
    validFiles.forEach((file) => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => onImageUpload(e.target.result);
        reader.readAsDataURL(file);
      }
    });
  };

  return (
    <div className="space-y-6">
      {/* Uploaded Images */}
      <div className="flex flex-wrap gap-4">
        {images.map((image, index) => (
          <div
            key={index}
            className="relative group w-24 h-24 rounded-lg overflow-hidden border border-gray-200 shadow-sm hover:shadow-lg transition-shadow"
          >
            <Image
              src={image}
              alt={`Review image ${index + 1}`}
              width={96}
              height={96}
              className="object-cover w-full h-full"
            />
            <button
              onClick={() => onImageRemove(index)}
              className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-1 shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {/* Drag & Drop Upload */}
      {images.length < 5 && (
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={`relative flex flex-col items-center justify-center gap-2 border-2 border-dashed rounded-lg p-8 transition-colors text-center ${
            dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
          }`}
        >
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => handleFiles(e.target.files)}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <Camera className="h-12 w-12 text-blue-500" />
          <p className="text-gray-700 font-medium">Drag & drop images here</p>
          <p className="text-sm text-gray-500">
            or <span className="text-blue-500 font-medium">click to browse</span>
          </p>
          <p className="text-xs text-gray-400">
            Upload up to {5 - images.length} more images
          </p>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
