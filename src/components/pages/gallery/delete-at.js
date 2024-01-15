import Layout from "../../layouts/index";
import Breadcrumb from "../../layouts/breadcrumb";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import api from "../../services/api";
import url from "../../services/url";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { toast } from "react-toastify";
import Loading from "../../layouts/loading";
import NotFound from "../../pages/other/not-found";

function GalleryDeleteAt() {
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, []);

    const [userRole, setUserRole] = useState(null);
    const [error, setError] = useState(null);
    const [gallerys, setGallerys] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const loadGallerys = async () => {
            const userToken = localStorage.getItem("access_token");
            api.defaults.headers.common["Authorization"] = `Bearer ${userToken}`;
            try {
                const response = await api.get(url.GALLERY.TRASH);
                setGallerys(response.data);
            } catch (error) {}
        };
        loadGallerys();
    }, []);

    //xử lý khôi phục gallery
    const handleRestoreGallery = async (id) => {
        const userToken = localStorage.getItem("access_token");
        api.defaults.headers.common["Authorization"] = `Bearer ${userToken}`;
        try {
            const restoreResponse = await api.put(`${url.GALLERY.RESTORE.replace("{}", id)}`);
            if (restoreResponse.status === 200) {
                setGallerys((prevGallerys) => prevGallerys.filter((gallery) => gallery.id !== id));
                toast.success("Restore Gallery Successfully.", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 3000,
                });
                setTimeout(() => {
                    navigate(`/gallery-list`); //chuyển đến trang gallery-list
                }, 3000);
            } else {
            }
        } catch (error) {
            toast.error("Failed to restore gallery!", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000,
            });
            console.error("Failed to restore gallery:", error);
        }
    };

    //paginate
    const [currentPage, setCurrentPage] = useState(1);
    const gallerysPerPage = 10;
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    const handlePrevPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };
    const handleNextPage = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
    };
    const totalPages = Math.ceil(gallerys.length / gallerysPerPage);
    const indexOfLastGallery = currentPage * gallerysPerPage;
    const indexOfFirstGallery = indexOfLastGallery - gallerysPerPage;
    const currentGallerys = gallerys.slice(indexOfFirstGallery, indexOfLastGallery);

    // kiểm tra role
    useEffect(() => {
        const fetchUserRole = async () => {
            const token = localStorage.getItem("access_token");
            try {
                const decodedToken = JSON.parse(atob(token.split(".")[1]));
                const userRole = decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
                setUserRole(userRole);

                if (userRole === "User" || userRole === "Movie Theater Manager Staff") {
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
                        <title>Gallery Delete At | R Admin</title>
                    </Helmet>
                    {loading ? <Loading /> : ""}
                    <Layout>
                        <Breadcrumb title="Gallery Delete At" />

                        <div className="row">
                            <div className="col-lg-12">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="table-responsive">
                                            <div className="text-end"></div>
                                            <table className="table table-sm mb-0">
                                                <thead>
                                                    <tr>
                                                        <th>
                                                            <strong>No.</strong>
                                                        </th>
                                                        <th>
                                                            <strong>Thumbnail</strong>
                                                        </th>
                                                        <th>
                                                            <strong>Gallery Name</strong>
                                                        </th>
                                                        <th>
                                                            <strong>Description</strong>
                                                        </th>
                                                        <th>
                                                            <strong>Action</strong>
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody id="orders">
                                                    {currentGallerys.map((item, index) => {
                                                        return (
                                                            <tr>
                                                                <td>
                                                                    <strong>{index + 1}</strong>
                                                                </td>
                                                                <td>
                                                                    <img src={item.imagePath} className="rounded-lg me-2 movie-thumb" alt="" />
                                                                </td>
                                                                <td>{item.productName}</td>
                                                                <td>{item.description}</td>
                                                                <td>
                                                                    <NavLink onClick={() => handleRestoreGallery(item.id)} className="btn btn-success shadow btn-xs">
                                                                        <svg width="25" height="25" viewBox="0 0 60 58" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                            <path
                                                                                d="M41.4025 26.4414C41.9767 25.8671 42.258 25.1171 42.258 24.3671C42.258 23.6171 41.9767 22.8671 41.4025 22.2929L34.0314 14.9218C32.9533 13.8437 31.5236 13.2578 30.0119 13.2578C28.5002 13.2578 27.0587 13.8554 25.9923 14.9218L18.6212 22.2929C17.4728 23.4414 17.4728 25.2929 18.6212 26.4414C19.7697 27.5898 21.6212 27.5898 22.7697 26.4414L27.0939 22.1171L27.0939 38.7695C27.0939 40.3867 28.4064 41.6992 30.0236 41.6992C31.6408 41.6992 32.9533 40.3867 32.9533 38.7695L32.9533 22.1054L37.2775 26.4296C38.4025 27.5781 40.2541 27.5781 41.4025 26.4414Z"
                                                                                fill="#FFFFFF"
                                                                            ></path>
                                                                        </svg>
                                                                    </NavLink>
                                                                </td>
                                                            </tr>
                                                        );
                                                    })}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
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
                            </div>
                        </div>
                    </Layout>
                </>
            )}
        </>
    );
}

export default GalleryDeleteAt;
