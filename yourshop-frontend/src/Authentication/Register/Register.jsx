import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../ContextApi/AuthContextApi.jsx';
import logo from "../../assets/log.jpeg";
import AuthBg from "../../assets/auth_bg.png";
import CircularProgress from '@mui/material/CircularProgress';

const Register = () => {
    const navigate = useNavigate();
    const { register, loading, user } = useAuth();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        image: null,
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: name === 'image' ? files[0] : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('name', formData.username);
        data.append('email', formData.email);
        data.append('password', formData.password);
        data.append('file', formData.image);

        try {
            await register(data);
        } catch (error) {
            console.error('Registration failed:', error.message);
        }
    };

    useEffect(() => {
        if (user) {
            navigate("/email");
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
                        <img src={logo} className="w-20 h-auto rounded-xl shadow-2xl mb-6" alt="Logo" />
                        <h1 className="text-5xl font-black tracking-tight mb-4 leading-tight">
                            Start Your <br />
                            <span className="text-orange-400 text-6xl">Journey</span> Today.
                        </h1>
                        <p className="text-indigo-100 text-lg max-w-md font-medium opacity-90 leading-relaxed">
                            Create your account and unlock a world of premium products and exclusive offers.
                        </p>
                    </div>
                    <div className="flex gap-4 items-center text-sm font-bold text-indigo-300">
                        <span className="flex h-2 w-2 rounded-full bg-orange-400"></span>
                        Quick & Secure Registration
                    </div>
                </div>
            </div>

            {/* Right Side: Register Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 md:p-16 bg-gray-50/30">
                <div className="w-full max-w-md space-y-8 py-12">
                    <div className="lg:hidden flex flex-col items-center mb-8">
                        <img src={logo} className="w-20 h-auto rounded-xl shadow-lg mb-4" alt="Logo" />
                        <h2 className="text-3xl font-black text-indigo-950">Create Account</h2>
                    </div>

                    <div className="hidden lg:block">
                        <h2 className="text-4xl font-black text-indigo-950 mb-2">Join Us</h2>
                        <p className="text-gray-500 font-semibold italic">Complete the form to get started.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-indigo-900 tracking-wide uppercase ml-1">Username</label>
                            <input 
                                type="text" 
                                name="username" 
                                placeholder="johndoe" 
                                onChange={handleChange} 
                                required 
                                className="w-full px-6 py-3.5 bg-white border-2 border-gray-100 rounded-2xl focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 outline-none transition-all duration-300 shadow-sm font-medium placeholder:text-gray-300"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-indigo-900 tracking-wide uppercase ml-1">Email Address</label>
                            <input 
                                type="email" 
                                name="email" 
                                placeholder="name@example.com" 
                                onChange={handleChange} 
                                required 
                                className="w-full px-6 py-3.5 bg-white border-2 border-gray-100 rounded-2xl focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 outline-none transition-all duration-300 shadow-sm font-medium placeholder:text-gray-300"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-indigo-900 tracking-wide uppercase ml-1">Password</label>
                            <input 
                                type="password" 
                                name="password" 
                                placeholder="••••••••" 
                                onChange={handleChange} 
                                required 
                                className="w-full px-6 py-3.5 bg-white border-2 border-gray-100 rounded-2xl focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 outline-none transition-all duration-300 shadow-sm font-medium placeholder:text-gray-300"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-indigo-900 tracking-wide uppercase ml-1">Profile Picture</label>
                            <input 
                                type="file" 
                                name="image" 
                                accept="image/*" 
                                onChange={handleChange} 
                                className="w-full px-6 py-2.5 bg-white border-2 border-gray-100 rounded-2xl file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-black file:bg-indigo-600 file:text-white hover:file:bg-indigo-700 cursor-pointer transition-all duration-300 text-sm text-gray-400 font-medium"
                            />
                        </div>
                        
                        <div className="pt-4">
                            <button 
                                type="submit" 
                                className="group relative w-full py-4 bg-indigo-950 hover:bg-black text-white font-black text-lg rounded-2xl shadow-2xl shadow-indigo-200 transition-all duration-300 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center overflow-hidden"
                                disabled={loading}
                            >
                                <span className="relative z-10">{loading ? <CircularProgress size={24} color="inherit" /> : 'Create My Account'}</span>
                                <div className="absolute inset-0 w-1/4 h-full bg-white/10 skew-x-[-20deg] -translate-x-[200%] group-hover:translate-x-[400%] transition-transform duration-700"></div>
                            </button>
                        </div>

                        <div className="flex items-center justify-center pt-4">
                            <p className="text-gray-500 font-bold">
                                Already a member? 
                                <Link to="/login" className="ml-2 text-indigo-600 hover:text-orange-600 font-black underline decoration-2 underline-offset-4 transition-all">
                                    Sign In Instead
                                </Link>
                            </p>
                        </div>
                    </form>

                    {/* Footer text */}
                    <div className="text-center pt-8">
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[2px]">
                            Secure Connection • Data Encryption • 24/7 Support
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;

