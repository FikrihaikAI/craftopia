export type CartItem = {
    id: string;
    nama_produk: string;
    harga: number;
    gambar: string;
    stok: number;
    qty: number;
};

const CART_KEY = "craftopia_cart";

/* ================= GET CART ================= */
export function getCart(): CartItem[] {
    if (typeof window === "undefined") return [];

    const cart = localStorage.getItem(CART_KEY);
    return cart ? JSON.parse(cart) : [];
}

/* ================= SAVE CART ================= */
function saveCart(cart: CartItem[]) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));

// Beri tahu seluruh app (Navbar, Badge, dll)
    window.dispatchEvent(new Event("cartUpdated"));
}

/* ================= ADD TO CART ================= */
export function addToCart(item: Omit<CartItem, "qty">) {
    if (typeof window === "undefined") return;

    const cart = getCart();
    const existing = cart.find((c) => c.id === item.id);

    if (existing) {
    if (existing.qty < existing.stok) {
        existing.qty += 1;
    } else {
        alert("Jumlah sudah mencapai stok maksimum");
        return;
    }
    } else {
    cart.push({ ...item, qty: 1 });
    }

    saveCart(cart);
    console.log("🛒 Cart updated:", cart);
}

/* ================= QTY (+ / −) ================= */
export function updateQty(id: string, qty: number) {
    const cart = getCart();

    const updated = cart.map((item) =>
    item.id === id
        ? {
            ...item,
            qty: Math.min(item.stok, Math.max(1, qty)),
        }
        : item
    );

    saveCart(updated);
}

/* ================= REMOVE ================= */
export function removeFromCart(id: string) {
    const cart = getCart().filter((item) => item.id !== id);
    saveCart(cart);
}

/* ================= CLEAR ================= */
export function clearCart() {
    localStorage.removeItem(CART_KEY);
    window.dispatchEvent(new Event("cartUpdated"));
}
