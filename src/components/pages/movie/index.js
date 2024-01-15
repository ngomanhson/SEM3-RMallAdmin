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
import Loading from "../../layouts/loading";
import NotFound from "../../pages/other/not-found";
function MovieList() {
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, []);

    const [userRole, setUserRole] = useState(null);
    const [error, setError] = useState(null);
    const [movies, setMovies] = useState([]);
    const [isDeleteVisible, setDeleteVisible] = useState(false);
    const [tbodyCheckboxes, setTbodyCheckboxes] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectAll, setSelectAll] = useState(false);

    //hiển thị danh sách movie
    useEffect(() => {
        const loadMovies = async () => {
            const userToken = localStorage.getItem("access_token");
            api.defaults.headers.common["Authorization"] = `Bearer ${userToken}`;
            try {
                const response = await api.get(url.MOVIE.LIST);
                const filteredBookings = selectedDate
                    ? response.data.filter((item) => format(new Date(item.release_date), "yyyy-MM-dd") === format(new Date(selectedDate), "yyyy-MM-dd"))
                    : response.data;
                setMovies(filteredBookings);
                setTbodyCheckboxes(Array.from({ length: response.data.length }).fill(false));
            } catch (error) {}
        };
        loadMovies();
    }, [selectedDate]);

    //xử lý check tất cả và hiển thị thùng rác
    const handleSelectAll = () => {
        const updatedCheckboxes = !selectAll ? Array.from({ length: movies.length }).fill(true) : Array.from({ length: movies.length }).fill(false);
        setTbodyCheckboxes(updatedCheckboxes);
        setSelectAll(!selectAll);
        const checkboxes = document.querySelectorAll('#orders input[type="checkbox"]');
        checkboxes.forEach((checkbox) => {
            checkbox.checked = !selectAll;
        });
        setDeleteVisible(!selectAll);
    };
    const handleCheckboxChange = () => {
        const checkboxes = document.querySelectorAll('#orders input[type="checkbox"]');
        const selectedCheckboxes = Array.from(checkboxes).filter((checkbox) => checkbox.checked);
        setDeleteVisible(selectedCheckboxes.length > 0);
    };
    const handleTbodyCheckboxChange = (index) => {
        const updatedTbodyCheckboxes = [...tbodyCheckboxes];
        updatedTbodyCheckboxes[index] = !updatedTbodyCheckboxes[index];
        setTbodyCheckboxes(updatedTbodyCheckboxes);
        const isDeleteVisible = selectAll || updatedTbodyCheckboxes.some((checkbox) => checkbox);
        setDeleteVisible(isDeleteVisible);
    };

    //xử lý xoá movie
    const handleDeleteMovie = async () => {
        const selectedMovieIds = [];

        // lấy id của các movie đã được chọn
        movies.forEach((item, index) => {
            if (selectAll || tbodyCheckboxes[index]) {
                selectedMovieIds.push(item.id);
            }
        });

        const isConfirmed = await Swal.fire({
            title: "Are you sure?",
            text: "You want to delete selected movies?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "I'm sure",
        });
        if (isConfirmed.isConfirmed) {
            const userToken = localStorage.getItem("access_token");
            api.defaults.headers.common["Authorization"] = `Bearer ${userToken}`;
            try {
                const deleteResponse = await api.delete(url.MOVIE.DELETE, {
                    data: selectedMovieIds,
                });
                if (deleteResponse.status === 200) {
                    setMovies((prevMovies) => prevMovies.filter((movie) => !selectedMovieIds.includes(movie.id)));
                    setTbodyCheckboxes((prevCheckboxes) => prevCheckboxes.filter((_, index) => !selectedMovieIds.includes(movies[index].id)));
                    setDeleteVisible(false);
                    toast.success("Delete Movie Successfully.", {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 3000,
                    });
                    // console.log("data:", deleteResponse.data);
                } else {
                }
            } catch (error) {
                toast.error("Cannot Delete Movie!", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 3000,
                });
                console.error("Failed to delete movie:", error);
            }
        }
    };

    //paginate
    const [currentPage, setCurrentPage] = useState(1);
    const moviesPerPage = 10;
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    const handlePrevPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };
    const handleNextPage = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
    };
    const totalPages = Math.ceil(movies.length / moviesPerPage);
    const indexOfLastMovie = currentPage * moviesPerPage;
    const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
    const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);

    //search, filter
    const [searchTitle, setSearchTitle] = useState("");
    const [searchDirector, setSearchDirector] = useState("");
    const handleSearchTitleChange = (e) => {
        setSearchTitle(e.target.value);
    };
    const handleSearchDirectorChange = (e) => {
        setSearchDirector(e.target.value);
    };
    const filteredMovies = currentMovies.filter((item) => {
        const titleMatch = item.title.toLowerCase().includes(searchTitle.toLowerCase());
        const directorMatch = item.director.toLowerCase().includes(searchDirector.toLowerCase());
        return titleMatch && directorMatch;
    });

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
                        <title>Movie List | R Admin</title>
                    </Helmet>
                    {loading ? <Loading /> : ""}
                    <Layout>
                        <Breadcrumb title="Movie List" />

                        <div className="row page-titles">
                            <div className="col-lg-4">
                                <input type="text" className="form-control input-rounded" placeholder="Search title movie . . ." value={searchTitle} onChange={handleSearchTitleChange} />
                            </div>
                            <div className="col-lg-4">
                                <input type="text" className="form-control input-rounded" placeholder="Search director movie . . ." value={searchDirector} onChange={handleSearchDirectorChange} />
                            </div>
                            <div className="col-lg-4">
                                <input type="date" className="form-control input-rounded" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />
                            </div>
                        </div>

                        <div className="card-header">
                            <div className="col-lg-6"></div>
                            <div className="col-lg-1 text-end">
                                <NavLink onClick={handleDeleteMovie}>
                                    <button type="button" className={`btn btn-danger ${isDeleteVisible ? "" : "d-none"}`}>
                                        <i className="fa fa-trash"></i>
                                    </button>
                                </NavLink>
                            </div>
                            <div className="col-lg-2 text-end">
                                <NavLink to="/movie-delete-at">
                                    <button type="button" className="btn btn-rounded btn-warning">
                                        <span className="btn-icon-start text-warning">
                                            <i className="fa fa-trash"></i>
                                        </span>
                                        Deleted List
                                    </button>
                                </NavLink>
                            </div>
                            <div className="col-lg-3 text-end">
                                <NavLink to="/movie-create">
                                    <button type="button" className="btn btn-rounded btn-info">
                                        <span className="btn-icon-start text-info">
                                            <i className="fa fa-plus color-info"></i>
                                        </span>
                                        Create New Movie
                                    </button>
                                </NavLink>
                            </div>
                        </div>
                        <div className="card-body">
                            <div className="table-responsive">
                                <div className="text-end"></div>
                                <table className="table table-sm mb-0">
                                    <thead>
                                        <tr>
                                            <th>
                                                <div className="form-check custom-checkbox">
                                                    <input
                                                        type="checkbox"
                                                        className="form-check-input"
                                                        onChange={() => {
                                                            handleSelectAll();
                                                            handleCheckboxChange();
                                                        }}
                                                        checked={selectAll}
                                                    />
                                                </div>
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
                                                <strong>Genres</strong>
                                            </th>
                                            <th>
                                                <strong>Action</strong>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody id="orders">
                                        {filteredMovies.map((item, index) => {
                                            return (
                                                <tr>
                                                    <td>
                                                        <div className="form-check custom-checkbox checkbox-primary">
                                                            <input type="checkbox" className="form-check-input" onChange={() => handleTbodyCheckboxChange(index)} checked={tbodyCheckboxes[index]} />
                                                        </div>
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
                                                        <span key={item.genres[0].id} className="badge light badge-dark">
                                                            {item.genres[0].name}
                                                        </span>
                                                        {item.genres.length > 1 && <span className="badge light badge-dark">+{item.genres.length - 1}</span>}
                                                    </td>
                                                    <td>
                                                        <div className="d-flex">
                                                            <Link to={`/movie-detail/${item.id}`} className="btn btn-success shadow btn-xs sharp me-1">
                                                                <i className="fa fa-eye"></i>
                                                            </Link>
                                                            <Link to={`/movie-edit/${item.id}`} className="btn btn-primary shadow btn-xs sharp me-1">
                                                                <i className="fas fa-pencil-alt"></i>
                                                            </Link>
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="card-footer">
                            <div className="row">
                                <div className="col-lg-5"></div>
                                <div className="col-lg-4"></div>
                                <div className="col-lg-3 text-end">
                                    <nav>
                                        <ul className="pagination pagination-gutter pagination-primary no-bg">
                                            <li className={`page-item page-indicator ${currentPage === 1 ? "disabled" : ""}`}>
                                                <a className="page-link" href="javascript:void(0)" onClick={handlePrevPage}>
                                                    <i className="la la-angle-left"></i>
                                                </a>
                                            </li>
                                            {Array.from({ length: totalPages }).map((_, index) => (
                                                <li key={index} className={`page-item ${currentPage === index + 1 ? "active" : ""}`}>
                                                    <a className="page-link" href="javascript:void(0)" onClick={() => handlePageChange(index + 1)}>
                                                        {index + 1}
                                                    </a>
                                                </li>
                                            ))}
                                            <li className={`page-item page-indicator ${currentPage === totalPages ? "disabled" : ""}`}>
                                                <a className="page-link" href="javascript:void(0)" onClick={handleNextPage}>
                                                    <i className="la la-angle-right"></i>
                                                </a>
                                            </li>
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </Layout>
                </>
            )}
        </>
    );
}

export default MovieList;
