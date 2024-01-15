import { Helmet } from "react-helmet";
import Animation from "../../layouts/animation";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import api from "../../services/api";
import url from "../../services/url";
import Swal from "sweetalert2";

function ForgotPassword() {
    const navigate = useNavigate();

    const [submitting, setSubmitting] = useState(false);
    const [countdown, setCountdown] = useState(2);

    const [formData, setFormData] = useState({
        email: "",
    });

    const [formErrors, setFormErrors] = useState({
        email: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setFormErrors({ ...formErrors, [name]: "" });
    };

    const validateForm = () => {
        let valid = true;
        const newErrors = {};

        if (!formData.email) {
            newErrors.email = "Please enter your email address.";
            valid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Please enter a valid email address.";
            valid = false;
        }

        setFormErrors(newErrors);
        return valid;
    };

    const handleForgotPassword = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                const response = await api.post(url.AUTH.FORGOT_PASSWORD, formData);
                if (response.status === 200) {
                    setSubmitting(true);
                    setTimeout(() => setCountdown((prevCountdown) => prevCountdown - 1), 1000);

                    setTimeout(() => {
                        Swal.fire({
                            title: "Successfully!",
                            text: "Reset password successfully!",
                            icon: "success",
                        });
                    }, 2000);
                }
            } catch (error) {
                setSubmitting(true);
                setTimeout(() => setCountdown((prevCountdown) => prevCountdown - 1), 1000);

                setTimeout(() => {
                    Swal.fire({
                        title: "Successfully!",
                        text: "Reset password successfully!",
                        icon: "success",
                    });
                }, 2000);
            }
        }
    };

    useEffect(() => {
        let countdownTimer;
        if (submitting && countdown > 0) countdownTimer = setInterval(() => setCountdown((prevCountdown) => prevCountdown - 1), 1000);
        return () => clearInterval(countdownTimer);
    }, [submitting, countdown]);

    useEffect(() => {
        if (countdown === 0) {
            const timeoutId = setTimeout(() => navigate("/login"), 1000);
            return () => clearTimeout(timeoutId);
        }
    }, [countdown, navigate]);

    return (
        <>
            <Helmet>
                <title>Forgot Password | R Admin</title>
            </Helmet>
            <div className="vh-100">
                <Animation />
                <div className="authincation h-100">
                    <div className="container h-100">
                        <div className="row justify-content-center h-100 align-items-center">
                            <div className="col-md-6">
                                <div className="authincation-content">
                                    <div className="row no-gutters">
                                        <div className="col-xl-12">
                                            <div className="auth-form">
                                                <div className="text-center mb-3">
                                                    <Link to="/">
                                                        <div className="text-center">
                                                            <img src="./assets/images/logo/logo.png" alt="" />
                                                        </div>
                                                    </Link>
                                                </div>
                                                <h4 className="text-center mb-4">Forgot Password</h4>
                                                <form onSubmit={handleForgotPassword}>
                                                    <div className="mb-3">
                                                        <label>
                                                            <strong>Email</strong>
                                                        </label>
                                                        <input
                                                            type="email"
                                                            placeholder="Enter Your Email"
                                                            className={`form-control ${formErrors.email ? "is-invalid" : ""}`}
                                                            id="email"
                                                            name="email"
                                                            value={formData.email}
                                                            onChange={handleChange}
                                                        />
                                                        {formErrors.email && <p className="invalid-feedback">{formErrors.email}</p>}
                                                    </div>
                                                    <div className="text-center">
                                                        {!submitting ? (
                                                            <button type="submit" className="btn btn-primary btn-block">
                                                                SUBMIT
                                                            </button>
                                                        ) : (
                                                            <button type="button" className="btn btn-primary btn-block" disabled>
                                                                <i className="fa fa-spinner fa-spin"></i> Submitting...
                                                            </button>
                                                        )}
                                                    </div>
                                                </form>
                                                <div className="text-center mt-5">
                                                    <Link to="/login">Back to Login</Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ForgotPassword;
