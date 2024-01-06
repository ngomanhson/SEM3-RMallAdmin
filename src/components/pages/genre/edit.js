import { Helmet } from "react-helmet";
import Layout from "../../layouts";
import Breadcrumb from "../../layouts/breadcrumb";
import { useEffect, useState } from "react";
import url from "../../services/url";
import api from "../../services/api";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../layouts/loading";

function GenreEdit() {
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, []);

    const { id } = useParams();
    const [genreData, setGenreData] = useState({});
    const [errors, setErrors] = useState({});
    const [nameExistsError, setNameExistsError] = useState("");
    const navigate = useNavigate();

    //validate
    const validateForm = () => {
        let valid = true;
        const newErrors = {};
        if (genreData.name === "") {
            newErrors.name = "Please enter name genre";
            valid = false;
        } else if (genreData.name.length < 3) {
            newErrors.name = "Enter at least 3 characters";
            valid = false;
        } else if (genreData.name.length > 255) {
            newErrors.name = "Enter up to 255 characters";
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    //hien thi thong tin genre
    useEffect(() => {
        api.get(`${url.GENRE.DETAIL.replace("{}", id)}`)
            .then((response) => {
                setGenreData(response.data);
            })
            .catch((error) => {
                // console.error("Error fetching promotion details:", error);
            });
    }, [id]);

    //xử lý update genre
    const handleSubmit = async (e) => {
        e.preventDefault();
        const isFormValid = validateForm();

        if (isFormValid) {
            try {
                const response = await api.put(url.GENRE.UPDATE, genreData);
                if (response.status === 200) {
                    // console.log(response.data);
                    toast.success("Update Genre Successffuly.", {
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
                    toast.error("Unable to update genre, please try again", {
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
                <title>Genre Edit | R Mall</title>
            </Helmet>
            {loading ? <Loading /> : ""}
            <Layout>
                <Breadcrumb title="Genre Edit" />
                <div className="row">
                    <div className="col-xl-12 col-xxl-12">
                        <div className="card">
                            <div className="card-header">
                                <h4 className="card-title">Genre Edit</h4>
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
                                                <input
                                                    type="text"
                                                    value={genreData.name}
                                                    onChange={(e) =>
                                                        setGenreData({
                                                            ...genreData,
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
                                        <div className="col-lg-3 mb-2"></div>
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

export default GenreEdit;
