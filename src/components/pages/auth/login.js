import { Link, useNavigate } from "react-router-dom";
import Animation from "../../layouts/animation";
import { Helmet } from "react-helmet";
import { useEffect, useState } from "react";
import api from "../../services/api";
import url from "../../services/url";
import { getDecodedToken, removeAccessToken, setAccessToken } from "../../../utils/auth";
import Loading from "../../layouts/loading";

function Login() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);

        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, []);

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [formErrors, setFormErrors] = useState({
        email: "",
        password: "",
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
        }

        if (!formData.password) {
            newErrors.password = "Please enter your password.";
            valid = false;
        } else if (formData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters.";
            valid = false;
        } else if (formData.password.length > 50) {
            newErrors.password = "Password must be less than 50 characters.";
            valid = false;
        }

        setFormErrors(newErrors);
        return valid;
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            try {
                const loginRequest = await api.post(url.AUTH.LOGIN, formData);

                if (loginRequest.status === 200) {
                    const token = loginRequest.data.data;
                    setAccessToken(token);
                    // Check user permissions
                    const decodedToken = getDecodedToken();
                    const accountRole = decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

                    if (accountRole === "User") {
                        removeAccessToken();
                        setFormErrors({
                            email: "Invalid email or password.",
                            password: "Invalid email or password.",
                        });
                    } else {
                        let redirectUrl = "/";
                        if (accountRole === "Super Admin") {
                            redirectUrl = "/";
                        } else if (accountRole === "Shopping Center Manager Staff") {
                            redirectUrl = "/shopping-center-manager-staff-dashboard";
                        } else if (accountRole === "Movie Theater Manager Staff") {
                            redirectUrl = "/movie-theater-manager-staff-dashboard";
                        }

                        navigate(redirectUrl);
                    }
                } else {
                    setFormErrors({
                        email: "Invalid email or password.",
                        password: "Invalid email or password.",
                    });
                }
            } catch (error) {
                setFormErrors({
                    email: "Invalid email or password.",
                    password: "Invalid email or password.",
                });
            }
        }
    };
    return (
        <>
            <Helmet>
                <title>Login | R Mall</title>
            </Helmet>
            {loading ? <Loading /> : ""}
            <div className="vh-100">
                <Animation />
                <div className="container h-100">
                    <div className="row h-100 align-items-center justify-contain-center">
                        <div className="col-xl-12">
                            <div className="card">
                                <div className="card-body">
                                    <div className="row m-0">
                                        <div className="col-xl-6 col-md-6 sign text-center">
                                            <div>
                                                <div className="text-center my-5">
                                                    <div className="logo">
                                                        <img src="./assets/images/logo/logo.png" alt="" />
                                                    </div>
                                                </div>
                                                <img src="assets/images/log.png" className="education-img" alt="" />
                                            </div>
                                        </div>
                                        <div className="col-xl-6 col-md-6">
                                            <div className="sign-in-your">
                                                <h3>Sign in your account</h3>
                                                <span className="text-white">
                                                    Welcome back! Login with your data that you entered
                                                    <br />
                                                    during registration
                                                </span>
                                                <div className="login-social">
                                                    <a href="#!" className="btn btn-primary font-w800 d-block my-4">
                                                        <i className="fab fa-google me-2"></i>Login with Google
                                                    </a>
                                                    <a href="#!" className="btn btn-primary font-w800 d-block my-4">
                                                        <i className="fab fa-facebook-f me-2 facebook-log"></i>Login with Facebook
                                                    </a>
                                                </div>
                                                <form onSubmit={handleLogin}>
                                                    <div className="mb-3">
                                                        <label className="mb-1">
                                                            <strong>Email</strong>
                                                        </label>
                                                        <input
                                                            type="email"
                                                            className={`form-control ${formErrors.email ? "is-invalid" : ""}`}
                                                            placeholder="hello@example.com"
                                                            id="email"
                                                            name="email"
                                                            value={formData.email}
                                                            onChange={handleChange}
                                                            autoFocus
                                                        />
                                                        {formErrors.email && <p className="invalid-feedback">{formErrors.email}</p>}
                                                    </div>
                                                    <div className="mb-3">
                                                        <label className="mb-1">
                                                            <strong>Password</strong>
                                                        </label>
                                                        <input
                                                            type="password"
                                                            className={`form-control ${formErrors.email ? "is-invalid" : ""}`}
                                                            placeholder="Password"
                                                            id="password"
                                                            name="password"
                                                            value={formData.password}
                                                            onChange={handleChange}
                                                        />
                                                        {formErrors.password && <p className="invalid-feedback">{formErrors.password}</p>}
                                                    </div>
                                                    <div className="row d-flex justify-content-between mt-4 mb-2">
                                                        <div className="mb-3">
                                                            <div className="form-check custom-checkbox ms-1">
                                                                <input type="checkbox" className="form-check-input" id="basic_checkbox_1" />
                                                                <label className="form-check-label" htmlFor="basic_checkbox_1">
                                                                    Remember my preference
                                                                </label>
                                                            </div>
                                                        </div>
                                                        <div className="mb-3">
                                                            <Link to="/forgot-password">Forgot Password?</Link>
                                                        </div>
                                                    </div>
                                                    <div className="text-center">
                                                        <button type="submit" className="btn btn-primary btn-block">
                                                            Sign Me In
                                                        </button>
                                                    </div>
                                                </form>
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

export default Login;
