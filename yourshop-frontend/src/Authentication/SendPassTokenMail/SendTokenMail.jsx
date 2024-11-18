import React, { useState } from 'react';
import { useAuth } from '../../ContextApi/AuthContextApi';
import CircularProgress from '@mui/material/CircularProgress';
import STMStyle from "../SendPassTokenMail/SendTokenMail.module.css";


const SendPassTokenMail = () => {
    const { SendPassToken, loading } = useAuth();
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
  

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setError('');
            setSuccess('');
            await SendPassToken(email);

        setSuccess('Password reset link sent to your email.');
            

        } catch (err) {
            setError('Failed to send password reset link. Please try again.');
        }
    };

    return (
        <div className={STMStyle.container}>
            <div className={STMStyle.card}>
                <h2 className={STMStyle.title}>Reset Your Password</h2>
                <form onSubmit={handleSubmit} className={STMStyle.form}>
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={handleEmailChange}
                        required
                        className={STMStyle.input}
                    />
                    {error && <div className={STMStyle.error}>{error}</div>}
                    {success && <div className={STMStyle.success}>{success}</div>}
                    <button type="submit" className={STMStyle.button} disabled={loading}>
                        {loading ? <CircularProgress size={24} color="inherit" /> : 'Send Reset Link'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SendPassTokenMail;
