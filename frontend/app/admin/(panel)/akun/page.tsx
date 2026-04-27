"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function AkunPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    usernameBaru: "",
    passwordLama: "",
    passwordBaru: "",
    konfirmasi: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (form.passwordBaru !== form.konfirmasi) {
      alert("Konfirmasi password tidak cocok");
      return;
    }

    const adminId = localStorage.getItem("adminId");

    if (!adminId) {
      alert("Admin tidak valid, silakan login ulang");
      router.push("/admin/login");
      return;
    }

    try {
      await axios.put("http://localhost:5000/api/admin/update-account", {
        adminId: Number(adminId),
        usernameBaru: form.usernameBaru,
        passwordLama: form.passwordLama,
        passwordBaru: form.passwordBaru,
      });

      alert("Akun berhasil diperbarui, silakan login ulang");
      
      localStorage.removeItem("adminId");

      router.push("/admin/login");
    } catch (error: any) {
      alert(error.response?.data?.message || "Gagal update akun");
    }
  };

  return (
    <div className="min-h-screen bg-[#212121] text-[#FFB8DB]">
      
      {/* HEADER */}
      <div className="bg-[#2a2a2a] shadow px-8 py-4 border-b border-[#424242]">
        <h1 className="text-lg font-semibold text-white">
          Pengaturan Akun Admin
        </h1>
      </div>
  
      {/* CONTENT */}
      <div className="p-8 max-w-xl">
        <div className="bg-[#2a2a2a] p-6 rounded-xl shadow-md border border-[#424242]">
          
          <form onSubmit={handleSubmit} className="space-y-5">
  
            {/* USERNAME */}
            <input
              type="text"
              placeholder="Username baru (opsional)"
              value={form.usernameBaru}
              onChange={(e) =>
                setForm({ ...form, usernameBaru: e.target.value })
              }
              className="w-full px-4 py-3 rounded-xl bg-[#212121] border border-[#424242]
              text-white placeholder:text-gray-400
              focus:outline-none focus:ring-2 focus:ring-[#FF0080]/40"
            />
  
            {/* PASSWORD LAMA */}
            <input
              type="password"
              placeholder="Password lama"
              value={form.passwordLama}
              onChange={(e) =>
                setForm({ ...form, passwordLama: e.target.value })
              }
              className="w-full px-4 py-3 rounded-xl bg-[#212121] border border-[#424242]
              text-white placeholder:text-gray-400
              focus:outline-none focus:ring-2 focus:ring-[#FF0080]/40"
              required
            />
  
            {/* PASSWORD BARU */}
            <input
              type="password"
              placeholder="Password baru"
              value={form.passwordBaru}
              onChange={(e) =>
                setForm({ ...form, passwordBaru: e.target.value })
              }
              className="w-full px-4 py-3 rounded-xl bg-[#212121] border border-[#424242]
              text-white placeholder:text-gray-400
              focus:outline-none focus:ring-2 focus:ring-[#FF0080]/40"
              required
            />
  
            {/* KONFIRMASI */}
            <input
              type="password"
              placeholder="Konfirmasi password baru"
              value={form.konfirmasi}
              onChange={(e) =>
                setForm({ ...form, konfirmasi: e.target.value })
              }
              className="w-full px-4 py-3 rounded-xl bg-[#212121] border border-[#424242]
              text-white placeholder:text-gray-400
              focus:outline-none focus:ring-2 focus:ring-[#FF0080]/40"
              required
            />
  
            {/* BUTTON */}
            <button
              className="w-full bg-[#FF0080] text-white py-3 rounded-xl
              font-semibold hover:bg-pink-600 transition"
            >
              Simpan Perubahan
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
