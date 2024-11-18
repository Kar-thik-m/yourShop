import {
    createOrderRequest,
    createOrderSuccess,
    createOrderFailure,
    getOrdersRequest,
    getOrdersSuccess,
    getOrdersFailure,
    updateOrderStatusRequest,
    updateOrderStatusSuccess,
    updateOrderStatusFailure,
    deleteOrderRequest,
    deleteOrderSuccess,
    deleteOrderFailure,
} from "../Slice/orderSlice.js";

import { Url } from "../../../config.js";  // Importing dynamic URL

// Create Order
export const createOrder = (products, shippingAddress, paymentInfo) => async (dispatch) => {
    dispatch(createOrderRequest());

    try {
        const response = await fetch(`${Url}/order/createorder`, {  // Using dynamic URL
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ products, shippingAddress, paymentInfo }),
            credentials: 'include',
        });

        if (!response.ok) {
            const error = await response.text();
            dispatch(createOrderFailure(error));
            return;
        }

        const data = await response.json();
        dispatch(createOrderSuccess(data.order));
    } catch (error) {
        dispatch(createOrderFailure(error.message || "Something went wrong"));
    }
};

// Get user orders
export const getUserOrders = () => async (dispatch) => {
    dispatch(getOrdersRequest());

    try {
        const response = await fetch(`${Url}/order/userorders`, {  // Using dynamic URL
            method: 'GET',
            credentials: 'include',
        });

        if (!response.ok) {
            const error = await response.text();
            dispatch(getOrdersFailure(error));
            return;
        }

        const data = await response.json();
        dispatch(getOrdersSuccess(data.orders));
    } catch (error) {
        dispatch(getOrdersFailure(error.message || "Failed to fetch orders"));
    }
};

// Update order status
export const updateOrderStatus = (orderId, status) => async (dispatch) => {
    dispatch(updateOrderStatusRequest());

    try {
        const response = await fetch(`${Url}/order/update/${orderId}`, {  // Using dynamic URL
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status }),
            credentials: 'include',
        });

        if (!response.ok) {
            const error = await response.text();
            dispatch(updateOrderStatusFailure(error));
            return;
        }

        const data = await response.json();
        dispatch(updateOrderStatusSuccess(data.order));
    } catch (error) {
        dispatch(updateOrderStatusFailure(error.message || "Failed to update order status"));
    }
};

// Delete order
export const deleteOrder = (orderId) => async (dispatch) => {
    dispatch(deleteOrderRequest());

    try {
        const response = await fetch(`${Url}/order/delete/${orderId}`, {  // Using dynamic URL
            method: 'DELETE',
            credentials: 'include',
        });

        if (!response.ok) {
            const error = await response.text();
            dispatch(deleteOrderFailure(error));
            return;
        }

        const data = await response.json();
        dispatch(deleteOrderSuccess(orderId));
    } catch (error) {
        dispatch(deleteOrderFailure(error.message || "Failed to delete order"));
    }
};
