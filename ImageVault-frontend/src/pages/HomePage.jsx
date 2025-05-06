import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Camera } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const HomePage = () => {
    const navigate = useNavigate();
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [password, setPassword] = useState("");

    const handleUploadClick = () => {
        setShowPasswordModal(true);
    };

    const handlePasswordSubmit = () => {
        if (password === process.env.REACT_APP_ADMIN_PASSWORD) {
            navigate("/upload");
        } else {
            toast.error("❌ Incorrect password. Access denied!", {
                position: "top-center",
            });
        }
        setPassword("");
        setShowPasswordModal(false);
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-teal-500 via-cyan-600 to-purple-700 p-6 relative">
            <h1 className="text-6xl font-extrabold text-white mb-12 text-center tracking-wide">
                📸 <span className="text-yellow-400">ImageVault</span>
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Upload Photos */}
                <div className="flex flex-col items-center p-10 bg-white rounded-xl shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-xl hover:bg-gradient-to-r from-green-400 to-lime-400">
                    <Camera size={120} className="text-green-600 mb-6 transform transition duration-300 hover:text-green-700" />
                    <button
                        onClick={handleUploadClick}
                        className="bg-gradient-to-r from-green-500 to-lime-500 text-white text-lg px-10 py-5 rounded-xl shadow-lg transform hover:scale-105 transition duration-300 ease-in-out hover:from-green-400 hover:to-lime-400"
                    >
                        Upload Photos
                    </button>
                </div>

                {/* Fetch Photos */}
                <div className="flex flex-col items-center p-10 bg-white rounded-xl shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-xl hover:bg-gradient-to-r from-blue-500 to-indigo-600">
                    <Camera size={120} className="text-blue-600 mb-6 transform transition duration-300 hover:text-blue-700" />
                    <button
                        onClick={() => navigate("/gallery")}
                        className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-lg px-10 py-5 rounded-xl shadow-lg transform hover:scale-105 transition duration-300 ease-in-out hover:from-blue-400 hover:to-indigo-400"
                    >
                        Fetch Photos
                    </button>
                </div>
            </div>

            {/* Footer */}
            <footer className="mt-16 text-white text-sm">
                <p>Made with ❤️ by <span className="text-yellow-400">Adesh</span></p>
            </footer>

            {/* Toast */}
            <ToastContainer />

            {/* Password Modal */}
            {showPasswordModal && (
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
                                onClick={handlePasswordSubmit}
                                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                            >
                                Submit
                            </button>
                            <button
                                onClick={() => {
                                    setPassword("");
                                    setShowPasswordModal(false);
                                }}
                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default HomePage;