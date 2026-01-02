"use client";

import Header from "../components/Header";
import Footer from "../components/Footer";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="pt-[72px]">
        {children}
        </main>
      <Footer />
    </>
  );
}
