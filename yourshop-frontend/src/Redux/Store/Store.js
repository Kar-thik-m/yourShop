
import { configureStore } from '@reduxjs/toolkit';
import ItemReducer from "../Slice/ItemSlice.js";
import AddToCartRouter from "../Slice/AddToCartSlice.js"

const store = configureStore({
    devTools: true,
    reducer: {
        Item: ItemReducer,
        addtocart: AddToCartRouter,
    },
});

export default store;