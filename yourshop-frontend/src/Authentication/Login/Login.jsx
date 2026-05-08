import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../ContextApi/AuthContextApi.jsx';
import Logo from "../../assets/log.jpeg";
import AuthBg from "../../assets/auth_bg.png";
import CircularProgress from '@mui/material/CircularProgress';

const Login = () => {
    const navigate = useNavigate();
    const { login, user, loading } = useAuth();
    const [formData, setFormData] = useState({ email: '', password: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(formData);
        } catch (error) {
            console.error('Login failed:', error.message);
        }
    };

    useEffect(() => {
        if (user) {
            navigate('/');
        }
    }, [user, navigate]);

    return (
        <div className="flex min-h-screen bg-white">
            {/* Left Side: Image & Branding (Hidden on mobile) */}
            <div className="hidden lg:flex lg:w-1/2 relative bg-indigo-900 overflow-hidden">
                <img
                    src={AuthBg}
                    className="absolute inset-0 w-full h-full object-cover opacity-60"
                    alt="Background"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-indigo-950 via-transparent to-transparent"></div>

                <div className="relative z-10 flex flex-col justify-end p-16 text-white w-full">
                    <div className="mb-8">
                        <img src={Logo} className="w-20 h-auto rounded-xl shadow-2xl mb-6" alt="Logo" />
                        <h1 className="text-5xl font-black tracking-tight mb-4 leading-tight">
                            Elevate Your <br />
                            <span className="text-orange-400 text-6xl">Shopping</span> Experience.
                        </h1>
                        <p className="text-indigo-100 text-lg max-w-md font-medium opacity-90 leading-relaxed">
                            Join thousands of happy customers and discover premium products tailored just for you.
                        </p>
                    </div>
                    <div className="flex gap-4 items-center text-sm font-bold text-indigo-300">
                        <span className="flex h-2 w-2 rounded-full bg-orange-400"></span>
                        Trusted by 10k+ Shoppers
                    </div>
                </div>
            </div>

            {/* Right Side: Login Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 md:p-16 bg-gray-50/30">
                <div className="w-full max-w-md space-y-10">
                    <div className="lg:hidden flex flex-col items-center mb-8">
                        <img src={Logo} className="w-20 h-auto rounded-xl shadow-lg mb-4" alt="Logo" />
                        <h2 className="text-3xl font-black text-indigo-950">Welcome Back</h2>
                    </div>

                    <div className="hidden lg:block">
                        <h2 className="text-4xl font-black text-indigo-950 mb-2">Login</h2>
                        <p className="text-gray-500 font-semibold italic">Welcome back! Please enter your details.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-indigo-900 tracking-wide uppercase ml-1">Email Address</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="e.g. alex@example.com"
                                onChange={handleChange}
                                required
                                className="w-full px-6 py-4 bg-white border-2 border-gray-100 rounded-2xl focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 outline-none transition-all duration-300 shadow-sm font-medium placeholder:text-gray-300"
                            />
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center px-1">
                                <label className="text-sm font-bold text-indigo-900 tracking-wide uppercase">Password</label>
                                <Link to={'/forgetpassword'} className="text-xs font-black text-orange-600 hover:text-orange-700 transition-colors">
                                    Forgot Password?
                                </Link>
                            </div>
                            <input
                                type="password"
                                name="password"
                                placeholder="••••••••"
                                onChange={handleChange}
                                required
                                className="w-full px-6 py-4 bg-white border-2 border-gray-100 rounded-2xl focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 outline-none transition-all duration-300 shadow-sm font-medium placeholder:text-gray-300"
                            />
                        </div>

                        <div className="pt-2">
                            <button
                                type="submit"
                                className="group relative w-full py-4 bg-indigo-950 hover:bg-black text-white font-black text-lg rounded-2xl shadow-2xl shadow-indigo-200 transition-all duration-300 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center overflow-hidden"
                                disabled={loading}
                            >
                                <span className="relative z-10">{loading ? <CircularProgress size={24} color="inherit" /> : 'Sign In to Account'}</span>
                                <div className="absolute inset-0 w-1/4 h-full bg-white/10 skew-x-[-20deg] -translate-x-[200%] group-hover:translate-x-[400%] transition-transform duration-700"></div>
                            </button>
                        </div>

                        <div className="flex items-center justify-center pt-4">
                            <p className="text-gray-500 font-bold">
                                New to Your Shop?
                                <Link to="/register" className="ml-2 text-indigo-600 hover:text-orange-600 font-black underline decoration-2 underline-offset-4 transition-all">
                                    Create Free Account
                                </Link>
                            </p>
                        </div>
                    </form>

                    {/* Footer text */}
                    <div className="text-center pt-8">
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[2px]">
                            © 2026 Your Shop • Secure Checkout • Privacy First
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;


