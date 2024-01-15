import { Helmet } from "react-helmet";
import Layout from "../../layouts";
import Breadcrumb from "../../layouts/breadcrumb";
import { useEffect, useState } from "react";
import url from "../../services/url";
import api from "../../services/api";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../layouts/loading";
import { Editor } from "@tinymce/tinymce-react";
import NotFound from "../../pages/other/not-found";

function ShopEdit() {
    const useDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches; //css cho Editor

    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, []);

    const [userRole, setUserRole] = useState(null);
    const [error, setError] = useState(null);
    const { slug } = useParams();
    const [shopData, setShopData] = useState({});
    const [categories, setCategories] = useState([]);
    const [floors, setFloors] = useState([]);
    const [imagePreview, setImagePreview] = useState("");
    const [errors, setErrors] = useState({});
    const [nameExistsError, setNameExistsError] = useState("");
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
        const userToken = localStorage.getItem("access_token");
        api.defaults.headers.common["Authorization"] = `Bearer ${userToken}`;
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
            const userToken = localStorage.getItem("access_token");
            api.defaults.headers.common["Authorization"] = `Bearer ${userToken}`;
            try {
                const response = await api.get(url.CATEGORY.LIST);
                setCategories(response.data);
            } catch (error) {}
        };
        fetchCategories();
    }, []);

    //hiển thị select floors
    useEffect(() => {
        const fetchFloors = async () => {
            const userToken = localStorage.getItem("access_token");
            api.defaults.headers.common["Authorization"] = `Bearer ${userToken}`;
            try {
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
            const userToken = localStorage.getItem("access_token");
            api.defaults.headers.common["Authorization"] = `Bearer ${userToken}`;
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
                if (error.response.status === 400 && error.response.data.message === "Shop name already exists") {
                    setNameExistsError("The name of this shop already exists");
                    toast.error("The name of this shop already exists", {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 3000,
                    });
                } else {
                    toast.error("Unable to update shop, please try again", {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 3000,
                    });
                }
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
                        <title>Shop Edit | R Admin</title>
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
                                                        {nameExistsError && <div className="text-danger">{nameExistsError}</div>}
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

                                                <div className="col-lg-12 mb-2">
                                                    <div className="mb-3">
                                                        <label className="text-label form-label">Description</label>
                                                        <Editor
                                                            value={shopData.description}
                                                            onEditorChange={(content, editor) => {
                                                                setShopData({ ...shopData, description: content });
                                                            }}
                                                            apiKey="7l8llyf250xx4h04715gr0uazaz78gbb3jghl18ukqb3pjc0"
                                                            init={{
                                                                plugins:
                                                                    "preview ai tinycomments mentions anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed permanentpen footnotes advtemplate advtable advcode editimage tableofcontents mergetags powerpaste tinymcespellchecker autocorrect a11ychecker typography inlinecss",
                                                                toolbar:
                                                                    "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
                                                                tinycomments_mode: "embedded",
                                                                tinycomments_author: "Author name",
                                                                skin: useDarkMode ? "oxide-dark" : "oxide",
                                                                content_css: useDarkMode ? "dark" : "default",
                                                                ai_request: (request, respondWith) => respondWith.string(() => Promise.reject("See docs to implement AI Assistant")),
                                                            }}
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

export default ShopEdit;
