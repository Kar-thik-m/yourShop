import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Logo from "../../assets/log.jpeg";
import { useAuth } from '../../ContextApi/AuthContextApi';
import LikeToggle from '../LikeToggle/LikeToggle';
import AddCart from '../AddCart/AddCart';
import { FaHeart, FaShoppingCart, FaBars, FaTimes, FaRegHeart } from 'react-icons/fa';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [likeopentoggle, SetLikeopentoggle] = useState(false);
    const [cartToggle, setCartToggle] = useState(false);
    const { logout, loading, user } = useAuth();

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const likeopen = () => SetLikeopentoggle(!likeopentoggle);
    const toggleCart = () => setCartToggle(!cartToggle);

    return (
        <header
            className="fixed top-0 left-0 right-0 z-[100] transition-all duration-500 bg-white/95 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] py-4"
        >
            <div className="max-w-7xl mx-auto px-6 md:px-10 flex justify-between items-center">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-3 group relative py-1 px-2 rounded-2xl transition-all duration-500 hover:bg-neutral-50 no-underline" style={{ textDecoration: 'none' }}>
                    <div className="relative">
                        <img src={Logo} alt="Logo" className="w-10 h-10 rounded-xl shadow-md group-hover:scale-110 transition-transform duration-500 ring-2 ring-blue-500/0 group-hover:ring-blue-500/20" />
                        <div className="absolute inset-0 rounded-xl bg-blue-500/5 group-hover:opacity-0 transition-opacity"></div>
                    </div>
                    <div className="flex flex-col -space-y-1">
                        <span className="text-2xl font-black tracking-tighter text-neutral-900 group-hover:text-blue-600 transition-colors duration-500">
                            Your<span className="text-blue-500 group-hover:text-blue-700">Shop</span>
                        </span>
                        <span className="text-[10px] font-bold text-neutral-400 tracking-[0.3em] uppercase group-hover:text-neutral-500 transition-colors">Premium</span>
                    </div>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-8">
                    <ul className="flex items-center p-1 bg-neutral-50 rounded-2xl">
                        <li>
                            <Link to="/order" className="px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 relative group overflow-hidden text-neutral-600 hover:text-blue-600 no-underline" style={{ textDecoration: 'none' }}>
                                <span className="relative z-10">Order</span>
                                <div className="absolute inset-0 bg-white shadow-sm scale-0 group-hover:scale-100 transition-transform duration-300 rounded-xl origin-center"></div>
                            </Link>
                        </li>
                        <li>
                            <Link to="/create" className="px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 relative group overflow-hidden text-neutral-600 hover:text-blue-600 no-underline" style={{ textDecoration: 'none' }}>
                                <span className="relative z-10">Create</span>
                                <div className="absolute inset-0 bg-white shadow-sm scale-0 group-hover:scale-100 transition-transform duration-300 rounded-xl origin-center"></div>
                            </Link>
                        </li>
                    </ul>

                    <div className="flex items-center gap-3">
                        {/* Wishlist */}
                        <button onClick={likeopen} className="relative p-3 rounded-2xl bg-neutral-50 hover:bg-white hover:shadow-md text-neutral-700 hover:text-red-500 transition-all duration-300 border border-transparent hover:border-neutral-100 group">
                            <FaRegHeart className="text-xl group-hover:scale-110 transition-transform" />
                        </button>

                        {/* Cart */}
                        <button onClick={toggleCart} className="relative p-3 rounded-2xl bg-neutral-50 hover:bg-white hover:shadow-md text-neutral-700 hover:text-blue-600 transition-all duration-300 border border-transparent hover:border-neutral-100 group">
                            <FaShoppingCart className="text-xl group-hover:scale-110 transition-transform" />
                        </button>

                        {/* Profile/Auth */}
                        {loading ? (
                            <div className="w-10 h-10 rounded-2xl bg-neutral-200 animate-pulse"></div>
                        ) : user ? (
                            <div className="flex items-center gap-4 pl-4">
                                <div className="flex flex-col items-end -space-y-1">
                                    <span className="text-xs font-bold text-neutral-900">{user.username || 'User'}</span>
                                    <button onClick={logout} className="text-[9px] font-black uppercase tracking-widest text-neutral-400 hover:text-red-500 transition-colors">
                                        Logout
                                    </button>
                                </div>
                                <div className="relative group cursor-pointer p-0.5 rounded-2xl border-2 border-transparent hover:border-blue-500/20 transition-all duration-500">
                                    <img src={user.image || Logo} alt="Profile" className="w-10 h-10 rounded-xl shadow-md object-cover transition-transform group-hover:scale-105" />
                                </div>
                            </div>
                        ) : (
                            <Link to="/login" className="ml-4 px-8 py-3 bg-neutral-900 text-white text-xs font-black rounded-2xl hover:bg-blue-600 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-500 tracking-widest">
                                LOGIN
                            </Link>
                        )}
                    </div>
                </nav>

                {/* Mobile Menu Button */}
                <button className="md:hidden p-3 bg-neutral-50 rounded-2xl text-neutral-900 hover:bg-blue-50 hover:text-blue-600 transition-all" onClick={toggleMenu}>
                    {isMenuOpen ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
                </button>
            </div>

            {/* Overlays */}
            {likeopentoggle && <LikeToggle SetLikeopentoggle={SetLikeopentoggle} />}
            {cartToggle && <AddCart setCartToggle={setCartToggle} />}

            {/* Mobile Menu Overlay */}
            <div className={`fixed inset-0 bg-white/95 backdrop-blur-xl z-[90] transition-all duration-700 md:hidden ${isMenuOpen ? 'opacity-100 pointer-events-auto translate-y-0' : 'opacity-0 pointer-events-none -translate-y-10'}`}>
                <div className="flex flex-col h-full p-10 pt-32 space-y-10">
                    <div className="flex flex-col gap-6">
                        <Link to="/order" onClick={toggleMenu} className="text-5xl font-black text-neutral-900 hover:text-blue-600 transition-colors no-underline" style={{ textDecoration: 'none' }}>
                            Order
                        </Link>
                        <Link to="/create" onClick={toggleMenu} className="text-5xl font-black text-neutral-900 hover:text-blue-600 transition-colors no-underline" style={{ textDecoration: 'none' }}>
                            Create
                        </Link>
                        <button onClick={() => { likeopen(); toggleMenu(); }} className="text-5xl font-black text-neutral-900 hover:text-red-500 transition-colors text-left no-underline">
                            Wishlist
                        </button>
                        <button onClick={() => { toggleCart(); toggleMenu(); }} className="text-5xl font-black text-neutral-900 hover:text-blue-600 transition-colors text-left no-underline">
                            Cart
                        </button>
                    </div>

                    <div className="mt-auto pt-10 border-t border-neutral-100 flex items-center justify-between">
                        {user ? (
                            <button onClick={() => { logout(); toggleMenu(); }} className="text-xl font-bold text-red-500 bg-red-50 px-8 py-4 rounded-3xl hover:bg-red-500 hover:text-white transition-all no-underline">
                                Logout
                            </button>
                        ) : (
                            <Link to="/login" onClick={toggleMenu} className="text-xl font-bold text-white bg-neutral-900 px-10 py-5 rounded-3xl hover:bg-blue-600 transition-all shadow-xl shadow-blue-500/20 no-underline">
                                Login
                            </Link>
                        )}
                        {/* <img src={Logo} alt="Logo" className="w-16 h-16 rounded-3xl opacity-20" /> */}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
