"use client";

import AddModal from "@/components/AddModal";
import Card from "@/components/Card";
import axiosInstance from "@/utils/axiosInstance";
import { useEffect, useState } from "react";

export type IProduct = {
  name: string;
  price: number;
};

export default function Home() {
  const [products, setProducts] = useState<IProduct[]>([]);

  const fetchProducts = async () => {
    try {
      const response = await axiosInstance.get("/api/product");
      setProducts(response.data.products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const refetchData = async () => {
    await fetchProducts();
  };

  return (
    <div className="my-12 px-12">
      <div className="text-center mb-8">
        <button
          className="btn btn-accent"
          onClick={() => {
            const modalElement = document.getElementById(
              "my_modal_3"
            ) as HTMLDialogElement | null;

            if (modalElement) {
              modalElement.showModal();
            }
          }}
        >
          Create New
        </button>
      </div>
      <div className="grid lg:grid-cols-3 justify-items-center gap-4">
        {products.map((product, i) => (
          <Card key={i} product={product} />
        ))}
      </div>

      <AddModal refetchData={refetchData} />
    </div>
  );
}
