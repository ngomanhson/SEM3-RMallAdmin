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

function PromotionList() {
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, []);

    const [userRole, setUserRole] = useState(null);
    const [error, setError] = useState(null);
    const [promotions, setPromotions] = useState([]);
    const [isDeleteVisible, setDeleteVisible] = useState(false);
    const [tbodyCheckboxes, setTbodyCheckboxes] = useState([]);
    const [selectAll, setSelectAll] = useState(false);

    useEffect(() => {
        const loadPromotions = async () => {
            const userToken = localStorage.getItem("access_token");
            api.defaults.headers.common["Authorization"] = `Bearer ${userToken}`;
            try {
                const response = await api.get(url.PROMOTION.LIST);
                setPromotions(response.data);
                setTbodyCheckboxes(Array.from({ length: response.data.length }).fill(false));
            } catch (error) {}
        };
        loadPromotions();
    }, []);

    //xử lý check tất cả và hiển thị thùng rác
    const handleSelectAll = () => {
        const updatedCheckboxes = !selectAll ? Array.from({ length: promotions.length }).fill(true) : Array.from({ length: promotions.length }).fill(false);
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

    //xử lý xoá promotion
    const handleDeletePromotion = async () => {
        const selectedPromotionIds = [];

        // lấy id của các promotion đã được chọn
        promotions.forEach((item, index) => {
            if (selectAll || tbodyCheckboxes[index]) {
                selectedPromotionIds.push(item.id);
            }
        });

        const isConfirmed = await Swal.fire({
            title: "Are you sure?",
            text: "You want to delete selected promotions?",
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
                const deleteResponse = await api.delete(url.PROMOTION.DELETE, {
                    data: selectedPromotionIds,
                });
                if (deleteResponse.status === 200) {
                    setPromotions((prevPromotions) => prevPromotions.filter((promotion) => !selectedPromotionIds.includes(promotion.id)));
                    setTbodyCheckboxes((prevCheckboxes) => prevCheckboxes.filter((_, index) => !selectedPromotionIds.includes(promotions[index].id)));
                    setDeleteVisible(false);
                    toast.success("Delete Promotions Successfully.", {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 3000,
                    });
                    console.log("data:", deleteResponse.data);
                } else {
                }
            } catch (error) {
                toast.error("Failed to delete promotions!", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 3000,
                });
                console.error("Failed to delete promotions:", error);
            }
        }
    };

    //paginate
    const [currentPage, setCurrentPage] = useState(1);
    const promotionsPerPage = 10;
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    const handlePrevPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };
    const handleNextPage = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
    };
    const totalPages = Math.ceil(promotions.length / promotionsPerPage);
    const indexOfLastPromotion = currentPage * promotionsPerPage;
    const indexOfFirstPromotion = indexOfLastPromotion - promotionsPerPage;
    const currentPromotions = promotions.slice(indexOfFirstPromotion, indexOfLastPromotion);

    //search, filter
    const [searchName, setSearchName] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const handleSearchNameChange = (e) => {
        setSearchName(e.target.value);
    };
    const handleStartDateChange = (e) => {
        setStartDate(e.target.value);
    };
    const handleEndDateChange = (e) => {
        setEndDate(e.target.value);
    };
    const filteredPromotions = currentPromotions.filter((item) => {
        const nameMatch = item.name.toLowerCase().includes(searchName.toLowerCase());
        const startDateMatch = startDate ? new Date(item.startDate) >= new Date(startDate) : true;
        const endDateMatch = endDate ? new Date(item.endDate) <= new Date(endDate) : true;
        return nameMatch && startDateMatch && endDateMatch;
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
                        <title>Promotion List | R Mall</title>
                    </Helmet>
                    {loading ? <Loading /> : ""}
                    <Layout>
                        <Breadcrumb title="Promotion List" />

                        <div className="row page-titles">
                            <div className="col-lg-4">
                                <input type="text" className="form-control input-rounded" placeholder="Search name . . ." value={searchName} onChange={handleSearchNameChange} />
                            </div>
                            <div className="col-lg-4">
                                <input type="datetime-local" className="form-control input-rounded" value={startDate} onChange={handleStartDateChange} />
                            </div>
                            <div className="col-lg-4">
                                <input type="datetime-local" className="form-control input-rounded" value={endDate} onChange={handleEndDateChange} />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-lg-12">
                                <div className="card">
                                    <div className="card-header">
                                        <div className="col-lg-6"></div>
                                        <div className="col-lg-1 text-end">
                                            <NavLink onClick={handleDeletePromotion}>
                                                <button type="button" className={`btn btn-danger ${isDeleteVisible ? "" : "d-none"}`}>
                                                    <i className="fa fa-trash"></i>
                                                </button>
                                            </NavLink>
                                        </div>
                                        <div className="col-lg-2 text-end">
                                            <NavLink to="/promotion-delete-at">
                                                <button type="button" className="btn btn-rounded btn-warning">
                                                    <span className="btn-icon-start text-warning">
                                                        <i className="fa fa-trash"></i>
                                                    </span>
                                                    Deleted List
                                                </button>
                                            </NavLink>
                                        </div>
                                        <div className="col-lg-3 text-end">
                                            <NavLink to="/promotion-create">
                                                <button type="button" className="btn btn-rounded btn-info">
                                                    <span className="btn-icon-start text-info">
                                                        <i className="fa fa-plus color-info"></i>
                                                    </span>
                                                    Create New Promotion
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
                                                        <th className="align-middle">
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
                                                        <th>Name</th>
                                                        <th>Coupon Code</th>
                                                        <th>Start Date</th>
                                                        <th>End Date</th>
                                                        <th>Percent Discount</th>
                                                        <th>Limit</th>
                                                        <th className="text-end">Minimum Amount</th>
                                                        <th className="text-end">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody id="orders">
                                                    {filteredPromotions.map((item, index) => {
                                                        return (
                                                            <tr className="btn-reveal-trigger">
                                                                <td className="py-2">
                                                                    <div className="form-check custom-checkbox checkbox-primary">
                                                                        <input
                                                                            type="checkbox"
                                                                            className="form-check-input"
                                                                            onChange={() => handleTbodyCheckboxChange(index)}
                                                                            checked={tbodyCheckboxes[index]}
                                                                        />
                                                                    </div>
                                                                </td>
                                                                <td className="py-2">
                                                                    <a href="#!">
                                                                        <strong>{item.name}</strong>
                                                                    </a>
                                                                </td>
                                                                <td className="py-2">{item.couponCode}</td>
                                                                <td className="py-2">{format(new Date(item.startDate), "yyyy-MM-dd HH:mm")}</td>
                                                                <td className="py-2">{format(new Date(item.endDate), "yyyy-MM-dd HH:mm")}</td>
                                                                <td className="py-2">{item.discountPercentage}%</td>
                                                                <td className="py-2">{item.limit}</td>
                                                                <td className="py-2 text-center">${item.minPurchaseAmount}</td>
                                                                <td className="py-2 text-end">
                                                                    <div className="d-flex">
                                                                        <a href="#!" className="btn btn-success shadow btn-xs sharp me-1">
                                                                            <i className="fa fa-eye"></i>
                                                                        </a>
                                                                        <Link to={`/promotion-edit/${item.id}`} className="btn btn-primary shadow btn-xs sharp me-1">
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
                                </div>
                            </div>
                        </div>
                    </Layout>
                </>
            )}
        </>
    );
}
export default PromotionList;
