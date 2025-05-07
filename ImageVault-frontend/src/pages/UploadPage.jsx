import React, { useEffect, useState, useRef } from "react";
import { uploadImage, getAllImages } from "../services/imageService";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ArrowRight, Home, UploadCloud, ImagePlus } from "lucide-react";

const UploadPage = () => {
    const [file, setFile] = useState(null);
    const [images, setImages] = useState([]);
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef();
    const navigate = useNavigate();

    const handleUpload = async () => {
        if (!file) {
            toast.warn("Please select an image first.");
            return;
        }

        if (!file.type.startsWith("image/")) {
            toast.error("Only image files are allowed.");
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            toast.error("Image must be less than 5MB.");
            return;
        }

        try {
            setIsUploading(true);
            await uploadImage(file);
            toast.success("Image uploaded successfully!");
            setFile(null);
            if (fileInputRef.current) fileInputRef.current.value = "";
            fetchImages();
        } catch (error) {
            toast.error("Upload failed. Try again.");
            console.error(error);
        } finally {
            setIsUploading(false);
        }
    };

    const fetchImages = async () => {
        try {
            const res = await getAllImages();
            setImages(res.data);
        } catch (error) {
            toast.error("Failed to load images.");
            console.error(error);
        }
    };

    useEffect(() => {
        fetchImages();
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#6C63FF] to-[#FF6CAB] flex items-center justify-center p-4 overflow-hidden">
            <div className="w-full max-w-2xl bg-white/20 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-8 relative overflow-hidden">

                {/* Heading */}
                <h1 className="text-5xl font-extrabold text-white text-center mb-10 drop-shadow-xl transform scale-110 animate__animated animate__fadeIn">
                    <span className="inline-flex items-center gap-3">📸 Upload Images</span>
                </h1>

                {/* Nav Buttons - Positioned Above the Upload Card */}
                <div className="w-full flex justify-between mb-8 z-10">
                    <button
                        onClick={() => navigate("/")}
                        className="bg-gray-800 hover:bg-white/30 text-white px-5 py-3 rounded-lg shadow-lg flex items-center gap-2 transition-all"
                    >
                        {/* <Home className="w-5 h-5" /> */}
                        🏠 Home
                    </button>
                    <button
                        onClick={() => navigate("/gallery")}
                        className="bg-[#3b82f6] hover:bg-[#2563eb] text-white px-5 py-3 rounded-lg shadow-lg flex items-center gap-2 transition-all"
                    >
                        {/* <ArrowRight className="w-5 h-5" /> */}
                        🖼️ Gallery
                    </button>
                </div>

                {/* Upload Card */}
                <div className="flex flex-col items-center gap-8 bg-white/20 rounded-3xl p-8 shadow-inner transition-all ease-in-out">
                    <h2 className="text-3xl font-semibold text-white flex items-center gap-2">
                        <ImagePlus className="w-7 h-7" />
                        Upload Your Image
                    </h2>

                    <label
                        htmlFor="imageInput"
                        className="w-full border-4 border-dashed border-white/50 rounded-xl p-8 cursor-pointer text-white hover:border-white/40 transition-all text-center"
                    >
                        {file ? (
                            <span className="block font-medium text-lg">{file.name}</span>
                        ) : (
                            <span className="block text-white/70 text-xl">Click or drag to select an image</span>
                        )}
                        <input
                            id="imageInput"
                            type="file"
                            ref={fileInputRef}
                            onChange={(e) => {
                                const selected = e.target.files[0];
                                setFile(selected);
                                if (selected) toast.info(`Selected: ${selected.name}`);
                            }}
                            className="hidden"
                        />
                    </label>

                    {file && (
                        <div className="w-full flex justify-center mt-6">
                            <img
                                src={URL.createObjectURL(file)}
                                alt="Preview"
                                className="rounded-lg w-80 h-56 object-cover border-4 border-white/30 shadow-lg transition-all transform hover:scale-105"
                            />
                        </div>
                    )}

                    <button
                        onClick={handleUpload}
                        disabled={isUploading}
                        className="bg-green-500 text-white px-7 py-4 rounded-lg hover:bg-green-600 transition font-medium shadow-lg flex items-center gap-3 disabled:opacity-50"
                    >
                        <UploadCloud className="w-6 h-6" />
                        {isUploading ? "Uploading..." : "Upload"}
                    </button>
                </div>

                <ToastContainer position="top-right" autoClose={3000} />
            </div>
        </div>
    );
};

export default UploadPage;
