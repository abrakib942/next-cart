"use client";

import { addToCart } from "@/redux/cart/cartSlice";
import { useAppDispatch } from "@/redux/hook";

const Card = ({ product }: any) => {
  const dispatch = useAppDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  return (
    <div className="card w-[100%] bg-neutral text-primary-content">
      <div className="card-body">
        <h2 className="card-title">{product.name}</h2>
        <p>Price: {product.price}</p>
        <div className="card-actions justify-end">
          <button onClick={handleAddToCart} className="btn">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
