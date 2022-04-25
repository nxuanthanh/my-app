import { createSelector } from '@reduxjs/toolkit';

const cartItemSelector = (state) => state.cart.cartItems;

export const cartItemCountSelector = createSelector(cartItemSelector, (cartItems) =>
  cartItems.reduce((count, item) => count + item.quantity, 0)
);

export const cartItemTotalPriceSelector = createSelector(cartItemSelector, (cartItems) =>
  cartItems.reduce((count, item) => count + item.quantity * item.item.salePrice, 0)
);
