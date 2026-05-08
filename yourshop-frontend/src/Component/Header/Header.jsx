import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Logo from "../../assets/log.jpeg";
import { useAuth } from '../../ContextApi/AuthContextApi';
import LikeToggle from '../LikeToggle/LikeToggle';
import AddCart from '../AddCart/AddCart';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [likeopentoggle, SetLikeopentoggle] = useState(false);
    const [cartToggle, setCartToggle] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const { logout, loading, user } = useAuth();

    // useEffect(() => {
    //     const handleScroll = () => {
    //         setIsScrolled(window.scrollY > 3);
    //     };
    //     window.addEventListener('scroll', handleScroll);
    //     return () => window.removeEventListener('scroll', handleScroll);
    // }, []);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const likeopen = () => SetLikeopentoggle(!likeopentoggle);
    const toggleCart = () => setCartToggle(!cartToggle);

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-lg shadow-lg py-3' : 'bg-transparent py-5'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 md:px-8 flex justify-between items-center">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2 group">
                    <img src={Logo} alt="Logo" className="w-10 h-10 rounded-lg shadow-md group-hover:scale-105 transition-transform" />
                    <span className={`text-xl font-black tracking-tight ${isScrolled ? 'text-indigo-950' : 'text-gray-800'}`}>
                        Your<span className="text-orange-500">Shop</span>
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-8">
                    <ul className="flex items-center gap-6 font-bold text-sm uppercase tracking-wider">
                        <li>
                            <Link to="/order" className="text-gray-600 hover:text-indigo-600 transition-colors">Order</Link>
                        </li>
                        <li>
                            <Link to="/create" className="text-gray-600 hover:text-indigo-600 transition-colors">Create</Link>
                        </li>
                    </ul>

                    <div className="h-6 w-[1px] bg-gray-200 mx-2"></div>

                    <div className="flex items-center gap-5">
                        {/* Wishlist */}
                        <button onClick={likeopen} className="relative p-2 text-gray-600 hover:text-orange-500 transition-colors">
                            <i className="fa fa-heart-o text-xl" aria-hidden="true"></i>
                            {likeopentoggle && <LikeToggle SetLikeopentoggle={SetLikeopentoggle} />}
                        </button>

                        {/* Cart */}
                        <button onClick={toggleCart} className="relative p-2 text-gray-600 hover:text-indigo-600 transition-colors">
                            <i className="fa fa-cart-plus text-xl" aria-hidden="true"></i>
                            {cartToggle && <AddCart setCartToggle={setCartToggle} />}
                        </button>

                        {/* Profile/Auth */}
                        {loading ? (
                            <div className="text-xs font-bold text-gray-400">Loading...</div>
                        ) : user ? (
                            <div className="flex items-center gap-3">
                                <button onClick={logout} className="text-xs font-black text-gray-500 hover:text-red-500 transition-colors uppercase tracking-widest">
                                    Logout
                                </button>
                                <img src={user.image || Logo} alt="Profile" className="w-9 h-9 rounded-full border-2 border-white shadow-md cursor-pointer hover:scale-110 transition-transform" />
                            </div>
                        ) : (
                            <Link to="/login" className="px-5 py-2 bg-indigo-950 text-white text-xs font-black rounded-full hover:bg-black transition-all shadow-md">
                                LOGIN
                            </Link>
                        )}
                    </div>
                </nav>

                {/* Mobile Menu Button */}
                <button className="md:hidden text-indigo-950 p-2" onClick={toggleMenu}>
                    <i className={`fa ${isMenuOpen ? 'fa-times' : 'fa-bars'} text-2xl`} aria-hidden="true"></i>
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <div className={`fixed inset-0 bg-white z-[90] transition-transform duration-500 md:hidden ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="flex flex-col h-full p-8 pt-24">
                    <ul className="flex flex-col gap-8 text-3xl font-black text-indigo-950">
                        <li><Link to="/order" onClick={toggleMenu}>Order</Link></li>
                        <li><Link to="/create" onClick={toggleMenu}>Create</Link></li>
                        <li><button onClick={() => { likeopen(); toggleMenu(); }}>Wishlist</button></li>
                        <li><button onClick={() => { toggleCart(); toggleMenu(); }}>Cart</button></li>
                        {user ? (
                            <li><button onClick={() => { logout(); toggleMenu(); }} className="text-red-500">Logout</button></li>
                        ) : (
                            <li><Link to="/login" onClick={toggleMenu} className="text-indigo-600">Login</Link></li>
                        )}
                    </ul>
                </div>
            </div>
        </header>
    );
};

export default Header;

