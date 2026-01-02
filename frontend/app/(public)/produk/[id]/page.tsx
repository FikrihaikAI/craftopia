import { Metadata } from "next";
import axios from "axios";
import DetailClient from "./DetailClient";

/* ================= SEO METADATA (SERVER) ================= */
export async function generateMetadata(
  { params }: { params: Promise<{ id: string }> }
): Promise<Metadata> {
  const { id } = await params;

  try {
    const res = await axios.get(
      `http://localhost:5000/api/produk/${id}`
    );

    const produk = res.data.data || res.data.produk || res.data;

    return {
      title: `${produk.nama_produk} | Craftopia Handmade`,
      description: produk.deskripsi,
      openGraph: {
        title: produk.nama_produk,
        description: produk.deskripsi,
        images: [
          {
            url: `/${produk.gambar}`,
            width: 800,
            height: 600,
            alt: produk.nama_produk,
          },
        ],
      },
    };
  } catch {
    return {
      title: "Produk Craftopia",
      description: "Detail produk Craftopia",
    };
  }
}

/* ================= PAGE (SERVER) ================= */
export default async function Page(
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  return <DetailClient id={id} />;
}
