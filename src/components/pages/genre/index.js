import Layout from "../../layouts/index";
import Breadcrumb from "../../layouts/breadcrumb";
import { Link, NavLink } from "react-router-dom";
import { Helmet } from "react-helmet";
import api from "../../services/api";
import url from "../../services/url";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import Loading from "../../layouts/loading";

function GenreList() {
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, []);

    const [genres, setGenres] = useState([]);

    //hiển thị danh sách genre
    useEffect(() => {
        const loadGenres = async () => {
            try {
                const response = await api.get(url.GENRE.LIST);
                setGenres(response.data);
            } catch (error) {}
        };
        loadGenres();
    }, []);

    //xử lý xoá genre
    const handleDeleteGenre = async (id) => {
        const isConfirmed = await Swal.fire({
            title: "Are you sure?",
            text: "You want to delete selected genre?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "I'm sure",
        });
        if (isConfirmed.isConfirmed) {
            try {
                const deleteResponse = await api.delete(`${url.GENRE.DELETE.replace("{}", id)}`);
                if (deleteResponse.status === 200) {
                    setGenres((prevGenres) => prevGenres.filter((genre) => genre.id !== id));
                    toast.success("Delete Genre Successfully.", {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 3000,
                    });
                } else {
                }
            } catch (error) {
                toast.error("Cannot Delete Genre!", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 3000,
                });
                console.error("Failed to delete genre:", error);
            }
        }
    };

    //search, filter
    const [searchName, setSearchName] = useState("");
    const handleSearchNameChange = (e) => {
        setSearchName(e.target.value);
    };
    const filteredGenres = genres.filter((item) => {
        const nameMatch = item.name.toLowerCase().includes(searchName.toLowerCase());
        return nameMatch;
    });

    //paginate
    const [currentPage, setCurrentPage] = useState(1);
    const genresPerPage = 10;
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    const handlePrevPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };
    const handleNextPage = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
    };
    const totalPages = Math.ceil(filteredGenres.length / genresPerPage);
    const indexOfLastGenre = currentPage * genresPerPage;
    const indexOfFirstGenre = indexOfLastGenre - genresPerPage;
    const currentGenres = filteredGenres.slice(indexOfFirstGenre, indexOfLastGenre);

    return (
        <>
            <Helmet>
                <title>Genre List | R Mall</title>
            </Helmet>
            {loading ? <Loading /> : ""}
            <Layout>
                <Breadcrumb title="Genre List" />

                <div className="row page-titles">
                    <div className="col-lg-6">
                        <input type="text" className="form-control input-rounded" placeholder="Search name genre . . ." value={searchName} onChange={handleSearchNameChange} />
                    </div>
                    <div className="col-lg-3 text-center">
                        <NavLink to="/genre-delete-at">
                            <button type="button" className="btn btn-rounded btn-warning">
                                <span className="btn-icon-start text-warning">
                                    <i className="fa fa-trash"></i>
                                </span>
                                Deleted List
                            </button>
                        </NavLink>
                    </div>
                    <div className="col-lg-3 text-center">
                        <NavLink to="/genre-create">
                            <button type="button" className="btn btn-rounded btn-info">
                                <span className="btn-icon-start text-info">
                                    <i className="fa fa-plus color-info"></i>
                                </span>
                                Create New Genre
                            </button>
                        </NavLink>
                    </div>
                </div>

                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-responsive-md">
                            <thead>
                                <tr>
                                    <th>
                                        <strong>No.</strong>
                                    </th>
                                    <th>
                                        <strong>Genre Name</strong>
                                    </th>
                                    <th>
                                        <strong>Action</strong>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentGenres.map((item, index) => {
                                    return (
                                        <tr>
                                            <td>
                                                <strong>{index + 1}</strong>
                                            </td>
                                            <td>{item.name}</td>
                                            <td>
                                                <div className="d-flex">
                                                    <a href="#!" className="btn btn-success shadow btn-xs sharp me-1">
                                                        <i className="fa fa-eye"></i>
                                                    </a>
                                                    <Link to={`/genre-edit/${item.id}`} className="btn btn-primary shadow btn-xs sharp me-1">
                                                        <i className="fas fa-pencil-alt"></i>
                                                    </Link>
                                                    <NavLink onClick={() => handleDeleteGenre(item.id)} className="btn btn-danger shadow btn-xs sharp">
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
    );
}

export default GenreList;
