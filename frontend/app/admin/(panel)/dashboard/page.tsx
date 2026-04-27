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
    gambar: null as File | null,
    stok: "",
  });
  const [editId, setEditId] = useState<number | null>(null);

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

  //  TAMBAH /  EDIT PRODUK
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
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        alert("Produk berhasil diperbarui");
      } else {
        await axios.post(
          "http://localhost:5000/api/produk",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
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
    } catch (error: any) {
      console.error(error);
      alert("Terjadi kesalahan");
    }
  };

  //  MODE EDIT
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
    <div className="min-h-screen bg-[#212121] text-white">
  
      {/* NAVBAR */}
      <div className="bg-[#2a2a2a] border-b border-[#424242] px-8 py-4 flex justify-between items-center">
        <h1 className="text-lg font-semibold">Dashboard Admin</h1>
      </div>
  
      {/* CONTENT */}
      <div className="p-8">
  
        {/* HEADER */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold">
            Selamat Datang, Admin 👋
          </h2>
          <p className="text-gray-400">
            Kelola produk BAGgedebug melalui dashboard ini
          </p>
        </div>
  
        {/* FORM */}
        <div className="bg-[#2a2a2a] p-6 rounded-xl border border-[#424242] shadow-md mb-10">
          <h3 className="text-lg font-semibold mb-2">
            {editId ? "Edit Produk" : "Tambah Produk"}
          </h3>
  
          {editId && (
            <div className="mb-4 flex items-center justify-between bg-yellow-500/20 text-yellow-300 p-3 rounded-lg">
              <span>Mode Edit Aktif</span>
              <button
                onClick={() => {
                  setEditId(null);
                  setForm({
                    nama_produk: "",
                    harga: "",
                    deskripsi: "",
                    gambar:null as File | null,
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
              className="bg-[#212121] border border-[#424242] p-3 rounded-xl
              focus:outline-none focus:ring-2 focus:ring-[#FF0080]/40"
              required
            />
  
            <input
              type="number"
              placeholder="Harga"
              value={form.harga}
              onChange={(e) =>
                setForm({ ...form, harga: e.target.value })
              }
              className="bg-[#212121] border border-[#424242] p-3 rounded-xl
              focus:outline-none focus:ring-2 focus:ring-[#FF0080]/40"
              required
            />
  
            <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              console.log(file);
              setForm({ ...form, gambar: file });
            }}
            className="bg-[#212121] border border-[#424242] p-3 rounded-xl
            focus:outline-none focus:ring-2 focus:ring-[#FF0080]/40"
          />
  
            <input
              type="number"
              placeholder="Stok"
              value={form.stok}
              onChange={(e) =>
                setForm({ ...form, stok: e.target.value })
              }
              className="bg-[#212121] border border-[#424242] p-3 rounded-xl
              focus:outline-none focus:ring-2 focus:ring-[#FF0080]/40"
            />
  
            <textarea
              placeholder="Deskripsi Produk"
              value={form.deskripsi}
              onChange={(e) =>
                setForm({ ...form, deskripsi: e.target.value })
              }
              className="bg-[#212121] border border-[#424242] p-3 rounded-xl md:col-span-2
              focus:outline-none focus:ring-2 focus:ring-[#FF0080]/40"
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
              {editId ? "Simpan Perubahan" : "Tambah Produk"}
            </button>
          </form>
        </div>
  
        {/* TABLE */}
        <div className="bg-[#2a2a2a] p-6 rounded-xl border border-[#424242] shadow-md">
          <h3 className="text-lg font-semibold mb-4">Daftar Produk</h3>
  
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#212121] text-gray-300">
                  <th className="p-3">#</th>
                  <th className="p-3 text-left">Nama</th>
                  <th className="p-3">Harga</th>
                  <th className="p-3">Stok</th>
                  <th className="p-3">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {produk.map((item, index) => (
                  <tr
                    key={item.id}
                    className="border-b border-[#424242] hover:bg-[#333]"
                  >
                    <td className="p-3 text-center">{index + 1}</td>
                    <td className="p-3">{item.nama_produk}</td>
                    <td className="p-3 text-center">
                      Rp {Number(item.harga).toLocaleString("id-ID")}
                    </td>
                    <td className="p-3 text-center">{item.stok}</td>
                    <td className="p-3 text-center space-x-2">
                      <button
                        onClick={() => handleEdit(item)}
                        className="bg-yellow-500 px-3 py-1 rounded hover:bg-yellow-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
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
            <p className="text-center text-gray-400 mt-4">
              Belum ada produk
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
