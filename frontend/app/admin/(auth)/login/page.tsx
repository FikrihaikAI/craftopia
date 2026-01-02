"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }

      localStorage.setItem("isAdminLoggedIn", "true");
      localStorage.setItem("adminId", data.adminId);

      router.push("/admin/dashboard");
    } catch {
      alert("Server tidak dapat dihubungi");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#243B55] to-[#3D5C8A] px-4">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl px-10 py-12">

        {/* LOGO */}
        <div className="flex justify-center mb-6">
          <img
            src="/Craftopia logo 2B.png"
            alt="Craftopia"
            className="w-20 h-20 object-contain"
          />
        </div>

        <h1 className="text-3xl font-bold text-gray-800 text-center mb-1">
          Admin Login
        </h1>
        <p className="text-sm text-gray-500 text-center mb-10">
          Craftopia Management System
        </p>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-300
              focus:outline-none focus:ring-2 focus:ring-[#3D5C8A]/40"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-300
              focus:outline-none focus:ring-2 focus:ring-[#3D5C8A]/40"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#3D5C8A] text-white py-3 rounded-xl
            font-semibold hover:bg-[#2c4973] transition disabled:opacity-60"
          >
            {loading ? "Memproses..." : "Login"}
          </button>
        </form>

        {/* BACK BUTTON */}
        <button
          onClick={() => router.push("/")}
          className="w-full mt-6 py-3 rounded-xl border border-gray-300
          text-gray-600 hover:bg-gray-50 transition font-medium"
        >
          Kembali ke Beranda
        </button>

        <p className="text-xs text-gray-400 text-center mt-8">
          © {new Date().getFullYear()} Craftopia
        </p>
      </div>
    </div>
  );
}
