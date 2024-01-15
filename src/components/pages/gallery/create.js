import { Helmet } from "react-helmet";
import Layout from "../../layouts";
import Breadcrumb from "../../layouts/breadcrumb";
import { useState } from "react";
import url from "../../services/url";
import api from "../../services/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import NotFound from "../../pages/other/not-found";
import { useEffect } from "react";

function GalleryCreate() {
    const [formGallery, setFormGallery] = useState({
        productName: "",
        description: "",
        imagePath: null,
    });
    const [userRole, setUserRole] = useState(null);
    const [error, setError] = useState(null);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    //validate
    const validateForm = () => {
        let valid = true;
        const newErrors = {};
        if (formGallery.productName === "") {
            newErrors.productName = "Please enter name gallery";
            valid = false;
        } else if (formGallery.productName.length < 3) {
            newErrors.productName = "Enter at least 3 characters";
            valid = false;
        } else if (formGallery.productName.length > 255) {
            newErrors.productName = "Enter up to 255 characters";
            valid = false;
        }
        if (formGallery.imagePath === null) {
            newErrors.imagePath = "Please choose gallery photo";
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    //xử lý tạo gallery
    const handleSubmit = async (e) => {
        e.preventDefault();
        const isFormValid = validateForm();

        if (isFormValid) {
            const userToken = localStorage.getItem("access_token");
            api.defaults.headers.common["Authorization"] = `Bearer ${userToken}`;
            try {
                const response = await api.post(url.GALLERY.CREATE, formGallery, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
                if (response.status === 201) {
                    // console.log(response.data);
                    toast.success("Create Gallery Successffuly.", {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 3000,
                    });
                    setTimeout(() => {
                        navigate(`/gallery-list`); //chuyển đến trang gallery-list
                    }, 3000);
                } else {
                }
            } catch (error) {
                toast.error("Unable to create gallery, please try again", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 3000,
                });
                // console.error("Error creating test:", error);
                // console.error("Response data:", error.response.data);
            }
        }
    };

    //xử lý tải file ảnh
    const handleFileGalleryChange = (e, fieldName) => {
        const { files } = e.target;
        const selectedImage = files.length > 0 ? URL.createObjectURL(files[0]) : null;

        setFormGallery({
            ...formGallery,
            [fieldName]: fieldName === "imagePath" ? (files.length > 0 ? files[0] : null) : null,
            image_preview: selectedImage,
        });
    };
    const handleChange = (e) => {
        const { name } = e.target;
        if (name === "imagePath") {
            handleFileGalleryChange(e, name);
        } else {
            const { value } = e.target;
            setFormGallery({ ...formGallery, [name]: value });
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
                        <title>Gallery Create | R Admin</title>
                    </Helmet>
                    <Layout>
                        <Breadcrumb title="Gallery Create" />
                        <div className="row">
                            <div className="col-xl-12 col-xxl-12">
                                <div className="card">
                                    <div className="card-header">
                                        <h4 className="card-title">Gallery Create</h4>
                                    </div>
                                    <div className="card-body">
                                        <form onSubmit={handleSubmit}>
                                            <div className="row">
                                                <div className="col-lg-6 mb-2">
                                                    <div className="mb-3">
                                                        <label className="text-label form-label">
                                                            Gallery Name <span className="text-danger">*</span>
                                                        </label>
                                                        <input type="text" name="productName" onChange={handleChange} className="form-control" placeholder="Please enter name gallery" autoFocus />
                                                        {errors.productName && <div className="text-danger">{errors.productName}</div>}
                                                    </div>
                                                </div>

                                                <div className="col-lg-6 mb-2">
                                                    <div className="mb-3">
                                                        <label className="text-label form-label">Description</label>
                                                        <input type="text" name="description" onChange={handleChange} className="form-control" placeholder="Please enter description" />
                                                        {errors.description && <div className="text-danger">{errors.description}</div>}
                                                    </div>
                                                </div>

                                                <div className="col-lg-6 mb-2">
                                                    <div className="mb-3">
                                                        <label className="text-label form-label">
                                                            Thumbnail <span className="text-danger">*</span>
                                                        </label>
                                                        <input type="file" name="imagePath" onChange={handleChange} className="form-control" accept=".jpg, .png, .etc" />
                                                        {errors.imagePath && <div className="text-danger">{errors.imagePath}</div>}
                                                    </div>
                                                </div>

                                                <div className="col-lg-6 mb-2">
                                                    <div className="mb-3">
                                                        <label className="text-label form-label">Preview gallery photo</label>
                                                        {formGallery.image_preview && (
                                                            <img src={formGallery.image_preview} alt="Gallery Preview" style={{ width: "100%", height: "300px", objectFit: "cover" }} />
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

export default GalleryCreate;
