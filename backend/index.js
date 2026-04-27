const express = require('express');
const cors = require('cors');
require('dotenv').config();
const path = require("path");

const app = express();

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));

app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Import routes admin
const adminRoutes = require('./routes/adminRoutes');

// Pakai routes admin
app.use('/api/admin', adminRoutes);

// Import koneksi database
const db = require('./config/db');

// Import routes produk
const produkRoutes = require('./routes/produkRoutes');
app.use('/api/produk', produkRoutes);

// Rute sederhana untuk tes server
app.get('/', (req, res) => {
  res.send('Server BAGgedebug berjalan dan siap digunakan!');
});

// Jalankan server
const PORT = 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server berjalan di port ${PORT}`);
});