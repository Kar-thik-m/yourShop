import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GetItemApi, GetItemDetails, WishlistPostApi, RemoveWishlistApi, GetWishlist } from "../../Redux/Action/ItemAction";
import { useDispatch, useSelector } from "react-redux";
import { AddToCartPostApi } from "../../Redux/Action/AddTocartAction";

import { FaHeart, FaRegHeart, FaShoppingCart, FaEye, FaStar } from "react-icons/fa";

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
        <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
                    <div className="space-y-2">
                        <h2 className="text-3xl md:text-4xl font-bold text-neutral-900">Featured Products</h2>
                        <div className="h-1 w-20 bg-blue-600 rounded-full"></div>
                    </div>
                    <Link to="/shop" className="text-blue-600 font-semibold hover:text-blue-700 transition-colors flex items-center gap-2">
                        View All Products
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                    {products?.map((product) => (
                        <div key={product._id} className="group flex flex-col bg-white rounded-3xl overflow-hidden border border-neutral-100 hover:border-blue-100 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500">
                            {/* Image Container */}
                            <div className="relative aspect-[4/5] overflow-hidden bg-neutral-50">
                                <img
                                    src={product?.itemimage?.url}
                                    alt={product.Productname}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                
                                {/* Hover Overlay Actions */}
                                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                                    <button 
                                        onClick={() => handleWishlistToggle(product._id)}
                                        className="p-3 bg-white hover:bg-red-50 text-neutral-900 hover:text-red-500 rounded-full shadow-lg transition-all duration-300 transform translate-y-4 group-hover:translate-y-0"
                                    >
                                        {wishlist[product._id] ? <FaHeart className="w-5 h-5 text-red-500" /> : <FaRegHeart className="w-5 h-5" />}
                                    </button>
                                    <Link
                                        to={`/product/${product._id}`}
                                        className="p-3 bg-white hover:bg-blue-50 text-neutral-900 hover:text-blue-500 rounded-full shadow-lg transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 delay-75"
                                        onClick={() => dispatch(GetItemDetails(product?._id))}
                                    >
                                        <FaEye className="w-5 h-5" />
                                    </Link>
                                </div>

                                {product.stock <= 5 && product.stock > 0 && (
                                    <div className="absolute top-4 left-4 px-3 py-1 bg-orange-500 text-white text-xs font-bold rounded-full uppercase tracking-wider">
                                        Low Stock
                                    </div>
                                )}
                                {product.stock === 0 && (
                                    <div className="absolute top-4 left-4 px-3 py-1 bg-red-600 text-white text-xs font-bold rounded-full uppercase tracking-wider">
                                        Out of Stock
                                    </div>
                                )}
                            </div>

                            {/* Details Container */}
                            <div className="p-6 flex flex-col flex-grow space-y-3">
                                <div className="flex justify-between items-start">
                                    <h3 className="text-lg font-bold text-neutral-900 line-clamp-1 group-hover:text-blue-600 transition-colors">
                                        {product.Productname}
                                    </h3>
                                </div>

                                <div className="flex items-center gap-2">
                                    <div className="flex text-yellow-400">
                                        {[...Array(5)].map((_, i) => (
                                            <FaStar key={i} className={`w-3 h-3 ${i < (product.ratings || 0) ? 'fill-current' : 'text-neutral-200'}`} />
                                        ))}
                                    </div>
                                    <span className="text-xs font-medium text-neutral-400">({product.ratings || "0"})</span>
                                </div>

                                <div className="flex items-center justify-between mt-auto pt-4">
                                    <div className="flex flex-col">
                                        <span className="text-2xl font-black text-neutral-900">₹{product.price}</span>
                                        <span className="text-xs text-neutral-400 line-through">₹{Math.round(product.price * 1.2)}</span>
                                    </div>
                                    <button 
                                        disabled={product.stock === 0}
                                        onClick={() => handleAddToCart(product._id, 1)}
                                        className={`p-3 rounded-2xl transition-all duration-300 ${
                                            product.stock === 0 
                                            ? 'bg-neutral-100 text-neutral-400 cursor-not-allowed' 
                                            : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-900/20 active:scale-95'
                                        }`}
                                    >
                                        <FaShoppingCart className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Cards;
