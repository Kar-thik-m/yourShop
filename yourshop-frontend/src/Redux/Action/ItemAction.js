import {
    itempostFailure, itempostRequest, itempostSuccess,
    itemgetFailure, itemgetRequest, itemgetSuccess,
    itemDetailsFailure, itemDetailsRequest, itemDetailsSuccess,
    addToWishlistFailure, addToWishlistRequest, addToWishlistSuccess,
    removeFromWishlistFailure, removeFromWishlistRequest, removeFromWishlistSuccess,
    getWishlistFailure, getWishlistRequest, getWishlistSuccess,
} from "../Slice/ItemSlice";
import { Url } from "../../../config";  // Import the dynamic URL variable from config

// Post new item to the server
export const itemPostApi = (itemdata) => async (dispatch) => {
    try {
        dispatch(itempostRequest());
        const response = await fetch(`${Url}/item/product`, {  // Use dynamic URL
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }, // Add Content-Type header
            body: JSON.stringify(itemdata), // Send data as JSON string
            credentials: 'include',
        });

        if (!response.ok) {
            const error = await response.text();
            dispatch(itempostFailure(error));
            return;
        }

        const data = await response.json();
        dispatch(itempostSuccess(data));
    } catch (error) {
        dispatch(itempostFailure(error.message || 'Error posting item.'));
    }
};

// Get all items from the server
export const GetItemApi = () => async (dispatch) => {
    try {
        dispatch(itemgetRequest());
        const response = await fetch(`${Url}/item/get-all-product`, {  
            method: 'GET',
            credentials: 'include',
        });

        if (!response.ok) {
            const error = await response.text();
            dispatch(itemgetFailure(error));
            return;
        }

        const data = await response.json();
        dispatch(itemgetSuccess(data));
    } catch (error) {
        dispatch(itemgetFailure(error.message || 'Error fetching items.'));
    }
};

// Get details of a specific item by ID
export const GetItemDetails = (id) => async (dispatch) => {
    try {
        dispatch(itemDetailsRequest());
        const response = await fetch(`${Url}/item/product/${id}`, {  
            method: 'GET',
            credentials: 'include',
        });

        if (!response.ok) {
            const error = await response.text();
            dispatch(itemDetailsFailure(error));
            return;
        }

        const data = await response.json();
        dispatch(itemDetailsSuccess(data));
    } catch (error) {
        dispatch(itemDetailsFailure(error.message || 'Error fetching item details.'));
    }
};

// Add item to wishlist
export const WishlistPostApi = (id) => async (dispatch) => {
    try {
        dispatch(addToWishlistRequest());
        const response = await fetch(`${Url}/whishlist/addwhishlist/${id}`, {  // Use dynamic URL
            method: 'POST',
            credentials: 'include',
        });

        if (!response.ok) {
            const error = await response.text();
            dispatch(addToWishlistFailure(error));
            return;
        }

        const data = await response.json();
        dispatch(addToWishlistSuccess(data));
    } catch (error) {
        dispatch(addToWishlistFailure(error.message || 'Error adding to wishlist.'));
    }
};

// Remove item from wishlist
export const RemoveWishlistApi = (id) => async (dispatch) => {
    try {
        dispatch(removeFromWishlistRequest());
        const response = await fetch(`${Url}/whishlist/removewhishlist/${id}`, {  // Use dynamic URL
            method: 'POST',
            credentials: 'include',
        });

        if (!response.ok) {
            const error = await response.text();
            dispatch(removeFromWishlistFailure(error));
            return;
        }

        const data = await response.json();
        dispatch(removeFromWishlistSuccess(data));
    } catch (error) {
        dispatch(removeFromWishlistFailure(error.message || 'Error removing from wishlist.'));
    }
};

// Get all wishlist items
export const GetWishlist = () => async (dispatch) => {
    try {
        dispatch(getWishlistRequest());
        const response = await fetch(`${Url}/whishlist/getwishlist`, {  
            method: 'GET',
            credentials: 'include',
        });

        if (!response.ok) {
            const error = await response.text();
            dispatch(getWishlistFailure(error));
            return;
        }

        const data = await response.json();
        dispatch(getWishlistSuccess(data));
    } catch (error) {
        dispatch(getWishlistFailure(error.message || 'Error fetching wishlist.'));
    }
};
