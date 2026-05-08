import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-indigo-950 text-white pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                {/* Column 1: Company */}
                <div>
                    <h3 className="text-lg font-black uppercase tracking-widest mb-6 text-orange-400">Company</h3>
                    <ul className="space-y-4 font-medium text-gray-300">
                        <li className="hover:text-white transition-colors cursor-pointer">About Us</li>
                        <li className="hover:text-white transition-colors cursor-pointer">Careers</li>
                        <li className="hover:text-white transition-colors cursor-pointer">Store Locations</li>
                        <li className="hover:text-white transition-colors cursor-pointer">Our Blog</li>
                        <li className="hover:text-white transition-colors cursor-pointer">Reviews</li>
                    </ul>
                </div>

                {/* Column 2: Shop */}
                <div>
                    <h3 className="text-lg font-black uppercase tracking-widest mb-6 text-orange-400">Shop</h3>
                    <ul className="space-y-4 font-medium text-gray-300">
                        <li className="hover:text-white transition-colors cursor-pointer">Game & Video</li>
                        <li className="hover:text-white transition-colors cursor-pointer">Phones & Tablets</li>
                        <li className="hover:text-white transition-colors cursor-pointer">Computers & Laptops</li>
                        <li className="hover:text-white transition-colors cursor-pointer">Sport Watches</li>
                    </ul>
                </div>

                {/* Column 3: Support */}
                <div>
                    <h3 className="text-lg font-black uppercase tracking-widest mb-6 text-orange-400">Support</h3>
                    <ul className="space-y-4 font-medium text-gray-300">
                        <li className="hover:text-white transition-colors cursor-pointer">FAQ</li>
                        <li className="hover:text-white transition-colors cursor-pointer">Contact Us</li>
                        <li className="hover:text-white transition-colors cursor-pointer">Shipping</li>
                        <li className="hover:text-white transition-colors cursor-pointer">Live Chat</li>
                    </ul>
                </div>

                {/* Column 4: Newsletter/Social */}
                <div>
                    <h3 className="text-lg font-black uppercase tracking-widest mb-6 text-orange-400">Follow Us</h3>
                    <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                        Stay updated with our latest offers and products. Join our community!
                    </p>
                    <div className="flex gap-4">
                        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-orange-500 transition-all cursor-pointer group">
                            <i className="fa fa-instagram text-xl group-hover:scale-110" aria-hidden="true"></i>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-indigo-500 transition-all cursor-pointer group">
                            <i className="fa fa-twitter text-xl group-hover:scale-110" aria-hidden="true"></i>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-red-600 transition-all cursor-pointer group">
                            <i className="fa fa-youtube-play text-xl group-hover:scale-110" aria-hidden="true"></i>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="max-w-7xl mx-auto px-4 md:px-8 border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">
                    © 2026 Your Shop • Designed by Karthik
                </p>
                <div className="flex gap-6 text-[10px] font-black uppercase tracking-widest text-gray-500">
                    <span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
                    <span className="hover:text-white cursor-pointer transition-colors">Terms of Service</span>
                    <span className="hover:text-white cursor-pointer transition-colors">Cookie Policy</span>
                </div>
            </div>
        </footer>
    );
}

export default Footer;

