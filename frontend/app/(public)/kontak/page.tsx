"use client";

import { motion } from "framer-motion";

export default function KontakPage() {
  return (
    <main className="min-h-screen bg-[#212121] text-white">

      {/* HEADER */}
      <section className="px-6 py-24 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-extrabold mb-4"
        >
          Hubungi <span className="text-[#FF0080]">Kami</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mx-auto max-w-2xl text-lg text-gray-400"
        >
          Punya pertanyaan, saran, atau ingin bekerja sama?
          Silakan hubungi kami melalui form di bawah ini.
        </motion.p>
      </section>

      {/* CONTENT */}
      <section className="px-6 pb-24">
        <div className="mx-auto max-w-5xl grid gap-12 md:grid-cols-2">
          
          {/* INFO */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div>
              <h2 className="text-2xl font-bold text-[#FF0080] mb-2">
                📍 Informasi Kontak
              </h2>
              <p className="text-gray-400">
                Kami siap membantu dan merespon pesan Anda secepat mungkin.
              </p>
            </div>

            <div className="space-y-4 text-gray-300">
              <p>
                <span className="font-semibold text-white">Email:</span> baggedebug@gmail.com
              </p>
              <p>
                <span className="font-semibold text-white">WhatsApp:</span> +62 812-3456-7890
              </p>
              <p>
                <span className="font-semibold text-white">Alamat:</span> Indonesia
              </p>
            </div>

            <div className="rounded-2xl bg-[#2a2a2a] p-6 border border-[#3a3a3a] shadow-lg">
              <h3 className="font-semibold text-[#FF0080] mb-2">
                Catatan
              </h3>
              <p className="text-sm text-gray-400">
                Halaman ini dibuat untuk memudahkan komunikasi antara pengguna
                dan pengelola website BAGgedebug.
              </p>
            </div>
          </motion.div>

          {/* FORM */}
          <motion.form
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl bg-[#2a2a2a] p-8 shadow-2xl border border-[#3a3a3a] space-y-6"
            onSubmit={(e) => {
              e.preventDefault();
              alert("Pesan berhasil dikirim (simulasi)");
            }}
          >
            {/* NAMA */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Nama
              </label>
              <input
                type="text"
                required
                className="w-full rounded-xl bg-[#1e1e1e] border border-[#444] px-4 py-2 
                focus:outline-none focus:ring-2 focus:ring-[#FF0080] text-white"
                placeholder="Masukkan nama Anda"
              />
            </div>

            {/* EMAIL */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Email
              </label>
              <input
                type="email"
                required
                className="w-full rounded-xl bg-[#1e1e1e] border border-[#444] px-4 py-2 
                focus:outline-none focus:ring-2 focus:ring-[#FF0080] text-white"
                placeholder="contoh@email.com"
              />
            </div>

            {/* PESAN */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Pesan
              </label>
              <textarea
                rows={4}
                required
                className="w-full rounded-xl bg-[#1e1e1e] border border-[#444] px-4 py-2 
                focus:outline-none focus:ring-2 focus:ring-[#FF0080] text-white"
                placeholder="Tulis pesan Anda di sini..."
              />
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              className="w-full rounded-full bg-[#FF0080] py-3 text-white 
              font-semibold hover:bg-pink-600 transition shadow-lg hover:scale-105"
            >
              Kirim Pesan
            </button>
          </motion.form>
        </div>
      </section>

      {/* GRADIENT BAWAH */}
      <div className="w-full h-32 bg-gradient-to-b from-[#FF0080]/20 to-[#212121]" />

    </main>
  );
}