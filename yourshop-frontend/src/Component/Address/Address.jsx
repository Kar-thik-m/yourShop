import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AddressStyle from "../Address/Address.module.css";
import { GetAddToCartApi } from '../../Redux/Action/AddTocartAction';
import { createOrder } from '../../Redux/Action/OrderAction';

const Address = () => {
    const [address, setAddress] = useState({
        street: '',
        city: '',
        state: '',
        pinCode: '',
        country: ''
    });
    const [isAddressSaved, setIsAddressSaved] = useState(false);
    const [paymentInfo, setPaymentInfo] = useState(null);  // Store payment info after successful payment

    const { Cart } = useSelector((state) => state?.addtocart);
    const dispatch = useDispatch();

    useEffect(() => {
        const savedAddress = localStorage.getItem('shippingAddress');
        if (savedAddress) {
            setAddress(JSON.parse(savedAddress));
            setIsAddressSaved(true);
        }
    }, []);

    useEffect(() => {
        dispatch(GetAddToCartApi());
    }, [dispatch]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAddress((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        localStorage.setItem('shippingAddress', JSON.stringify(address));
        setIsAddressSaved(true);
    };

    const handleGoToOrder = () => {
        const options = {
            key: "rzp_test_2sglITYoavfAoD", // Your Razorpay key
            amount: Cart?.totalPrice * 100, // Total price in paise (1 INR = 100 paise)
            currency: "INR",
            name: "STARTUP_PROJECTS",
            description: "for testing purpose",
            handler: function(response) {
                // Capture payment information after the payment is successful
                setPaymentInfo({
                    paymentId: response.razorpay_payment_id,
                    paymentStatus: response.razorpay_payment_status
                });
            },
            prefill: {
                name: "Karthik",
                email: "sparrowkarthik007@gmail.com",
                contact: "9361238910"
            },
            notes: {
                address: "Razorpay Corporate office"
            },
            theme: {
                color: "#3399cc"
            }
        };

        const pay = new window.Razorpay(options);
        pay.open();
    };

    // Only dispatch createOrder when payment info is available
    useEffect(() => {
        if (paymentInfo && Cart) {
            
                 Cart.products,  // Cart products
                 address,  // Shipping address from state
                paymentInfo   // Payment information from Razorpay
            

            // Dispatch action to create the order
            dispatch(createOrder( Cart.products, address, paymentInfo  ));
        }
    }, [paymentInfo, Cart, address, dispatch]); // Trigger only when paymentInfo is set

    if (isAddressSaved) {
        return (
            <div className={AddressStyle.addressSavedMessage}>
                <h3>Your saved address:</h3>
                <p><strong>Street:</strong> {address.street}</p>
                <p><strong>City:</strong> {address.city}</p>
                <p><strong>State:</strong> {address.state}</p>
                <p><strong>Pin Code:</strong> {address.pinCode}</p>
                <p><strong>Country:</strong> {address.country}</p>
                <button onClick={() => setIsAddressSaved(false)}>Edit Address</button>

                <h3>Your Cart Items:</h3>
                {Cart && Cart.products && Cart.products.length > 0 ? (
                    Cart.products.map((item) => {
                        const { product, quantity } = item;
                        return (
                            <div key={product._id} className={AddressStyle.card}>
                                <div className={AddressStyle.cardImageContainer}>
                                    <img
                                        src={product?.itemimage?.url}
                                        alt={product?.Productname}
                                        className={AddressStyle.cardImage}
                                    />
                                </div>
                                <div className={AddressStyle.cardDetails}>
                                    <h3 className={AddressStyle.productName}>{product?.Productname}</h3>
                                    <div className={AddressStyle.cardPrice}>₹{product?.price}</div>
                                    <div className={AddressStyle.cardRating}>
                                        <span className={AddressStyle.starIcon}>⭐</span>
                                        {product?.ratings || "0"} / 5
                                    </div>
                                    <div className={AddressStyle.cardStock}>
                                        {product?.stock > 0 ? `${product?.stock} in stock` : "Out of stock"}
                                    </div>
                                </div>
                                <div className={AddressStyle.icons}>
                                    <div className={AddressStyle.quantity}>{quantity}</div>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div>No products in your cart</div>
                )}

                <div
                    onClick={handleGoToOrder}
                    className={AddressStyle.totalAmound}
                >
                    {`₹${Cart?.totalPrice} Pay`}
                </div>
            </div>
        );
    }

    return (
        <div className={AddressStyle.addressFormContainer}>
            <h2>Enter Your Shipping Address</h2>
            <form onSubmit={handleSubmit} className={AddressStyle.addressForm}>
                <div>
                    <label htmlFor="street">Street</label>
                    <input
                        type="text"
                        id="street"
                        name="street"
                        value={address.street}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="city">City</label>
                    <input
                        type="text"
                        id="city"
                        name="city"
                        value={address.city}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="state">State</label>
                    <input
                        type="text"
                        id="state"
                        name="state"
                        value={address.state}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="pinCode">Pin Code</label>
                    <input
                        type="text"
                        id="pinCode"
                        name="pinCode"
                        value={address.pinCode}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="country">Country</label>
                    <input
                        type="text"
                        id="country"
                        name="country"
                        value={address.country}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <button type="submit">Save Address</button>
            </form>
        </div>
    );
};

export default Address;
