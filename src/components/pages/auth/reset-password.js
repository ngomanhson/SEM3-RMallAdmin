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
                <title>Reset Password | R Mall</title>
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
                                                        <div className="logo">
                                                            <svg className="logo-abbr" width="43" height="34" viewBox="0 0 43 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <rect x="22.6154" width="19.6154" height="6.53846" rx="3.26923" fill="white" />
                                                                <rect x="22.6154" y="9.15387" width="19.6154" height="6.53846" rx="3.26923" fill="white" />
                                                                <rect x="22.6154" y="18.3077" width="19.6154" height="6.53846" rx="3.26923" fill="white" />
                                                                <rect x="0.384583" y="18.3077" width="19.6154" height="6.53846" rx="3.26923" fill="white" />
                                                                <rect x="22.6154" y="27.4615" width="19.6154" height="6.53846" rx="3.26923" fill="white" />
                                                                <rect x="0.384583" y="27.4615" width="19.6154" height="6.53846" rx="3.26923" fill="white" />
                                                            </svg>
                                                            <svg className="brand-title" width="85" height="34" viewBox="0 0 85 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path
                                                                    d="M12.379 34C14.8698 34 17.0456 33.497 18.9062 32.4909C20.7668 31.4848 22.2072 30.0496 23.2276 28.1854C24.2479 26.3211 24.7581 24.1462 24.7581 21.6606V1.06527H17.7808V13.1828H17.6458C17.1956 12.5614 16.6254 12.0287 15.9352 11.5849C15.275 11.1114 14.5247 10.7563 13.6845 10.5196C12.8742 10.2829 12.0039 10.1645 11.0736 10.1645C8.88289 10.1645 6.96227 10.6527 5.31173 11.6292C3.66119 12.6057 2.35577 13.9521 1.39545 15.6684C0.465152 17.3847 0 19.3969 0 21.705C0 23.4804 0.285093 25.1227 0.855279 26.6319C1.42546 28.141 2.23573 29.4578 3.28607 30.5822C4.36642 31.6771 5.65684 32.5205 7.15733 33.1123C8.68783 33.7041 10.4284 34 12.379 34ZM12.379 28.0522C11.2987 28.0522 10.3684 27.8007 9.58812 27.2976C8.80787 26.765 8.19267 26.0548 7.74252 25.1671C7.32239 24.2498 7.11232 23.2289 7.11232 22.1044C7.11232 20.98 7.32239 19.9739 7.74252 19.0862C8.19267 18.1984 8.80787 17.503 9.58812 17C10.3684 16.4674 11.2987 16.201 12.379 16.201C13.4594 16.201 14.3897 16.4674 15.1699 17C15.9802 17.503 16.5954 18.1984 17.0155 19.0862C17.4357 19.9739 17.6458 20.98 17.6458 22.1044C17.6458 23.2289 17.4357 24.2498 17.0155 25.1671C16.5954 26.0548 15.9802 26.765 15.1699 27.2976C14.3897 27.8007 13.4594 28.0522 12.379 28.0522Z"
                                                                    fill="#B9A8FF"
                                                                />
                                                                <path
                                                                    d="M41.2197 34C38.8489 34 36.7183 33.4822 34.8276 32.4465C32.937 31.4108 31.4365 29.9904 30.3262 28.1854C29.2458 26.3803 28.7056 24.3533 28.7056 22.1044C28.7056 19.8259 29.2458 17.799 30.3262 16.0235C31.4365 14.2184 32.937 12.7981 34.8276 11.7624C36.7183 10.6971 38.8489 10.1645 41.2197 10.1645C43.5905 10.1645 45.7062 10.6971 47.5668 11.7624C49.4574 12.7981 50.9429 14.2184 52.0232 16.0235C53.1336 17.799 53.6888 19.8259 53.6888 22.1044C53.6888 24.3533 53.1336 26.3803 52.0232 28.1854C50.9429 29.9904 49.4574 31.4108 47.5668 32.4465C45.6762 33.4822 43.5605 34 41.2197 34ZM41.2197 28.0078C42.3301 28.0078 43.2904 27.7415 44.1007 27.2089C44.9109 26.6762 45.5411 25.9661 45.9913 25.0783C46.4414 24.1906 46.6665 23.1845 46.6665 22.0601C46.6665 20.9652 46.4414 19.9739 45.9913 19.0862C45.5411 18.1984 44.9109 17.4883 44.1007 16.9556C43.2904 16.423 42.3301 16.1567 41.2197 16.1567C40.1094 16.1567 39.134 16.423 38.2938 16.9556C37.4835 17.4883 36.8533 18.1984 36.4032 19.0862C35.953 19.9739 35.7279 20.9652 35.7279 22.0601C35.7279 23.1845 35.953 24.1906 36.4032 25.0783C36.8533 25.9661 37.4835 26.6762 38.2938 27.2089C39.134 27.7415 40.1094 28.0078 41.2197 28.0078Z"
                                                                    fill="#B9A8FF"
                                                                />
                                                                <path
                                                                    d="M57.8322 33.4674V10.6971H64.8545V33.4674H57.8322ZM61.3434 8.12271C60.233 8.12271 59.2727 7.72324 58.4625 6.92428C57.6522 6.12533 57.2471 5.17842 57.2471 4.08355C57.2471 2.98868 57.6522 2.04177 58.4625 1.24282C59.2727 0.414273 60.233 0 61.3434 0C62.4538 0 63.4141 0.414273 64.2243 1.24282C65.0346 2.04177 65.4397 2.98868 65.4397 4.08355C65.4397 5.17842 65.0346 6.12533 64.2243 6.92428C63.4141 7.72324 62.4538 8.12271 61.3434 8.12271Z"
                                                                    fill="#B9A8FF"
                                                                />
                                                                <path
                                                                    d="M78.4279 33.4674C76.2972 33.4674 74.6316 32.8755 73.4312 31.6919C72.2308 30.4787 71.6306 28.8512 71.6306 26.8094V5.14882H78.6529V26.4099C78.6529 26.765 78.773 27.0757 79.0131 27.342C79.2831 27.5788 79.5982 27.6971 79.9584 27.6971H85V33.4674H78.4279ZM67.8494 16.3342V10.6971H85V16.3342H67.8494Z"
                                                                    fill="#B9A8FF"
                                                                />
                                                            </svg>
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
