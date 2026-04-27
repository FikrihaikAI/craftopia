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
    <footer className="relative bg-[#212121] text-[#FFB8DB] py-14 px-6 md:px-20 mt-24">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 text-center md:text-left">
        
        {/* LOGO & DESKRIPSI */}
        <div>
          <div className="flex justify-center md:justify-start items-center gap-3 mb-4">
            <img
              src="/bagbug.png"
              alt="BAGgedebug logo"
              className="w-10 h-10 rounded-full border border-[#424242]"
            />
            <h2 className="text-2xl font-extrabold tracking-wide flex">
              <span className="text-white">BAGge</span>
              <span className="text-[#FF0080]">debug</span>
            </h2>
          </div>
          <p className="text-sm text-[#FFB8DB]/80 leading-relaxed">
            Platform e-commerce tas modern yang mengutamakan gaya, kualitas,
            dan fungsionalitas untuk kebutuhan harian hingga aktivitas outdoor.
          </p>
        </div>

        {/* KONTAK */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-white">Contact Us</h3>
          <ul className="space-y-3 text-sm text-[#FFB8DB]/80">
            <li className="flex items-center justify-center md:justify-start gap-2">
              <FaMapMarkerAlt size={15} className="text-[#FF0080]" />
              Jl. Irigasi Malintang Baru, Gambut
            </li>
            <li className="flex items-center justify-center md:justify-start gap-2">
              <FaPhoneAlt size={15} className="text-[#FF0080]" />
              +62 812 3456 7890
            </li>
            <li className="flex items-center justify-center md:justify-start gap-2">
              <FaEnvelope size={15} className="text-[#FF0080]" />
              baggedebug.store@gmail.com
            </li>
          </ul>
        </div>

        {/* SOSIAL MEDIA */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-white">Follow Us</h3>
          <div className="flex justify-center md:justify-start gap-5 text-xl">
            <a className="hover:text-[#FF0080] transition cursor-pointer">
              <FaFacebook />
            </a>
            <a
              href="#"
              className="hover:text-[#FF0080] transition"
            >
              <FaInstagram />
            </a>
            <a className="hover:text-[#FF0080] transition cursor-pointer">
              <FaTiktok />
            </a>
            <a className="hover:text-[#FF0080] transition cursor-pointer">
              <FaXTwitter />
            </a>
          </div>
        </div>
      </div>

      {/* DIVIDER */}
      <div className="mt-12 border-t border-[#424242] pt-6 text-center text-sm text-[#FFB8DB]/60">
        © {new Date().getFullYear()} BAGgedebug. All rights reserved.
      </div>
    </footer>
  );
}