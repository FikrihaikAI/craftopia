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
        credentials: "include",
        body: JSON.stringify({ username, password }),
      });
  
      const data = await res.json();
  
      if (!res.ok) {
        alert(data.message);
        return;
      }
  
      localStorage.setItem("adminId", data.adminId);
  
      router.push("/admin/dashboard");
    } catch (err) {
      console.error("ERROR LOGIN:", err);
      alert("Server error, cek console");
    }finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#212121] via-[#424242] to-[#212121] px-4">
      <div className="bg-[#2a2a2a] w-full max-w-md rounded-3xl shadow-2xl px-10 py-12 border border-[#424242]">

        {/* LOGO */}
        <div className="flex justify-center mb-6">
          <img
            src="/bagbug.png"
            alt="BAGgedebug logo"
            className="w-20 h-20 object-cover rounded-full"
          />
        </div>

        {/* TITLE */}
        <h1 className="text-3xl font-bold text-white text-center mb-1 flex justify-center">
          <span className="text-white">BAGge</span>
          <span className="text-[#FF0080]">debug</span>
        </h1>

        <p className="text-sm text-[#FFB8DB]/80 text-center mb-10">
          Admin Management System
        </p>

        <form onSubmit={handleLogin} className="space-y-6">

          {/* USERNAME */}
          <div>
            <label className="block text-sm font-medium text-[#FFB8DB] mb-1">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl bg-[#212121] border border-[#424242]
              text-white placeholder:text-gray-400
              focus:outline-none focus:ring-2 focus:ring-[#FF0080]/40"
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label className="block text-sm font-medium text-[#FFB8DB] mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl bg-[#212121] border border-[#424242]
              text-white placeholder:text-gray-400
              focus:outline-none focus:ring-2 focus:ring-[#FF0080]/40"
            />
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#FF0080] text-white py-3 rounded-xl
            font-semibold hover:bg-pink-600 transition disabled:opacity-60"
          >
            {loading ? "Memproses..." : "Login"}
          </button>
        </form>

        {/* BACK BUTTON */}
        <button
          onClick={() => router.push("/")}
          className="w-full mt-6 py-3 rounded-xl border border-[#424242]
          text-[#FFB8DB] hover:bg-[#FF0080] hover:text-white transition font-medium"
        >
          Kembali ke Beranda
        </button>

        <p className="text-xs text-[#FFB8DB]/60 text-center mt-8">
          © {new Date().getFullYear()} BAGgedebug
        </p>
      </div>
    </div>
  );
}