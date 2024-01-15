import { Helmet } from "react-helmet";
import Loading from "../../layouts/loading";
import Animation from "../../layouts/animation";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";
import url from "../../services/url";

function ResetPassword() {
    const { resetToken } = useParams();
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, []);

    const [formData, setFormData] = useState({
        email: "",
        newPassword: "",
    });

    const [formErrors, setFormErrors] = useState({
        email: "",
        newPassword: "",
    });

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setFormErrors({ ...formErrors, [name]: "" });
    };

    const isEmailValid = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validateForm = () => {
        let valid = true;
        const newErrors = {};

        if (!formData.email) {
            valid = false;
            newErrors.email = "Please enter your email.";
        } else if (!isEmailValid(formData.email)) {
            valid = false;
            newErrors.email = "Please enter a valid email address.";
        }

        if (!formData.newPassword) {
            newErrors.newPassword = "Please enter a new password.";
            valid = false;
        } else if (formData.newPassword.length < 6) {
            newErrors.newPassword = "New password must be at least 6 characters.";
            valid = false;
        } else if (formData.newPassword.length > 50) {
            newErrors.newPassword = "New password must be less than 50 characters.";
            valid = false;
        }

        setFormErrors(newErrors);

        return valid;
    };

    const submitResponse = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            try {
                const { email, newPassword } = formData;
                const restPasswordResponse = await api.post(url.AUTH.RESET_PASSWORD + `/${resetToken}`, { email, newPassword });

                if (restPasswordResponse.status === 200) {
                    setTimeout(() => {
                        Swal.fire({
                            title: "Successfully!",
                            text: "Reset password successfully!",
                            icon: "success",
                        });
                    }, 2000);

                    navigate("/login");
                }
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    Swal.fire({
                        title: "Oops...!",
                        text: "Error! Token expires or expires. Please try again!",
                        icon: "error",
                    });
                } else {
                    Swal.fire({
                        title: "Oops...!",
                        text: "Error! An error occurred. Please try again later",
                        icon: "error",
                    });
                }
            }
        }
    };

    useEffect(() => {
        setLoading(true);

        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, []);
    return (
        <>
            <Helmet>
                <title>Reset Password | R Admin</title>
            </Helmet>
            {loading ? <Loading /> : ""}
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
                                                            <img src="/assets/images/logo/logo.png" alt="" />
                                                        </div>
                                                    </Link>
                                                </div>
                                                <h4 className="text-center mb-4">Reset Your Password</h4>
                                                <form onSubmit={submitResponse}>
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
                                                    <div className="mb-3">
                                                        <label>
                                                            <strong>New Password</strong>
                                                        </label>
                                                        <input
                                                            type="password"
                                                            className={`form-control ${formErrors.newPassword ? "is-invalid" : ""}`}
                                                            placeholder="New Password"
                                                            id="newPassword"
                                                            name="newPassword"
                                                            value={formData.newPassword}
                                                            onChange={handleChange}
                                                        />
                                                        {formErrors.newPassword && <p className="invalid-feedback">{formErrors.newPassword}</p>}
                                                    </div>
                                                    <div className="text-center">
                                                        <button type="submit" className="btn btn-primary btn-block">
                                                            Reset Password
                                                        </button>
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
export default ResetPassword;
