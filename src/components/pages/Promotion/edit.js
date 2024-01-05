import { Helmet } from "react-helmet";
import Layout from "../../layouts";
import Breadcrumb from "../../layouts/breadcrumb";
import { useEffect, useState } from "react";
import url from "../../services/url";
import api from "../../services/api";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { format } from "date-fns";

function PromotionEdit() {
    const { id } = useParams();
    const [promotionData, setPromotionData] = useState({});

    const [errors, setErrors] = useState({});
    const [couponExistsError, setCouponExistsError] = useState("");
    const navigate = useNavigate();

    //validate
    const validateForm = () => {
        let valid = true;
        const newErrors = {};
        if (promotionData.name === "") {
            newErrors.name = "Please enter promotion name";
            valid = false;
        } else if (promotionData.name.length < 3) {
            newErrors.name = "Enter at least 3 characters";
            valid = false;
        } else if (promotionData.name.length > 255) {
            newErrors.name = "Enter up to 255 characters";
            valid = false;
        }
        if (promotionData.startDate === "") {
            newErrors.startDate = "Please enter start date";
            valid = false;
        }
        if (promotionData.endDate === "") {
            newErrors.endDate = "Please enter end date";
            valid = false;
        }
        if (promotionData.discountPercentage === "") {
            newErrors.discountPercentage = "Please enter discount percentage";
            valid = false;
        } else {
            const discountValue = parseFloat(promotionData.discountPercentage);
            if (isNaN(discountValue) || discountValue < 1 || discountValue > 100) {
                newErrors.discountPercentage = "Please enter a valid discount percentage between 1 and 100";
                valid = false;
            }
        }
        if (promotionData.limit === "") {
            newErrors.limit = "Please enter limit";
            valid = false;
        } else {
            const limitValue = parseFloat(promotionData.limit);
            if (isNaN(limitValue) || limitValue < 1) {
                newErrors.limit = "Limit must be greater than 1";
                valid = false;
            }
        }
        if (promotionData.couponCode === "") {
            newErrors.couponCode = "Please enter coupon code";
            valid = false;
        }
        if (promotionData.minPurchaseAmount === "") {
            newErrors.minPurchaseAmount = "Please enter min purchase amount";
            valid = false;
        } else {
            const minPurchaseAmountValue = parseFloat(promotionData.minPurchaseAmount);
            if (isNaN(minPurchaseAmountValue) || minPurchaseAmountValue < 1) {
                newErrors.minPurchaseAmount = "Min purchase amount must be greater than 1";
                valid = false;
            }
        }
        setErrors(newErrors);
        return valid;
    };

    //hien thi thong tin promotion
    useEffect(() => {
        api.get(`${url.PROMOTION.DETAIL.replace("{}", id)}`)
            .then((response) => {
                const initialPromotionData = {
                    ...response.data,
                    startDate: format(new Date(response.data.startDate), "yyyy-MM-dd HH:mm"),
                    endDate: format(new Date(response.data.endDate), "yyyy-MM-dd HH:mm"),
                };
                setPromotionData(initialPromotionData);
            })
            .catch((error) => {
                // console.error("Error fetching promotion details:", error);
            });
    }, [id]);

    //xử lý update promotion
    const handleSubmit = async (e) => {
        e.preventDefault();
        const isFormValid = validateForm();

        if (isFormValid) {
            try {
                const response = await api.put(url.PROMOTION.UPDATE, promotionData);
                if (response && response.data) {
                    // console.log(response.data);
                    toast.success("Update Promotion Successffuly.", {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 3000,
                    });
                    setTimeout(() => {
                        navigate(`/promotion-list`); //chuyển đến trang promotion-list
                    }, 3000);
                } else {
                }
            } catch (error) {
                if (error.response.status === 400 && error.response.data.message === "Coupon Code already exists") {
                    setCouponExistsError("This coupon code already exists");
                    toast.error("This coupon code already exists", {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 3000,
                    });
                } else {
                    toast.error("Unable to create promotion, please try again", {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 3000,
                    });
                }
                console.error("Error creating test:", error);
                console.error("Response data:", error.response.data);
            }
        }
    };

    return (
        <>
            <Helmet>
                <title>Promotion Edit | R Mall</title>
            </Helmet>
            <Layout>
                <Breadcrumb title="Promotion Edit" />
                <div className="row">
                    <div className="col-xl-12 col-xxl-12">
                        <div className="card">
                            <div className="card-header">
                                <h4 className="card-title">Promotion Edit</h4>
                            </div>
                            <div className="card-body">
                                <form onSubmit={handleSubmit}>
                                    <div className="row">
                                        <div className="col-lg-6 mb-2">
                                            <div className="mb-3">
                                                <label className="text-label form-label">
                                                    Promotion Name <span className="text-danger">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    value={promotionData.name}
                                                    onChange={(e) =>
                                                        setPromotionData({
                                                            ...promotionData,
                                                            name: e.target.value,
                                                        })
                                                    }
                                                    className="form-control"
                                                />
                                                {errors.name && <div className="text-danger">{errors.name}</div>}
                                            </div>
                                        </div>

                                        <div className="col-lg-6 mb-2">
                                            <div className="mb-3">
                                                <label className="text-label form-label">
                                                    Start Date <span className="text-danger">*</span>
                                                </label>
                                                <input
                                                    type="datetime-local"
                                                    value={promotionData.startDate}
                                                    onChange={(e) =>
                                                        setPromotionData({
                                                            ...promotionData,
                                                            startDate: e.target.value,
                                                        })
                                                    }
                                                    className="form-control"
                                                />
                                                {errors.startDate && <div className="text-danger">{errors.startDate}</div>}
                                            </div>
                                        </div>

                                        <div className="col-lg-6 mb-2">
                                            <div className="mb-3">
                                                <label className="text-label form-label">
                                                    End Date <span className="text-danger">*</span>
                                                </label>
                                                <input
                                                    type="datetime-local"
                                                    value={promotionData.endDate}
                                                    onChange={(e) =>
                                                        setPromotionData({
                                                            ...promotionData,
                                                            endDate: e.target.value,
                                                        })
                                                    }
                                                    className="form-control"
                                                />
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
                                                    value={promotionData.discountPercentage}
                                                    onChange={(e) =>
                                                        setPromotionData({
                                                            ...promotionData,
                                                            discountPercentage: e.target.value,
                                                        })
                                                    }
                                                    className="form-control"
                                                />
                                                {errors.discountPercentage && <div className="text-danger">{errors.discountPercentage}</div>}
                                            </div>
                                        </div>

                                        <div className="col-lg-6 mb-2">
                                            <div className="mb-3">
                                                <label className="text-label form-label">
                                                    Limit <span className="text-danger">*</span>
                                                </label>
                                                <input
                                                    type="number"
                                                    value={promotionData.limit}
                                                    onChange={(e) =>
                                                        setPromotionData({
                                                            ...promotionData,
                                                            limit: e.target.value,
                                                        })
                                                    }
                                                    className="form-control"
                                                />
                                                {errors.limit && <div className="text-danger">{errors.limit}</div>}
                                            </div>
                                        </div>

                                        <div className="col-lg-6 mb-2">
                                            <div className="mb-3">
                                                <label className="text-label form-label">
                                                    Coupon Code <span className="text-danger">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    value={promotionData.couponCode}
                                                    onChange={(e) =>
                                                        setPromotionData({
                                                            ...promotionData,
                                                            couponCode: e.target.value,
                                                        })
                                                    }
                                                    className="form-control"
                                                />
                                                {errors.couponCode && <div className="text-danger">{errors.couponCode}</div>}
                                                {couponExistsError && <div className="text-danger">{couponExistsError}</div>}
                                            </div>
                                        </div>

                                        <div className="col-lg-6 mb-2">
                                            <div className="mb-3">
                                                <label className="text-label form-label">
                                                    Min Purchase Amount ($) <span className="text-danger">*</span>
                                                </label>
                                                <input
                                                    type="number"
                                                    value={promotionData.minPurchaseAmount}
                                                    onChange={(e) =>
                                                        setPromotionData({
                                                            ...promotionData,
                                                            minPurchaseAmount: e.target.value,
                                                        })
                                                    }
                                                    className="form-control"
                                                />
                                                {errors.minPurchaseAmount && <div className="text-danger">{errors.minPurchaseAmount}</div>}
                                            </div>
                                        </div>

                                        <div className="text-end">
                                            <button type="submit" className="btn btn-default">
                                                Update Promotion
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
    );
}

export default PromotionEdit;
