import { createSlice } from "@reduxjs/toolkit";

const ItemSlice = createSlice({
    name: "Item",
    initialState: {
        loading: false,
        Items: [],
        ItemsDetails: [],
        WhishList: [],
        error: null,
    },
    reducers: {

        itempostRequest(state) {
            state.loading = true;
            state.error = null;
        },
        itempostSuccess(state, action) {
            state.loading = false;
            state.Items = [...state.Items, action.payload];
        },
        itempostFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },

        itemgetRequest(state) {
            state.loading = true;
            state.error = null;
        },
        itemgetSuccess(state, action) {
            state.loading = false;
            state.Items = action.payload;
        },
        itemgetFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },


        itemDetailsRequest(state) {
            state.loading = true;
            state.error = null;
        },
        itemDetailsSuccess(state, action) {
            state.loading = false;
            state.ItemsDetails = action.payload;
        },
        itemDetailsFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },


        addToWishlistRequest(state) {
            state.loading = true;
            state.error = null;
        },
        addToWishlistSuccess(state, action) {
            state.loading = false;
            state.WhishList = [...state.WhishList, action.payload];
        },
        addToWishlistFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },


        removeFromWishlistRequest(state) {
            state.loading = true;
            state.error = null;
        },
        removeFromWishlistSuccess(state, action) {
            state.loading = false;

            state.WhishList = state.WhishList.filter(item => item._id !== action.payload._id);
        },
        removeFromWishlistFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },


        getWishlistRequest(state) {
            state.loading = true;
            state.error = null;
        },
        getWishlistSuccess(state, action) {
            state.loading = false;
            state.WhishList = action.payload;
        },
        getWishlistFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const {
    itempostRequest,
    itempostSuccess,
    itempostFailure,
    itemgetRequest,
    itemgetSuccess,
    itemgetFailure,
    itemDetailsFailure,
    itemDetailsRequest,
    itemDetailsSuccess,
    addToWishlistRequest,
    addToWishlistSuccess,
    addToWishlistFailure,
    removeFromWishlistRequest,
    removeFromWishlistSuccess,
    removeFromWishlistFailure,
    getWishlistRequest,
    getWishlistSuccess,
    getWishlistFailure,
} = ItemSlice.actions;

export default ItemSlice.reducer;
