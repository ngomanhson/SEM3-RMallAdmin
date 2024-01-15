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

function CustomerList() {
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, []);

    const [userRole, setUserRole] = useState(null);
    const [error, setError] = useState(null);
    const [feedbacks, setFeedbacks] = useState([]);
    useEffect(() => {
        const loadFeedbacks = async () => {
            const userToken = localStorage.getItem("access_token");
            api.defaults.headers.common["Authorization"] = `Bearer ${userToken}`;
            try {
                const response = await api.get(url.FEEDBACK.LIST);
                setFeedbacks(response.data);
            } catch (error) {}
        };
        loadFeedbacks();
    }, []);

    //paginate
    const [currentPage, setCurrentPage] = useState(1);
    const feedbacksPerPage = 10;
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    const handlePrevPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };
    const handleNextPage = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
    };
    const totalPages = Math.ceil(feedbacks.length / feedbacksPerPage);
    const indexOfLastFeedback = currentPage * feedbacksPerPage;
    const indexOfFirstFeedback = indexOfLastFeedback - feedbacksPerPage;
    const currentFeedbacks = feedbacks.slice(indexOfFirstFeedback, indexOfLastFeedback);

    //search, filter
    const [searchName, setSearchName] = useState("");
    const [searchEmail, setSearchEmail] = useState("");
    const [searchPhone, setSearchPhone] = useState("");
    const handleSearchNameChange = (e) => {
        setSearchName(e.target.value);
    };
    const handleSearchEmailChange = (e) => {
        setSearchEmail(e.target.value);
    };
    const handleSearchPhoneChange = (e) => {
        setSearchPhone(e.target.value);
    };
    const filteredFeedbacks = currentFeedbacks.filter((item) => {
        const nameMatch = item.name.toLowerCase().includes(searchName.toLowerCase());
        const emailMatch = item.email.toLowerCase().includes(searchEmail.toLowerCase());
        const phoneMatch = item.phone.toLowerCase().includes(searchPhone.toLowerCase());
        return nameMatch && emailMatch && phoneMatch;
    });

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
                        <title>Feedback List | R Admin</title>
                    </Helmet>
                    {loading ? <Loading /> : ""}
                    <Layout>
                        <Breadcrumb title="Feedback List" />

                        <div className="row page-titles">
                            <div className="col-lg-4">
                                <input type="text" className="form-control input-rounded" placeholder="Search name . . ." value={searchName} onChange={handleSearchNameChange} />
                            </div>
                            <div className="col-lg-4">
                                <input type="text" className="form-control input-rounded" placeholder="Search email . . ." value={searchEmail} onChange={handleSearchEmailChange} />
                            </div>
                            <div className="col-lg-4">
                                <input type="text" className="form-control input-rounded" placeholder="Search phone . . ." value={searchPhone} onChange={handleSearchPhoneChange} />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-lg-12">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="table-responsive">
                                            <table className="table table-sm mb-0 table-striped student-tbl">
                                                <thead>
                                                    <tr>
                                                        <th className=" pe-3">No.</th>
                                                        <th>Name</th>
                                                        <th>Email</th>
                                                        <th>Phone</th>
                                                        <th className=" ps-5" style={{ minWidth: "200px" }}>
                                                            Message
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {filteredFeedbacks.map((item, index) => {
                                                        return (
                                                            <tr className="btn-reveal-trigger">
                                                                <td className="py-2">{index + 1}</td>
                                                                <td className="py-3">
                                                                    <div className="media-body">
                                                                        <h5 className="mb-0 fs--1">{item.name}</h5>
                                                                    </div>
                                                                </td>
                                                                <td className="py-2">
                                                                    <a href={`mailto:${item.email}`}>{item.email}</a>
                                                                </td>
                                                                <td className="py-2">
                                                                    <a href={`tel:${item.phone}`}>{item.phone}</a>
                                                                </td>
                                                                <td className="py-2 ps-5">{item.message}</td>
                                                            </tr>
                                                        );
                                                    })}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
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
                    </Layout>
                </>
            )}
        </>
    );
}

export default CustomerList;
