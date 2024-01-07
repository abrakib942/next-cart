import { IProduct } from "@/app/page";
import React from "react";

const Card = ({ product }: any) => {
  return (
    <div className="card w-[100%] bg-neutral text-primary-content">
      <div className="card-body">
        <h2 className="card-title">{product.name}</h2>
        <p>Price: {product.price}</p>
        <div className="card-actions justify-end">
          <button className="btn">Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default Card;
