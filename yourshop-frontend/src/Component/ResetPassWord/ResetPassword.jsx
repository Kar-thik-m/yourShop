import React, { useState } from 'react';
import ReSetPassStyle from '../ResetPassWord/ResetPassWord.module.css';
import { useAuth } from '../../ContextApi/AuthContextApi';
import { useNavigate, useParams } from 'react-router-dom';

const ResetPassWord = () => {
    const { ResetPassWord, loading } = useAuth();
    const { token } = useParams();
    const [formData, setFormData] = useState("");
    const navigate = useNavigate();
    const [errors, setErrors] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));


    };



    const handleSubmit = (e) => {
        e.preventDefault();
        const send = ResetPassWord( formData.Newpassword,token);
        console.log(formData.Newpassworda)
        if (send) {
            console.log('Password reset successfully!', formData);
            navigate('/')
        } else {
            console.log('Form contains errors.');
        }
    };

    return (
        <div className={ReSetPassStyle.container}>
            <h2 className={ReSetPassStyle.title}>Reset Your Password</h2>
            <form onSubmit={handleSubmit} className={ReSetPassStyle.form}>
                <div className={ReSetPassStyle.inputGroup}>
                    <label htmlFor="Newpassword" className={ReSetPassStyle.label}>New Password</label>
                    <input
                        type="password"
                        id="Newpassword"
                        name="Newpassword"
                        value={formData.Newpassword}
                        onChange={handleChange}
                        className={ReSetPassStyle.input}
                        placeholder="Enter your new password"
                    />
                    {errors.Newpassword && <p className={ReSetPassStyle.error}>{errors.Newpassword}</p>}
                </div>

                <button type="submit" className={ReSetPassStyle.submitButton}>Reset Password</button>
            </form>
        </div>
    );
};

export default ResetPassWord;
