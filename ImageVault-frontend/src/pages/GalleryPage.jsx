import React, { useEffect, useState } from "react";
import { getAllImages, deleteImage } from "../services/imageService";
import ImagePreviewModal from "../components/ImagePreviewModal";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const GalleryPage = () => {
    const [images, setImages] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [confirmDeleteId, setConfirmDeleteId] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [password, setPassword] = useState("");
    const [pendingDeleteId, setPendingDeleteId] = useState(null);
    const [showUploadPasswordModal, setShowUploadPasswordModal] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchImages();
    }, []);

    const fetchImages = async () => {
        try {
            const res = await getAllImages();
            setImages(res.data);
        } catch (error) {
            toast.error("Failed to fetch images.");
            console.error("Fetch error:", error);
        }
    };

    const handleProtectedUpload = () => {
        setShowUploadPasswordModal(true);
    };

    const handleUploadPasswordSubmit = () => {
        if (password === process.env.REACT_APP_ADMIN_PASSWORD) {
            navigate("/upload");
        } else {
            toast.error("❌ Incorrect password. Access denied!", {
                position: "top-center",
            });
        }
        setPassword("");
        setShowUploadPasswordModal(false);
    };

    const handleDeleteClick = (id) => {
        setPendingDeleteId(id);
        setShowPasswordModal(true);
    };

    const handleDeletePasswordSubmit = () => {
        if (password === process.env.REACT_APP_ADMIN_PASSWORD) {
            setConfirmDeleteId(pendingDeleteId);
        } else {
            toast.error("❌ Incorrect password. Deletion denied!", {
                position: "top-center",
            });
            setPendingDeleteId(null);
        }
        setPassword("");
        setShowPasswordModal(false);
    };

    const handleDeleteConfirm = async (id) => {
        setIsDeleting(true);
        try {
            await deleteImage(id);
            toast.success("🗑️ Image deleted successfully!");
            fetchImages();
        } catch (error) {
            toast.error("❌ Failed to delete image.");
            console.error(error);
        } finally {
            setConfirmDeleteId(null);
            setIsDeleting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 p-6">
            <div className="max-w-6xl mx-auto bg-white/90 backdrop-blur-md rounded-3xl p-8 shadow-2xl">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-start items-center mb-8 gap-4">
                    <button
                        onClick={() => navigate("/")}
                        className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-900 transition duration-300 shadow-md"
                    >
                        🏠 Home
                    </button>
                    <div className="flex-1 text-center">
                        <h2 className="text-4xl font-extrabold text-gray-800 tracking-wide">
                            🖼️ My Gallery
                        </h2>
                    </div>
                    <button
                        onClick={handleProtectedUpload}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300 shadow-md"
                    >
                        ⬆ Upload
                    </button>
                </div>

                {/* Gallery */}
                {images.length === 0 ? (
                    <div className="text-center text-gray-700 py-20">
                        <p className="text-xl">No images found. Start uploading now!</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                        {images.map((img) => (
                            <div key={img._id} className="relative group shadow-lg rounded-2xl overflow-hidden">
                                <img
                                    src={`${process.env.REACT_APP_API_URL}/uploads/${img.filename}`}
                                    alt="gallery"
                                    className="w-full h-48 object-cover transition-transform duration-300 transform hover:scale-105 cursor-pointer"
                                    onClick={() =>
                                        setSelectedImage(`${process.env.REACT_APP_API_URL}/uploads/${img.filename}`)
                                    }
                                />
                                {/* Delete button */}
                                <button
                                    onClick={() => handleDeleteClick(img._id)}
                                    className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded shadow hover:bg-red-700 z-10"
                                >
                                    🗑️
                                </button>

                                {/* Delete Confirmation */}
                                {confirmDeleteId === img._id && (
                                    <div className="absolute inset-0 bg-white/90 flex flex-col justify-center items-center z-20 p-4 rounded-xl shadow-xl">
                                        <p className="text-gray-800 mb-4 font-semibold">Confirm delete?</p>
                                        <div className="flex gap-4">
                                            <button
                                                onClick={() => handleDeleteConfirm(img._id)}
                                                disabled={isDeleting}
                                                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                            >
                                                {isDeleting ? "Deleting..." : "Yes"}
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setConfirmDeleteId(null);
                                                    setPendingDeleteId(null);
                                                }}
                                                className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Image Preview Modal */}
            {selectedImage && (
                <ImagePreviewModal
                    imageUrl={selectedImage}
                    onClose={() => setSelectedImage(null)}
                />
            )}

            {/* Upload Password Modal */}
            {showUploadPasswordModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-xl shadow-xl w-80">
                        <h2 className="text-lg font-semibold mb-4 text-center">🔐 Enter Admin Password</h2>
                        <input
                            type="password"
                            className="w-full border border-gray-300 rounded px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter password..."
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <div className="flex justify-between">
                            <button
                                onClick={handleUploadPasswordSubmit}
                                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                            >
                                Submit
                            </button>
                            <button
                                onClick={() => {
                                    setPassword("");
                                    setShowUploadPasswordModal(false);
                                }}
                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Password Modal */}
            {showPasswordModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-xl shadow-xl w-80">
                        <h2 className="text-lg font-semibold mb-4 text-center">🔐 Confirm Deletion</h2>
                        <input
                            type="password"
                            className="w-full border border-gray-300 rounded px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-red-500"
                            placeholder="Enter admin password..."
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <div className="flex justify-between">
                            <button
                                onClick={handleDeletePasswordSubmit}
                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                            >
                                Submit
                            </button>
                            <button
                                onClick={() => {
                                    setPassword("");
                                    setShowPasswordModal(false);
                                    setPendingDeleteId(null);
                                }}
                                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Toast */}
            <ToastContainer />
        </div>
    );
};

export default GalleryPage;