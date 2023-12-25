import Layout from "../../layouts/index";
import Breadcrumb from "../../layouts/breadcrumb";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import api from "../../services/api";
import url from "../../services/url";
import { useEffect, useState } from "react";
import { format } from "date-fns";
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
                                            <td>{item.duration}</td>
                                            <td>
                                                <div className="d-flex">
                                                    <a href="#!" className="btn btn-success shadow btn-xs sharp me-1">
                                                        <i className="fa fa-eye"></i>
                                                    </a>
                                                    <Link to={`/movie-edit/${item.id}`} className="btn btn-primary shadow btn-xs sharp me-1">
                                                        <i className="fas fa-pencil-alt"></i>
                                                    </Link>
                                                    <a href="#!" className="btn btn-danger shadow btn-xs sharp">
                                                        <i className="fa fa-trash"></i>
                                                    </a>
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
