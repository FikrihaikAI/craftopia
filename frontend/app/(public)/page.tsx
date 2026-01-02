"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import { rupiah } from "@/lib/format";

type Produk = {
  id: number;
  nama_produk: string;
  harga: number | string;
  deskripsi: string;
  gambar: string;
};

export default function Home() {
  const router = useRouter();
  const [produk, setProduk] = useState<Produk[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/produk")
      .then((res) => setProduk(res.data))
      .catch((err) => console.error("Gagal ambil produk:", err));
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#3D5C8A] text-white font-sans">

      {/* ================= HERO SECTION ================= */}
      <section className="relative overflow-hidden bg-gradient-to-r from-[#0b1e3d] to-[#1c3f72] text-white pt-36 pb-40">

        {/* ORNAMEN */}
        <div className="absolute -top-24 -left-24 w-80 h-80 bg-teal-400/20 rounded-full blur-3xl" />
        <div className="absolute bottom-24 -right-24 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between px-6 md:px-24 lg:px-32 gap-16">

          {/* TEXT */}
          <div className="max-w-xl md:w-1/2 text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Hadiah Spesial dari <br /> Hati untuk yang Kamu Sayang 💖
            </h2>
            <p className="text-lg text-gray-200 mb-8">
              Setiap produk{" "}
              <span className="font-semibold text-teal-300">Craftopia</span>{" "}
              dibuat dengan cinta dan kreativitas.
            </p>

            {/* ⬇️ PINDAH KE HALAMAN /produk */}
            <button
              onClick={() => router.push("/produk")}
              className="bg-[#8ca9ff] hover:bg-[#6d8efc] transition px-8 py-3 rounded-xl font-semibold shadow-lg"
            >
              Lihat Produk
            </button>
          </div>

          {/* IMAGE */}
          <div className="md:w-1/2 flex justify-center">
            <div className="rounded-3xl overflow-hidden border border-white/20 shadow-2xl">
              <img
                src="/lavender.jpg"
                alt="Bunga Lavender"
                className="w-[360px] md:w-[520px] object-cover"
              />
            </div>
          </div>
        </div>

        {/* WAVE */}
        <svg
          className="absolute bottom-0 left-0 w-full"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
        >
          <path
            fill="#ffffff"
            d="M0,64L80,74.7C160,85,320,107,480,96C640,85,800,43,960,32C1120,21,1280,43,1360,53.3L1440,64V120H0Z"
          />
        </svg>
      </section>

      {/* ================= PRODUK UNGGULAN ================= */}
      <section className="px-10 py-20 bg-white text-gray-900 flex-1">
        <h3 className="text-3xl font-bold mb-10 text-center text-[#0b1e3d]">
          Produk Unggulan
        </h3>

        {produk.length === 0 ? (
          <p className="text-center text-gray-500">Loading produk...</p>
        ) : (
          <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {produk.slice(0, 3).map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl border border-gray-200 overflow-hidden transition transform hover:-translate-y-1"
              >
                <img
                  src={`/${item.gambar}`}
                  alt={item.nama_produk}
                  className="w-full h-64 object-cover"
                />

                <div className="p-5">
                  <h4 className="font-semibold text-xl text-gray-800">
                    {item.nama_produk}
                  </h4>

                  {/* RUPIAH */}
                  <p className="text-[#1c3f72] font-bold text-lg mt-1 mb-3">
                    {rupiah(Number(item.harga))}
                  </p>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {item.deskripsi}
                  </p>

                  <button
                    onClick={() => router.push(`/produk/${item.id}`)}
                    className="inline-block bg-teal-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-teal-600 transition"
                  >
                    Detail Produk
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ================= SLIDER PROMO ================= */}
      <section className="bg-[#f0f4ff] py-16 px-6 md:px-20 text-center">
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          pagination={{ clickable: true }}
          autoplay={{ delay: 6000 }}
          className="rounded-2xl shadow-lg max-w-5xl mx-auto overflow-hidden"
        >
          <SwiperSlide>
            <img src="/promo1.jpg" className="w-full aspect-[3/1] object-cover" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="/promo2.jpg" className="w-full aspect-[3/1] object-cover" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="/promo3.jpg" className="w-full aspect-[3/1] object-cover" />
          </SwiperSlide>
        </Swiper>
      </section>
    </div>
  );
}
