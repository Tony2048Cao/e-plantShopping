import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Inicializamos los items como un array vacío
    totalQuantity: 0 // Estado para almacenar la cantidad total de artículos
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
      state.totalQuantity +=1;

    },
    removeItem: (state, action) => {
      state.totalQuantity  -= state.items.find(item => item.name == action.payload).quantity;
      state.items = state.items.filter(item => item.name !== action.payload);

      
    },

    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;
      const itemToUpdate = state.items.find(item => item.name === name);

      if (itemToUpdate) {
        const quantityDifference = quantity - itemToUpdate.quantity;
        itemToUpdate.quantity = quantity;
        state.totalQuantity += quantityDifference;
      }
    },
  }
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;
export default CartSlice.reducer;

