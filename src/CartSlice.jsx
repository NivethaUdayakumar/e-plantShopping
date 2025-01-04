import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], 
  },
  reducers: {
    addItem: (state, action) => {
      const { name, image, cost } = action.payload;
      const existingItem = state.items.find(item => item.name === name);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.items.push({ name, image, cost, quantity: 1 });
      }
    },
    removeItem: (state, action) => {
      state.items = state.items.filter((item) => !(item.name === action.payload.name));
    },
    updateQuantity: (state, action) => {
      console.log(action);
      const newItem = action.payload;
      const itemToUpdate = state.items.find(item => item.name === newItem.name);
      if (itemToUpdate) {
        state.items.quantity = newItem.quantity;
      }
    },
    incrementItem: (state, action) => {
      const { name } = action.payload;
      const existingItem = state.items.find(item => item.name === name);
      if (existingItem) {
        existingItem.quantity++;
      }
    },
    decrementItem: (state, action) => {
      const { name } = action.payload;
      const existingItem = state.items.find(item => item.name === name);
      if (existingItem && existingItem.quantity > 0) {
        existingItem.quantity--;
      }
  },
  },
});

export const { addItem, removeItem, updateQuantity, incrementItem, decrementItem } = CartSlice.actions;

export default CartSlice.reducer;