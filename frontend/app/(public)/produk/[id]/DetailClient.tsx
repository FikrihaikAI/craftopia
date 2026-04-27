"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { addToCart } from "@/lib/cart";
import { rupiah } from "@/lib/format";

const BASE_URL = "http://localhost:5000";

export default function DetailProduk({ id }: { id: string }) {
  const router = useRouter();

  const [produk, setProduk] = useState<any>(null);
  const [allProduk, setAllProduk] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (!id) return;

    Promise.all([
      axios.get(`${BASE_URL}/api/produk`),
      axios.get(`${BASE_URL}/api/produk/${id}`),
    ])
      .then(([allRes, detailRes]) => {
        const allData = allRes.data.data || allRes.data;
        const detailData =
          detailRes.data.data ||
          detailRes.data.produk ||
          detailRes.data;

        setAllProduk(allData);
        setProduk(detailData);
      })
      .catch((err) => {
        console.error("Gagal ambil data:", err);
      })
      .finally(() => setLoading(false));
  }, [id]);

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <div className="min-h-screen bg-[#212121] pt-32 flex justify-center">
        <div className="animate-pulse flex flex-col md:flex-row gap-10">
          <div className="w-80 h-96 bg-[#2a2a2a] rounded-2xl" />
          <div className="space-y-4 w-80">
            <div className="h-6 bg-[#2a2a2a] rounded" />
            <div className="h-8 bg-[#2a2a2a] rounded w-2/3" />
            <div className="h-4 bg-[#2a2a2a] rounded" />
            <div className="h-4 bg-[#2a2a2a] rounded w-1/2" />
            <div className="h-12 bg-[#2a2a2a] rounded" />
          </div>
        </div>
      </div>
    );
  }

  if (!produk) {
    return (
      <div className="pt-40 text-center text-gray-400 bg-[#212121] min-h-screen">
        Produk tidak ditemukan
      </div>
    );
  }

  /* ================= DISKON ================= */
  const produkDiskonIds = allProduk.slice(3, 6).map((p) => p.id);

  const hargaAsli = Number(produk.harga);
  const isDiskon = produkDiskonIds.includes(produk.id);
  const hargaFinal = isDiskon
    ? Math.floor(hargaAsli * 0.9)
    : hargaAsli;

  return (
    <div className="bg-[#212121] min-h-screen text-white">

      {/* ================= NAV ================= */}
      <div className="pt-24 px-6 md:px-20 text-sm text-gray-400">
        <button
          onClick={() => router.push("/produk")}
          className="hover:text-[#FF0080]"
        >
          Produk
        </button>{" "}
        / <span className="text-white">{produk.nama_produk}</span>
      </div>

      {/* ================= CARD ================= */}
      <div className="flex justify-center px-6 md:px-20 py-14">
        <div className="bg-[#2a2a2a] rounded-3xl border border-[#3a3a3a] p-8 md:p-12 flex flex-col md:flex-row gap-14 max-w-5xl w-full">

          {/* ================= IMAGE ================= */}
          <div className="flex justify-center">
            <img
              src={`${BASE_URL}/uploads/${produk.gambar}`}
              alt={produk.nama_produk}
              onError={(e: any) => {
                e.target.src = "/no-image.png"; // fallback kalau gambar error
              }}
              className="w-80 md:w-96 rounded-2xl border border-[#3a3a3a] hover:scale-105 transition"
            />
          </div>

          {/* ================= INFO ================= */}
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              {produk.nama_produk}
            </h1>

            {/* HARGA */}
            <div className="mb-4">
              {isDiskon ? (
                <>
                  <p className="text-sm line-through text-gray-400">
                    {rupiah(hargaAsli)}
                  </p>
                  <p className="text-2xl font-extrabold text-[#FF0080]">
                    {rupiah(hargaFinal)}
                  </p>
                </>
              ) : (
                <p className="text-2xl font-extrabold text-[#FF0080]">
                  {rupiah(hargaAsli)}
                </p>
              )}
            </div>

            {/* STOK */}
            <span
              className={`inline-block px-4 py-1 rounded-full text-sm font-semibold mb-6
              ${
                produk.stok > 0
                  ? "bg-[#FF0080]/20 text-[#FFB8DB]"
                  : "bg-red-500/20 text-red-400"
              }`}
            >
              {produk.stok > 0
                ? `Stok ${produk.stok} tersedia`
                : "Stok habis"}
            </span>

            <p className="text-gray-300 leading-relaxed mb-8">
              {produk.deskripsi}
            </p>

            {/* BUTTON */}
            <div className="flex flex-col sm:flex-row gap-4">

              {/* BELI */}
              <a
                href={`https://wa.me/6288705217614?text=Halo%20BAGgedebug!%20Saya%20ingin%20memesan%20produk%20${encodeURIComponent(
                  produk.nama_produk
                )}.`}
                target="_blank"
                rel="noopener noreferrer"
                className={`px-8 py-4 rounded-xl text-white font-semibold text-center transition
                ${
                  produk.stok > 0
                    ? "bg-[#FF0080] hover:bg-pink-600"
                    : "bg-gray-500 cursor-not-allowed"
                }`}
              >
                Beli Sekarang
              </a>

              {/* CART */}
              <button
                onClick={() => {
                  addToCart({
                    id: produk.id,
                    nama_produk: produk.nama_produk,
                    harga: hargaFinal,
                    gambar: produk.gambar,
                    stok: produk.stok,
                  });

                  setAdded(true);
                  setTimeout(() => setAdded(false), 2000);
                }}
                disabled={produk.stok <= 0}
                className={`px-8 py-4 rounded-xl border border-[#555] font-semibold transition
                ${
                  produk.stok > 0
                    ? "hover:bg-[#3a3a3a] active:scale-95"
                    : "opacity-50 cursor-not-allowed"
                }`}
              >
                + Keranjang
              </button>
            </div>

            {/* NOTIF */}
            {added && (
              <p className="mt-4 text-sm font-semibold text-[#FFB8DB]">
                Produk berhasil ditambahkan ke keranjang
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}