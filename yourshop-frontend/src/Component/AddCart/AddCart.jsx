import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddcartStyle from "../AddCart/AddCart.module.css";
import {
  GetAddToCartApi,
  handleRemoveFromCart,
  AddToCartPostApi,
} from "../../Redux/Action/AddTocartAction";
import { useNavigate } from "react-router-dom";

const AddCart = ({ setCartToggle }) => {
  const dispatch = useDispatch();
  const { Cart } = useSelector((state) => state?.addtocart);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch cart data when the component mounts
    dispatch(GetAddToCartApi());
  }, [dispatch]);

  // Handle adding a product to the cart
  const HandleAddToCart = (productId, quantity) => {
    dispatch(AddToCartPostApi(productId, quantity));
  };

  // Handle removing a product from the cart
  const HandleRemoveFromCart = (productId) => {
    dispatch(handleRemoveFromCart(productId));
  };

  // Handle navigation to the address page when the "Buy" button is clicked
  const handleGoToAddressPage = () => {
    navigate("/address");
  };

  return (
    <div className={AddcartStyle.LikeToggleContainer}>
      <button onClick={() => setCartToggle(false)} className={AddcartStyle.CloseButton}>
        <i className="fa fa-times" aria-hidden="true"></i> Close AddToCart
      </button>

      {Cart && Cart.products && Cart.products.length > 0 ? (
        Cart.products.map((item) => {
          const product = item.product;
          const quantity = item.quantity;

          return (
            <div key={product._id} className={AddcartStyle.card}>
              <div className={AddcartStyle.cardImageContainer}>
                <img
                  src={product?.itemimage?.url}
                  alt={product?.Productname}
                  className={AddcartStyle.cardImage}
                />
              </div>

              <div className={AddcartStyle.cardDetails}>
                <h3 className={AddcartStyle.productName}>{product?.Productname}</h3>
                <div className={AddcartStyle.cardPrice}>₹{product?.price}</div>
                <div className={AddcartStyle.cardRating}>
                  <span className={AddcartStyle.starIcon}>⭐</span>
                  {product?.ratings || "0"} / 5
                </div>
                <div className={AddcartStyle.cardStock}>
                  {product?.stock > 0 ? `${product?.stock} in stock` : "Out of stock"}
                </div>
              </div>

              <div className={AddcartStyle.icons}>
                <i
                  className="fa fa-trash"
                  onClick={() => HandleRemoveFromCart(product._id)}
                  aria-hidden="true"
                ></i>

                <div
                  className={AddcartStyle.quantity}
                  onClick={() => HandleAddToCart(product._id, quantity)}
                >
                  {quantity}
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div>No products in your cart</div>
      )}

      <div
        onClick={handleGoToAddressPage}
        className={AddcartStyle.totalAmound}
      >{`₹${Cart?.totalPrice} Buy`}</div>
    </div>
  );
};

export default AddCart;
