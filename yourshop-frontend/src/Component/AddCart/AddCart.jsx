import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  GetAddToCartApi,
  handleRemoveFromCart,
  AddToCartPostApi,
} from "../../Redux/Action/AddTocartAction";
import { useNavigate } from "react-router-dom";
import { FaTimes, FaTrash, FaPlus, FaMinus, FaStar } from "react-icons/fa";

const AddCart = ({ setCartToggle }) => {
  const dispatch = useDispatch();
  const { Cart } = useSelector((state) => state?.addtocart);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(GetAddToCartApi());
  }, [dispatch]);

  const HandleAddToCart = (productId, quantity) => {
    dispatch(AddToCartPostApi(productId, quantity));
  };

  const HandleRemoveFromCart = (productId) => {
    dispatch(handleRemoveFromCart(productId));
  };

  const handleGoToAddressPage = () => {
    setCartToggle(false);
    navigate("/address");
  };

  const hasItems = Cart && Cart.products && Cart.products.length > 0;

  return (
    <div className="fixed inset-0 z-[1000] flex justify-end overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => setCartToggle(false)}
      ></div>

      {/* Side Drawer */}
      <div className="relative w-full max-w-[400px] bg-white h-full shadow-2xl flex flex-col animate-slide-in">
        {/* Red Header */}
        <div className="bg-red-600 p-4 flex items-center justify-between shadow-md">
          <button 
            onClick={() => setCartToggle(false)}
            className="flex items-center gap-2 text-white font-bold uppercase text-sm hover:opacity-80 transition-opacity"
          >
            <FaTimes />
            Close AddToCart
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-grow overflow-y-auto p-4 space-y-6">
          {hasItems ? (
            Cart.products.map((item) => {
              const product = item.product;
              const quantity = item.quantity;

              return (
                <div key={product._id} className="border-b border-neutral-100 pb-6 last:border-0">
                  {/* Product Image */}
                  <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-neutral-50 mb-4 shadow-inner">
                    <img
                      src={product?.itemimage?.url}
                      alt={product?.Productname}
                      className="w-full h-full object-contain p-4"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="space-y-1">
                    <h3 className="text-lg font-bold text-neutral-900 leading-tight">
                      {product?.Productname}
                    </h3>
                    <div className="text-2xl font-black text-neutral-900">₹{product?.price}</div>
                    
                    <div className="flex items-center gap-2 py-1">
                      <div className="flex text-yellow-400">
                        <FaStar className="w-3 h-3 fill-current" />
                      </div>
                      <span className="text-sm font-medium text-yellow-500">{product?.ratings || "0"} / 5</span>
                    </div>

                    <div className="text-sm font-medium text-emerald-500 mb-4">
                      {product?.stock > 0 ? `${product?.stock} in stock` : "Out of stock"}
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <button 
                        onClick={() => HandleRemoveFromCart(product._id)}
                        className="p-3 bg-neutral-100 hover:bg-red-50 text-neutral-400 hover:text-red-500 rounded-xl transition-all"
                      >
                        <FaTrash />
                      </button>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-4">
                        <div className="flex items-center bg-neutral-100 rounded-xl overflow-hidden p-1">
                          <button 
                            onClick={() => HandleAddToCart(product._id, -1)}
                            className="w-10 h-10 flex items-center justify-center hover:bg-white hover:text-blue-600 transition-all font-bold"
                            disabled={quantity <= 1}
                          >
                            <FaMinus className="w-3 h-3" />
                          </button>
                          <span className="w-8 text-center font-bold text-blue-600 text-lg">{quantity}</span>
                          <button 
                            onClick={() => HandleAddToCart(product._id, 1)}
                            className="w-10 h-10 flex items-center justify-center hover:bg-white hover:text-blue-600 transition-all font-bold"
                          >
                            <FaPlus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 pt-20">
              <div className="w-24 h-24 bg-neutral-50 rounded-full flex items-center justify-center text-neutral-200">
                <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <p className="text-neutral-500 font-bold uppercase tracking-widest text-sm">Your cart is empty</p>
            </div>
          )}
        </div>

        {/* Red Buy Button at Bottom */}
        {hasItems && (
          <div className="p-4 border-t border-neutral-100">
            <button 
              onClick={handleGoToAddressPage}
              className="w-full py-4 bg-red-600 hover:bg-red-700 text-white font-black text-xl rounded-xl shadow-lg transition-all transform active:scale-95 flex items-center justify-center gap-2"
            >
              ₹{Cart?.totalPrice} Buy
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddCart;
