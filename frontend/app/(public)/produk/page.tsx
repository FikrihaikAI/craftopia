"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { rupiah } from "@/lib/format";

const BASE_URL = "http://localhost:5000";

function LogoText() {
  return (
    <>
      <span className="text-white">BAGge</span>
      <span className="text-[#FF0080]">debug</span>
    </>
  );
}

const kategoriMap: any = {
  Semua: "Semua",
  OS: "Outdoor Series",
  DS: "Daily Series",
  CS: "Casual Series",
  TS: "Travel Series",
};

export default function SemuaProdukPage() {
  const [produk, setProduk] = useState<any[]>([]);
  const [kategoriAktif, setKategoriAktif] = useState("Semua");
  const [search, setSearch] = useState("");

  const kategoriList = ["Semua", "OS", "DS", "CS", "TS"];

  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/produk`)
      .then((res) => {
        const data = res.data.data || res.data;
        setProduk(data);
      })
      .catch((err) => console.error(err));
  }, []);

  const produkFiltered = produk
    .filter((p) =>
      kategoriAktif === "Semua" ? true : p.kategori === kategoriAktif
    )
    .filter((p) =>
      p.nama_produk.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white">
      <main className="pt-28 px-6 md:px-20 pb-20">

        {/* ================= HEADER ================= */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            Katalog <LogoText />
          </h1>
          <p className="text-gray-400">
            Temukan tas terbaik untuk gaya kamu
          </p>
        </div>

        {/* ================= SEARCH ================= */}
        <div className="max-w-xl mx-auto mb-10">
          <input
            type="text"
            placeholder="Cari produk..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-5 py-3 rounded-xl bg-[#1a1a1a] border border-[#2a2a2a] focus:outline-none focus:ring-2 focus:ring-[#FF0080]"
          />
        </div>

        {/* ================= KATEGORI ================= */}
        <div className="flex flex-wrap justify-center gap-3 mb-14">
          {kategoriList.map((kat) => (
            <button
              key={kat}
              onClick={() => setKategoriAktif(kat)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300
              ${
                kategoriAktif === kat
                  ? "bg-gradient-to-r from-[#FF0080] to-pink-500 text-white shadow-lg"
                  : "bg-[#1a1a1a] text-gray-300 hover:bg-[#2a2a2a]"
              }`}
            >
              {kategoriMap[kat]}
            </button>
          ))}
        </div>

        {/* ================= GRID ================= */}
        {produkFiltered.length === 0 ? (
          <p className="text-center text-gray-500">
            Produk tidak ditemukan 
          </p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {produkFiltered.map((item) => (
              <div
                key={item.id}
                className="group relative bg-[#1a1a1a] rounded-2xl overflow-hidden border border-[#2a2a2a] hover:border-[#FF0080] transition"
              >
                {/* ================= IMAGE ================= */}
                <div className="overflow-hidden">
                  <img
                    src={`${BASE_URL}/uploads/${item.gambar}`}
                    alt={item.nama_produk}
                    onError={(e: any) => {
                      e.target.src = "/no-image.png";
                    }}
                    className="w-full h-60 object-cover group-hover:scale-110 transition duration-500"
                  />
                </div>

                {/* OVERLAY */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
                  <Link
                    href={`/produk/${item.id}`}
                    className="bg-[#FF0080] px-5 py-2 rounded-full text-white font-semibold hover:bg-pink-600"
                  >
                    Lihat Detail
                  </Link>
                </div>

                {/* CONTENT */}
                <div className="p-5">
                  <h4 className="font-semibold text-lg mb-1">
                    {item.nama_produk}
                  </h4>

                  <span className="text-xs bg-[#FF0080]/20 text-[#FFB8DB] px-2 py-1 rounded">
                    {kategoriMap[item.kategori]}
                  </span>

                  <p className="text-[#FF0080] font-bold text-lg mt-2">
                    {rupiah(item.harga)}
                  </p>

                  <p className="text-gray-400 text-sm mt-2 line-clamp-2">
                    {item.deskripsi}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}