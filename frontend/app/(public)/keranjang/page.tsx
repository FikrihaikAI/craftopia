"use client";
import { useEffect, useState } from "react";
import { getCart, removeFromCart, CartItem, updateQty } from "@/lib/cart";
import { rupiah } from "@/lib/format";

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
    <div className="pt-40 text-center text-gray-500">
        Keranjang masih kosong
    </div>
    );
}

return (
    <div className="min-h-screen bg-gray-50 pt-28 px-6 md:px-20">
    <h1 className="text-3xl font-bold mb-10">Keranjang Belanja</h1>

    <div className="space-y-6">
        {cart.map((item) => (
        <div
            key={item.id}
            className="bg-white rounded-xl shadow p-5 flex gap-6"
        >
            <img
            src={`/${item.gambar}`}
            className="w-24 h-24 object-cover rounded-lg"
            />
        <div className="flex-1">
            <h3 className="font-bold">{item.nama_produk}</h3>
            <div className="flex items-center gap-3 mt-2">
                <button
                    disabled={item.qty === 1}
                    onClick={() => {
                        updateQty(item.id, item.qty - 1);
                        setCart(getCart());
                    }}
                    className={`w-8 h-8 rounded-full border text-lg
                    ${item.qty === 1 ? "opacity-40 cursor-not-allowed" : "hover:bg-gray-100"}
                    `}
                >
                    −
                </button>
                <span className="font-semibold">{item.qty}</span>
                <button
                    disabled={item.qty >= item.stok}
                    onClick={() => {
                        updateQty(item.id, item.qty + 1);
                        setCart(getCart());
                    }}
                    className={`w-8 h-8 rounded-full border text-lg
                    ${item.qty >= item.stok ? "opacity-40 cursor-not-allowed" : "hover:bg-gray-100"}
                    `}
                >
                    +
                </button>

            </div>

            <p className="font-semibold text-teal-600">
                {rupiah(item.harga * item.qty)}
            </p>
        </div>

        <button
            onClick={() => {
                removeFromCart(item.id);
                setCart(getCart());
            }}
            className="text-red-500 hover:underline"
            >
            Hapus
        </button>
        </div>
        ))}
    </div>

    <div className="mt-10 flex justify-between items-center">
    <p className="text-xl font-bold">Total: {rupiah(total)}</p>

    <a
    href={`https://wa.me/6282155178576?text=${encodeURIComponent(
        cart
            .map(
            (i) =>
            `${i.nama_produk} (${i.qty}) - ${rupiah(i.harga * i.qty)}`
            )
            .join("\n") + `\n\nTotal: ${rupiah(total)}`
        )}`}
            target="_blank"
            className="bg-teal-500 text-white px-8 py-4 rounded-xl font-semibold hover:bg-teal-600"
        >
        Checkout via WhatsApp
    </a>
    </div>
</div>
);
}
