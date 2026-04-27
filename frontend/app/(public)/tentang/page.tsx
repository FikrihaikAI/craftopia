"use client";

import { motion } from "framer-motion";

export default function TentangPage() {
  return (
    <main className="min-h-screen bg-[#212121] text-white">

      {/* HERO */}
      <section className="px-6 py-24 text-center">
        <motion.span
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-block rounded-full bg-[#FF0080]/20 px-4 py-1 text-sm font-medium text-[#FFB8DB] mb-4"
        >
          Stylish • Modern • Berkualitas
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl md:text-5xl font-extrabold mb-6"
        >
          Tentang BAGge<span className="text-[#FF0080]">debug</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mx-auto max-w-2xl text-lg text-gray-400 leading-relaxed"
        >
          BAGgedebug adalah brand dan platform ecommerce yang menghadirkan 
          berbagai pilihan tas dengan desain modern, kualitas terbaik, 
          dan harga yang terjangkau.
        </motion.p>
      </section>

      {/* CONTENT */}
      <section className="px-6 pb-20">
        <div className="mx-auto max-w-5xl space-y-16">

          {/* TENTANG */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl bg-[#2a2a2a] p-10 border border-[#3a3a3a]"
          >
            <h2 className="text-2xl font-bold text-[#FF0080] mb-4">
              Tentang Kami
            </h2>
            <p className="text-gray-300 leading-relaxed mb-3">
              BAGgedebug hadir untuk memenuhi kebutuhan fashion Anda, khususnya 
              dalam produk tas yang stylish dan fungsional.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Kami menyediakan berbagai jenis tas mulai dari tas kasual, tas kerja, 
              hingga tas fashion yang cocok digunakan dalam berbagai aktivitas sehari-hari.
            </p>
          </motion.div>

          {/* VALUE */}
          <div>
            <h2 className="text-center text-2xl font-bold text-[#FF0080] mb-10">
              Kenapa BAGgedebug?
            </h2>

            <div className="grid gap-8 md:grid-cols-3">
              {[
                {
                  title: "Produk Berkualitas",
                  desc: "Tas dengan bahan pilihan dan kualitas terbaik.",
                },
                {
                  title: "Desain Modern",
                  desc: "Mengikuti tren fashion terkini yang stylish.",
                },
                {
                  title: "Harga Terjangkau",
                  desc: "Kualitas premium dengan harga yang bersahabat.",
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="rounded-2xl bg-[#2a2a2a] p-8 text-center border border-[#3a3a3a]"
                >
                  <h3 className="font-semibold text-lg text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-400 text-sm">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* VISI MISI */}
          <div className="grid gap-8 md:grid-cols-2">
            {[
              {
                title: "Visi",
                content:
                  "Menjadi brand tas yang dikenal luas dengan produk berkualitas dan desain modern.",
              },
              {
                title: "Misi",
                content: (
                  <ul className="list-disc pl-5 space-y-2 text-gray-300">
                    <li>Menyediakan produk tas berkualitas tinggi</li>
                    <li>Mengikuti tren fashion terkini</li>
                    <li>Memberikan harga yang terjangkau</li>
                    <li>Meningkatkan kepuasan pelanggan</li>
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
                className="rounded-2xl bg-[#2a2a2a] p-8 border border-[#3a3a3a]"
              >
                <h2 className="text-xl font-bold text-[#FF0080] mb-3">
                  {item.title}
                </h2>
                <div>{item.content}</div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center">
            <h3 className="text-xl font-semibold text-white mb-4">
              Temukan tas favoritmu di BAGgedebug
            </h3>
            <a
              href="/produk"
              className="inline-block rounded-full bg-[#FF0080] px-8 py-3 text-white font-medium hover:bg-pink-600 transition"
            >
              Lihat Produk
            </a>
          </div>

        </div>
      </section>

      {/* GRADIENT BAWAH */}
      <div className="w-full h-32 bg-gradient-to-b from-[#FF0080]/20 to-[#212121]" />

    </main>
  );
}