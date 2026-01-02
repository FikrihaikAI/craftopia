"use client";

import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaFacebook,
  FaInstagram,
  FaTiktok,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="relative bg-[#3D5C8A]/90 backdrop-blur text-white py-14 px-6 md:px-20 mt-24">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 text-center md:text-left">
        
        {/* LOGO & DESKRIPSI */}
        <div>
          <div className="flex justify-center md:justify-start items-center gap-3 mb-4">
            <img
              src="/Craftopia logo 2B.png"
              alt="Craftopia Logo"
              className="w-10 h-10 rounded-full border border-white/40"
            />
            <h2 className="text-2xl font-extrabold tracking-wide">
              Craftopia
            </h2>
          </div>
          <p className="text-sm text-white/80 leading-relaxed">
            Hadiah dan dekorasi handmade penuh makna.  
            Dibuat dengan cinta untuk setiap momen spesialmu 💖
          </p>
        </div>

        {/* KONTAK */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
          <ul className="space-y-3 text-sm text-white/80">
            <li className="flex items-center justify-center md:justify-start gap-2">
              <FaMapMarkerAlt size={15} /> Jl. Irigasi Malintang Baru, Gambut
            </li>
            <li className="flex items-center justify-center md:justify-start gap-2">
              <FaPhoneAlt size={15} /> +62 812 3456 7890
            </li>
            <li className="flex items-center justify-center md:justify-start gap-2">
              <FaEnvelope size={15} /> craftopia.store@gmail.com
            </li>
          </ul>
        </div>

        {/* SOSIAL MEDIA */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
          <div className="flex justify-center md:justify-start gap-5 text-xl">
            <a className="hover:text-teal-300 transition cursor-pointer"><FaFacebook /></a>
            <a
              href="https://www.instagram.com/craftopia.ok?igsh=bzI0ZDZ4bng2bmU1"
              className="hover:text-teal-300 transition"
            >
              <FaInstagram />
            </a>
            <a className="hover:text-teal-300 transition cursor-pointer"><FaTiktok /></a>
            <a className="hover:text-teal-300 transition cursor-pointer"><FaXTwitter /></a>
          </div>
        </div>
      </div>

      {/* DIVIDER */}
      <div className="mt-12 border-t border-white/15 pt-6 text-center text-sm text-white/60">
        © {new Date().getFullYear()} Craftopia Store. All rights reserved.
      </div>
    </footer>
  );
}
