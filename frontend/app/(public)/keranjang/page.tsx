"use client";
import { useEffect, useState } from "react";
import { getCart, removeFromCart, CartItem, updateQty } from "@/lib/cart";
import { rupiah } from "@/lib/format";

const BASE_URL = "http://localhost:5000";

export default function KeranjangPage() {
const [cart, setCart] = useState<CartItem[]>([]);

useEffect(() => {
    setCart(getCart());
}, []);

const total = cart.reduce(
    (sum, item) => sum + item.harga * item.qty,
    0
);

if (cart.length === 0) {
    return (
    <div className="pt-40 text-center text-gray-400 bg-[#212121] min-h-screen">
        Keranjang masih kosong
    </div>
    );
}

return (
    <div className="min-h-screen bg-[#212121] pt-28 px-6 md:px-20 text-white">
    <h1 className="text-3xl font-bold mb-10">
        Keranjang Belanja
    </h1>

    <div className="space-y-6">
        {cart.map((item) => (
        <div
            key={item.id}
            className="bg-[#2a2a2a] rounded-2xl border border-[#3a3a3a] p-5 flex gap-6 items-center"
        >
        {/* ================= IMAGE ================= */}
            <img
            src={`${BASE_URL}/uploads/${item.gambar}`}
            alt={item.nama_produk}
            onError={(e: any) => {
                e.target.src = "/no-image.png";
            }}
            className="w-24 h-24 object-cover rounded-lg"
            />

            <div className="flex-1">
            <h3 className="font-bold text-white">
                {item.nama_produk}
            </h3>

            <div className="flex items-center gap-3 mt-3">
                <button
                disabled={item.qty === 1}
                onClick={() => {
                    updateQty(item.id, item.qty - 1);
                    setCart(getCart());
                }}
                className={`w-8 h-8 rounded-full border border-[#555] text-lg
                ${
                    item.qty === 1
                    ? "opacity-30 cursor-not-allowed"
                    : "hover:bg-[#3a3a3a]"
                }`}
                >
                −
                </button>

                <span className="font-semibold text-white">
                {item.qty}
                </span>

                <button
                disabled={item.qty >= item.stok}
                onClick={() => {
                    updateQty(item.id, item.qty + 1);
                    setCart(getCart());
                }}
                className={`w-8 h-8 rounded-full border border-[#555] text-lg
                ${
                    item.qty >= item.stok
                    ? "opacity-30 cursor-not-allowed"
                    : "hover:bg-[#3a3a3a]"
                }`}
                >
                +
                </button>
            </div>

            <p className="font-semibold text-[#FF0080] mt-2">
                {rupiah(item.harga * item.qty)}
            </p>
            </div>

            <button
            onClick={() => {
                removeFromCart(item.id);
                setCart(getCart());
            }}
            className="text-pink-500 hover:text-pink-400"
            >
            Hapus
            </button>
        </div>
        ))}
    </div>

    {/* ================= TOTAL ================= */}
    <div className="mt-12 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-xl font-bold">
        Total:{" "}
        <span className="text-[#FF0080]">
            {rupiah(total)}
        </span>
        </p>

        <a
        href={`https://wa.me/6288705217614?text=${encodeURIComponent(
            cart
            .map(
                (i) =>
                `${i.nama_produk} (${i.qty}) - ${rupiah(
                    i.harga * i.qty
                )}`
            )
            .join("\n") + `\n\nTotal: ${rupiah(total)}`
        )}`}
        target="_blank"
        className="bg-[#FF0080] text-white px-8 py-4 rounded-xl font-semibold hover:bg-pink-600 transition"
        >
        Checkout via WhatsApp
        </a>
    </div>
    </div>
);
}