import Layout from "../../layouts/index";
import Breadcrumb from "../../layouts/breadcrumb";
import { Link, NavLink } from "react-router-dom";
import { Helmet } from "react-helmet";
import api from "../../services/api";
import url from "../../services/url";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
function MovieList() {
    const [movies, setMovies] = useState([]);

    //hiển thị danh sách movie
    const loadMovies = async () => {
        try {
            const response = await api.get(url.MOVIE.LIST);
            setMovies(response.data);
        } catch (error) {}
    };
    useEffect(() => {
        loadMovies();
    }, []);

    //xử lý xoá movie
    const handleDeleteMovie = async (id) => {
        const isConfirmed = await Swal.fire({
            title: "Are you sure?",
            text: "You want to delete movie?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "I'm sure",
        });
        if (isConfirmed.isConfirmed) {
            try {
                await api.delete(url.MOVIE.DELETE, { data: { ids: [id] } });
                setMovies((prevMovies) => prevMovies.filter((movie) => movie.id !== id));
                toast.success("Delete Movie Successfully.", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 3000,
                });
            } catch (error) {
                toast.error("Cannot Delete Movie!", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 3000,
                });
                console.error("Failed to delete movie:", error);
            }
        }
    };
    return (
        <>
            <Helmet>
                <title>Movie List | R Mall</title>
            </Helmet>
            <Layout>
                <Breadcrumb title="Movie List" />
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-responsive-md">
                            <thead>
                                <tr>
                                    <th>
                                        <strong>No.</strong>
                                    </th>
                                    <th>
                                        <strong>Thumbnail</strong>
                                    </th>
                                    <th>
                                        <strong>Movie Name</strong>
                                    </th>
                                    <th>
                                        <strong>Director</strong>
                                    </th>
                                    <th>
                                        <strong>Release Date</strong>
                                    </th>
                                    <th>
                                        <strong>Movie Duration</strong>
                                    </th>
                                    <th>
                                        <strong>Action</strong>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {movies.map((item, index) => {
                                    return (
                                        <tr>
                                            <td>
                                                <strong>{index + 1}</strong>
                                            </td>
                                            <td>
                                                <img src={item.movie_image} className="rounded-lg me-2 movie-thumb" alt="" />
                                            </td>
                                            <td>{item.title}</td>
                                            <td>
                                                <div className="d-flex align-items-center">
                                                    <span className="w-space-no">{item.director}</span>
                                                </div>
                                            </td>
                                            <td>{format(new Date(item.release_date), "yyyy-MM-dd")}</td>
                                            <td>{item.duration} (Minutes)</td>
                                            <td>
                                                <div className="d-flex">
                                                    <a href="#!" className="btn btn-success shadow btn-xs sharp me-1">
                                                        <i className="fa fa-eye"></i>
                                                    </a>
                                                    <Link to={`/movie-edit/${item.id}`} className="btn btn-primary shadow btn-xs sharp me-1">
                                                        <i className="fas fa-pencil-alt"></i>
                                                    </Link>
                                                    <NavLink onClick={() => handleDeleteMovie(item.id)} className="btn btn-danger shadow btn-xs sharp">
                                                        <i className="fa fa-trash"></i>
                                                    </NavLink>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </Layout>
        </>
    );
}

export default MovieList;
