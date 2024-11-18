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


export const createOrder = (products, shippingAddress, paymentInfo) => async (dispatch) => {
    dispatch(createOrderRequest());

    try {
        const response = await fetch('http://localhost:5000/order/createorder', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({products, shippingAddress, paymentInfo}),
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

// Get user orders (GET /api/orders/userorders)
export const getUserOrders = () => async (dispatch) => {
    dispatch(getOrdersRequest());

    try {
        const response = await fetch('http://localhost:5000/order/userorders', {
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

// Update order status (PUT /api/orders/update/:orderId)
export const updateOrderStatus = (orderId, status) => async (dispatch) => {
    dispatch(updateOrderStatusRequest());

    try {
        const response = await fetch(`http://localhost:5000/order/update/${orderId}`, {
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

// Delete order (DELETE /api/orders/delete/:orderId)
export const deleteOrder = (orderId) => async (dispatch) => {
    dispatch(deleteOrderRequest());

    try {
        const response = await fetch(`http://localhost:5000/order/delete/${orderId}`, {
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
