import { Helmet } from "react-helmet";
import Layout from "../../layouts";
import Breadcrumb from "../../layouts/breadcrumb";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import url from "../../services/url";
import api from "../../services/api";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { format } from "date-fns";
import Swal from "sweetalert2";
import Loading from "../../layouts/loading";
import NotFound from "../../pages/other/not-found";

function MovieDetail() {
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
    const [movieDetail, setMovieDetail] = useState({ genres: [], languages: [] });

    //hien thi thong tin chi tiet movie
    useEffect(() => {
        const userToken = localStorage.getItem("access_token");
        api.defaults.headers.common["Authorization"] = `Bearer ${userToken}`;
        api.get(`${url.MOVIE.DETAIL.replace("{}", id)}`)
            .then((response) => {
                setMovieDetail(response.data);
            })
            .catch((error) => {
                // console.error("Error fetching promotion details:", error);
            });
    }, [id]);

    const releaseDate = movieDetail.release_date;
    const formattedDate = releaseDate ? format(new Date(releaseDate), "yyyy-MM-dd") : "N/A";

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
                        <title>Movie Detail | R Admin</title>
                    </Helmet>
                    {loading ? <Loading /> : ""}
                    <Layout>
                        <Breadcrumb title="Movie Detail" />

                        <div className="row">
                            <div className="col-xl-4">
                                <div className="row">
                                    <div className="col-xl-12">
                                        <div className="card">
                                            <div className="card-body">
                                                <div className="profile-blog">
                                                    <h4 className="d-inline">Title Movie :</h4>
                                                    <p className="mb-0">{movieDetail.title}</p>

                                                    <div style={{ paddingTop: "20px" }}>
                                                        <h4 className="d-inline">Actor :</h4>
                                                        <p className="mb-0">{movieDetail.actor}</p>
                                                    </div>

                                                    <div style={{ paddingTop: "20px" }}>
                                                        <h4 className="d-inline">Director :</h4>
                                                        <p className="mb-0">{movieDetail.director}</p>
                                                    </div>

                                                    <div style={{ paddingTop: "20px" }}>
                                                        <h4 className="d-inline">Duration :</h4>
                                                        <p className="mb-0">{movieDetail.duration} minutes</p>
                                                    </div>

                                                    <div style={{ paddingTop: "20px" }}>
                                                        <h4 className="d-inline">Number Of Favorites :</h4>
                                                        <p className="mb-0">{movieDetail.favoriteCount}</p>
                                                    </div>

                                                    <div style={{ paddingTop: "20px" }}>
                                                        <h4 className="d-inline">Number Of Tickets Sold :</h4>
                                                        <p className="mb-0">{movieDetail.totalTicket}</p>
                                                    </div>

                                                    <div style={{ paddingTop: "20px" }}>
                                                        <h4 className="d-inline">Release Date :</h4>
                                                        <p className="mb-0">{formattedDate}</p>
                                                    </div>

                                                    <div style={{ paddingTop: "20px" }}>
                                                        <h4 className="d-inline">Genres Of Movie :</h4>
                                                        <p className="mb-0">
                                                            {movieDetail.genres.map((genre) => (
                                                                <span key={genre.id} className="badge light badge-dark">
                                                                    {genre.name}
                                                                </span>
                                                            ))}
                                                        </p>
                                                    </div>

                                                    <div style={{ paddingTop: "20px" }}>
                                                        <h4 className="d-inline">Languages Of Movie :</h4>
                                                        <p className="mb-0">
                                                            {movieDetail.languages.map((language) => (
                                                                <span key={language.id} className="badge light badge-dark">
                                                                    {language.name}
                                                                </span>
                                                            ))}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-8">
                                <div className="card">
                                    <div className="card-body">
                                        <h4 className="d-inline">Description Movie :</h4>
                                        <div className="post-details">{movieDetail.describe}</div>

                                        <div className="row" style={{ marginTop: "20px" }}>
                                            <div className="col-xl-12">
                                                <h4 className="d-inline">Trailer Movie :</h4>
                                                <div className="post-details">
                                                    <ReactPlayer url={movieDetail.trailer} controls width="100%" height="250px" />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row" style={{ marginTop: "20px" }}>
                                            <div className="col-xl-6">
                                                <h4 className="d-inline">Image Movie :</h4>
                                                <div className="post-details">
                                                    <img src={movieDetail.movie_image} alt="image image" style={{ height: "180px", objectFit: "cover" }} className="img-fluid mt-4 mb-4 w-100" />
                                                </div>
                                            </div>
                                            <div className="col-xl-6">
                                                <h4 className="d-inline">Cover Image :</h4>
                                                <div className="post-details">
                                                    <img src={movieDetail.cover_image} alt="image image" style={{ height: "180px", objectFit: "cover" }} className="img-fluid mt-4 mb-4 w-100" />
                                                </div>
                                            </div>
                                        </div>
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
export default MovieDetail;
