const produkModel = require("../models/produkModel");

// ================= GET SEMUA PRODUK =================
exports.getAllProduk = (req, res) => {
  produkModel.getAllProduk((err, result) => {
    if (err) {
      console.error(' ERROR GET PRODUK:', err);
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
  const data = req.body;

  const nama_produk = data.nama_produk?.trim().toLowerCase();
  const gambar = data.gambar?.trim();

  if (!nama_produk || !gambar) {
    return res.status(400).json({
      message: "Nama produk dan foto wajib diisi"
    });
  }

  produkModel.checkDuplicateProduk(nama_produk, gambar, (err, result) => {
    if (err) return res.status(500).json({ error: err });

    if (result.length > 0) {
      return res.status(409).json({
        message: "Produk dengan nama atau foto yang sama sudah ada"
      });
    }

    produkModel.addProduk(
      {
        ...data,
        nama_produk: data.nama_produk.trim(),
        gambar: data.gambar.trim()
      },
      (err, results) => {
        if (err) {
          return res.status(500).json({ error: err });
        }

        res.status(201).json({
          message: "Produk berhasil ditambahkan",
          id: results.insertId
        });
      }
    );
  });
};

// ================= UPDATE PRODUK =================
exports.updateProduk = (req, res) => {
  const id = req.params.id;

  produkModel.updateProduk(id, req.body, (err) => {
    if (err) {
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
