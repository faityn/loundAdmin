// components/ImageModal.tsx
import React from "react";

type ImageModalProps = {
  src: string;
  alt?: string;
  isOpen: boolean;
  onClose: () => void;
};

const ImageModal: React.FC<ImageModalProps> = ({
  src,
  alt,
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-99">
      <div className="relative max-w-[1000px] max-h-full p-4">
        <button
          onClick={onClose}
          className="absolute top-0 right-0 text-white text-2xl font-bold"
        >
          ×
        </button>
        <img
          src={src}
          alt={alt}
          className="max-w-full max-h-screen rounded-lg shadow-lg"
        />
      </div>
    </div>
  );
};

export default ImageModal;
