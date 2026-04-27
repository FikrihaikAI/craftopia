"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { FaBars, FaTimes, FaUser } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { getCart } from "@/lib/cart";

export default function Header() {
  const [openMenu, setOpenMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const pathname = usePathname();

  /* ================= SCROLL EFFECT ================= */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ================= CART BADGE ================= */
  const updateCartCount = () => {
    const cart = getCart();
    const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
    setCartCount(totalQty);
  };

  useEffect(() => {
    updateCartCount();

    window.addEventListener("cartUpdated", updateCartCount);
    return () => {
      window.removeEventListener("cartUpdated", updateCartCount);
    };
  }, []);

  const navClass = (href: string) =>
    `transition ${
      pathname === href
        ? "text-[#FF0080]"
        : "text-[#FFB8DB] hover:text-[#FF0080]"
    }`;

  return (
    <header
      className={`
        fixed top-0 left-0 z-50 w-full h-[72px]
        px-6 md:px-10
        flex items-center justify-between
        text-white
        transition-all duration-300
        ${scrolled ? "bg-[#212121]/90 backdrop-blur" : "bg-[#212121]"}
      `}
    >
      {/* LOGO */}
      <div className="flex items-center gap-3 group">
        <img
          src="/bagbug.png"
          alt="BAGgedebug logo"
          className="w-10 h-10 rounded-full border border-white/40 transition group-hover:scale-105"
        />
        <h1 className="text-xl md:text-2xl font-extrabold tracking-wide flex">
          <span className="text-[#FFFFFF]">BAGge</span>
          <span className="text-[#FF0080]">debug</span>
        </h1>
      </div>

      {/* DESKTOP NAV */}
      <nav className="hidden md:flex items-center gap-6 text-base font-semibold">
        <Link href="/" className={navClass("/")}>Home</Link>
        <Link href="/produk" className={navClass("/produk")}>Produk</Link>
        <Link href="/tentang" className={navClass("/tentang")}>Tentang</Link>
        <Link href="/kontak" className={navClass("/kontak")}>Kontak</Link>

        {/* CART ICON + BADGE */}
        <Link href="/keranjang" className="relative">
          <FaCartShopping
            size={20}
            className="cursor-pointer hover:text-[#FF0080] transition"
          />
          {cartCount > 0 && (
            <span className="
              absolute -top-2 -right-3
              bg-red-500 text-white
              text-xs font-bold
              px-2 py-0.5 rounded-full
            ">
              {cartCount}
            </span>
          )}
        </Link>

        <Link
          href="/admin/login"
          className="
            ml-2 flex items-center gap-2
            border border-[#424242]
            px-4 py-1.5 rounded-md
            text-sm
            text-[#FFB8DB]
            hover:bg-[#FF0080] hover:text-white
            transition
          "
        >
          <FaUser size={14} />
          Login
        </Link>
      </nav>

      {/* MOBILE ACTION */}
          <div className="flex items-center gap-4 md:hidden">
      {/* CART */}
      <Link href="/keranjang" className="relative text-white">
        <FaCartShopping size={20} />

        {cartCount > 0 && (
          <span className="
            absolute -top-2 -right-3
            bg-[#FF0080] text-white
            text-xs font-bold
            px-2 py-0.5 rounded-full shadow-md
          ">
            {cartCount}
          </span>
        )}
      </Link>

      {/* MENU BUTTON */}
      <button
        onClick={() => setOpenMenu(!openMenu)}
        className="text-white hover:text-[#FF0080] transition"
      >
        {openMenu ? <FaTimes size={22} /> : <FaBars size={22} />}
      </button>
    </div>

    {/* MOBILE MENU */}
    {openMenu && (
      <div className="
        absolute top-[72px] left-0 w-full
        bg-[#212121]/95 backdrop-blur-md
        flex flex-col gap-4
        px-6 py-6
        text-base font-semibold
        md:hidden
        border-t border-[#424242]
        animate-in slide-in-from-top-2 duration-200
      ">

        {/* MENU LINKS */}
        <Link
          href="/"
          onClick={() => setOpenMenu(false)}
          className="text-white hover:text-[#FF0080] transition"
        >
          Home
        </Link>

        <Link
          href="/produk"
          onClick={() => setOpenMenu(false)}
          className="text-white hover:text-[#FF0080] transition"
        >
          Produk
        </Link>

        <Link
          href="/tentang"
          onClick={() => setOpenMenu(false)}
          className="text-white hover:text-[#FF0080] transition"
        >
          Tentang
        </Link>

        <Link
          href="/kontak"
          onClick={() => setOpenMenu(false)}
          className="text-white hover:text-[#FF0080] transition"
        >
          Kontak
        </Link>

        {/* LOGIN BUTTON */}
        <Link
          href="/admin/login"
          className="
            mt-3 w-fit flex items-center gap-2
            border border-[#FF0080]
            text-[#FF0080]
            px-4 py-2 rounded-lg
            hover:bg-[#FF0080] hover:text-white
            transition
          "
        >
          <FaUser size={14} />
          Login
        </Link>
      </div>
      )}
    </header>
  );
}
