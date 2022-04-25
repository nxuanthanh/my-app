import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    showMiniCart: false,
    cartItems: [],
  },
  reducers: {
    showMiniCart(state) {
      state.showMiniCart = true;
    },
    hideMiniCart(state) {
      state.hideTo.Cart = false;
    },

    addToCart(state, action) {
      const cartItem = action.payload;
      const index = state.cartItems.findIndex((item) => item.id === cartItem.id);

      if (index >= 0) {
        state.cartItems[index].quantity += cartItem.quantity;
      } else {
        state.cartItems.push(cartItem);
      }
    },

    setQuantity(state, action) {
      const { id, quantity } = action.payload;

      const index = state.cartItems.findIndex((x) => (x.id = id));
      if (index >= 0) {
        state.cartItems[id].quantity = quantity;
      }
    },

    removeFromCart(state, action) {
      const idNeedRemove = action.payload;

      state.cartItems.filter((x) => x.id !== idNeedRemove);
    },
  },
});

const { reducer, actions } = cartSlice;
export const { showMiniCart, hideMiniCart, addToCart, setQuantity, removeFromCart } = actions;
export default reducer;
