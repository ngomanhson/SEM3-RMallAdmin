import { Helmet } from "react-helmet";
import Layout from "../../layouts";
import Breadcrumb from "../../layouts/breadcrumb";
import { useEffect, useState } from "react";
import url from "../../services/url";
import api from "../../services/api";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../layouts/loading";
import NotFound from "../../pages/other/not-found";

function FoodEdit() {
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, []);

    const [userRole, setUserRole] = useState(null);
    const [error, setError] = useState(null);
    const { id } = useParams();
    const [foodData, setFoodData] = useState({});
    const [imagePreview, setImagePreview] = useState("");
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    //validate
    const validateForm = () => {
        let valid = true;
        const newErrors = {};
        if (foodData.name === "") {
            newErrors.name = "Please enter name food";
            valid = false;
        } else if (foodData.name.length < 3) {
            newErrors.name = "Enter at least 3 characters";
            valid = false;
        } else if (foodData.name.length > 255) {
            newErrors.name = "Enter up to 255 characters";
            valid = false;
        }
        if (foodData.description === "") {
            newErrors.description = "Please enter description";
            valid = false;
        }
        if (foodData.image === null) {
            newErrors.image = "Please choose food photo";
            valid = false;
        }
        if (foodData.price === "") {
            newErrors.price = "Please enter price";
            valid = false;
        }
        if (foodData.quantity === "") {
            newErrors.quantity = "Please enter quantity";
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    //hien thi thong tin food
    useEffect(() => {
        const userToken = localStorage.getItem("access_token");
        api.defaults.headers.common["Authorization"] = `Bearer ${userToken}`;
        api.get(`${url.FOOD.DETAIL.replace("{}", id)}`)
            .then((response) => {
                setFoodData(response.data);
            })
            .catch((error) => {
                // console.error("Error fetching promotion details:", error);
            });
    }, [id]);

    //xử lý update food
    const handleSubmit = async (e) => {
        e.preventDefault();
        const isFormValid = validateForm();

        if (isFormValid) {
            const userToken = localStorage.getItem("access_token");
            api.defaults.headers.common["Authorization"] = `Bearer ${userToken}`;
            try {
                const response = await api.put(url.FOOD.UPDATE, foodData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
                if (response.status === 200) {
                    // console.log(response.data);
                    toast.success("Update Food Successffuly.", {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 3000,
                    });
                    setTimeout(() => {
                        navigate(`/food-list`); //chuyển đến trang food-list
                    }, 3000);
                } else {
                }
            } catch (error) {
                toast.error("Unable to update food, please try again", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 3000,
                });
                // console.error("Error creating test:", error);
                // console.error("Response data:", error.response.data);
            }
        }
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
                        <title>Food Edit | R Admin</title>
                    </Helmet>
                    {loading ? <Loading /> : ""}
                    <Layout>
                        <Breadcrumb title="Food Edit" />
                        <div className="row">
                            <div className="col-xl-12 col-xxl-12">
                                <div className="card">
                                    <div className="card-header">
                                        <h4 className="card-title">Food Edit</h4>
                                    </div>
                                    <div className="card-body">
                                        <form onSubmit={handleSubmit}>
                                            <div className="row">
                                                <div className="col-lg-6 mb-2">
                                                    <div className="mb-3">
                                                        <label className="text-label form-label">
                                                            Food Name <span className="text-danger">*</span>
                                                        </label>
                                                        <input
                                                            type="text"
                                                            value={foodData.name}
                                                            onChange={(e) =>
                                                                setFoodData({
                                                                    ...foodData,
                                                                    name: e.target.value,
                                                                })
                                                            }
                                                            className="form-control"
                                                            autoFocus
                                                        />
                                                        {errors.name && <div className="text-danger">{errors.name}</div>}
                                                    </div>
                                                </div>

                                                <div className="col-lg-6 mb-2">
                                                    <div className="mb-3">
                                                        <label className="text-label form-label">
                                                            Description <span className="text-danger">*</span>
                                                        </label>
                                                        <input
                                                            type="text"
                                                            value={foodData.description}
                                                            onChange={(e) =>
                                                                setFoodData({
                                                                    ...foodData,
                                                                    description: e.target.value,
                                                                })
                                                            }
                                                            className="form-control"
                                                        />
                                                        {errors.description && <div className="text-danger">{errors.description}</div>}
                                                    </div>
                                                </div>

                                                <div className="col-lg-6 mb-2">
                                                    <div className="mb-3">
                                                        <label className="text-label form-label">
                                                            Thumbnail <span className="text-danger">*</span>
                                                        </label>
                                                        <input
                                                            type="file"
                                                            onChange={(e) => {
                                                                const file = e.target.files[0];
                                                                if (file && /\.(jpg|png|jpeg)$/.test(file.name)) {
                                                                    // Update image preview state
                                                                    setImagePreview(URL.createObjectURL(file));

                                                                    // Tiếp tục xử lý
                                                                    setFoodData({
                                                                        ...foodData,
                                                                        image: file,
                                                                    });
                                                                } else {
                                                                    console.error("Unsupported file format or no file selected");
                                                                }
                                                            }}
                                                            className="form-control"
                                                            accept=".jpg, .png, .jpeg"
                                                        />
                                                        {errors.image && <div className="text-danger">{errors.image}</div>}
                                                    </div>
                                                </div>

                                                <div className="col-lg-6 mb-2">
                                                    <div className="mb-3">
                                                        <label className="text-label form-label">
                                                            Price ($)<span className="text-danger">*</span>
                                                        </label>
                                                        <input
                                                            type="number"
                                                            value={foodData.price}
                                                            onChange={(e) =>
                                                                setFoodData({
                                                                    ...foodData,
                                                                    price: e.target.value,
                                                                })
                                                            }
                                                            className="form-control"
                                                        />
                                                        {errors.price && <div className="text-danger">{errors.price}</div>}
                                                    </div>
                                                </div>

                                                <div className="col-lg-6 mb-2">
                                                    <div className="mb-3">
                                                        <label className="text-label form-label">
                                                            Quantity <span className="text-danger">*</span>
                                                        </label>
                                                        <input
                                                            type="number"
                                                            value={foodData.quantity}
                                                            onChange={(e) =>
                                                                setFoodData({
                                                                    ...foodData,
                                                                    quantity: e.target.value,
                                                                })
                                                            }
                                                            className="form-control"
                                                        />
                                                        {errors.quantity && <div className="text-danger">{errors.quantity}</div>}
                                                    </div>
                                                </div>

                                                <div className="col-lg-6 mb-2">
                                                    <div className="mb-3">
                                                        <label className="text-label form-label">Preview food photos</label>
                                                        <img
                                                            id="imgPreview"
                                                            src={imagePreview || foodData.image}
                                                            alt="Shop Preview"
                                                            style={{ width: "100%", height: "300px", objectFit: "cover" }}
                                                            onError={(e) => console.error("Image Preview Error:", e)}
                                                        />{" "}
                                                    </div>
                                                </div>

                                                <div className="text-end">
                                                    <button type="submit" className="btn btn-default">
                                                        Update
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

export default FoodEdit;
