const express = require("express");
const router = express.Router();
const db = require("../config/db");
const jwt = require("jsonwebtoken");

/* ================= LOGIN & LOGOUT ================= */
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  const sql = "SELECT * FROM admins WHERE username=? AND password=?";
  db.query(sql, [username, password], (err, result) => {
    if (err) return res.status(500).json({ message: "Server error" });

    if (result.length === 0) {
      return res.status(401).json({ message: "Username atau password salah" });
    }

    const admin = result[0];

    //BUAT TOKEN
    const token = jwt.sign(
      { id: admin.id, username: admin.username },
      "SECRET_KEY_KAMU",
      { expiresIn: "1h" }
    );

    // SIMPAN TOKEN DI COOKIE
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
    });

    res.json({
      message: "Login berhasil",
      adminId: admin.id,
    });
  });
});

router.post("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
  });

  res.json({ message: "Logout berhasil" });
});

/* ================= UPDATE AKUN ================= */
router.put("/update-account", (req, res) => {
  const { adminId, usernameBaru, passwordLama, passwordBaru } = req.body;

  if (!adminId || !passwordLama || !passwordBaru) {
    return res.status(400).json({ message: "Data tidak lengkap" });
  }

  // cek password lama BERDASARKAN ID
  const cekSql = "SELECT * FROM admins WHERE id=? AND password=?";
  db.query(cekSql, [adminId, passwordLama], (err, result) => {
    if (err) return res.status(500).json({ message: "Server error" });

    if (result.length === 0) {
      return res.status(401).json({ message: "Password lama salah" });
    }

    // update
    const updateSql = `
      UPDATE admins
      SET username = ?, password = ?
      WHERE id = ?
    `;

    db.query(
      updateSql,
      [
        usernameBaru || result[0].username, // opsional
        passwordBaru,
        adminId,
      ],
      (err) => {
        if (err) {
          return res.status(500).json({ message: "Gagal update akun" });
        }

        res.json({ message: "Akun berhasil diperbarui" });
      }
    );
  });
});

module.exports = router;
