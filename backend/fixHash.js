const db = require('./config/db');
const fs = require('fs');
const crypto = require('crypto');
const path = require('path');

db.query(
  "SELECT id, gambar FROM produk WHERE hash_gambar IS NULL",
  (err, results) => {
    if (err) throw err;

    results.forEach((item) => {
      const filePath = path.join(__dirname, 'uploads', item.gambar);

      if (fs.existsSync(filePath)) {
        const fileBuffer = fs.readFileSync(filePath);
        const hash = crypto.createHash("md5").update(fileBuffer).digest("hex");

        db.query(
          "UPDATE produk SET hash_gambar=? WHERE id=?",
          [hash, item.id]
        );
      } else {
        console.log("File tidak ditemukan:", item.gambar);
      }
    });

    console.log("Selesai generate hash lama");
  }
);