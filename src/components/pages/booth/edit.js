import { Helmet } from "react-helmet";
import Layout from "../../layouts";
import Breadcrumb from "../../layouts/breadcrumb";
import { useEffect, useState } from "react";
import url from "../../services/url";
import api from "../../services/api";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../layouts/loading";

function ShopEdit() {
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, []);

    const { slug } = useParams();
    const [shopData, setShopData] = useState({});
    const [categories, setCategories] = useState([]);
    const [floors, setFloors] = useState([]);
    const [imagePreview, setImagePreview] = useState("");
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    //validate
    const validateForm = () => {
        let valid = true;
        const newErrors = {};
        if (shopData.name === "") {
            newErrors.name = "Please enter name shop";
            valid = false;
        } else if (shopData.name.length < 3) {
            newErrors.name = "Enter at least 3 characters";
            valid = false;
        } else if (shopData.name.length > 255) {
            newErrors.name = "Enter up to 255 characters";
            valid = false;
        }
        if (shopData.floorId === "") {
            newErrors.floorId = "Please choose floor";
            valid = false;
        }
        if (shopData.categoryId === "") {
            newErrors.categoryId = "Please choose category";
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    //hien thi thong tin shop
    useEffect(() => {
        api.get(`${url.SHOP.DETAIL.replace("{}", slug)}`)
            .then((response) => {
                setShopData(response.data);
            })
            .catch((error) => {
                // console.error("Error fetching promotion details:", error);
            });
    }, [slug]);

    //hiển thị select categories
    useEffect(() => {
        const fetchCategories = async () => {
            // const userToken = localStorage.getItem("accessToken");
            try {
                // api.defaults.headers.common["Authorization"] = `Bearer ${userToken}`;
                const response = await api.get(url.CATEGORY.LIST);
                setCategories(response.data);
            } catch (error) {}
        };
        fetchCategories();
    }, []);

    //hiển thị select floors
    useEffect(() => {
        const fetchFloors = async () => {
            // const userToken = localStorage.getItem("accessToken");
            try {
                // api.defaults.headers.common["Authorization"] = `Bearer ${userToken}`;
                const response = await api.get(url.FLOOR.LIST);
                setFloors(response.data);
            } catch (error) {}
        };
        fetchFloors();
    }, []);

    //xử lý update shop
    const handleSubmit = async (e) => {
        e.preventDefault();
        const isFormValid = validateForm();

        if (isFormValid) {
            try {
                const response = await api.put(url.SHOP.UPDATE, shopData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
                if (response.status === 200) {
                    // console.log(response.data);
                    toast.success("Update Shop Successffuly.", {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 3000,
                    });
                    setTimeout(() => {
                        navigate(`/shop-list`); //chuyển đến trang shop-list
                    }, 3000);
                } else {
                }
            } catch (error) {
                toast.error("Unable to update shop, please try again", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 3000,
                });
                // console.error("Error creating test:", error);
                // console.error("Response data:", error.response.data);
            }
        }
    };

    return (
        <>
            <Helmet>
                <title>Shop Edit | R Mall</title>
            </Helmet>
            {loading ? <Loading /> : ""}
            <Layout>
                <Breadcrumb title="Shop Edit" />
                <div className="row">
                    <div className="col-xl-12 col-xxl-12">
                        <div className="card">
                            <div className="card-header">
                                <h4 className="card-title">Shop Edit</h4>
                            </div>
                            <div className="card-body">
                                <form onSubmit={handleSubmit}>
                                    <div className="row">
                                        <div className="col-lg-6 mb-2">
                                            <div className="mb-3">
                                                <label className="text-label form-label">
                                                    Shop Name <span className="text-danger">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    value={shopData.name}
                                                    onChange={(e) =>
                                                        setShopData({
                                                            ...shopData,
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
                                                <label className="text-label form-label">Contact Info (Number Phone)</label>
                                                <input
                                                    type="text"
                                                    value={shopData.contactInfo}
                                                    onChange={(e) =>
                                                        setShopData({
                                                            ...shopData,
                                                            contactInfo: e.target.value,
                                                        })
                                                    }
                                                    className="form-control"
                                                />
                                            </div>
                                        </div>

                                        <div className="col-lg-6 mb-2">
                                            <div className="mb-3">
                                                <label className="text-label form-label">Hours of operation</label>
                                                <input
                                                    type="text"
                                                    value={shopData.hoursOfOperation}
                                                    onChange={(e) =>
                                                        setShopData({
                                                            ...shopData,
                                                            hoursOfOperation: e.target.value,
                                                        })
                                                    }
                                                    className="form-control"
                                                />
                                            </div>
                                        </div>

                                        <div className="col-lg-6 mb-2">
                                            <div className="mb-3">
                                                <label className="text-label form-label">Description</label>
                                                <input
                                                    type="text"
                                                    value={shopData.description}
                                                    onChange={(e) =>
                                                        setShopData({
                                                            ...shopData,
                                                            description: e.target.value,
                                                        })
                                                    }
                                                    className="form-control"
                                                />
                                            </div>
                                        </div>

                                        <div className="col-lg-6 mb-2">
                                            <div className="mb-3">
                                                <label className="text-label form-label">Address (Displayed on 3d map)</label>
                                                <input type="text" value={shopData.address} className="form-control" disabled />
                                            </div>
                                        </div>

                                        <div className="col-lg-6 mb-2">
                                            <div className="mb-3">
                                                <label className="text-label form-label">
                                                    Category <span className="text-danger">*</span>
                                                </label>
                                                <select
                                                    className="form-control select"
                                                    value={shopData.categoryId}
                                                    onChange={(e) =>
                                                        setShopData({
                                                            ...shopData,
                                                            categoryId: e.target.value,
                                                            categoryName: e.target.options[e.target.selectedIndex].text,
                                                        })
                                                    }
                                                >
                                                    {categories.map((categoryItem) => (
                                                        <option key={categoryItem.id} value={categoryItem.id}>
                                                            {categoryItem.name}
                                                        </option>
                                                    ))}
                                                </select>
                                                {errors.categoryId && <div className="text-danger">{errors.categoryId}</div>}
                                            </div>
                                        </div>

                                        <div className="col-lg-6 mb-2">
                                            <div className="mb-3">
                                                <label className="text-label form-label">
                                                    Floor <span className="text-danger">*</span>
                                                </label>
                                                <select
                                                    className="form-control select"
                                                    value={shopData.floorId}
                                                    onChange={(e) =>
                                                        setShopData({
                                                            ...shopData,
                                                            floorId: e.target.value,
                                                            floorName: e.target.options[e.target.selectedIndex].text,
                                                        })
                                                    }
                                                >
                                                    {floors.map((floorItem) => (
                                                        <option key={floorItem.id} value={floorItem.id}>
                                                            {floorItem.floorNumber}
                                                        </option>
                                                    ))}
                                                </select>
                                                {errors.floorId && <div className="text-danger">{errors.floorId}</div>}
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
                                                            setShopData({
                                                                ...shopData,
                                                                imagePath: file,
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
                                                <label className="text-label form-label">Preview shop photos</label>
                                                <img
                                                    id="imgPreview"
                                                    src={imagePreview || shopData.imagePath}
                                                    alt="Shop Preview"
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
    );
}

export default ShopEdit;
