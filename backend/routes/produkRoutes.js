const express = require('express');
const router = express.Router();

const produkController = require('../controllers/produkController');
const upload = require("../middlewares/upload");

// GET semua produk
router.get('/', produkController.getAllProduk);

// GET by ID
router.get('/:id', produkController.getProdukById);

// POST pakai multer
router.post("/", upload.single("gambar"), produkController.addProduk);

// PUT pakai multer
router.put("/:id", upload.single("gambar"), produkController.updateProduk);

// DELETE
router.delete('/:id', produkController.deleteProduk);

module.exports = router;