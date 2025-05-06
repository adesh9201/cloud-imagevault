const Image = require("../models/imageModel");
const fs = require("fs");
const path = require("path");

exports.uploadImage = async (req, res) => {
    const image = new Image({ filename: req.file.filename });
    await image.save();
    res.status(201).json(image);
};

exports.getAllImages = async (req, res) => {
    const images = await Image.find().sort({ createdAt: -1 });
    res.json(images);
};

exports.deleteImage = async (req, res) => {
    const image = await Image.findById(req.params.id);
    if (!image) return res.status(404).json({ message: "Not found" });

    const filePath = path.join(__dirname, "..", "uploads", image.filename);
    fs.unlinkSync(filePath);
    await image.deleteOne();
    res.json({ message: "Image deleted" });
};