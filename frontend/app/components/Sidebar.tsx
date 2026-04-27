"use client";

import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const [showLogout, setShowLogout] = useState(false);

  const menu = [
    {
      title: "Produk",
      desc: "Kelola data produk",
      path: "/admin/dashboard",
    },
    {
      title: "Akun",
      desc: "Pengaturan admin",
      path: "/admin/akun",
    },
  ];

  const confirmLogout = async () => {
    try {
      // tutup modal dulu
      setShowLogout(false);
  
      // tunggu logout selesai
      await fetch("http://localhost:5000/api/admin/logout", {
        method: "POST",
        credentials: "include",
      });
  
      // paksa reload total (INI KUNCI NYA)
      window.location.href = "/admin/login";
  
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return (
    <>
      <aside className="fixed left-0 top-0 w-64 h-screen bg-[#1e1e1e] text-white p-6 flex flex-col justify-between border-r border-[#424242]">
  
        {/* LOGO / BRAND */}
        <div>
        <h2 className="text-2xl font-bold">
          <span className="text-[#FFFFFF]">BAGge</span>
          <span className="text-[#FF0080]">debug</span>
        </h2>
          <hr className="border-[#424242] mb-6" />
  
          {/* MENU */}
          <nav className="space-y-3">
            {menu.map((item) => (
              <div
                key={item.path}
                onClick={() => router.push(item.path)}
                className={`px-4 py-4 rounded-xl cursor-pointer transition group
                  ${
                    pathname === item.path
                      ? "bg-[#FF0080]/20 border border-[#FF0080]/40"
                      : "hover:bg-[#2a2a2a]"
                  }`}
              >
                <p className="font-semibold group-hover:text-[#FF0080]">
                  {item.title}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  {item.desc}
                </p>
              </div>
            ))}
          </nav>
        </div>
  
        {/* LOGOUT BUTTON */}
        <button
          onClick={() => setShowLogout(true)}
          className="w-full bg-[#FF0080]/20 hover:bg-[#FF0080]
          text-[#FF0080] hover:text-white py-3 rounded-xl font-semibold transition"
        >
          Logout
        </button>
      </aside>
  
      {/* MODAL LOGOUT */}
      {showLogout && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          
          {/* BACKDROP */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowLogout(false)}
          />
  
          {/* MODAL */}
          <div className="relative bg-[#2a2a2a] text-white rounded-2xl p-6 w-full max-w-md border border-[#424242] shadow-xl">
            <h2 className="text-xl font-semibold mb-2">
              Konfirmasi Logout
            </h2>
            <p className="text-gray-400 mb-6">
              Apakah Anda yakin ingin logout?
            </p>
  
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowLogout(false)}
                className="px-4 py-2 rounded-lg border border-[#424242] hover:bg-[#333]"
              >
                Batal
              </button>
              <button
                onClick={confirmLogout}
                className="px-4 py-2 rounded-lg bg-[#FF0080] hover:bg-pink-600 text-white"
              >
                Ya, Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
