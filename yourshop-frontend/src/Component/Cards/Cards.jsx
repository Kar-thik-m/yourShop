import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GetItemApi, GetItemDetails, WishlistPostApi, RemoveWishlistApi, GetWishlist } from "../../Redux/Action/ItemAction";
import cardStyle from "../Cards/Cards.module.css";
import { useDispatch, useSelector } from "react-redux";
import { AddToCartPostApi } from "../../Redux/Action/AddTocartAction";

const Cards = () => {
    const dispatch = useDispatch();
    const { products } = useSelector((state) => state.Item?.Items);
    const { WhishList } = useSelector((state) => state.Item);
   
    const [wishlist, Setwishlist] = useState({});

    useEffect(() => {
        dispatch(GetItemApi());
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

    const handleAddToCart = (productId, quantity = 1) => {
        dispatch(AddToCartPostApi(productId, quantity));
    };

    return (
        <div className={cardStyle.cardContainer}>
            {products?.map((product) => (
                <div key={product._id} className={cardStyle.card}>
                    <div className={cardStyle.cardImageContainer}>
                        <img
                            src={product?.itemimage?.url}
                            alt={product.Productname}
                            className={cardStyle.cardImage}
                        />
                    </div>
                    <div className={cardStyle.cardDetails}>
                        <h3 className={cardStyle.productName}>{product.Productname}</h3>
                        <div className={cardStyle.cardPrice}>₹{product.price}</div>
                        <div className={cardStyle.cardRating}>
                            <span className={cardStyle.starIcon}>⭐</span>
                            {product.ratings || "0"} / 5
                        </div>
                        <div className={cardStyle.cardStock}>
                            {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
                        </div>
                    </div>

                    <div className={cardStyle.icons}>
                        <i
                            className={`fa ${wishlist[product._id] ? 'fa-heart' : 'fa-heart-o'}`}
                            aria-hidden="true"
                            onClick={() => handleWishlistToggle(product._id)}
                            style={{ cursor: 'pointer', color: wishlist[product._id] ? 'red' : 'black' }}
                        />
                        <i
                            className="fa fa-shopping-cart"
                            aria-hidden="true"
                            onClick={() => handleAddToCart(product._id, 1)}
                            style={{ cursor: 'pointer' }}
                        />
                        <Link
                            to={`/product/${product._id}`}
                            className={cardStyle.cardLink}
                            onClick={() => dispatch(GetItemDetails(product?._id))}
                        >
                            <i className="fa fa-eye" aria-hidden="true"></i>
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Cards;
