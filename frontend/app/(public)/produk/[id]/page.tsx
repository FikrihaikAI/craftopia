import { Metadata } from "next";
import axios from "axios";
import DetailClient from "./DetailClient";

const BASE_URL = "http://localhost:5000";
const SITE_NAME = "BAGgedebug";

/* ================= SEO METADATA (SERVER) ================= */
export async function generateMetadata(
  { params }: { params: Promise<{ id: string }> }
): Promise<Metadata> {
  const { id } = await params;

  try {
    const res = await axios.get(
      `${BASE_URL}/api/produk/${id}`
    );

    const produk = res.data.data || res.data.produk || res.data;

    const nama = produk?.nama_produk || "Produk";
    const deskripsi = produk?.deskripsi || `Detail produk di ${SITE_NAME}`;
    const gambar = produk?.gambar || "default.jpg";

    return {
      title: `${nama} | ${SITE_NAME}`,
      description: deskripsi,

      openGraph: {
        title: nama,
        description: deskripsi,
        siteName: SITE_NAME,
        images: [
          {
            url: `${BASE_URL}/uploads/${gambar}`,
            width: 800,
            height: 600,
            alt: nama,
          },
        ],
      },

      keywords: [
        "tas stylis",
        "tas lokal",
        "BAGgedebug",
        "produk tas",
      ],
    };
  } catch {
    return {
      title: `Produk | ${SITE_NAME}`,
      description: `Detail produk di ${SITE_NAME}`,
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