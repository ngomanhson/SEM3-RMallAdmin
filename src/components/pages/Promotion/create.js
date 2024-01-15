import { Helmet } from "react-helmet";
import Layout from "../../layouts";
import Breadcrumb from "../../layouts/breadcrumb";
import { useEffect, useState } from "react";
import url from "../../services/url";
import api from "../../services/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import NotFound from "../../pages/other/not-found";

function PromotionCreate() {
    const [formPromotion, setFormPromotion] = useState({
        name: "",
        startDate: "",
        endDate: "",
        discountPercentage: "",
        limit: "",
        // couponCode: "",
        minPurchaseAmount: "",
    });
    const [userRole, setUserRole] = useState(null);
    const [error, setError] = useState(null);
    const [errors, setErrors] = useState({});
    // const [couponExistsError, setCouponExistsError] = useState("");
    const navigate = useNavigate();

    //validate
    const validateForm = () => {
        let valid = true;
        const newErrors = {};
        if (formPromotion.name === "") {
            newErrors.name = "Please enter promotion name";
            valid = false;
        } else if (formPromotion.name.length < 3) {
            newErrors.name = "Enter at least 3 characters";
            valid = false;
        } else if (formPromotion.name.length > 255) {
            newErrors.name = "Enter up to 255 characters";
            valid = false;
        }
        if (formPromotion.startDate === "") {
            newErrors.startDate = "Please enter start date";
            valid = false;
        }
        if (formPromotion.endDate === "") {
            newErrors.endDate = "Please enter end date";
            valid = false;
        }
        if (formPromotion.discountPercentage === "") {
            newErrors.discountPercentage = "Please enter discount percentage";
            valid = false;
        } else {
            const discountValue = parseFloat(formPromotion.discountPercentage);
            if (isNaN(discountValue) || discountValue < 1 || discountValue > 100) {
                newErrors.discountPercentage = "Please enter a valid discount percentage between 1 and 100";
                valid = false;
            }
        }
        if (formPromotion.limit === "") {
            newErrors.limit = "Please enter limit";
            valid = false;
        } else {
            const limitValue = parseFloat(formPromotion.limit);
            if (isNaN(limitValue) || limitValue < 1) {
                newErrors.limit = "Limit must be greater than 1";
                valid = false;
            }
        }
        // if (formPromotion.couponCode === "") {
        //     newErrors.couponCode = "Please enter coupon code";
        //     valid = false;
        // }
        if (formPromotion.minPurchaseAmount === "") {
            newErrors.minPurchaseAmount = "Please enter min purchase amount";
            valid = false;
        } else {
            const minPurchaseAmountValue = parseFloat(formPromotion.minPurchaseAmount);
            if (isNaN(minPurchaseAmountValue) || minPurchaseAmountValue < 1) {
                newErrors.minPurchaseAmount = "Min purchase amount must be greater than 1";
                valid = false;
            }
        }
        setErrors(newErrors);
        return valid;
    };

    //xử lý tạo promotion
    const handleSubmit = async (e) => {
        e.preventDefault();
        const isFormValid = validateForm();

        if (isFormValid) {
            const userToken = localStorage.getItem("access_token");
            api.defaults.headers.common["Authorization"] = `Bearer ${userToken}`;
            try {
                const response = await api.post(url.PROMOTION.CREATE, formPromotion);
                if (response && response.data) {
                    // console.log(response.data);
                    toast.success("Create Promotion Successffuly.", {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 3000,
                    });
                    setTimeout(() => {
                        navigate(`/promotion-list`); //chuyển đến trang promotion-list
                    }, 3000);
                } else {
                }
            } catch (error) {
                // if (error.response.status === 400 && error.response.data.message === "Coupon Code already exists") {
                //     setCouponExistsError("This coupon code already exists");
                //     toast.error("This coupon code already exists", {
                //         position: toast.POSITION.TOP_RIGHT,
                //         autoClose: 3000,
                //     });
                // } else {
                toast.error("Unable to create promotion, please try again", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 3000,
                });
                // }
                // console.error("Error creating test:", error);
                // console.error("Response data:", error.response.data);
            }
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormPromotion({ ...formPromotion, [name]: value });
        // setCouponExistsError("");
    };

    // kiểm tra role
    useEffect(() => {
        const fetchUserRole = async () => {
            const token = localStorage.getItem("access_token");
            try {
                const decodedToken = JSON.parse(atob(token.split(".")[1]));
                const userRole = decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
                setUserRole(userRole);

                if (userRole === "User" || userRole === "Shopping Center Manager Staff") {
                    setError(true);
                }
            } catch (error) {
                console.error("Error loading user role:", error);
            }
        };

        fetchUserRole();
    }, []);

    return (
        <>
            {error ? (
                <NotFound />
            ) : (
                <>
                    <Helmet>
                        <title>Promotion Create | R Mall</title>
                    </Helmet>
                    <Layout>
                        <Breadcrumb title="Promotion Create" />
                        <div className="row">
                            <div className="col-xl-12 col-xxl-12">
                                <div className="card">
                                    <div className="card-header">
                                        <h4 className="card-title">Promotion Create</h4>
                                    </div>
                                    <div className="card-body">
                                        <form onSubmit={handleSubmit}>
                                            <div className="row">
                                                <div className="col-lg-6 mb-2">
                                                    <div className="mb-3">
                                                        <label className="text-label form-label">
                                                            Promotion Name <span className="text-danger">*</span>
                                                        </label>
                                                        <input type="text" name="name" onChange={handleChange} className="form-control" placeholder="Please enter promotion name" autoFocus />
                                                        {errors.name && <div className="text-danger">{errors.name}</div>}
                                                    </div>
                                                </div>

                                                <div className="col-lg-6 mb-2">
                                                    <div className="mb-3">
                                                        <label className="text-label form-label">
                                                            Start Date <span className="text-danger">*</span>
                                                        </label>
                                                        <input type="datetime-local" name="startDate" onChange={handleChange} className="form-control" />
                                                        {errors.startDate && <div className="text-danger">{errors.startDate}</div>}
                                                    </div>
                                                </div>

                                                <div className="col-lg-6 mb-2">
                                                    <div className="mb-3">
                                                        <label className="text-label form-label">
                                                            End Date <span className="text-danger">*</span>
                                                        </label>
                                                        <input type="datetime-local" name="endDate" onChange={handleChange} className="form-control" />
                                                        {errors.endDate && <div className="text-danger">{errors.endDate}</div>}
                                                    </div>
                                                </div>

                                                <div className="col-lg-6 mb-2">
                                                    <div className="mb-3">
                                                        <label className="text-label form-label">
                                                            Discount Percentage (%) <span className="text-danger">*</span>
                                                        </label>
                                                        <input
                                                            type="number"
                                                            name="discountPercentage"
                                                            onChange={handleChange}
                                                            className="form-control"
                                                            placeholder="Please enter discount percentage"
                                                        />
                                                        {errors.discountPercentage && <div className="text-danger">{errors.discountPercentage}</div>}
                                                    </div>
                                                </div>

                                                <div className="col-lg-6 mb-2">
                                                    <div className="mb-3">
                                                        <label className="text-label form-label">
                                                            Limit <span className="text-danger">*</span>
                                                        </label>
                                                        <input type="number" name="limit" onChange={handleChange} className="form-control" placeholder="Please enter limit" />
                                                        {errors.limit && <div className="text-danger">{errors.limit}</div>}
                                                    </div>
                                                </div>

                                                {/* <div className="col-lg-6 mb-2">
                                            <div className="mb-3">
                                                <label className="text-label form-label">
                                                    Coupon Code <span className="text-danger">*</span>
                                                </label>
                                                <input type="text" name="couponCode" onChange={handleChange} className="form-control" placeholder="Please enter coupon code" />
                                                {errors.couponCode && <div className="text-danger">{errors.couponCode}</div>}
                                                {couponExistsError && <div className="text-danger">{couponExistsError}</div>}
                                            </div>
                                        </div> */}

                                                <div className="col-lg-6 mb-2">
                                                    <div className="mb-3">
                                                        <label className="text-label form-label">
                                                            Min Purchase Amount ($) <span className="text-danger">*</span>
                                                        </label>
                                                        <input type="number" name="minPurchaseAmount" onChange={handleChange} className="form-control" placeholder="Please enter min purchase amount" />
                                                        {errors.minPurchaseAmount && <div className="text-danger">{errors.minPurchaseAmount}</div>}
                                                    </div>
                                                </div>

                                                <div className="text-end">
                                                    <button type="submit" className="btn btn-default">
                                                        Create Promotion
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Layout>
                </>
            )}
        </>
    );
}

export default PromotionCreate;
