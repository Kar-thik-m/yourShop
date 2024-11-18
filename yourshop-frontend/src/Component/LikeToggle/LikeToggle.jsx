import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LikeToggleStyle from "../LikeToggle/LikeToggle.module.css";
import { GetWishlist, RemoveWishlistApi, WishlistPostApi } from "../../Redux/Action/ItemAction"; 

const LikeToggle = ({ SetLikeopentoggle }) => {
    const dispatch = useDispatch();
    const { WhishList } = useSelector((state) => state.Item);
    const [wishlist, Setwishlist] = useState({});


    useEffect(() => {
        dispatch(GetWishlist());
    }, [dispatch]);


    useEffect(() => {
        const initialLikes = {};
        WhishList.forEach((wish) => {
            initialLikes[wish._id] = true;
        });
        Setwishlist(initialLikes);
    }, [WhishList]);


    const handleWishlistToggle = (productId) => {
        const isLiked = wishlist[productId];

        if (isLiked) {
            dispatch(RemoveWishlistApi(productId)).then(() => {
                Setwishlist((prev) => ({ ...prev, [productId]: false }));
            });
        } else {
            dispatch(WishlistPostApi(productId)).then(() => {
                Setwishlist((prev) => ({ ...prev, [productId]: true }));
            });
        }
    };

    const hasItemsInWishlist = Array.isArray(WhishList) && WhishList.length > 0;

    return (
        <>



            <div className={LikeToggleStyle.LikeToggleContainer}>
                <button onClick={() => SetLikeopentoggle(false)} className={LikeToggleStyle.CloseButton}>
                    <i class="fa fa-times" aria-hidden="true">Close Wishlist</i>
                </button>
                {hasItemsInWishlist ? (
                    WhishList.map((product) => (
                        <div key={product._id} className={LikeToggleStyle.card}>

                            <div className={LikeToggleStyle.cardImageContainer}>
                                <img
                                    src={product?.itemimage?.url}
                                    alt={product.Productname}
                                    className={LikeToggleStyle.cardImage}
                                />
                            </div>


                            <div className={LikeToggleStyle.cardDetails}>
                                <h3 className={LikeToggleStyle.productName}>{product.Productname}</h3>
                                <div className={LikeToggleStyle.cardPrice}>₹{product.price}</div>
                                <div className={LikeToggleStyle.cardRating}>
                                    <span className={LikeToggleStyle.starIcon}>⭐</span>
                                    {product.ratings || "0"} / 5
                                </div>
                                <div className={LikeToggleStyle.cardStock}>
                                    {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
                                </div>
                            </div>


                            <div className={LikeToggleStyle.icons}>
                                <i className="fa fa-shopping-cart" aria-hidden="true"></i>


                                <i
                                    className={`fa ${wishlist[product._id] ? 'fa-heart' : 'fa-heart-o'}`}
                                    aria-hidden="true"
                                    onClick={() => handleWishlistToggle(product._id)}
                                    style={{ cursor: 'pointer', color: wishlist[product._id] ? 'red' : 'black' }}
                                />
                            </div>
                        </div>
                    ))
                ) : (
                    <div>No products in your wishlist</div>
                )}
            </div>
        </>
    );
};

export default LikeToggle;
