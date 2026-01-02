"use client";

import { motion } from "framer-motion";

export default function KontakPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-100">
      {/* HEADER */}
      <section className="px-6 py-24 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-extrabold text-[#0b1e3d] mb-4"
        >
          Hubungi Kami
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mx-auto max-w-2xl text-lg text-gray-600"
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
              <h2 className="text-2xl font-bold text-[#0b1e3d] mb-2">
                📍 Informasi Kontak
              </h2>
              <p className="text-gray-600">
                Kami siap membantu dan merespon pesan Anda secepat mungkin.
              </p>
            </div>

            <div className="space-y-4 text-gray-700">
              <p>
                <span className="font-semibold">Email:</span> craftopia@gmail.com
              </p>
              <p>
                <span className="font-semibold">WhatsApp:</span> +62 812-3456-7890
              </p>
              <p>
                <span className="font-semibold">Alamat:</span> Indonesia
              </p>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-md">
              <h3 className="font-semibold text-[#0b1e3d] mb-2">
                💡 Catatan
              </h3>
              <p className="text-sm text-gray-600">
                Halaman ini dibuat untuk memudahkan komunikasi antara pengguna
                dan pengelola website Craftopia.
              </p>
            </div>
          </motion.div>

          {/* FORM */}
          <motion.form
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl bg-white p-8 shadow-lg space-y-6"
            onSubmit={(e) => {
              e.preventDefault();
              alert("Pesan berhasil dikirim (simulasi)");
            }}
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nama
              </label>
              <input
                type="text"
                required
                className="w-full rounded-xl border border-gray-300 px-4 py-2 
                focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Masukkan nama Anda"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                required
                className="w-full rounded-xl border border-gray-300 px-4 py-2 
                focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="contoh@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Pesan
              </label>
              <textarea
                rows={4}
                required
                className="w-full rounded-xl border border-gray-300 px-4 py-2 
                focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Tulis pesan Anda di sini..."
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-full bg-teal-600 py-3 text-white 
              font-medium hover:bg-blue-700 transition"
            >
              Kirim Pesan
            </button>
          </motion.form>
        </div>
      </section>
    </main>
  );
}
