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
    <div className="min-h-screen flex flex-col bg-[#212121] text-white font-sans">

      {/* ================= HERO SECTION ================= */}
      <section className="relative overflow-hidden bg-[#212121] text-white pt-36 pb-52">

        {/* ORNAMEN */}
        <div className="absolute -top-24 -left-24 w-80 h-80 bg-[#FF0080]/20 rounded-full blur-3xl" />
        <div className="absolute bottom-24 -right-24 w-96 h-96 bg-[#FFB8DB]/10 rounded-full blur-3xl" />
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between px-6 md:px-24 lg:px-32 gap-16">

          {/* TEXT */}
          <div className="max-w-xl md:w-1/2 text-center md:text-left animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Tas Stylish untuk <br />
              <span className="text-[#FF0080]">Gaya Modernmu</span>
            </h2>

            <p className="text-lg text-gray-300 mb-8">
              Koleksi tas premium dari{" "}
              <span className="font-semibold text-[#FFB8DB]">BAGgedebug</span>{" "}
              dibuat untuk tampil beda dan penuh percaya diri.
            </p>

            {/* ⬇️ PINDAH KE HALAMAN /produk */}
            <button
              onClick={() => router.push("/produk")}
              className="bg-[#FF0080] hover:bg-pink-600 transition px-8 py-3 rounded-xl font-semibold shadow-lg"
            >
              Lihat Produk
            </button>
          </div>

          {/* IMAGE */}
          <div className="md:w-1/2 flex justify-center">
            <div className="rounded-3xl overflow-hidden border border-[#424242] shadow-2xl">
              <img
                src="/iklan.jpeg"
                className="w-[360px] md:w-[520px] object-cover hover:scale-105 transition duration-300"
              />
            </div>
          </div>
        </div>

        {/* WAVE */}
        <div className="absolute bottom-0 left-0 w-full">

        {/* WAVE 1 (MAGENTA - BACKGROUND) */}
        <svg
          className="w-full absolute bottom-0"
          viewBox="0 0 1440 260"
        >
          <path
            fill="#FF0080"
            fillOpacity="0.35"
            d="M0,140L80,150C160,160,320,180,480,170C640,160,800,120,960,110C1120,100,1280,120,1360,130L1440,140V260H0Z"
          />
        </svg>

          {/* WAVE 2 (DARK - DEPAN) */}
          <svg
            className="w-full absolute bottom-0"
            viewBox="0 0 1440 200"
          >
            <path
              fill="#2a2a2a"
              d="M0,180L80,190C160,200,320,220,480,210C640,200,800,170,960,150C1120,130,1280,150,1360,160L1440,180V260H0Z"
            />
          </svg>

{/* GRADIENT FADE PALING ATAS */}
<div className="absolute bottom-0 w-full h-40 bg-gradient-to-b from-transparent to-[#212121]" />

</div>
      </section>

      {/* ================= PRODUK UNGGULAN ================= */}
      <section className="px-10 py-20 bg-[#212121] text-white flex-1">
        <h3 className="text-3xl font-bold mb-10 text-center text-[#FF0080]">
          Produk Unggulan
        </h3>

        {produk.length === 0 ? (
          <p className="text-center text-gray-500">Loading produk...</p>
        ) : (
          <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {produk.slice(0, 3).map((item) => (
              <div
                key={item.id}
                className="bg-[#2a2a2a] rounded-2xl shadow-lg hover:shadow-2xl border border-[#424242] overflow-hidden transition transform hover:-translate-y-1"
              >
                <img
                  src={`/${item.gambar}`}
                  alt={item.nama_produk}
                  className="w-full h-64 object-cover hover:scale-105 transition duration-300"
                />

                <div className="p-5">
                  <h4 className="font-semibold text-xl text-white-800">
                    {item.nama_produk}
                  </h4>

                  {/* RUPIAH */}
                  <p className="text-[#FF0080] font-bold text-lg mt-1 mb-3">
                    {rupiah(Number(item.harga))}
                  </p>

                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                    {item.deskripsi}
                  </p>

                  <button
                    onClick={() => router.push(`/produk/${item.id}`)}
                    className="inline-block bg-[#FF0080] text-white px-4 py-2 rounded-lg font-semibold hover:bg-pink-600 transition"
                  >
                    Detail Produk
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

{/* ================= PROMO TERBATAS ================= */}
<section className="px-10 mt-20 mb-10">
  <h3 className="text-3xl font-bold text-center text-[#FF0080] mb-12">
    Promo Terbatas
  </h3>

  <div className="flex flex-col gap-8 max-w-5xl mx-auto">

  {produk.slice(3, 6).map((item, i) => {
  const harga = Number(item.harga);
  const hargaDiskon = Math.floor(harga * 0.9); // diskon 10%

  return (
    <div
      key={item.id}
      style={{ animationDelay: `${i * 0.2}s` }}
      className="relative flex flex-col md:flex-row items-center gap-6 p-5 rounded-2xl 
      bg-white/5 backdrop-blur-lg border border-white/10 shadow-lg hover:shadow-2xl 
      transition animate-fade-in"
    >

      {/* BADGE DISKON */}
      <span className="absolute top-3 right-3 bg-[#FF0080] text-xs px-3 py-1 rounded-full font-semibold">
        -10%
      </span>

      {/* IMAGE */}
      <img
        src={`/${item.gambar}`}
        alt={item.nama_produk}
        className="w-32 h-32 md:w-40 md:h-40 object-cover rounded-xl"
      />

      {/* CONTENT */}
      <div className="flex-1 text-center md:text-left">
        <h4 className="text-lg md:text-xl font-semibold text-white mb-2">
          {item.nama_produk}
        </h4>

        <div className="mb-3">
          {/* HARGA ASLI */}
          <p className="text-sm line-through text-gray-400">
            {rupiah(harga)}
          </p>

          {/* HARGA DISKON */}
          <p className="text-[#FF0080] font-bold text-lg">
            {rupiah(hargaDiskon)}
          </p>
        </div>

        <button
          onClick={() => router.push(`/produk/${item.id}`)}
          className="bg-[#FF0080] hover:bg-pink-600 px-6 py-2 rounded-full font-semibold shadow-lg hover:scale-105 transition"
        >
          Beli sekarang
        </button>
      </div>

    </div>
  );
})}

  </div>
</section>

      {/* ================= SLIDER PROMO ================= */}
      <section className="bg-[#1e1e1e] py-16 px-6 md:px-20 text-center">
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          pagination={{ clickable: true }}
          autoplay={{ delay: 6000 }}
          className="rounded-2xl shadow-lg max-w-5xl mx-auto overflow-hidden"
        >
          <SwiperSlide>
            <img src="/promo1.jpeg" className="w-full aspect-[3/1] object-cover" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="/promo2.jpeg" className="w-full aspect-[3/1] object-cover" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="/promo3.jpeg" className="w-full aspect-[3/1] object-cover" />
          </SwiperSlide>
        </Swiper>
      </section>
      
      <div className="w-full h-32 bg-gradient-to-b from-[#FF0080]/20 to-[#212121]" />
      
    </div>
  );
}
