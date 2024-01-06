import { Helmet } from "react-helmet";
import Layout from "../../layouts";
import Breadcrumb from "../../layouts/breadcrumb";
import { useState } from "react";
import url from "../../services/url";
import api from "../../services/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function FoodCreate() {
    const [formFood, setFormFood] = useState({
        name: "",
        image: null,
        price: "",
        quantity: "",
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    //validate
    const validateForm = () => {
        let valid = true;
        const newErrors = {};
        if (formFood.name === "") {
            newErrors.name = "Please enter name food";
            valid = false;
        } else if (formFood.name.length < 3) {
            newErrors.name = "Enter at least 3 characters";
            valid = false;
        } else if (formFood.name.length > 255) {
            newErrors.name = "Enter up to 255 characters";
            valid = false;
        }
        if (formFood.image === null) {
            newErrors.image = "Please choose food photo";
            valid = false;
        }
        if (formFood.price === "") {
            newErrors.price = "Please enter price";
            valid = false;
        }
        if (formFood.quantity === "") {
            newErrors.quantity = "Please enter quantity";
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    //xử lý tạo food
    const handleSubmit = async (e) => {
        e.preventDefault();
        const isFormValid = validateForm();

        if (isFormValid) {
            try {
                const response = await api.post(url.FOOD.CREATE, formFood, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
                if (response.status === 201) {
                    // console.log(response.data);
                    toast.success("Create Food Successffuly.", {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 3000,
                    });
                    setTimeout(() => {
                        navigate(`/food-list`); //chuyển đến trang food-list
                    }, 3000);
                } else {
                }
            } catch (error) {
                toast.error("Unable to create food, please try again", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 3000,
                });
                // console.error("Error creating test:", error);
                // console.error("Response data:", error.response.data);
            }
        }
    };

    //xử lý tải file ảnh
    const handleFileFoodChange = (e, fieldName) => {
        const { files } = e.target;
        const selectedImage = files.length > 0 ? URL.createObjectURL(files[0]) : null;

        setFormFood({
            ...formFood,
            [fieldName]: fieldName === "image" ? (files.length > 0 ? files[0] : null) : null,
            image_preview: selectedImage,
        });
    };
    const handleChange = (e) => {
        const { name } = e.target;
        if (name === "image") {
            handleFileFoodChange(e, name);
        } else {
            const { value } = e.target;
            setFormFood({ ...formFood, [name]: value });
        }
    };

    return (
        <>
            <Helmet>
                <title>Food Create | R Mall</title>
            </Helmet>
            <Layout>
                <Breadcrumb title="Food Create" />
                <div className="row">
                    <div className="col-xl-12 col-xxl-12">
                        <div className="card">
                            <div className="card-header">
                                <h4 className="card-title">Food Create</h4>
                            </div>
                            <div className="card-body">
                                <form onSubmit={handleSubmit}>
                                    <div className="row">
                                        <div className="col-lg-6 mb-2">
                                            <div className="mb-3">
                                                <label className="text-label form-label">
                                                    Food Name <span className="text-danger">*</span>
                                                </label>
                                                <input type="text" name="name" onChange={handleChange} className="form-control" placeholder="Please enter name food" autoFocus />
                                                {errors.name && <div className="text-danger">{errors.name}</div>}
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
                                                {errors.price && <div className="text-danger">{errors.price}</div>}
                                            </div>
                                        </div>

                                        <div className="col-lg-6 mb-2">
                                            <div className="mb-3">
                                                <label className="text-label form-label">
                                                    Quantity <span className="text-danger">*</span>
                                                </label>
                                                <input type="number" name="quantity" onChange={handleChange} className="form-control" placeholder="Please enter quantity" />
                                                {errors.quantity && <div className="text-danger">{errors.quantity}</div>}
                                            </div>
                                        </div>

                                        <div className="col-lg-6 mb-2">
                                            <div className="mb-3">
                                                <label className="text-label form-label">Preview food photo</label>
                                                {formFood.image_preview && <img src={formFood.image_preview} alt="Food Preview" style={{ width: "100%", height: "300px", objectFit: "cover" }} />}
                                            </div>
                                        </div>

                                        <div className="text-end">
                                            <button type="submit" className="btn btn-default">
                                                Save
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

export default FoodCreate;
