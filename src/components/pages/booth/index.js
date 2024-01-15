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

function ShopList() {
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
    const [isDeleteVisible, setDeleteVisible] = useState(false);
    const [tbodyCheckboxes, setTbodyCheckboxes] = useState([]);
    const [selectAll, setSelectAll] = useState(false);

    //hiển thị danh sách shop
    useEffect(() => {
        const loadShops = async () => {
            const userToken = localStorage.getItem("access_token");
            api.defaults.headers.common["Authorization"] = `Bearer ${userToken}`;
            try {
                const response = await api.get(url.SHOP.LIST);
                setShops(response.data);
                setTbodyCheckboxes(Array.from({ length: response.data.length }).fill(false));
            } catch (error) {}
        };
        loadShops();
    }, []);

    //xử lý check tất cả và hiển thị thùng rác
    const handleSelectAll = () => {
        const updatedCheckboxes = !selectAll ? Array.from({ length: shops.length }).fill(true) : Array.from({ length: shops.length }).fill(false);
        setSelectAll(!selectAll);
        setTbodyCheckboxes(updatedCheckboxes);
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

    //xử lý xoá shop
    const handleDeleteShop = async () => {
        const selectedShopIds = [];

        // lấy id của các shop đã được chọn
        shops.forEach((item, index) => {
            if (selectAll || tbodyCheckboxes[index]) {
                selectedShopIds.push(item.id);
            }
        });

        const isConfirmed = await Swal.fire({
            title: "Are you sure?",
            text: "You want to delete selected shops?",
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
                const deleteResponse = await api.delete(url.SHOP.DELETE, {
                    data: selectedShopIds,
                });

                if (deleteResponse.status === 200) {
                    setShops((prevShops) => prevShops.filter((shop) => !selectedShopIds.includes(shop.id)));
                    setTbodyCheckboxes((prevCheckboxes) => prevCheckboxes.filter((_, index) => !selectedShopIds.includes(shops[index].id)));
                    toast.success("Delete Shop Successfully.", {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 3000,
                    });
                    setDeleteVisible(false);
                    // console.log("data:", deleteResponse.data);
                } else {
                }
            } catch (error) {
                toast.error("Cannot Delete Shop!", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 3000,
                });
                console.error("Failed to delete shop:", error);
            }
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

    //search, filter
    const [searchTitle, setSearchTitle] = useState("");
    const [searchCategory, setSearchCategory] = useState("");
    const [searchFloor, setSearchFloor] = useState("");
    const handleSearchTitleChange = (e) => {
        setSearchTitle(e.target.value);
    };
    const handleSearchCategoryChange = (e) => {
        setSearchCategory(e.target.value);
    };
    const handleSearchFloorChange = (e) => {
        setSearchFloor(e.target.value);
    };
    const filteredShops = currentShops.filter((item) => {
        const titleMatch = item.name.toLowerCase().includes(searchTitle.toLowerCase());
        const categoryMatch = item.categoryName.toLowerCase().includes(searchCategory.toLowerCase());
        const floorMatch = item.floorName.toLowerCase().includes(searchFloor.toLowerCase());
        return titleMatch && categoryMatch && floorMatch;
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
                        <title>Shop List | R Admin</title>
                    </Helmet>
                    {loading ? <Loading /> : ""}
                    <Layout>
                        <Breadcrumb title="Shop List" />

                        <div className="row page-titles">
                            <div className="col-lg-4">
                                <input type="text" className="form-control input-rounded" placeholder="Search name shop . . ." value={searchTitle} onChange={handleSearchTitleChange} />
                            </div>
                            <div className="col-lg-4">
                                <input type="text" className="form-control input-rounded" placeholder="Search category shop . . ." value={searchCategory} onChange={handleSearchCategoryChange} />
                            </div>
                            <div className="col-lg-4">
                                <input type="text" className="form-control input-rounded" placeholder="Search floor . . ." value={searchFloor} onChange={handleSearchFloorChange} />
                            </div>
                        </div>

                        <div className="card-header">
                            <div className="col-lg-5"></div>
                            <div className="col-lg-1 text-end">
                                <NavLink onClick={handleDeleteShop}>
                                    <button type="button" className={`btn btn-danger ${isDeleteVisible ? "" : "d-none"}`}>
                                        <i className="fa fa-trash"></i>
                                    </button>
                                </NavLink>
                            </div>
                            <div className="col-lg-2 text-end">
                                <NavLink to="/shop-delete-at">
                                    <button type="button" className="btn btn-rounded btn-warning">
                                        <span className="btn-icon-start text-warning">
                                            <i className="fa fa-trash"></i>
                                        </span>
                                        Deleted List
                                    </button>
                                </NavLink>
                            </div>
                            <div className="col-lg-2 text-end">
                                <NavLink to="/product-list">
                                    <button type="button" className="btn btn-rounded btn-primary">
                                        <span className="btn-icon-start text-primary">
                                            <i className="mdi mdi-file-document-box font-18 align-middle"></i>
                                        </span>
                                        Product List
                                    </button>
                                </NavLink>
                            </div>
                            <div className="col-lg-2 text-end">
                                <NavLink to="/shop-create">
                                    <button type="button" className="btn btn-rounded btn-info">
                                        <span className="btn-icon-start text-info">
                                            <i className="fa fa-plus color-info"></i>
                                        </span>
                                        Create Shop
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
                                        {filteredShops.map((item, index) => {
                                            return (
                                                <tr>
                                                    <td>
                                                        <div className="form-check custom-checkbox checkbox-primary">
                                                            <input type="checkbox" className="form-check-input" onChange={() => handleTbodyCheckboxChange(index)} checked={tbodyCheckboxes[index]} />
                                                        </div>{" "}
                                                    </td>
                                                    <td>
                                                        <img src={item.imagePath} className="rounded-lg me-2 movie-thumb" alt="" />
                                                    </td>
                                                    <td>
                                                        <h6 className="font-w500 fs-16 mb-0">{item.name}</h6>
                                                        <span className="fs-14 font-w400">
                                                            <a>{item.address}</a>
                                                        </span>
                                                    </td>
                                                    <td>{item.contactInfo}</td>
                                                    <td>{item.hoursOfOperation}</td>
                                                    <td>{item.floorName}</td>
                                                    <td>{item.categoryName}</td>
                                                    <td>
                                                        <div className="d-flex">
                                                            <NavLink to={`/product-list/${item.slug}`} className="btn btn-success shadow btn-xs sharp me-1">
                                                                <i className="fa fa-eye"></i>
                                                            </NavLink>
                                                            <Link to={`/shop-edit/${item.slug}`} className="btn btn-primary shadow btn-xs sharp me-1">
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

export default ShopList;
