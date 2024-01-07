import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface IProduct {
  _id: string;
  name: string;
  price: number;
  quantity?: number;
}

export interface CartState {
  cart: IProduct[];
}

const loadState = (): CartState => {
  let storedState;
  if (typeof window !== "undefined") {
    storedState = localStorage.getItem("cartState");
  }
  return storedState ? JSON.parse(storedState) : { cart: [] };
};

const initialState: CartState = loadState();

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<IProduct>) => {
      const item = state.cart.find((item) => item._id === action.payload._id);

      if (item) {
        item.quantity = item.quantity && item.quantity + 1;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }

      localStorage.setItem("cartState", JSON.stringify(state));
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.cart = state.cart.filter((item) => item._id !== action.payload);

      localStorage.setItem("cartState", JSON.stringify(state));
    },
    increaseQuantity: (state, action: PayloadAction<string>) => {
      const item = state.cart.find((item) => item._id === action.payload);

      if (item) {
        item.quantity = item.quantity ? item.quantity + 1 : 2;

        localStorage.setItem("cartState", JSON.stringify(state));
      }
    },
    decreaseQuantity: (state, action: PayloadAction<string>) => {
      const item = state.cart.find((item) => item._id === action.payload);

      if (item) {
        item.quantity = item.quantity ? item.quantity - 1 : 0;

        localStorage.setItem("cartState", JSON.stringify(state));
      }
    },

    clearCart: (state) => {
      state.cart = [];
      localStorage.setItem("cartState", JSON.stringify(state));
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
