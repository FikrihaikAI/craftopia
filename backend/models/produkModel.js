const db = require('../config/db');

// ================= GET SEMUA PRODUK =================
exports.getAllProduk = (callback) => {
  db.query('SELECT * FROM produk', callback);
};

// ================= GET PRODUK BY ID =================
exports.getProdukById = (id, callback) => {
  db.query(
    'SELECT * FROM produk WHERE id = ?',
    [id],
    callback
  );
};

// ================= ADD PRODUK =================
exports.addProduk = (data, callback) => {
  const query = `
    INSERT INTO produk (nama_produk, harga, stok, deskripsi, gambar)
    VALUES (?, ?, ?, ?, ?)
  `;
  db.query(
    query,
    [data.nama_produk, data.harga, data.stok, data.deskripsi, data.gambar],
    callback
  );
};

// ================= CEK DUPLIKAT =================
exports.checkDuplicateProduk = (nama_produk, gambar, callback) => {
  const sql = `
    SELECT id FROM produk
    WHERE TRIM(LOWER(nama_produk)) = ?
       OR TRIM(gambar) = ?
    LIMIT 1
  `;
  db.query(sql, [nama_produk, gambar], callback);
};

// ================= UPDATE PRODUK =================
exports.updateProduk = (id, data, callback) => {
  const query = `
    UPDATE produk
    SET nama_produk=?, harga=?, stok=?, deskripsi=?, gambar=?
    WHERE id=?
  `;
  db.query(
    query,
    [data.nama_produk, data.harga, data.stok, data.deskripsi, data.gambar, id],
    callback
  );
};

// ================= DELETE PRODUK =================
exports.deleteProduk = (id, callback) => {
  db.query('DELETE FROM produk WHERE id=?', [id], callback);
};
