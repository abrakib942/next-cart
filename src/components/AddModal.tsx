import React, { useState } from "react";
import axiosInstance from "@/utils/axiosInstance"; // Make sure to adjust the path based on your project structure
import toast from "react-hot-toast";

const AddModal = ({ refetchData }: { refetchData: () => Promise<void> }) => {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");

  const handleCreate = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await axiosInstance.post("/api/product", {
        name: productName,
        price: parseFloat(price),
      });

      if (response.data) {
        toast.success("Successfully created");

        // Close the modal
        const modalElement = document.getElementById(
          "my_modal_3"
        ) as HTMLDialogElement | null;
        if (modalElement) {
          modalElement.close();
        }

        // Reset form fields to initial state
        setProductName("");
        setPrice("");

        // Trigger refetch of data
        await refetchData();
      }
    } catch (error) {
      toast.error("Failed, Try again");
    }
  };

  return (
    <dialog id="my_modal_3" className="modal">
      <div className="modal-box">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <h3 className="font-bold text-lg">Create a New Product</h3>
        <form onSubmit={handleCreate}>
          <div className="flex flex-col gap-4">
            <div>
              <input
                type="text"
                placeholder="Enter Product Name"
                className="input input-bordered w-full max-w-xs"
                required
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
            </div>
            <div>
              <input
                type="number"
                placeholder="Enter Price"
                className="input input-bordered w-full max-w-xs"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div>
              <button type="submit" className="btn btn-accent">
                Create
              </button>
            </div>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default AddModal;
