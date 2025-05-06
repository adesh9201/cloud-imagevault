import axios from "axios";

// 👇 use the env variable here
const API = `${process.env.REACT_APP_API_URL}/api/images`;

export const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("image", file);
    return await axios.post(API, formData);
};

export const getAllImages = async () => {
    return await axios.get(API);
};

export const deleteImage = async (id) => {
    return await axios.delete(`${API}/${id}`);
};
