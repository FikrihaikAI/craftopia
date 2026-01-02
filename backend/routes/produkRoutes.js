const express = require('express');
const router = express.Router();
const produkController = require('../controllers/produkController');

// Rute GET - ambil semua produk
router.get('/', produkController.getAllProduk);

// Rute GET - ambil produk berdasarkan ID
router.get('/:id', produkController.getProdukById);

// Rute POST - tambah produk baru
router.post('/', produkController.addProduk);

// Rute PUT - update produk berdasarkan ID
router.put('/:id', produkController.updateProduk);

// Rute DELETE - hapus produk berdasarkan ID
router.delete('/:id', produkController.deleteProduk);

module.exports = router;
