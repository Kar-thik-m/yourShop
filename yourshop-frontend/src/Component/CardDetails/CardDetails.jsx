import { useState, useEffect } from "react";
import Pdstyle from "../CardDetails/CardDetails.module.css";
import { useDispatch, useSelector } from "react-redux";
import { AddToCartPostApi } from "../../Redux/Action/AddTocartAction";

const CardDetails = () => {
    const dispatch = useDispatch();
    const { ItemsById, loading } = useSelector((state) => state.Item?.ItemsDetails);
    const [qty, setQty] = useState(1);

    const increaseQty = () => {
        setQty(qty + 1);
    };

    const decreaseQty = () => {
        if (qty > 1) {
            setQty(qty - 1);
        }
    };

    const handleAddToCart = () => {
        if (ItemsById) {
            dispatch(AddToCartPostApi(ItemsById._id, qty));
        }
    };

    if (loading) {
        return (
            <div className={Pdstyle.loadingContainer}>
                <p>Loading product details...</p>
            </div>
        );
    }

    return (
        ItemsById && (
            <div className={Pdstyle.productContainer}>
                <h3 className={Pdstyle.productTitle}>Product Details</h3>
                <div className={Pdstyle.productDetails}>
                    <div className={Pdstyle.imageSection}>
                        <img src={ItemsById?.itemimage?.url} className={Pdstyle.productImage} alt="Product" />
                    </div>
                    <div className={Pdstyle.detailsSection}>
                        <div className={Pdstyle.productName}>{ItemsById?.Productname}</div>
                        <div className={Pdstyle.productPrice}>₹{ItemsById?.price}</div>
                        <div className={Pdstyle.productDescription}>{ItemsById?.description}</div>
                        <div className={Pdstyle.productStock}>Stock: {ItemsById?.stock}</div>
                        <div className={Pdstyle.productSeller}>{ItemsById?.seller}</div>

                        <div className={Pdstyle.stockCounter}>
                            <button className={Pdstyle.qtyButton} onClick={decreaseQty}>-</button>
                            <input
                                type="number"
                                className={Pdstyle.qtyInput}
                                value={qty}
                                readOnly
                            />
                            <button className={Pdstyle.qtyButton} onClick={increaseQty}>+</button>
                        </div>

                        <div className={Pdstyle.addToCartBtn}>
                            <button
                                onClick={handleAddToCart}
                                type="button"
                                className="btn btn-primary btn-lg"
                            >
                                <i className="fa fa-cart-arrow-down" aria-hidden="true"></i> Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    );
};

export default CardDetails;
