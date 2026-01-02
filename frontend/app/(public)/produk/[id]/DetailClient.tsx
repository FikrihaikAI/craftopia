"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { addToCart } from "@/lib/cart";
import { rupiah } from "@/lib/format";

export default function DetailProduk({ id }: { id: string }) {
  const router = useRouter();

  const [produk, setProduk] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [added, setAdded] = useState(false); // 🔔 notif

  useEffect(() => {
    if (!id) return;

    axios
      .get(`http://localhost:5000/api/produk/${id}`)
      .then((res) => {
        const data = res.data.data || res.data.produk || res.data;
        setProduk(data);
      })
      .catch((err) => {
        console.error("Gagal ambil detail produk:", err);
      })
      .finally(() => setLoading(false));
  }, [id]);

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-32 flex justify-center">
        <div className="animate-pulse flex flex-col md:flex-row gap-10">
          <div className="w-80 h-96 bg-gray-200 rounded-2xl" />
          <div className="space-y-4 w-80">
            <div className="h-6 bg-gray-200 rounded" />
            <div className="h-8 bg-gray-200 rounded w-2/3" />
            <div className="h-4 bg-gray-200 rounded" />
            <div className="h-4 bg-gray-200 rounded w-1/2" />
            <div className="h-12 bg-gray-200 rounded" />
          </div>
        </div>
      </div>
    );
  }

  if (!produk) {
    return (
      <div className="pt-40 text-center text-gray-500">
        Produk tidak ditemukan
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen text-gray-900">

      {/* ================= BREADCRUMB ================= */}
      <div className="pt-24 px-6 md:px-20 text-sm text-gray-500">
        <button
          onClick={() => router.push("/produk")}
          className="hover:text-teal-600"
        >
          Produk
        </button>{" "}
        / <span className="text-gray-800">{produk.nama_produk}</span>
      </div>

      {/* ================= CARD ================= */}
      <div className="flex justify-center px-6 md:px-20 py-14">
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 flex flex-col md:flex-row gap-14 max-w-5xl w-full">

          {/* IMAGE */}
          <div className="flex justify-center">
            <img
              src={`/${produk.gambar}`}
              alt={produk.nama_produk}
              className="w-80 md:w-96 rounded-2xl border shadow-md hover:scale-105 transition"
            />
          </div>

          {/* INFO */}
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              {produk.nama_produk}
            </h1>

            <p className="text-2xl font-extrabold text-[#1c3f72] mb-4">
              {rupiah(produk.harga)}
            </p>

            {/* STOK */}
            <span
              className={`inline-block px-4 py-1 rounded-full text-sm font-semibold mb-6
                ${
                  produk.stok > 0
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-600"
                }`}
            >
              {produk.stok > 0
                ? `Stok ${produk.stok} tersedia`
                : "Stok habis"}
            </span>

            <p className="text-gray-700 leading-relaxed mb-8">
              {produk.deskripsi}
            </p>

            {/* BUTTONS */}
            <div className="flex flex-col sm:flex-row gap-4">
              {/* BELI */}
              <a
                href={`https://wa.me/6282155178576?text=Halo%20Craftopia!%20Saya%20ingin%20memesan%20produk%20${encodeURIComponent(
                  produk.nama_produk
                )}.`}
                target="_blank"
                rel="noopener noreferrer"
                className={`px-8 py-4 rounded-xl text-white font-semibold text-center transition
                  ${
                    produk.stok > 0
                      ? "bg-teal-500 hover:bg-teal-600"
                      : "bg-gray-400 cursor-not-allowed"
                  }`}
              >
                Beli Sekarang
              </a>

              {/* KERANJANG */}
              <button
                onClick={() => {
                  addToCart({
                    id: produk.id,
                    nama_produk: produk.nama_produk,
                    harga: produk.harga,
                    gambar: produk.gambar,
                    stok: produk.stok,
                  });

                  setAdded(true);
                  setTimeout(() => setAdded(false), 2000);
                }}
                disabled={produk.stok <= 0}
                className={`
                  px-8 py-4 rounded-xl border font-semibold
                  transition
                  ${
                    produk.stok > 0
                      ? "hover:bg-gray-100 hover:border-gray-400 active:scale-95 cursor-pointer"
                      : "opacity-50 cursor-not-allowed"
                  }
                `}
              >
                + Keranjang
              </button>
            </div>

            {/* NOTIF */}
            {added && (
              <p className="mt-4 text-sm font-semibold text-green-600">
                ✔ Produk berhasil ditambahkan ke keranjang
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
