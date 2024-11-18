import {
    itempostFailure, itempostRequest, itempostSuccess, itemgetFailure, itemgetRequest, itemgetSuccess,
    itemDetailsFailure, itemDetailsRequest, itemDetailsSuccess, addToWishlistFailure, addToWishlistRequest, addToWishlistSuccess,
    removeFromWishlistFailure, removeFromWishlistRequest, removeFromWishlistSuccess, getWishlistFailure, getWishlistRequest, getWishlistSuccess,

} from "../Slice/ItemSlice";

export const itemPostApi = (itemdata) => async (dispatch) => {
    try {
        dispatch(itempostRequest());
        const response = await fetch('http://localhost:5000/item/product', {
            method: 'POST',
            body: itemdata,
            credentials: 'include',
        });
        if (!response.ok) {
            const error = await response.text();
            dispatch(itempostFailure(error));
            return;
        }
        const data = await response.json();
        dispatch(itempostSuccess(data))
    } catch (error) {
        dispatch(itempostFailure(error));
    }
}

export const GetItemApi = () => async (dispatch) => {
    try {
        dispatch(itemgetRequest());
        const response = await fetch(`http://localhost:5000/item/get-all-product`, {
            method: 'GET',
        });
        if (!response.ok) {
            const error = await response.text();
            dispatch(itemgetFailure(error));
            return;
        }
        const data = await response.json();
        dispatch(itemgetSuccess(data))
    } catch (error) {
        dispatch(itemgetFailure(error));
    }
}

export const GetItemDetails = (id) => async (dispatch) => {
    try {
        dispatch(itemDetailsRequest());
        const response = await fetch(`http://localhost:5000/item/product/${id}`, {
            method: 'GET',
        });
        if (!response.ok) {
            const error = await response.text();
            dispatch(itemgetFailure(error));
            return;
        }
        const data = await response.json();
        dispatch(itemDetailsSuccess(data))
    } catch (error) {
        dispatch(itemDetailsFailure(error));
    }
}

export const WishlistPostApi = (id) => async (dispatch) => {
    try {
        dispatch(addToWishlistRequest());
        const response = await fetch(`http://localhost:5000/whishlist/addwhishlist/${id}`, {
            method: 'POST',
            credentials: 'include',
        });
        if (!response.ok) {
            const error = await response.text();
            dispatch(addToWishlistFailure(error));
            return;
        }
        const data = await response.json();
        dispatch(addToWishlistSuccess(data))
    } catch (error) {
        dispatch(itempostFailure(error));
    }
}

export const RemoveWishlistApi = (id) => async (dispatch) => {
    try {
        dispatch(removeFromWishlistRequest());
        const response = await fetch(`http://localhost:5000/whishlist/removewhishlist/${id}`, {
            method: 'POST',
            credentials: 'include',
        });
        if (!response.ok) {
            const error = await response.text();
            dispatch(removeFromWishlistFailure(error));
            return;
        }
        const data = await response.json();
        dispatch(removeFromWishlistSuccess(data))
    } catch (error) {
        dispatch(removeFromWishlistFailure(error));
    }
}

export const GetWishlist = () => async (dispatch) => {
    try {
        dispatch(getWishlistRequest());
        const response = await fetch(`http://localhost:5000/whishlist/getwishlist`, {
            method: 'GET',
            credentials: 'include',
        });
        if (!response.ok) {
            const error = await response.text();
            dispatch(getWishlistFailure(error));
            return;
        }
        const data = await response.json();
        dispatch(getWishlistSuccess(data))
    } catch (error) {
        dispatch(getWishlistFailure(error));
    }
}
