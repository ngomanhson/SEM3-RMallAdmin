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
import NotFound from "../../pages/other/not-found";

function FoodList() {
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, []);

    const [userRole, setUserRole] = useState(null);
    const [error, setError] = useState(null);
    const [foods, setFoods] = useState([]);
    const [isDeleteVisible, setDeleteVisible] = useState(false);
    const [tbodyCheckboxes, setTbodyCheckboxes] = useState([]);
    const [selectAll, setSelectAll] = useState(false);

    //xử lý check tất cả và hiển thị thùng rác
    const handleSelectAll = () => {
        const updatedCheckboxes = !selectAll ? Array.from({ length: foods.length }).fill(true) : Array.from({ length: foods.length }).fill(false);
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

    //hiển thị danh sách food
    useEffect(() => {
        const loadFoods = async () => {
            const userToken = localStorage.getItem("access_token");
            api.defaults.headers.common["Authorization"] = `Bearer ${userToken}`;
            try {
                const response = await api.get(url.FOOD.LIST);
                setFoods(response.data);
                setTbodyCheckboxes(Array.from({ length: response.data.length }).fill(false));
            } catch (error) {}
        };
        loadFoods();
    }, []);

    //xử lý xoá food
    const handleDeleteFood = async () => {
        const selectedFoodIds = [];

        // lấy id của các food đã được chọn
        foods.forEach((item, index) => {
            if (selectAll || tbodyCheckboxes[index]) {
                selectedFoodIds.push(item.id);
            }
        });

        const isConfirmed = await Swal.fire({
            title: "Are you sure?",
            text: "You want to delete food?",
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
                const deleteResponse = await api.delete(url.FOOD.DELETE, {
                    data: selectedFoodIds,
                });
                if (deleteResponse.status === 200) {
                    setFoods((prevFoods) => prevFoods.filter((food) => !selectedFoodIds.includes(food.id)));
                    setTbodyCheckboxes((prevCheckboxes) => prevCheckboxes.filter((_, index) => !selectedFoodIds.includes(foods[index].id)));
                    setDeleteVisible(false);
                    toast.success("Delete Food Successfully.", {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 3000,
                    });
                } else {
                }
            } catch (error) {
                toast.error("Cannot Delete Food!", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 3000,
                });
                console.error("Failed to delete food:", error);
            }
        }
    };

    //paginate
    const [currentPage, setCurrentPage] = useState(1);
    const foodsPerPage = 10;
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    const handlePrevPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };
    const handleNextPage = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
    };
    const totalPages = Math.ceil(foods.length / foodsPerPage);
    const indexOfLastFood = currentPage * foodsPerPage;
    const indexOfFirstFood = indexOfLastFood - foodsPerPage;
    const currentFoods = foods.slice(indexOfFirstFood, indexOfLastFood);

    //search, filter
    const [searchName, setSearchName] = useState("");
    const handleSearchNameChange = (e) => {
        setSearchName(e.target.value);
    };
    const filteredFoods = currentFoods.filter((item) => {
        const nameMatch = item.name.toLowerCase().includes(searchName.toLowerCase());
        return nameMatch;
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
                        <title>Food List | R Mall</title>
                    </Helmet>
                    {loading ? <Loading /> : ""}
                    <Layout>
                        <Breadcrumb title="Food List" />

                        <div className="row page-titles">
                            <div className="col-lg-5">
                                <input type="text" className="form-control input-rounded" placeholder="Search name food . . ." value={searchName} onChange={handleSearchNameChange} />
                            </div>
                            <div className="col-lg-1 text-end">
                                <NavLink onClick={handleDeleteFood}>
                                    <button type="button" className={`btn btn-danger ${isDeleteVisible ? "" : "d-none"}`}>
                                        <i className="fa fa-trash"></i>
                                    </button>
                                </NavLink>
                            </div>
                            <div className="col-lg-3 text-center">
                                <NavLink to="/food-delete-at">
                                    <button type="button" className="btn btn-rounded btn-warning">
                                        <span className="btn-icon-start text-warning">
                                            <i className="fa fa-trash"></i>
                                        </span>
                                        Deleted List
                                    </button>
                                </NavLink>
                            </div>
                            <div className="col-lg-3">
                                <NavLink to="/food-create">
                                    <button type="button" className="btn btn-rounded btn-info">
                                        <span className="btn-icon-start text-info">
                                            <i className="fa fa-plus color-info"></i>
                                        </span>
                                        Create New Food
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
                                                <strong>Food Name</strong>
                                            </th>
                                            <th>
                                                <strong>Description</strong>
                                            </th>
                                            <th>
                                                <strong>Price</strong>
                                            </th>
                                            <th>
                                                <strong>Quantity</strong>
                                            </th>
                                            <th>
                                                <strong>Action</strong>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody id="orders">
                                        {filteredFoods.map((item, index) => {
                                            return (
                                                <tr>
                                                    <td>
                                                        <div className="form-check custom-checkbox checkbox-primary">
                                                            <input type="checkbox" className="form-check-input" onChange={() => handleTbodyCheckboxChange(index)} checked={tbodyCheckboxes[index]} />
                                                        </div>{" "}
                                                    </td>
                                                    <td>
                                                        <img src={item.image} className="rounded-lg me-2 movie-thumb" alt="" />
                                                    </td>
                                                    <td>{item.name}</td>
                                                    <td>{item.description}</td>
                                                    <td>{item.price}</td>
                                                    <td>{item.quantity}</td>
                                                    <td>
                                                        <div className="d-flex">
                                                            <Link to={`/food-edit/${item.id}`} className="btn btn-primary shadow btn-xs sharp me-1">
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

export default FoodList;
