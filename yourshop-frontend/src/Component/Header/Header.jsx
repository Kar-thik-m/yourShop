import React, { useState } from 'react';
import Headstyles from '../Header/Header.module.css';
import Logo from "../../assets/log.jpeg";
import { useAuth } from '../../ContextApi/AuthContextApi';
import LikeToggle from '../LikeToggle/LikeToggle';
import AddCart from '../AddCart/AddCart';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [likeopentoggle, SetLikeopentoggle] = useState(false);
    const [cartToggle, setCartToggle] = useState(false);  // Cart toggle state
    const { logout, loading, user } = useAuth();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const likeopen = () => {
        SetLikeopentoggle(!likeopentoggle);
    };

    const toggleCart = () => {
        setCartToggle(!cartToggle);  // Toggle cart state
    };

    return (
        <header className={Headstyles.header}>
            <div className={Headstyles.logoContainer}>
                <img src={Logo} alt="Logo" className={Headstyles.logo} />
            </div>
            <nav className={`${Headstyles.nav} ${isMenuOpen ? Headstyles.open : ''}`}>

                <ul className={Headstyles.menu}>
                    <li className={Headstyles.item}><a href="/order">Order</a></li>
                    <li className={Headstyles.item}><a href="/create">Create</a></li>
                    <li className={Headstyles.item} onClick={likeopen} >
                        <i className="fa fa-heart-o" aria-hidden="true"></i>
                        {likeopentoggle ? <LikeToggle SetLikeopentoggle={SetLikeopentoggle} /> : ""}
                    </li>
                    <li className={Headstyles.item} onClick={toggleCart}>
                        <i className="fa fa-cart-plus" aria-hidden="true"></i>
                        {cartToggle ? <AddCart setCartToggle={setCartToggle} /> : ""}
                    </li>
                    {loading ? (
                        <li className={Headstyles.item}>Loading...</li>
                    ) : (
                        user && <li className={Headstyles.item}><a onClick={logout}>Logout</a></li>
                    )}
                    {!user && <li className={Headstyles.item}><a href="/login">Login</a></li>}
                </ul>

                <div className={Headstyles.profileContainer}>
                    <img src={Logo} alt="Profile" className={Headstyles.profileImage} />
                </div>
            </nav>
            <button className={Headstyles.hamburger} onClick={toggleMenu}>
                {isMenuOpen ? <i className="fa fa-times" aria-hidden="true"></i> : <i className="fa fa-bars" aria-hidden="true"></i>}
            </button>
        </header>
    );
};

export default Header;
