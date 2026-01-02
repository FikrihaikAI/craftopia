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
        ? "text-white"
        : "text-white hover:text-teal-300"
    }`;

  return (
    <header
      className={`
        fixed top-0 left-0 z-50 w-full h-[72px]
        px-6 md:px-10
        flex items-center justify-between
        text-white
        transition-all duration-300
        ${scrolled ? "bg-[#3D5C8A]/80 backdrop-blur" : "bg-[#3D5C8A]"}
      `}
    >
      {/* LOGO */}
      <div className="flex items-center gap-3 group">
        <img
          src="/Craftopia logo 2B.png"
          alt="Craftopia Logo"
          className="w-10 h-10 rounded-full border border-white/40 transition group-hover:scale-105"
        />
        <h1 className="text-xl md:text-2xl font-extrabold tracking-wide">
          CRAFTOPIA
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
            className="cursor-pointer hover:text-teal-300 transition"
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
            border border-white/40
            px-4 py-1.5 rounded-md
            text-sm
            hover:bg-white hover:text-[#3D5C8A]
            transition
          "
        >
          <FaUser size={14} />
          Login
        </Link>
      </nav>

      {/* MOBILE ACTION */}
      <div className="flex items-center gap-4 md:hidden">
        <Link href="/keranjang" className="relative">
          <FaCartShopping size={20} />
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

        <button onClick={() => setOpenMenu(!openMenu)}>
          {openMenu ? <FaTimes size={22} /> : <FaBars size={22} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {openMenu && (
        <div className="
          absolute top-[72px] left-0 w-full
          bg-[#3D5C8A]/95 backdrop-blur
          flex flex-col gap-4
          px-6 py-6
          text-base font-semibold
          md:hidden
          animate-in slide-in-from-top-2 duration-200
        ">
          <Link href="/" onClick={() => setOpenMenu(false)}>Home</Link>
          <Link href="/produk" onClick={() => setOpenMenu(false)}>Produk</Link>
          <Link href="/tentang" onClick={() => setOpenMenu(false)}>Tentang</Link>
          <Link href="/kontak" onClick={() => setOpenMenu(false)}>Kontak</Link>

          <Link
            href="/admin/login"
            className="mt-2 w-fit flex items-center gap-2 border border-white/40 px-4 py-2 rounded-md"
          >
            <FaUser size={14} />
            Login
          </Link>
        </div>
      )}
    </header>
  );
}
