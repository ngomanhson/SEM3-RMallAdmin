import { Helmet } from "react-helmet";
import Layout from "../../layouts";
import Breadcrumb from "../../layouts/breadcrumb";
import Select from "react-select";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import url from "../../services/url";
import api from "../../services/api";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { format } from "date-fns";

function MovieEdit() {
    const { id } = useParams();
    const [movieData, setMovieData] = useState({});
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
    // useEffect(() => {
    //     const fetchLanguages = async () => {
    //         try {
    //             const response = await api.get(url.LANGUAGE.LIST);
    //             const languageData = response.data.map((language) => ({
    //                 value: language.id,
    //                 label: language.name,
    //             }));
    //             setLanguages(languageData);
    //         } catch (error) {}
    //     };
    //     fetchLanguages();
    // }, []);
    // //hien thi select genre
    // useEffect(() => {
    //     const fetchGenres = async () => {
    //         try {
    //             const response = await api.get(url.GENRE.LIST);
    //             const genreData = response.data.map((genre) => ({
    //                 value: genre.id,
    //                 label: genre.name,
    //             }));
    //             setGenres(genreData);
    //         } catch (error) {}
    //     };
    //     fetchGenres();
    // }, []);

    //options của rangting
    const optionsRating = [
        { value: 1, label: "1" },
        { value: 2, label: "2" },
        { value: 3, label: "3" },
        { value: 4, label: "4" },
        { value: 5, label: "5" },
    ];
    const handleChangeRating = (selectedOption) => {
        setMovieData({ ...movieData, ratings: selectedOption.value });
    };

    //hiển thị video trailer
    const [videoUrl, setVideoUrl] = useState("");

    //validate
    const validateForm = () => {
        let valid = true;
        const newErrors = {};
        if (movieData.title === "") {
            newErrors.title = "Please enter name movie";
            valid = false;
        } else if (movieData.title.length < 3) {
            newErrors.title = "Enter at least 3 characters";
            valid = false;
        } else if (movieData.title.length > 255) {
            newErrors.title = "Enter up to 255 characters";
            valid = false;
        }
        if (movieData.actor === "") {
            newErrors.actor = "Please enter actor";
            valid = false;
        }
        if (movieData.movie_image === null) {
            newErrors.movie_image = "Please choose movie photo";
            valid = false;
        }
        if (movieData.cover_image === null) {
            newErrors.cover_image = "Please choose movie cover photo";
            valid = false;
        }
        if (movieData.director === "") {
            newErrors.director = "Please enter director";
            valid = false;
        }
        if (movieData.duration === "") {
            newErrors.duration = "Please enter duration";
            valid = false;
        } else {
            const durationValue = parseFloat(movieData.duration);
            if (isNaN(durationValue) || durationValue < 1 || durationValue > 5) {
                newErrors.duration = "Please enter a valid duration between 1 and 5 hours";
                valid = false;
            }
        }
        if (movieData.ratings === "") {
            newErrors.ratings = "Please choose ratings";
            valid = false;
        }
        if (movieData.release_date === "") {
            newErrors.release_date = "Please enter release_date";
            valid = false;
        }
        if (movieData.genreIds === "") {
            newErrors.genreIds = "Please choose genre";
            valid = false;
        }
        // if (movieData.languageIds === "") {
        //     newErrors.languageIds = "Please choose language";
        //     valid = false;
        // }
        setErrors(newErrors);
        return valid;
    };

    //hien thi thong tin movie
    useEffect(() => {
        api.get(`${url.MOVIE.DETAIL.replace("{}", id)}`)
            .then((response) => {
                const initialMovieData = {
                    ...response.data,
                    movie_image: response.data.movie_image,
                    release_date: format(new Date(response.data.release_date), "yyyy-MM-dd"),
                };
                setMovieData(initialMovieData);
            })
            .catch((error) => {
                console.error("Error fetching movie details:", error);
            });
    }, [id]);

    //xử lý update phim
    const handleSubmit = async (e) => {
        e.preventDefault();
        const isFormValid = validateForm();
        if (isFormValid) {
            try {
                const response = await api.put(url.MOVIE.UPDATE, movieData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
                if (response && response.data) {
                    console.log(response.data);
                    toast.success("Update Movie Successffuly.", {
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
                    toast.error("Unable to update movie, please try again", {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 3000,
                    });
                }
                console.error("Error creating test:", error);
                console.error("Response data:", error.response.data);
            }
        }
    };

    //xử lý tải file ảnh
    const handleMovieImageChange = (e) => {
        const { files } = e.target;
        setMovieData({
            ...movieData,
            movie_image: files.length > 0 ? URL.createObjectURL(files[0]) : null,
        });
    };
    const handleFileMovieChange = (e, fieldName) => {
        const { files } = e.target;
        setMovieData({
            ...movieData,
            [fieldName]: fieldName === "movie_image" ? (files.length > 0 ? files[0] : null) : null,
        });
    };
    // const handleFileCoverChange = (e, fieldName) => {
    //     const { files } = e.target;
    //     setMovieData({
    //         ...movieData,
    //         [fieldName]: fieldName === "cover_image" ? (files.length > 0 ? files[0] : null) : null,
    //     });
    // };
    return (
        <>
            <Helmet>
                <title>Movie Edit | R Mall</title>
            </Helmet>
            <Layout>
                <Breadcrumb title="Movie Edit" />
                <div className="row">
                    <div className="col-xl-12 col-xxl-12">
                        <div className="card">
                            <div className="card-header">
                                <h4 className="card-title">Movie Edit</h4>
                            </div>
                            <div className="card-body">
                                <form onSubmit={handleSubmit}>
                                    <div className="row">
                                        <div className="col-lg-6 mb-2">
                                            <div className="mb-3">
                                                <label className="text-label form-label">
                                                    Movie Name <span className="text-danger">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    value={movieData.title}
                                                    onChange={(e) =>
                                                        setMovieData({
                                                            ...movieData,
                                                            title: e.target.value,
                                                        })
                                                    }
                                                    className="form-control"
                                                />
                                                {errors.title && <div className="text-danger">{errors.title}</div>}
                                                {nameExistsError && <div className="text-danger">{nameExistsError}</div>}
                                            </div>
                                        </div>

                                        <div className="col-lg-6 mb-2">
                                            <div className="mb-3">
                                                <label className="text-label form-label">Description</label>
                                                <textarea
                                                    value={movieData.describe}
                                                    onChange={(e) =>
                                                        setMovieData({
                                                            ...movieData,
                                                            describe: e.target.value,
                                                        })
                                                    }
                                                    className="form-control"
                                                ></textarea>
                                            </div>
                                        </div>

                                        <div className="col-lg-6 mb-2">
                                            <div className="mb-3">
                                                <label className="text-label form-label">
                                                    Actor <span className="text-danger">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    value={movieData.actor}
                                                    onChange={(e) =>
                                                        setMovieData({
                                                            ...movieData,
                                                            actor: e.target.value,
                                                        })
                                                    }
                                                    className="form-control"
                                                />
                                                {errors.actor && <div className="text-danger">{errors.actor}</div>}
                                            </div>
                                        </div>

                                        <div className="col-lg-6 mb-2">
                                            <div className="mb-3">
                                                <label className="text-label form-label">
                                                    Director <span className="text-danger">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    value={movieData.director}
                                                    onChange={(e) =>
                                                        setMovieData({
                                                            ...movieData,
                                                            director: e.target.value,
                                                        })
                                                    }
                                                    className="form-control"
                                                />
                                                {errors.director && <div className="text-danger">{errors.director}</div>}
                                            </div>
                                        </div>

                                        <div className="col-lg-6 mb-2">
                                            <div className="mb-3">
                                                <label className="text-label form-label">
                                                    Ratings <span className="text-danger">*</span>
                                                </label>
                                                <Select
                                                    value={optionsRating.find((option) => option.value === parseInt(movieData.ratings, 10))}
                                                    styles={customStyles}
                                                    onChange={handleChangeRating}
                                                    options={optionsRating}
                                                />
                                                {errors.ratings && <div className="text-danger">{errors.ratings}</div>}
                                            </div>
                                        </div>

                                        {/* <div className="col-lg-6 mb-2">
                                            <div className="mb-3">
                                                <label className="text-label form-label">
                                                    Languages <span className="text-danger">*</span>
                                                </label>
                                                <Select
                                                    name="languageIds"
                                                    value={languages.filter((option) => movieData.languageIds.includes(option.value))}
                                                    isMulti
                                                    closeMenuOnSelect={false}
                                                    styles={customStyles}
                                                    onChange={(selectedOption) => {
                                                        setMovieData({ ...movieData, languageIds: selectedOption.map((option) => option.value) });
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
                                                    value={genres.filter((option) => movieData.genreIds.includes(option.value))}
                                                    isMulti
                                                    closeMenuOnSelect={false}
                                                    styles={customStyles}
                                                    onChange={(selectedOption) => {
                                                        setMovieData({ ...movieData, genreIds: selectedOption.map((option) => option.value) });
                                                    }}
                                                    options={genres}
                                                    placeholder="Select Genres"
                                                />
                                                {errors.genreIds && <div className="text-danger">{errors.genreIds}</div>}
                                            </div>
                                        </div> */}

                                        <div className="col-lg-6 mb-2">
                                            <div className="mb-3">
                                                <label className="text-label form-label">
                                                    Release date <span className="text-danger">*</span>
                                                </label>
                                                <input
                                                    type="date"
                                                    value={movieData.release_date}
                                                    onChange={(e) =>
                                                        setMovieData({
                                                            ...movieData,
                                                            release_date: e.target.value,
                                                        })
                                                    }
                                                    className="form-control"
                                                />
                                                {errors.release_date && <div className="text-danger">{errors.release_date}</div>}
                                            </div>
                                        </div>

                                        <div className="col-lg-6 mb-2">
                                            <div className="mb-3">
                                                <label className="text-label form-label">
                                                    Movie duration (Hours) <span className="text-danger">*</span>
                                                </label>
                                                <input
                                                    type="number"
                                                    value={movieData.duration}
                                                    onChange={(e) =>
                                                        setMovieData({
                                                            ...movieData,
                                                            duration: e.target.value,
                                                        })
                                                    }
                                                    className="form-control"
                                                />
                                                {errors.duration && <div className="text-danger">{errors.duration}</div>}
                                            </div>
                                        </div>

                                        <div className="col-lg-6 mb-2">
                                            <div className="mb-3">
                                                <label className="text-label form-label">
                                                    Movie photos <span className="text-danger">*</span>
                                                </label>
                                                <input type="file" onChange={handleMovieImageChange} className="form-control" accept=".jpg, .png, .etc" />
                                                {errors.movie_image && <div className="text-danger">{errors.movie_image}</div>}
                                            </div>
                                        </div>

                                        {/* <div className="col-lg-6 mb-2">
                                            <div className="mb-3">
                                                <label className="text-label form-label">
                                                    Movie cover photo <span className="text-danger">*</span>
                                                </label>
                                                <input type="file" name="cover_image" onChange={handleChange} className="form-control" accept=".jpg, .png, .etc" />
                                                {errors.cover_image && <div className="text-danger">{errors.cover_image}</div>}
                                            </div>
                                        </div> */}

                                        <div className="col-lg-6 mb-2">
                                            <div className="mb-3">
                                                <label className="text-label form-label">Video Trailer</label>
                                                <input
                                                    type="text"
                                                    name="trailer"
                                                    className="form-control"
                                                    value={movieData.trailer}
                                                    onChange={(e) => {
                                                        setVideoUrl(e.target.value);
                                                        setMovieData({ ...movieData, trailer: e.target.value });
                                                    }}
                                                />
                                            </div>
                                        </div>

                                        <div className="col-lg-2 mb-2">
                                            <div className="mb-3">
                                                <label className="text-label form-label">Preview movie photos</label>
                                                {movieData.movie_image && <img src={movieData.movie_image} alt="Movie Preview" style={{ width: "100%", height: "200px", objectFit: "cover" }} />}
                                            </div>
                                        </div>

                                        {/* <div className="col-lg-2 mb-2">
                                            <div className="mb-3">
                                                <label className="text-label form-label">Preview movie cover photo</label>
                                                {movieData.cover_image && <img src={movieData.cover_image} alt="Cover Preview" style={{ width: "100%", height: "200px", objectFit: "cover" }} />}
                                            </div>
                                        </div> */}

                                        <div className="col-lg-2 mb-2">
                                            <div className="mb-3">
                                                <label className="text-label form-label">Preview Trailer</label>
                                                {movieData.trailer && <ReactPlayer url={movieData.trailer} width="100%" height="200px" controls />}
                                            </div>
                                        </div>

                                        <div className="text-end">
                                            <button type="submit" className="btn btn-default">
                                                Update Movie
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

export default MovieEdit;
