"use client";

import {
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from "@/redux/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { RootState } from "@/redux/store";
import deleteImg from "@/assets/delete.png";
import Image from "next/image";

const Navbar = () => {
  const cart = useAppSelector((state: RootState) => state.cart.cart);

  const dispatch = useAppDispatch();

  const totalQuantity = cart.reduce(
    (total, item) => total + (item.quantity || 0),
    0
  );

  const subtotal = cart.reduce(
    (total, item) => total + item.price * (item.quantity || 0),
    0
  );

  return (
    <div className="px-12 sticky top-0 z-50">
      <div className="navbar bg-base-100 ">
        <div className="navbar-start">
          <a className="btn btn-ghost text-xl">Next Cart</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <a>Home</a>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle"
            >
              <div className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <div className="badge badge-sm indicator-item">
                  {cart.length}
                </div>
              </div>
            </div>
            <div
              tabIndex={0}
              className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow"
            >
              <div className="card-body">
                <div className="font-bold text-lg">
                  Total {cart.length} Products added
                </div>
                <div>
                  {cart.map((item, i) => (
                    <div className="" key={i}>
                      <div className="flex item-center gap-2">
                        <p>{item.name}</p>
                        <p
                          onClick={() => dispatch(decreaseQuantity(item._id))}
                          className="font-bold bg-secondary px-1 rounded-full cursor-pointer"
                        >
                          -
                        </p>
                        <p>x{item.quantity}</p>
                        <p
                          onClick={() => dispatch(increaseQuantity(item._id))}
                          className="font-bold bg-accent rounded-full px-1 cursor-pointer"
                        >
                          +
                        </p>
                        <div>
                          <Image
                            onClick={() => dispatch(removeFromCart(item._id))}
                            className="py-2 cursor-pointer"
                            width={25}
                            src={deleteImg}
                            alt=""
                          />
                        </div>
                      </div>
                      <div>
                        <p className=" text-red-700">
                          ${item.price * item.quantity}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="text-info">Subtotal: {subtotal}</div>{" "}
                <div className="card-actions">
                  <button className="btn btn-primary btn-block">
                    View cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
