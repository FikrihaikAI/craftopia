"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { rupiah } from "@/lib/format";

export default function SemuaProdukPage() {
  const [produk, setProduk] = useState<any[]>([]);

  const [kategoriAktif, setKategoriAktif] = useState("Semua");
  const kategoriList = [
    "Semua",
    "Frame Art",
    "Pop Art",
    "Mini Pot"
  ];

  // Ambil semua produk
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/produk")
      .then((res) => setProduk(res.data))
      .catch((err) => console.error("Gagal ambil produk:", err));
  }, []);

  const produkFiltered =
  kategoriAktif === "Semua"
    ? produk
    : produk.filter((p) =>
        p.nama_produk.toLowerCase().includes(kategoriAktif.toLowerCase())
      );


      return (
        <div className="min-h-screen bg-gray-50 text-gray-900">
      
          {/* ================= MAIN ================= */}
          <main className="pt-28 px-6 md:px-20 pb-20">
      
            {/* Judul */}
            <h1 className="text-4xl font-bold text-center text-[#0b1e3d] mb-10">
              Katalog Produk Craftopia
            </h1>
      
            {/* ================= KATEGORI ================= */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {kategoriList.map((kat) => (
                <button
                  key={kat}
                  onClick={() => setKategoriAktif(kat)}
                  className={`px-5 py-2 rounded-full font-semibold transition
                    ${
                      kategoriAktif === kat
                        ? "bg-teal-500 text-white"
                        : "bg-white border border-gray-300 text-gray-700 hover:bg-teal-50"
                    }`}
                >
                  {kat}
                </button>
              ))}
            </div>
      
            {/* ================= GRID PRODUK ================= */}
            {produkFiltered.length === 0 ? (
              <p className="text-center text-gray-500">Produk tidak ditemukan</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                {produkFiltered.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-2xl shadow-md hover:shadow-xl border overflow-hidden transition hover:-translate-y-1"
                  >
                    <img
                      src={`/${item.gambar}`}
                      alt={item.nama_produk}
                      className="w-full h-64 object-cover"
                    />
                    <div className="p-5">
                      <h4 className="font-semibold text-xl">{item.nama_produk}</h4>
                      <p className="text-[#1c3f72] font-bold text-lg mb-2">
                        {rupiah(item.harga)}
                      </p>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {item.deskripsi}
                      </p>
                      <Link
                        href={`/produk/${item.id}`}
                        className="inline-block bg-teal-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-teal-600"
                      >
                        Lihat Detail
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </main>
        </div>
      );
    }