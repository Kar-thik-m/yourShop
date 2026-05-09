import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetWishlist, RemoveWishlistApi, WishlistPostApi } from "../../Redux/Action/ItemAction"; 
import { FaTimes, FaTrash, FaShoppingCart, FaHeart, FaStar } from "react-icons/fa";

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
        <div className="fixed inset-0 z-[1000] flex justify-end overflow-hidden">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={() => SetLikeopentoggle(false)}
            ></div>

            {/* Side Drawer */}
            <div className="relative w-full max-w-[400px] bg-white h-full shadow-2xl flex flex-col animate-slide-in">
                {/* Red Header */}
                <div className="bg-red-600 p-4 flex items-center justify-between shadow-md">
                    <button 
                        onClick={() => SetLikeopentoggle(false)}
                        className="flex items-center gap-2 text-white font-bold uppercase text-sm hover:opacity-80 transition-opacity"
                    >
                        <FaTimes />
                        Close Wishlist
                    </button>
                </div>

                {/* Content Area */}
                <div className="flex-grow overflow-y-auto p-4 space-y-6">
                    {hasItemsInWishlist ? (
                        WhishList.map((product) => (
                            <div key={product._id} className="border-b border-neutral-100 pb-6 last:border-0">
                                {/* Product Image */}
                                <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-neutral-50 mb-4 shadow-inner">
                                    <img
                                        src={product?.itemimage?.url}
                                        alt={product.Productname}
                                        className="w-full h-full object-contain p-4"
                                    />
                                    <button 
                                        onClick={() => handleWishlistToggle(product._id)}
                                        className="absolute top-4 right-4 p-3 bg-white text-red-500 rounded-full shadow-lg hover:scale-110 transition-transform"
                                    >
                                        <FaHeart />
                                    </button>
                                </div>

                                {/* Product Info */}
                                <div className="space-y-1">
                                    <h3 className="text-lg font-bold text-neutral-900 leading-tight">
                                        {product.Productname}
                                    </h3>
                                    <div className="text-2xl font-black text-neutral-900">₹{product.price}</div>
                                    
                                    <div className="flex items-center gap-2 py-1">
                                        <div className="flex text-yellow-400">
                                            <FaStar className="w-3 h-3 fill-current" />
                                        </div>
                                        <span className="text-sm font-medium text-yellow-500">{product.ratings || "0"} / 5</span>
                                    </div>

                                    <div className="text-sm font-medium text-emerald-500 mb-4">
                                        {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
                                    </div>

                                    <div className="flex gap-3">
                                        <button className="flex-grow py-3 bg-neutral-900 hover:bg-blue-600 text-white font-bold rounded-xl transition-all shadow-lg flex items-center justify-center gap-2">
                                            <FaShoppingCart />
                                            Add to Cart
                                        </button>
                                        <button 
                                            onClick={() => handleWishlistToggle(product._id)}
                                            className="p-3 bg-neutral-100 hover:bg-red-50 text-neutral-400 hover:text-red-500 rounded-xl transition-all"
                                        >
                                            <FaTrash />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center text-center space-y-4 pt-20">
                            <div className="w-24 h-24 bg-neutral-50 rounded-full flex items-center justify-center text-red-100">
                                <FaHeart className="w-12 h-12" />
                            </div>
                            <p className="text-neutral-500 font-bold uppercase tracking-widest text-sm">Your wishlist is empty</p>
                        </div>
                    )}
                </div>

                {/* Footer Actions */}
                {hasItemsInWishlist && (
                    <div className="p-4 border-t border-neutral-100">
                        <button className="w-full py-4 bg-red-600 hover:bg-red-700 text-white font-black text-xl rounded-xl shadow-lg transition-all transform active:scale-95 uppercase tracking-widest">
                            Move All to Cart
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LikeToggle;
