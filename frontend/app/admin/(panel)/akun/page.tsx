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

  useEffect(() => {
    const loggedIn = localStorage.getItem("isAdminLoggedIn");
    if (!loggedIn) router.push("/admin/login");
  }, [router]);

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

      localStorage.removeItem("isAdminLoggedIn");
      localStorage.removeItem("adminId");

      router.push("/admin/login");
    } catch (error: any) {
      alert(error.response?.data?.message || "Gagal update akun");
    }
  };

  return (
    <>
      <div className="bg-white shadow px-8 py-4">
        <h1 className="text-lg font-semibold text-gray-700">
          Pengaturan Akun Admin
        </h1>
      </div>

      <div className="p-8 max-w-xl">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Username baru (opsional)"
              value={form.usernameBaru}
              onChange={(e) =>
                setForm({ ...form, usernameBaru: e.target.value })
              }
              className="w-full border p-2 rounded-lg"
            />

            <input
              type="password"
              placeholder="Password lama"
              value={form.passwordLama}
              onChange={(e) =>
                setForm({ ...form, passwordLama: e.target.value })
              }
              className="w-full border p-2 rounded-lg"
              required
            />

            <input
              type="password"
              placeholder="Password baru"
              value={form.passwordBaru}
              onChange={(e) =>
                setForm({ ...form, passwordBaru: e.target.value })
              }
              className="w-full border p-2 rounded-lg"
              required
            />

            <input
              type="password"
              placeholder="Konfirmasi password baru"
              value={form.konfirmasi}
              onChange={(e) =>
                setForm({ ...form, konfirmasi: e.target.value })
              }
              className="w-full border p-2 rounded-lg"
              required
            />

            <button className="bg-[#3D5C8A] text-white px-6 py-2 rounded-lg w-full">
              Simpan Perubahan
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
