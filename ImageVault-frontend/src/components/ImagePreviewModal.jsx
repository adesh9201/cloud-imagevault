import React from "react";

const ImagePreviewModal = ({ imageUrl, onClose }) => {
    if (!imageUrl) return null;

    return (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center">
            <div className="relative max-w-4xl w-full p-4">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-white text-2xl font-bold"
                >
                    ✕
                </button>
                <img
                    src={imageUrl}
                    alt="Full View"
                    className="w-full max-h-[90vh] object-contain rounded"
                />
            </div>
        </div>
    );
};

export default ImagePreviewModal;