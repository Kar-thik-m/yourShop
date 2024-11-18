import React from 'react';
import footerStyle from "../Footer/Footer.module.css";

const Footer = () => {
    return (
        <footer className={footerStyle.footer}>
            <div className={footerStyle.footerContent}>
                <div className={footerStyle.footerColumn}>
                    <h3>Company</h3>
                    <ul>
                        <li>About Us</li>
                        <li>Careers</li>
                        <li>Store Locations</li>
                        <li>Our Blog</li>
                        <li>Reviews</li>
                    </ul>
                </div>

                <div className={footerStyle.footerColumn}>
                    <h3>Shop</h3>
                    <ul>
                        <li>Game & Video</li>
                        <li>Phones & Tablets</li>
                        <li>Computers & Laptops</li>
                        <li>Sport Watches</li>
                    </ul>
                </div>

                <div className={footerStyle.footerColumn}>
                    <h3>Support</h3>
                    <ul>
                        <li>FAQ</li>
                        <li>Contact Us</li>
                        <li>Shipping</li>
                        <li>Live Chat</li>
                    </ul>
                </div>

                <div className={footerStyle.footerColumn}>
                    <h3>Follow Us</h3>
                    <div className={footerStyle.socialMedia}>
                        <i class="fa fa-instagram" aria-hidden="true"></i>
                        <i class="fa fa-twitter" aria-hidden="true"></i>
                        <i class="fa fa-youtube-play" aria-hidden="true"></i>
                    </div>
                </div>
            </div>
            <p style={{display:"flex",alignItems:"center",justifyContent:"center"}}>© 2023 KArthik. All rights reserved.</p>
            
        </footer>
    );
}

export default Footer;
