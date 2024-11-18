import React, { useEffect } from 'react';
import { useAuth } from '../../ContextApi/AuthContextApi';
import { useNavigate, useParams } from 'react-router-dom';
import EVStyle from '../EmailVerification/Emailverification.module.css';

const Verify = () => {
    const { EmailVerified, error } = useAuth();
    const { token } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const verifyEmail = async () => {
            if (token) {
                
                    await EmailVerified(token);
                    navigate('/');
                
            }
        };

        verifyEmail();
    }, [token, EmailVerified, navigate]);

    return (
        <div className={EVStyle.container}>
            {error ? (
                <div className={EVStyle.errorMessage}>
                    <h2 className={EVStyle.heading}>Verification Failed</h2>
                    <p className={EVStyle.text}>{error}</p>
                </div>
            ) : (
                <div className={EVStyle.successMessage}>
                    <h2 className={EVStyle.heading}>Verifying your email...</h2>
                    <p className={EVStyle.text}>Please wait while we verify your email address.</p>
                </div>
            )}
        </div>
    );
};

export default Verify;
