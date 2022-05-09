import { createSlice } from '@reduxjs/toolkit';

const items = JSON.parse(localStorage.getItem('cart_items')) || [];

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    showMiniCart: false,
    cartItems: items,
  },
  reducers: {
    showMiniCart(state) {
      state.showMiniCart = true;
    },
    hideMiniCart(state) {
      state.hideMiniCart = false;
    },

    addToCart(state, action) {
      const cartItem = action.payload;
      const index = state.cartItems.findIndex((item) => item.id === cartItem.id);

      if (index >= 0) {
        state.cartItems[index].quantity += cartItem.quantity;
      } else {
        state.cartItems.push(cartItem);
      }
      localStorage.setItem('cart_items', JSON.stringify(state.cartItems));
    },

    setQuantity(state, action) {
      const { id, quantity } = action.payload;

      const index = state.cartItems.findIndex((x) => (x.id = id));
      if (index >= 0) {
        state.cartItems[id].quantity = quantity;
      }
    },

    removeFromCart(state, action) {
      console.log(action.payload);
      console.log(state.cartItems);
      const idNeedRemove = action.payload;

      state.cartItems.filter((x) => x.id !== idNeedRemove);
      localStorage.setItem('cart_items', JSON.stringify(state.cartItems));
    },
  },
});

const { reducer, actions } = cartSlice;
export const { showMiniCart, hideMiniCart, addToCart, setQuantity, removeFromCart } = actions;
export default reducer;
