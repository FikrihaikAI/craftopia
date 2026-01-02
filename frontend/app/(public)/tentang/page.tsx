"use client";

import { motion } from "framer-motion";

export default function TentangPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-100">
      {/* HERO */}
      <section className="px-6 py-24 text-center">
        <motion.span
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-block rounded-full bg-blue-100 px-4 py-1 text-sm font-medium text-[#1c3f72] mb-4"
        >
          Handmade • Kreatif • Lokal
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl md:text-5xl font-extrabold text-[#0b1e3d] mb-6"
        >
          Tentang Craftopia
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mx-auto max-w-2xl text-lg text-gray-600 leading-relaxed"
        >
          Craftopia adalah platform yang menghadirkan produk kerajinan tangan
          dengan sentuhan kreativitas dan makna, diciptakan untuk memperindah
          setiap momen spesial.
        </motion.p>
      </section>

      {/* CONTENT */}
      <section className="px-6 pb-20">
        <div className="mx-auto max-w-5xl space-y-16">
          {/* Tentang */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl bg-white p-10 shadow-lg border border-blue-100"
          >
            <h2 className="text-2xl font-bold text-[#0b1e3d] mb-4">
              🌸 Tentang Kami
            </h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              Craftopia hadir sebagai ruang bagi produk kerajinan tangan
              (handmade) yang dibuat dengan perhatian terhadap detail, nilai
              estetika, dan keunikan desain.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Kami percaya bahwa setiap karya memiliki cerita. Melalui
              Craftopia, kami ingin mempertemukan kreativitas dengan orang-orang
              yang menghargai keaslian dan sentuhan personal.
            </p>
          </motion.div>

          {/* Value */}
          <div>
            <h2 className="text-center text-2xl font-bold text-[#0b1e3d] mb-10">
              Kenapa Craftopia?
            </h2>

            <div className="grid gap-8 md:grid-cols-3">
              {[
                {
                  icon: "🎁",
                  title: "Produk Unik",
                  desc: "Setiap produk handmade memiliki karakter dan keunikan tersendiri.",
                },
                {
                  icon: "🎨",
                  title: "Desain Kreatif",
                  desc: "Desain estetik untuk hadiah maupun dekorasi.",
                },
                {
                  icon: "🤝",
                  title: "Dukung Lokal",
                  desc: "Mendukung pengrajin lokal melalui platform digital.",
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="rounded-2xl bg-white p-8 shadow-md text-center border border-blue-100 hover:shadow-lg transition"
                >
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="font-semibold text-lg text-[#0b1e3d] mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Visi & Misi */}
          <div className="grid gap-8 md:grid-cols-2">
            {[
              {
                title: "🎯 Visi",
                content:
                  "Menjadi platform yang mempromosikan produk kerajinan tangan lokal agar dikenal lebih luas.",
              },
              {
                title: "🚀 Misi",
                content: (
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Wadah penjualan produk handmade</li>
                    <li>Pengalaman belanja yang nyaman</li>
                    <li>Dukungan kreativitas lokal</li>
                    <li>Koneksi pengrajin & pelanggan</li>
                  </ul>
                ),
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="rounded-2xl bg-white p-8 shadow-md border border-blue-100"
              >
                <h2 className="text-xl font-bold text-[#0b1e3d] mb-3">
                  {item.title}
                </h2>
                <div className="text-gray-700 leading-relaxed">
                  {item.content}
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-center"
          >
            <h3 className="text-xl font-semibold text-[#0b1e3d] mb-4">
              Siap menjelajahi Craftopia?
            </h3>
            <a
              href="/produk"
              className="inline-block rounded-full bg-teal-500 px-8 py-3 text-white font-medium hover:bg-teal-600 transition shadow-lg"
            >
              Lihat Produk
            </a>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
