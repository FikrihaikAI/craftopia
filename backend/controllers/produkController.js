const produkModel = require("../models/produkModel");
const crypto = require("crypto");
const fs = require("fs");

// ================= GET SEMUA PRODUK =================
exports.getAllProduk = (req, res) => {
  produkModel.getAllProduk((err, result) => {
    if (err) {
      console.error("ERROR GET PRODUK:", err);
      return res.status(500).json({ message: "Server error" });
    }
    res.json(result);
  });
};

// ================= GET PRODUK BY ID =================
exports.getProdukById = (req, res) => {
  const id = req.params.id;

  produkModel.getProdukById(id, (err, results) => {
    if (err) {
      console.error("ERROR DB:", err);
      return res.status(500).json({ message: "Server error" });
    }

    if (!results || results.length === 0) {
      return res.status(404).json({ message: "Produk tidak ditemukan" });
    }

    res.json(results[0]);
  });
};

// ================= ADD PRODUK =================
exports.addProduk = (req, res) => {
  const { nama_produk, harga, deskripsi, stok } = req.body;

  if (!req.file) {
    return res.status(400).json({
      message: "Gambar wajib diupload",
    });
  }

  const gambar = req.file.filename;

  // HASH GAMBAR
  const fileBuffer = fs.readFileSync(req.file.path);
  const hash = crypto.createHash("md5").update(fileBuffer).digest("hex");

  // CEK DUPLIKAT BERDASARKAN HASH
  produkModel.checkDuplicateHash(hash, (err, result) => {
    if (err) return res.status(500).json({ error: err });

    if (result.length > 0) {
      // hapus file kalau duplicate
      fs.unlinkSync(req.file.path);

      return res.status(409).json({
        message: "Gambar sudah pernah digunakan",
      });
    }

    // lanjut simpan ke database
    produkModel.addProduk(
      {
        nama_produk: nama_produk.trim(),
        harga,
        deskripsi,
        gambar,
        stok,
        hash_gambar: hash,
      },
      (err, results) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: err });
        }

        res.status(201).json({
          message: "Produk berhasil ditambahkan",
          id: results.insertId,
        });
      }
    );
  });
};

// ================= UPDATE PRODUK =================
exports.updateProduk = (req, res) => {
  const id = req.params.id;

  const { nama_produk, harga, deskripsi, stok } = req.body;
  const gambar = req.file ? req.file.filename : null;

  const data = {
    nama_produk,
    harga,
    deskripsi,
    stok,
  };

  if (gambar) {
    data.gambar = gambar;
  }

  produkModel.updateProduk(id, data, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Gagal update produk" });
    }
    res.json({ message: "Produk berhasil diupdate" });
  });
};

// ================= DELETE PRODUK =================
exports.deleteProduk = (req, res) => {
  const id = req.params.id;

  produkModel.deleteProduk(id, (err) => {
    if (err) {
      return res.status(500).json({ message: "Gagal hapus produk" });
    }
    res.json({ message: "Produk berhasil dihapus" });
  });
};