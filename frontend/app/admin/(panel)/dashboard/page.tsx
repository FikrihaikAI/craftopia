"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function DashboardPage() {
  const [produk, setProduk] = useState<any[]>([]);
  const [form, setForm] = useState({
    nama_produk: "",
    harga: "",
    deskripsi: "",
    gambar: null as File | null,
    stok: "",
  });
  const [editId, setEditId] = useState<number | null>(null);

  // ================= FETCH DATA =================
  useEffect(() => {
    fetchProduk();
  }, []);

  const fetchProduk = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/produk");

      const data = res.data.data || res.data;
      setProduk(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Gagal ambil produk:", err);
      setProduk([]);
    }
  };

  // ================= SUBMIT =================
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("nama_produk", form.nama_produk);
      formData.append("harga", form.harga);
      formData.append("deskripsi", form.deskripsi);
      formData.append("stok", form.stok);

      if (form.gambar) {
        formData.append("gambar", form.gambar);
      }

      if (editId) {
        await axios.put(
          `http://localhost:5000/api/produk/${editId}`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        alert("Produk berhasil diperbarui");
      } else {
        await axios.post(
          "http://localhost:5000/api/produk",
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        alert("Produk berhasil ditambahkan");
      }

      // reset
      setForm({
        nama_produk: "",
        harga: "",
        deskripsi: "",
        gambar: null,
        stok: "",
      });
      setEditId(null);

      fetchProduk();
    } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan");
    }
  };

  // ================= EDIT =================
  const handleEdit = (item: any) => {
    setForm({
      nama_produk: item.nama_produk,
      harga: item.harga,
      deskripsi: item.deskripsi,
      gambar: null,
      stok: item.stok,
    });
    setEditId(item.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ================= DELETE =================
  const handleDelete = async (id: number) => {
    if (confirm("Yakin ingin menghapus produk ini?")) {
      try {
        await axios.delete(`http://localhost:5000/api/produk/${id}`);
        fetchProduk();
      } catch (err) {
        console.error("Gagal hapus produk:", err);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#181818] text-white">

      {/* HEADER */}
      <div className="px-8 py-6 border-b border-[#2a2a2a]">
        <h1 className="text-2xl font-bold">Dashboard Admin</h1>
        <p className="text-gray-400 text-sm">
          Kelola produk BAGgedebug
        </p>
      </div>

      <div className="p-8 space-y-8">

        {/* STATS */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="card">
            <p className="text-gray-400 text-sm">Total Produk</p>
            <h2 className="text-2xl font-bold">{produk.length}</h2>
          </div>

          <div className="card">
            <p className="text-gray-400 text-sm">Total Stok</p>
            <h2 className="text-2xl font-bold">
              {produk.reduce((sum, p) => sum + Number(p.stok), 0)}
            </h2>
          </div>

          <div className="card">
            <p className="text-gray-400 text-sm">Produk Habis</p>
            <h2 className="text-2xl font-bold">
              {produk.filter((p) => p.stok == 0).length}
            </h2>
          </div>
        </div>

        {/* FORM */}
        <div className="card">
          <h3 className="text-xl font-semibold mb-6">
            {editId ? "Edit Produk" : "Tambah Produk"}
          </h3>

          <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-5">

            <input
              type="text"
              placeholder="Nama Produk"
              value={form.nama_produk}
              onChange={(e) =>
                setForm({ ...form, nama_produk: e.target.value })
              }
              className="input-style"
              required
            />

            <input
              type="number"
              placeholder="Harga"
              value={form.harga}
              onChange={(e) =>
                setForm({ ...form, harga: e.target.value })
              }
              className="input-style"
              required
            />

            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setForm({ ...form, gambar: e.target.files?.[0] || null })
              }
              className="input-style"
            />

            <input
              type="number"
              placeholder="Stok"
              value={form.stok}
              onChange={(e) =>
                setForm({ ...form, stok: e.target.value })
              }
              className="input-style"
            />

            <textarea
              placeholder="Deskripsi Produk"
              value={form.deskripsi}
              onChange={(e) =>
                setForm({ ...form, deskripsi: e.target.value })
              }
              className="input-style md:col-span-2"
              required
            />

            <button
              type="submit"
              className={`md:col-span-2 py-3 rounded-xl font-semibold transition ${
                editId
                  ? "bg-yellow-500 hover:bg-yellow-600"
                  : "bg-[#FF0080] hover:bg-pink-600"
              }`}
            >
              {editId ? "Update Produk" : "Tambah Produk"}
            </button>
          </form>
        </div>

        {/* TABLE */}
        <div className="card">
          <h3 className="text-xl font-semibold mb-6">
            Daftar Produk
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-gray-400 border-b border-[#333]">
                  <th className="p-3">#</th>
                  <th className="p-3 text-left">Produk</th>
                  <th className="p-3">Harga</th>
                  <th className="p-3">Stok</th>
                  <th className="p-3">Aksi</th>
                </tr>
              </thead>

              <tbody>
                {produk.map((item, i) => (
                  <tr
                    key={item.id}
                    className="border-b border-[#333] hover:bg-[#242424]"
                  >
                    <td className="p-3 text-center">{i + 1}</td>

                    <td className="p-3">
                      <p className="font-semibold">{item.nama_produk}</p>
                      <p className="text-xs text-gray-400">
                        ID: {item.id}
                      </p>
                    </td>

                    <td className="p-3 text-center">
                      Rp {Number(item.harga).toLocaleString("id-ID")}
                    </td>

                    <td className="p-3 text-center">
                      <span
                        className={`px-3 py-1 rounded-full text-xs ${
                          item.stok > 0
                            ? "bg-green-500/20 text-green-400"
                            : "bg-red-500/20 text-red-400"
                        }`}
                      >
                        {item.stok > 0 ? item.stok : "Habis"}
                      </span>
                    </td>

                    <td className="p-3 text-center space-x-2">
                      <button
                        onClick={() => handleEdit(item)}
                        className="px-3 py-1 bg-yellow-500 rounded hover:bg-yellow-600"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(item.id)}
                        className="px-3 py-1 bg-red-500 rounded hover:bg-red-600"
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {produk.length === 0 && (
            <p className="text-center text-gray-400 mt-6">
              Belum ada produk
            </p>
          )}
        </div>
      </div>
    </div>
  );
}