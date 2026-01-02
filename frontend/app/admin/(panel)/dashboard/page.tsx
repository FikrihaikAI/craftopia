"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function DashboardPage() {
  const router = useRouter();

  const [produk, setProduk] = useState<any[]>([]);
  const [form, setForm] = useState({
    nama_produk: "",
    harga: "",
    deskripsi: "",
    gambar: "",
    stok: "",
  });
  const [editId, setEditId] = useState<number | null>(null);

  //  Cek login admin
  useEffect(() => {
    const loggedIn = localStorage.getItem("isAdminLoggedIn");
    if (!loggedIn) {
      router.push("/admin/login");
    }
  }, [router]);

  //  Ambil data produk
  useEffect(() => {
    fetchProduk();
  }, []);

  const fetchProduk = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/produk");
      setProduk(res.data);
    } catch (err) {
      console.error("Gagal ambil produk:", err);
    }
  };

  // ➕ TAMBAH /  EDIT PRODUK (FIX)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editId) {
        // UPDATE
        await axios.put(
          `http://localhost:5000/api/produk/${editId}`,
          {
            ...form,
            harga: Number(form.harga),
            stok: Number(form.stok),
          }
        );
        alert("Produk berhasil diperbarui");
      } else {
        // TAMBAH
        await axios.post(
          "http://localhost:5000/api/produk",
          {
            ...form,
            harga: Number(form.harga),
            stok: Number(form.stok),
          }
        );
        alert("Produk berhasil ditambahkan");
      }

      // RESET FORM
      setForm({
        nama_produk: "",
        harga: "",
        deskripsi: "",
        gambar: "",
        stok: "",
      });
      setEditId(null);

      // REFRESH TABLE
      fetchProduk();

      window.scrollTo({ top: 400, behavior: "smooth" });
    } catch (error: any) {
      if (error.response) {
        alert(error.response.data.message || "Terjadi kesalahan");
      } else {
        alert("Server tidak dapat dihubungi");
      }
    }
  };

  //  MODE EDIT
  const handleEdit = (item: any) => {
    setForm({
      nama_produk: item.nama_produk,
      harga: item.harga,
      deskripsi: item.deskripsi,
      gambar: item.gambar,
      stok: item.stok,
    });
    setEditId(item.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  //  HAPUS
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
    <>
      {/* NAVBAR */}
      <div className="bg-white shadow px-8 py-4 flex justify-between items-center">
        <h1 className="text-lg font-semibold text-gray-700">
          Dashboard Admin
        </h1>
      </div>

      {/* CONTENT */}
      <div className="p-8 bg-gray-50 min-h-screen">
        {/* HEADER */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800">
            Selamat Datang, Admin
          </h2>
          <p className="text-gray-500">
            Kelola produk Craftopia melalui dashboard ini
          </p>
        </div>

        {/* FORM */}
        <div className="bg-white p-6 rounded-xl shadow-md mb-10">
          <h3 className="text-lg font-semibold mb-1">
            {editId ? "Edit Produk" : "Tambah Produk"}
          </h3>

          {editId && (
            <div className="mb-4 flex items-center justify-between bg-yellow-100 text-yellow-700 p-3 rounded-lg">
              <span>Mode Edit Aktif</span>
              <button
                onClick={() => {
                  setEditId(null);
                  setForm({
                    nama_produk: "",
                    harga: "",
                    deskripsi: "",
                    gambar: "",
                    stok: "",
                  });
                }}
                className="text-sm underline"
              >
                Batal Edit
              </button>
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <input
              type="text"
              placeholder="Nama Produk"
              value={form.nama_produk}
              onChange={(e) =>
                setForm({ ...form, nama_produk: e.target.value })
              }
              className="border p-2 rounded-lg"
              required
            />

            <input
              type="number"
              placeholder="Harga"
              value={form.harga}
              onChange={(e) =>
                setForm({ ...form, harga: e.target.value })
              }
              className="border p-2 rounded-lg"
              required
            />

            <input
              type="text"
              placeholder="URL Gambar"
              value={form.gambar}
              onChange={(e) =>
                setForm({ ...form, gambar: e.target.value })
              }
              className="border p-2 rounded-lg"
            />

            <input
              type="number"
              placeholder="Stok"
              value={form.stok}
              onChange={(e) =>
                setForm({ ...form, stok: e.target.value })
              }
              className="border p-2 rounded-lg"
            />

            <textarea
              placeholder="Deskripsi Produk"
              value={form.deskripsi}
              onChange={(e) =>
                setForm({ ...form, deskripsi: e.target.value })
              }
              className="border p-2 rounded-lg md:col-span-2"
              required
            />

            <button
              type="submit"
              className={`text-white py-2 rounded-lg md:col-span-2 transition ${
                editId
                  ? "bg-yellow-500 hover:bg-yellow-600"
                  : "bg-[#3D5C8A] hover:bg-[#2c4973]"
              }`}
            >
              {editId ? "Simpan Perubahan" : "Tambah Produk"}
            </button>
          </form>
        </div>

        {/* TABLE */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold mb-4">Daftar Produk</h3>

          <table className="w-full border text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-3">#</th>
                <th className="p-3 text-left">Nama</th>
                <th className="p-3">Harga</th>
                <th className="p-3">Stok</th>
                <th className="p-3">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {produk.map((item, index) => (
                <tr key={item.id} className="border-b">
                  <td className="p-3 text-center">{index + 1}</td>
                  <td className="p-3">{item.nama_produk}</td>
                  <td className="p-3 text-center">
                    Rp {Number(item.harga).toLocaleString("id-ID")}
                  </td>
                  <td className="p-3 text-center">{item.stok}</td>
                  <td className="p-3 text-center space-x-2">
                    <button
                      onClick={() => handleEdit(item)}
                      className="bg-yellow-400 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {produk.length === 0 && (
            <p className="text-center text-gray-500 mt-4">
              Belum ada produk
            </p>
          )}
        </div>
      </div>
    </>
  );
}
