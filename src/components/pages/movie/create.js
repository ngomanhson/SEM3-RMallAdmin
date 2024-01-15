import { Helmet } from "react-helmet";
import Layout from "../../layouts";
import Breadcrumb from "../../layouts/breadcrumb";
import Select from "react-select";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import url from "../../services/url";
import api from "../../services/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import NotFound from "../../pages/other/not-found";

function MovieCreate() {
    const [formMovie, setFormMovie] = useState({
        title: "",
        actor: "",
        movie_image: null,
        cover_image: null,
        describe: "",
        director: "",
        duration: "",
        trailer: "",
        release_date: "",
        genreIds: [],
        languageIds: [],
        movie_image_preview: null,
        movie_cover_image_preview: null,
    });
    const [userRole, setUserRole] = useState(null);
    const [error, setError] = useState(null);
    const [errors, setErrors] = useState({});
    const [nameExistsError, setNameExistsError] = useState("");
    const [languages, setLanguages] = useState([]);
    const [genres, setGenres] = useState([]);
    const navigate = useNavigate();

    //css background Select React
    const customStyles = {
        control: (provided, state) => ({
            ...provided,
            backgroundColor: "#5336BC",
        }),
        option: (provided, state) => ({
            ...provided,
            // backgroundColor: "#5336BC",
            color: "#333333",
        }),
    };
    //hiển thị select langueage
    useEffect(() => {
        const fetchLanguages = async () => {
            const userToken = localStorage.getItem("access_token");
            api.defaults.headers.common["Authorization"] = `Bearer ${userToken}`;
            try {
                const response = await api.get(url.LANGUAGE.LIST);
                const languageData = response.data.map((language) => ({
                    value: language.id,
                    label: language.name,
                }));
                setLanguages(languageData);
            } catch (error) {}
        };
        fetchLanguages();
    }, []);
    //hien thi select genre
    useEffect(() => {
        const fetchGenres = async () => {
            const userToken = localStorage.getItem("access_token");
            api.defaults.headers.common["Authorization"] = `Bearer ${userToken}`;
            try {
                const response = await api.get(url.GENRE.LIST);
                const genreData = response.data.map((genre) => ({
                    value: genre.id,
                    label: genre.name,
                }));
                setGenres(genreData);
            } catch (error) {}
        };
        fetchGenres();
    }, []);

    //hiển thị video trailer
    const [videoUrl, setVideoUrl] = useState("");

    //validate
    const validateForm = () => {
        let valid = true;
        const newErrors = {};
        if (formMovie.title === "") {
            newErrors.title = "Please enter name movie";
            valid = false;
        } else if (formMovie.title.length < 3) {
            newErrors.title = "Enter at least 3 characters";
            valid = false;
        } else if (formMovie.title.length > 255) {
            newErrors.title = "Enter up to 255 characters";
            valid = false;
        }
        if (formMovie.actor === "") {
            newErrors.actor = "Please enter actor";
            valid = false;
        }
        if (formMovie.movie_image === null) {
            newErrors.movie_image = "Please choose movie photo";
            valid = false;
        }
        if (formMovie.cover_image === null) {
            newErrors.cover_image = "Please choose movie cover photo";
            valid = false;
        }
        if (formMovie.director === "") {
            newErrors.director = "Please enter director";
            valid = false;
        }
        if (formMovie.duration === "") {
            newErrors.duration = "Please enter duration";
            valid = false;
        } else {
            const durationValue = parseFloat(formMovie.duration);
            if (isNaN(durationValue) || durationValue < 60 || durationValue > 200) {
                newErrors.duration = "Please enter a valid duration between 60 and 200 Minute";
                valid = false;
            }
        }
        if (formMovie.release_date === "") {
            newErrors.release_date = "Please enter release date";
            valid = false;
        }
        if (formMovie.genreIds === "") {
            newErrors.genreIds = "Please choose genre";
            valid = false;
        }
        if (formMovie.languageIds === "") {
            newErrors.languageIds = "Please choose language";
            valid = false;
        }
        setErrors(newErrors);
        return valid;
    };

    //xử lý tạo phim
    const handleSubmit = async (e) => {
        e.preventDefault();
        const isFormValid = validateForm();

        if (isFormValid) {
            const userToken = localStorage.getItem("access_token");
            api.defaults.headers.common["Authorization"] = `Bearer ${userToken}`;
            try {
                const response = await api.post(url.MOVIE.CREATE, formMovie, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
                if (response && response.data) {
                    // console.log(response.data);
                    toast.success("Create Movie Successffuly.", {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 3000,
                    });
                    setTimeout(() => {
                        navigate(`/movie-list`); //chuyển đến trang movie-list
                    }, 3000);
                } else {
                }
            } catch (error) {
                if (error.response.status === 400 && error.response.data.message === "Movie already exists") {
                    setNameExistsError("The name of this movie already exists");
                    toast.error("The name of this movie already exists", {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 3000,
                    });
                } else {
                    toast.error("Unable to create movie, please try again", {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 3000,
                    });
                }
                // console.error("Error creating test:", error);
                // console.error("Response data:", error.response.data);
            }
        }
    };

    //xử lý tải file ảnh
    const handleFileMovieChange = (e, fieldName) => {
        const { files } = e.target;
        const selectedImage = files.length > 0 ? URL.createObjectURL(files[0]) : null;

        setFormMovie({
            ...formMovie,
            [fieldName]: fieldName === "movie_image" ? (files.length > 0 ? files[0] : null) : null,
            movie_image_preview: selectedImage,
        });
    };
    const handleFileCoverChange = (e, fieldName) => {
        const { files } = e.target;
        const selectedImage = files.length > 0 ? URL.createObjectURL(files[0]) : null;

        setFormMovie({
            ...formMovie,
            [fieldName]: fieldName === "cover_image" ? (files.length > 0 ? files[0] : null) : null,
            movie_cover_image_preview: selectedImage,
        });
    };
    const handleChange = (e) => {
        const { name } = e.target;
        if (name === "movie_image") {
            handleFileMovieChange(e, name);
        } else if (name === "cover_image") {
            handleFileCoverChange(e, name);
        } else {
            const { value } = e.target;
            setFormMovie({ ...formMovie, [name]: value });
        }
        setNameExistsError("");
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
                        <title>Movie Create | R Admin</title>
                    </Helmet>
                    <Layout>
                        <Breadcrumb title="Movie Create" />
                        <div className="row">
                            <div className="col-xl-12 col-xxl-12">
                                <div className="card">
                                    <div className="card-header">
                                        <h4 className="card-title">Movie Create</h4>
                                    </div>
                                    <div className="card-body">
                                        <form onSubmit={handleSubmit}>
                                            <div className="row">
                                                <div className="col-lg-6 mb-2">
                                                    <div className="mb-3">
                                                        <label className="text-label form-label">
                                                            Movie Name <span className="text-danger">*</span>
                                                        </label>
                                                        <input type="text" name="title" onChange={handleChange} className="form-control" placeholder="Please enter movie name" autoFocus />
                                                        {errors.title && <div className="text-danger">{errors.title}</div>}
                                                        {nameExistsError && <div className="text-danger">{nameExistsError}</div>}
                                                    </div>
                                                </div>

                                                <div className="col-lg-6 mb-2">
                                                    <div className="mb-3">
                                                        <label className="text-label form-label">Description</label>
                                                        <textarea name="describe" onChange={handleChange} className="form-control"></textarea>
                                                    </div>
                                                </div>

                                                <div className="col-lg-6 mb-2">
                                                    <div className="mb-3">
                                                        <label className="text-label form-label">
                                                            Actor <span className="text-danger">*</span>
                                                        </label>
                                                        <input type="text" name="actor" onChange={handleChange} className="form-control" placeholder="Please enter actor name" />
                                                        {errors.actor && <div className="text-danger">{errors.actor}</div>}
                                                    </div>
                                                </div>

                                                <div className="col-lg-6 mb-2">
                                                    <div className="mb-3">
                                                        <label className="text-label form-label">
                                                            Director <span className="text-danger">*</span>
                                                        </label>
                                                        <input type="text" name="director" onChange={handleChange} className="form-control" placeholder="Please enter director name" />
                                                        {errors.director && <div className="text-danger">{errors.director}</div>}
                                                    </div>
                                                </div>

                                                <div className="col-lg-6 mb-2">
                                                    <div className="mb-3">
                                                        <label className="text-label form-label">
                                                            Languages <span className="text-danger">*</span>
                                                        </label>
                                                        <Select
                                                            name="languageIds"
                                                            value={languages.filter((option) => formMovie.languageIds.includes(option.value))}
                                                            isMulti
                                                            closeMenuOnSelect={false}
                                                            styles={customStyles}
                                                            onChange={(selectedOption) => {
                                                                setFormMovie({ ...formMovie, languageIds: selectedOption.map((option) => option.value) });
                                                            }}
                                                            options={languages}
                                                            placeholder="Select Languages"
                                                        />
                                                        {errors.languageIds && <div className="text-danger">{errors.languageIds}</div>}
                                                    </div>
                                                </div>

                                                <div className="col-lg-6 mb-2">
                                                    <div className="mb-3">
                                                        <label className="text-label form-label">
                                                            Movie Genre <span className="text-danger">*</span>
                                                        </label>
                                                        <Select
                                                            name="genreIds"
                                                            value={genres.filter((option) => formMovie.genreIds.includes(option.value))}
                                                            isMulti
                                                            closeMenuOnSelect={false}
                                                            styles={customStyles}
                                                            onChange={(selectedOption) => {
                                                                setFormMovie({ ...formMovie, genreIds: selectedOption.map((option) => option.value) });
                                                            }}
                                                            options={genres}
                                                            placeholder="Select Genres"
                                                        />
                                                        {errors.genreIds && <div className="text-danger">{errors.genreIds}</div>}
                                                    </div>
                                                </div>

                                                <div className="col-lg-6 mb-2">
                                                    <div className="mb-3">
                                                        <label className="text-label form-label">
                                                            Release date <span className="text-danger">*</span>
                                                        </label>
                                                        <input type="date" name="release_date" onChange={handleChange} className="form-control" placeholder="example@gmail.com" />
                                                        {errors.release_date && <div className="text-danger">{errors.release_date}</div>}
                                                    </div>
                                                </div>

                                                <div className="col-lg-6 mb-2">
                                                    <div className="mb-3">
                                                        <label className="text-label form-label">
                                                            Movie duration (Minute) <span className="text-danger">*</span>
                                                        </label>
                                                        <input type="number" name="duration" onChange={handleChange} className="form-control" placeholder="Please enter duration" />
                                                        {errors.duration && <div className="text-danger">{errors.duration}</div>}
                                                    </div>
                                                </div>

                                                <div className="col-lg-6 mb-2">
                                                    <div className="mb-3">
                                                        <label className="text-label form-label">
                                                            Movie photos <span className="text-danger">*</span>
                                                        </label>
                                                        <input type="file" name="movie_image" onChange={handleChange} className="form-control" accept=".jpg, .png, .etc" />
                                                        {errors.movie_image && <div className="text-danger">{errors.movie_image}</div>}
                                                    </div>
                                                </div>

                                                <div className="col-lg-6 mb-2">
                                                    <div className="mb-3">
                                                        <label className="text-label form-label">
                                                            Movie cover photo <span className="text-danger">*</span>
                                                        </label>
                                                        <input type="file" name="cover_image" onChange={handleChange} className="form-control" accept=".jpg, .png, .etc" />
                                                        {errors.cover_image && <div className="text-danger">{errors.cover_image}</div>}
                                                    </div>
                                                </div>

                                                <div className="col-lg-6 mb-2">
                                                    <div className="mb-3">
                                                        <label className="text-label form-label">Video Trailer</label>
                                                        <input
                                                            type="text"
                                                            name="trailer"
                                                            className="form-control"
                                                            placeholder="Please enter YouTube video URL"
                                                            value={videoUrl}
                                                            onChange={(e) => {
                                                                setVideoUrl(e.target.value);
                                                                setFormMovie({ ...formMovie, trailer: e.target.value });
                                                            }}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="col-lg-2 mb-2">
                                                    <div className="mb-3">
                                                        <label className="text-label form-label">Preview movie photos</label>
                                                        {formMovie.movie_image_preview && (
                                                            <img src={formMovie.movie_image_preview} alt="Movie Preview" style={{ width: "100%", height: "200px", objectFit: "cover" }} />
                                                        )}
                                                    </div>
                                                </div>

                                                <div className="col-lg-2 mb-2">
                                                    <div className="mb-3">
                                                        <label className="text-label form-label">Preview movie cover photo</label>
                                                        {formMovie.movie_cover_image_preview && (
                                                            <img src={formMovie.movie_cover_image_preview} alt="Movie Preview" style={{ width: "100%", height: "200px", objectFit: "cover" }} />
                                                        )}
                                                    </div>
                                                </div>

                                                <div className="col-lg-2 mb-2">
                                                    <div className="mb-3">
                                                        <label className="text-label form-label">Preview Trailer</label>
                                                        {videoUrl && <ReactPlayer url={videoUrl} width="100%" height="200px" controls />}
                                                    </div>
                                                </div>

                                                <div className="text-end">
                                                    <button type="submit" className="btn btn-default">
                                                        Create Movie
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

export default MovieCreate;
