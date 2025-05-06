const express = require("express");
const multer = require("multer");
const { uploadImage, getAllImages, deleteImage } = require("../controllers/imageController");

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "uploads/"),
    filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});

const upload = multer({ storage });

router.post("/", upload.single("image"), uploadImage);
router.get("/", getAllImages);
router.delete("/:id", deleteImage);

module.exports = router;