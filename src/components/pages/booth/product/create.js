import { Helmet } from "react-helmet";
import Layout from "../../../layouts";
import Breadcrumb from "../../../layouts/breadcrumb";
import { useEffect, useState } from "react";
import url from "../../../services/url";
import api from "../../../services/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import NotFound from "../../../pages/other/not-found";

function ProductCreate() {
    const [formProduct, setFormProduct] = useState({
        name: "",
        description: "",
        image: null,
        price: "",
        shopId: "",
    });

    const [userRole, setUserRole] = useState(null);
    const [error, setError] = useState(null);
    const [shops, setShops] = useState([]);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    //validate
    const validateForm = () => {
        let valid = true;
        const newErrors = {};
        if (formProduct.name === "") {
            newErrors.name = "Please enter name product";
            valid = false;
        } else if (formProduct.name.length < 3) {
            newErrors.name = "Enter at least 3 characters";
            valid = false;
        } else if (formProduct.name.length > 255) {
            newErrors.name = "Enter up to 255 characters";
            valid = false;
        }
        if (formProduct.image === null) {
            newErrors.image = "Please choose product photo";
            valid = false;
        }
        if (formProduct.shopId === "") {
            newErrors.shopId = "Please choose shop";
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

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

    //xử lý tạo product
    const handleSubmit = async (e) => {
        e.preventDefault();
        const isFormValid = validateForm();

        if (isFormValid) {
            const userToken = localStorage.getItem("access_token");
            api.defaults.headers.common["Authorization"] = `Bearer ${userToken}`;
            try {
                const response = await api.post(url.PRODUCT.CREATE, formProduct, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
                if (response.status === 201) {
                    // console.log(response.data);
                    toast.success("Create Product Successffuly.", {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 3000,
                    });
                    setTimeout(() => {
                        navigate(`/product-list`); //chuyển đến trang product-list
                    }, 3000);
                } else {
                }
            } catch (error) {
                toast.error("Unable to create product, please try again", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 3000,
                });
                // console.error("Error creating test:", error);
                // console.error("Response data:", error.response.data);
            }
        }
    };

    //xử lý tải file ảnh
    const handleFileProductChange = (e, fieldName) => {
        const { files } = e.target;
        const selectedImage = files.length > 0 ? URL.createObjectURL(files[0]) : null;

        setFormProduct({
            ...formProduct,
            [fieldName]: fieldName === "image" ? (files.length > 0 ? files[0] : null) : null,
            image_preview: selectedImage,
        });
    };
    const handleChange = (e) => {
        const { name } = e.target;
        if (name === "image") {
            handleFileProductChange(e, name);
        } else {
            const { value } = e.target;
            setFormProduct({ ...formProduct, [name]: value });
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
                        <title>Product Create | R Mall</title>
                    </Helmet>
                    <Layout>
                        <Breadcrumb title="Product Create" />
                        <div className="row">
                            <div className="col-xl-12 col-xxl-12">
                                <div className="card">
                                    <div className="card-header">
                                        <h4 className="card-title">Product Create</h4>
                                    </div>
                                    <div className="card-body">
                                        <form onSubmit={handleSubmit}>
                                            <div className="row">
                                                <div className="col-lg-6 mb-2">
                                                    <div className="mb-3">
                                                        <label className="text-label form-label">
                                                            Product Name <span className="text-danger">*</span>
                                                        </label>
                                                        <input type="text" name="name" onChange={handleChange} className="form-control" placeholder="Please enter name product" autoFocus />
                                                        {errors.name && <div className="text-danger">{errors.name}</div>}
                                                    </div>
                                                </div>

                                                <div className="col-lg-6 mb-2">
                                                    <div className="mb-3">
                                                        <label className="text-label form-label">
                                                            Description <span className="text-danger">*</span>
                                                        </label>
                                                        <input type="text" name="description" onChange={handleChange} className="form-control" placeholder="Please enter description" />
                                                    </div>
                                                </div>

                                                <div className="col-lg-6 mb-2">
                                                    <div className="mb-3">
                                                        <label className="text-label form-label">
                                                            Thumbnail <span className="text-danger">*</span>
                                                        </label>
                                                        <input type="file" name="image" onChange={handleChange} className="form-control" accept=".jpg, .png, .etc" />
                                                        {errors.image && <div className="text-danger">{errors.image}</div>}
                                                    </div>
                                                </div>

                                                <div className="col-lg-6 mb-2">
                                                    <div className="mb-3">
                                                        <label className="text-label form-label">
                                                            Price ($)<span className="text-danger">*</span>
                                                        </label>
                                                        <input type="number" name="price" onChange={handleChange} className="form-control" placeholder="Please enter price" />
                                                    </div>
                                                </div>

                                                <div className="col-lg-6 mb-2">
                                                    <div className="mb-3">
                                                        <label className="text-label form-label">
                                                            Shop Name <span className="text-danger">*</span>
                                                        </label>
                                                        <select className="form-control select" name="shopId" onChange={handleChange}>
                                                            <option value="">Please select shop</option>
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
                                                        <label className="text-label form-label">Preview product photo</label>
                                                        {formProduct.image_preview && (
                                                            <img src={formProduct.image_preview} alt="Product Preview" style={{ width: "100%", height: "300px", objectFit: "cover" }} />
                                                        )}
                                                    </div>
                                                </div>

                                                <div className="text-end">
                                                    <button type="submit" className="btn btn-default">
                                                        Create
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

export default ProductCreate;
