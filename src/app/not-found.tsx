import type { Metadata } from "next";
import NotFoundPage from "@/features/not-found/NotFoundPage";

export const metadata: Metadata = {
  title: "Halaman tidak ditemukan | Kas XI PPLG 2",
};

const NotFound = () => <NotFoundPage />;

export default NotFound;
