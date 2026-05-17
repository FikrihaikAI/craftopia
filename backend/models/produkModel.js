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
    INSERT INTO produk (nama_produk, harga, stok, deskripsi, gambar, hash_gambar)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(
    query,
    [
      data.nama_produk,
      data.harga,
      data.stok,
      data.deskripsi,
      data.gambar,
      data.hash_gambar
    ],
    callback
  );
};

// ================= CEK DUPLIKAT BERDASARKAN HASH =================
exports.checkDuplicateHash = (hash, callback) => {
  const sql = `
    SELECT id FROM produk
    WHERE hash_gambar = ?
    LIMIT 1
  `;
  db.query(sql, [hash], callback);
};

// ================= UPDATE PRODUK =================
exports.updateProduk = (id, data, callback) => {
  let query = `
    UPDATE produk
    SET nama_produk=?, harga=?, stok=?, deskripsi=?
  `;

  let values = [
    data.nama_produk,
    data.harga,
    data.stok,
    data.deskripsi,
  ];

  // kalau ada gambar baru
  if (data.gambar) {
    query += `, gambar=?`;
    values.push(data.gambar);
  }

  query += ` WHERE id=?`;
  values.push(id);

  db.query(query, values, callback);
};

// ================= DELETE PRODUK =================
exports.deleteProduk = (id, callback) => {
  db.query('DELETE FROM produk WHERE id=?', [id], callback);
};