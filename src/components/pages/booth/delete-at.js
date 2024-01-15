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

function ShopDeleteAt() {
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, []);

    const [userRole, setUserRole] = useState(null);
    const [error, setError] = useState(null);
    const [shops, setShops] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const loadShops = async () => {
            const userToken = localStorage.getItem("access_token");
            api.defaults.headers.common["Authorization"] = `Bearer ${userToken}`;
            try {
                const response = await api.get(url.SHOP.TRASH);
                setShops(response.data);
            } catch (error) {}
        };
        loadShops();
    }, []);

    //xử lý khôi phục shop
    const handleRestoreShop = async (id) => {
        const userToken = localStorage.getItem("access_token");
        api.defaults.headers.common["Authorization"] = `Bearer ${userToken}`;
        try {
            const restoreResponse = await api.put(`${url.SHOP.RESTORE.replace("{}", id)}`);
            if (restoreResponse.status === 200) {
                setShops((prevShops) => prevShops.filter((shop) => shop.id !== id));
                toast.success("Restore Shop Successfully.", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 3000,
                });
                setTimeout(() => {
                    navigate(`/shop-list`); //chuyển đến trang shop-list
                }, 3000);
            } else {
            }
        } catch (error) {
            toast.error("Failed to restore shop!", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000,
            });
            console.error("Failed to restore shop:", error);
        }
    };

    //paginate
    const [currentPage, setCurrentPage] = useState(1);
    const shopsPerPage = 10;
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    const handlePrevPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };
    const handleNextPage = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
    };
    const totalPages = Math.ceil(shops.length / shopsPerPage);
    const indexOfLastShop = currentPage * shopsPerPage;
    const indexOfFirstShop = indexOfLastShop - shopsPerPage;
    const currentShops = shops.slice(indexOfFirstShop, indexOfLastShop);

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
                        <title>Shop Delete At | R Admin</title>
                    </Helmet>
                    {loading ? <Loading /> : ""}
                    <Layout>
                        <Breadcrumb title="Shop Delete At" />
                        <div className="card-body">
                            <div className="table-responsive">
                                <table className="table table-responsive-md">
                                    <thead>
                                        <tr>
                                            <th>
                                                <strong>Thumbnail</strong>
                                            </th>
                                            <th>
                                                <strong>Shop Name</strong>
                                            </th>
                                            <th>
                                                <strong>Contact</strong>
                                            </th>
                                            <th>
                                                <strong>Business Hours</strong>
                                            </th>
                                            <th>
                                                <strong>Floor</strong>
                                            </th>
                                            <th>
                                                <strong>Category</strong>
                                            </th>
                                            <th>
                                                <strong>Action</strong>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody id="orders">
                                        {currentShops.map((item, index) => {
                                            return (
                                                <tr>
                                                    <td>
                                                        <img src={item.imagePath} className="rounded-lg me-2 movie-thumb" alt="" />
                                                    </td>
                                                    <td>
                                                        <h6 class="font-w500 fs-16 mb-0">{item.name}</h6>
                                                        <span class="fs-14 font-w400">
                                                            <a>{item.address}</a>
                                                        </span>
                                                    </td>
                                                    <td>{item.contactInfo}</td>
                                                    <td>{item.hoursOfOperation}</td>
                                                    <td>{item.floorName}</td>
                                                    <td>{item.categoryName}</td>
                                                    <td>
                                                        <div className="text-center">
                                                            <NavLink onClick={() => handleRestoreShop(item.id)} className="btn btn-success shadow btn-xs">
                                                                <svg width="25" height="25" viewBox="0 0 60 58" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path
                                                                        d="M41.4025 26.4414C41.9767 25.8671 42.258 25.1171 42.258 24.3671C42.258 23.6171 41.9767 22.8671 41.4025 22.2929L34.0314 14.9218C32.9533 13.8437 31.5236 13.2578 30.0119 13.2578C28.5002 13.2578 27.0587 13.8554 25.9923 14.9218L18.6212 22.2929C17.4728 23.4414 17.4728 25.2929 18.6212 26.4414C19.7697 27.5898 21.6212 27.5898 22.7697 26.4414L27.0939 22.1171L27.0939 38.7695C27.0939 40.3867 28.4064 41.6992 30.0236 41.6992C31.6408 41.6992 32.9533 40.3867 32.9533 38.7695L32.9533 22.1054L37.2775 26.4296C38.4025 27.5781 40.2541 27.5781 41.4025 26.4414Z"
                                                                        fill="#FFFFFF"
                                                                    ></path>
                                                                </svg>
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
            )}
        </>
    );
}

export default ShopDeleteAt;
