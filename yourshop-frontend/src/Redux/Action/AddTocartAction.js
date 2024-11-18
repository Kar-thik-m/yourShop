import {
    addToPostRequest, addToFailure, addTopostSuccess,
    getCartFailure, getCartSuccess, removeItemFromCart, removeItemFromCartFailure
} from "../Slice/AddToCartSlice";
import { Url } from "../../../config";
export const AddToCartPostApi = (productId, quantity) => async (dispatch) => {
    try {
        dispatch(addToPostRequest());

        const response = await fetch(`${Url}/cart/addToCart`, {
            method: 'POST',
            body: JSON.stringify({ productId, quantity }),
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        });

        if (!response.ok) {
            const error = await response.text();
            dispatch(addToFailure(error));
            return;
        }

        const data = await response.json();
        dispatch(addTopostSuccess(data));
    } catch (error) {
        dispatch(addToFailure(error.message || "Something went wrong"));
    }
};

export const GetAddToCartApi = () => async (dispatch) => {
    try {
        const response = await fetch(`${Url}/cart/getaddCart`, {
            method: 'GET',
            credentials: 'include',
        });

        if (!response.ok) {
            const error = await response.text();
            dispatch(getCartFailure(error));
            return;
        }

        const data = await response.json();
        dispatch(getCartSuccess(data));
    } catch (error) {
        dispatch(getCartFailure(error.message || "Failed to fetch items"));
    }
};

export const handleRemoveFromCart = (productId) => async (dispatch) => {
    try {
        const response = await fetch(`${Url}/cart/removeFromCart`, {
            method: "DELETE",
            body: JSON.stringify({ productId }),
            headers: { 'Content-Type': 'application/json' },
            credentials: "include",
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Error:", errorData.message);
            dispatch(removeItemFromCartFailure(errorData));
            return;
        }

        const data = await response.json();
        console.log(data.message);

        dispatch(removeItemFromCart(productId));
    } catch (error) {
        dispatch(removeItemFromCartFailure(error));
        console.error("Failed to remove item from cart:", error);
    }
};
