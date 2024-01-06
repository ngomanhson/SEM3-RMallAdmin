import { Helmet } from "react-helmet";
import Layout from "../../layouts";
import Breadcrumb from "../../layouts/breadcrumb";
import { useState } from "react";
import url from "../../services/url";
import api from "../../services/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function GenreCreate() {
    const [formGenre, setFormGenre] = useState({
        name: "",
    });
    const [errors, setErrors] = useState({});
    const [nameExistsError, setNameExistsError] = useState("");
    const navigate = useNavigate();

    //validate
    const validateForm = () => {
        let valid = true;
        const newErrors = {};
        if (formGenre.name === "") {
            newErrors.name = "Please enter name genre";
            valid = false;
        } else if (formGenre.name.length < 3) {
            newErrors.name = "Enter at least 3 characters";
            valid = false;
        } else if (formGenre.name.length > 255) {
            newErrors.name = "Enter up to 255 characters";
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    //xử lý tạo genre
    const handleSubmit = async (e) => {
        e.preventDefault();
        const isFormValid = validateForm();

        if (isFormValid) {
            try {
                const response = await api.post(url.GENRE.CREATE, formGenre);
                if (response.status === 201) {
                    // console.log(response.data);
                    toast.success("Create Genre Successffuly.", {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 3000,
                    });
                    setTimeout(() => {
                        navigate(`/genre-list`); //chuyển đến trang genre-list
                    }, 3000);
                } else {
                }
            } catch (error) {
                if (error.response.status === 400 && error.response.data.message === "Genre already exists") {
                    setNameExistsError("The name of this genre already exists");
                    toast.error("The name of this genre already exists", {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 3000,
                    });
                } else {
                    toast.error("Unable to create genre, please try again", {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 3000,
                    });
                }
                // console.error("Error creating test:", error);
                // console.error("Response data:", error.response.data);
            }
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormGenre({ ...formGenre, [name]: value });
        setNameExistsError("");
    };

    return (
        <>
            <Helmet>
                <title>Genre Create | R Mall</title>
            </Helmet>
            <Layout>
                <Breadcrumb title="Genre Create" />
                <div className="row">
                    <div className="col-xl-12 col-xxl-12">
                        <div className="card">
                            <div className="card-header">
                                <h4 className="card-title">Genre Create</h4>
                            </div>
                            <div className="card-body">
                                <form onSubmit={handleSubmit}>
                                    <div className="row">
                                        <div className="col-lg-3 mb-2"></div>
                                        <div className="col-lg-6 mb-2">
                                            <div className="mb-3">
                                                <label className="text-label form-label">
                                                    Genre Name <span className="text-danger">*</span>
                                                </label>
                                                <input type="text" name="name" onChange={handleChange} className="form-control" placeholder="Please enter name genre" autoFocus />
                                                {errors.name && <div className="text-danger">{errors.name}</div>}
                                                {nameExistsError && <div className="text-danger">{nameExistsError}</div>}
                                            </div>
                                        </div>
                                        <div className="col-lg-3 mb-2"></div>
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
    );
}

export default GenreCreate;
