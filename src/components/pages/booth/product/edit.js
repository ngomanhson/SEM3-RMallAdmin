import { Helmet } from "react-helmet";
import Layout from "../../../layouts";
import Breadcrumb from "../../../layouts/breadcrumb";
import { useEffect, useState } from "react";
import url from "../../../services/url";
import api from "../../../services/api";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../../layouts/loading";
import NotFound from "../../../pages/other/not-found";

function ProductEdit() {
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
    const [productData, setProductData] = useState({});
    const [shops, setShops] = useState([]);
    const [imagePreview, setImagePreview] = useState("");
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    //validate
    const validateForm = () => {
        let valid = true;
        const newErrors = {};
        if (productData.name === "") {
            newErrors.name = "Please enter name product";
            valid = false;
        } else if (productData.name.length < 3) {
            newErrors.name = "Enter at least 3 characters";
            valid = false;
        } else if (productData.name.length > 255) {
            newErrors.name = "Enter up to 255 characters";
            valid = false;
        }
        if (productData.shopId === "") {
            newErrors.shopId = "Please choose shop";
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    //hien thi thong tin product
    useEffect(() => {
        const userToken = localStorage.getItem("access_token");
        api.defaults.headers.common["Authorization"] = `Bearer ${userToken}`;
        api.get(`${url.PRODUCT.DETAIL.replace("{}", id)}`)
            .then((response) => {
                setProductData(response.data);
            })
            .catch((error) => {
                // console.error("Error fetching promotion details:", error);
            });
    }, [id]);

    //hiển thị select shops
    useEffect(() => {
        const fetchShops = async () => {
            const userToken = localStorage.getItem("access_token");
            api.defaults.headers.common["Authorization"] = `Bearer ${userToken}`;
            try {
                const response = await api.get(url.SHOP.LIST);
                setShops(response.data);
            } catch (error) {}
        };
        fetchShops();
    }, []);

    //xử lý update product
    const handleSubmit = async (e) => {
        e.preventDefault();
        const isFormValid = validateForm();

        if (isFormValid) {
            const userToken = localStorage.getItem("access_token");
            api.defaults.headers.common["Authorization"] = `Bearer ${userToken}`;
            try {
                const response = await api.put(url.PRODUCT.UPDATE, productData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
                if (response.status === 200) {
                    // console.log(response.data);
                    toast.success("Update Product Successffuly.", {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 3000,
                    });
                    setTimeout(() => {
                        navigate(`/product-list`); //chuyển đến trang product-list
                    }, 3000);
                } else {
                }
            } catch (error) {
                toast.error("Unable to update product, please try again", {
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

                if (userRole === "User" || userRole === "Movie Theater Manager Staff") {
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
                        <title>Product Edit | R Admin</title>
                    </Helmet>
                    {loading ? <Loading /> : ""}
                    <Layout>
                        <Breadcrumb title="Product Edit" />
                        <div className="row">
                            <div className="col-xl-12 col-xxl-12">
                                <div className="card">
                                    <div className="card-header">
                                        <h4 className="card-title">Product Edit</h4>
                                    </div>
                                    <div className="card-body">
                                        <form onSubmit={handleSubmit}>
                                            <div className="row">
                                                <div className="col-lg-6 mb-2">
                                                    <div className="mb-3">
                                                        <label className="text-label form-label">
                                                            Product Name <span className="text-danger">*</span>
                                                        </label>
                                                        <input
                                                            type="text"
                                                            value={productData.name}
                                                            onChange={(e) =>
                                                                setProductData({
                                                                    ...productData,
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
                                                        <label className="text-label form-label">Description</label>
                                                        <input
                                                            type="text"
                                                            value={productData.description}
                                                            onChange={(e) =>
                                                                setProductData({
                                                                    ...productData,
                                                                    description: e.target.value,
                                                                })
                                                            }
                                                            className="form-control"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="col-lg-6 mb-2">
                                                    <div className="mb-3">
                                                        <label className="text-label form-label">Price ($)</label>
                                                        <input
                                                            type="number"
                                                            value={productData.price}
                                                            onChange={(e) =>
                                                                setProductData({
                                                                    ...productData,
                                                                    price: e.target.value,
                                                                })
                                                            }
                                                            className="form-control"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="col-lg-6 mb-2">
                                                    <div className="mb-3">
                                                        <label className="text-label form-label">
                                                            Shop <span className="text-danger">*</span>
                                                        </label>
                                                        <select
                                                            className="form-control select"
                                                            value={productData.shopId}
                                                            onChange={(e) =>
                                                                setProductData({
                                                                    ...productData,
                                                                    shopId: e.target.value,
                                                                    shopName: e.target.options[e.target.selectedIndex].text,
                                                                })
                                                            }
                                                        >
                                                            {shops.map((shopItem) => (
                                                                <option key={shopItem.id} value={shopItem.id}>
                                                                    {shopItem.name}
                                                                </option>
                                                            ))}
                                                        </select>
                                                        {errors.shopId && <div className="text-danger">{errors.shopId}</div>}
                                                    </div>
                                                </div>

                                                <div className="col-lg-6 mb-2">
                                                    <div className="mb-3">
                                                        <label className="text-label form-label">Thumbnail</label>
                                                        <input
                                                            type="file"
                                                            onChange={(e) => {
                                                                const file = e.target.files[0];
                                                                if (file && /\.(jpg|png|jpeg)$/.test(file.name)) {
                                                                    // Update image preview state
                                                                    setImagePreview(URL.createObjectURL(file));

                                                                    // Tiếp tục xử lý
                                                                    setProductData({
                                                                        ...productData,
                                                                        image: file,
                                                                    });
                                                                } else {
                                                                    console.error("Unsupported file format or no file selected");
                                                                }
                                                            }}
                                                            className="form-control"
                                                            accept=".jpg, .png, .jpeg"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="col-lg-6 mb-2">
                                                    <div className="mb-3">
                                                        <label className="text-label form-label">Preview product photos</label>
                                                        <img
                                                            id="imgPreview"
                                                            src={imagePreview || productData.image}
                                                            alt="Product Preview"
                                                            style={{ width: "100%", height: "300px", objectFit: "cover" }}
                                                            onError={(e) => console.error("Image Preview Error:", e)}
                                                        />
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

export default ProductEdit;
