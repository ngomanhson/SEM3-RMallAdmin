import { Helmet } from "react-helmet";
import Layout from "../../../layouts";
import Breadcrumb from "../../../layouts/breadcrumb";
import { useEffect, useState } from "react";
import url from "../../../services/url";
import api from "../../../services/api";
import { toast } from "react-toastify";
import { Link, NavLink, useNavigate, useParams } from "react-router-dom";
import Loading from "../../../layouts/loading";
import Swal from "sweetalert2";
import NotFound from "../../../pages/other/not-found";

function ListProductOfShop() {
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, []);

    const [userRole, setUserRole] = useState(null);
    const [error, setError] = useState(null);
    const { slug } = useParams();
    const [products, setProducts] = useState([]);
    const [shopDetail, setShopDetail] = useState([]);
    const [isDeleteVisible, setDeleteVisible] = useState(false);
    const [tbodyCheckboxes, setTbodyCheckboxes] = useState([]);
    const [selectAll, setSelectAll] = useState(false);

    //hien thi thong tin chi tiet shop
    useEffect(() => {
        const userToken = localStorage.getItem("access_token");
        api.defaults.headers.common["Authorization"] = `Bearer ${userToken}`;
        api.get(`${url.SHOP.DETAIL.replace("{}", slug)}`)
            .then((response) => {
                setShopDetail(response.data);
            })
            .catch((error) => {
                // console.error("Error fetching promotion details:", error);
            });
    }, [slug]);

    //hien thi thong tin product theo shop
    useEffect(() => {
        const userToken = localStorage.getItem("access_token");
        api.defaults.headers.common["Authorization"] = `Bearer ${userToken}`;
        api.get(`${url.PRODUCT.LISTBYSHOP.replace("{}", slug)}`)
            .then((response) => {
                setProducts(response.data);
                setTbodyCheckboxes(Array.from({ length: response.data.length }).fill(false));
            })
            .catch((error) => {
                // console.error("Error fetching promotion details:", error);
            });
    }, [slug]);

    //xử lý check tất cả và hiển thị thùng rác
    const handleSelectAll = () => {
        const updatedCheckboxes = !selectAll ? Array.from({ length: products.length }).fill(true) : Array.from({ length: products.length }).fill(false);
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

    //xử lý xoá product
    const handleDeleteProduct = async () => {
        const selectedProductIds = [];

        // lấy id của các product đã được chọn
        products.forEach((item, index) => {
            if (selectAll || tbodyCheckboxes[index]) {
                selectedProductIds.push(item.id);
            }
        });

        const isConfirmed = await Swal.fire({
            title: "Are you sure?",
            text: "You want to delete selected products?",
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
                const deleteResponse = await api.delete(url.PRODUCT.DELETE, {
                    data: selectedProductIds,
                });

                if (deleteResponse.status === 200) {
                    setProducts((prevProducts) => prevProducts.filter((product) => !selectedProductIds.includes(product.id)));
                    setTbodyCheckboxes((prevCheckboxes) => prevCheckboxes.filter((_, index) => !selectedProductIds.includes(products[index].id)));
                    toast.success("Delete Product Successfully.", {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 3000,
                    });
                    setDeleteVisible(false);
                    // console.log("data:", deleteResponse.data);
                } else {
                }
            } catch (error) {
                toast.error("Cannot Delete Product!", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 3000,
                });
                console.error("Failed to delete product:", error);
            }
        }
    };

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
                        <title>List Product Of Shop | R Mall</title>
                    </Helmet>
                    {loading ? <Loading /> : ""}
                    <Layout>
                        <Breadcrumb title="List Product Of Shop" />

                        <div className="row">
                            <div className="col-xl-4">
                                <div className="row">
                                    <div className="col-xl-12">
                                        <div className="card">
                                            <div className="card-body">
                                                <div className="profile-blog">
                                                    <h4 className="d-inline">Information shop :</h4>
                                                    <img src={shopDetail.imagePath} alt="image image" className="img-fluid mt-4 mb-4 w-100" />
                                                    <h4 className="d-inline">Name shop :</h4>
                                                    <p className="mb-0">
                                                        {shopDetail.name} ({shopDetail.address})
                                                    </p>

                                                    <div style={{ paddingTop: "20px" }}>
                                                        <h4 className="d-inline">Contact Info :</h4>
                                                        <p className="mb-0">{shopDetail.contactInfo}</p>
                                                    </div>

                                                    <div style={{ paddingTop: "20px" }}>
                                                        <h4 className="d-inline">Hours Of Operation :</h4>
                                                        <p className="mb-0">{shopDetail.hoursOfOperation}</p>
                                                    </div>

                                                    <div style={{ paddingTop: "20px" }}>
                                                        <h4 className="d-inline">Category :</h4>
                                                        <p className="mb-0">{shopDetail.categoryName}</p>
                                                    </div>

                                                    <div style={{ paddingTop: "20px" }}>
                                                        <h4 className="d-inline">Floor :</h4>
                                                        <p className="mb-0">{shopDetail.floorName}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-8">
                                <div className="card">
                                    <div className="card-body">
                                        <h4 className="d-inline">Description shop :</h4>
                                        <div
                                            className="post-details"
                                            dangerouslySetInnerHTML={{
                                                __html: shopDetail.description,
                                            }}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card-header">
                            <div className="col-lg-6"></div>
                            <div className="col-lg-1 text-end">
                                <NavLink onClick={handleDeleteProduct}>
                                    <button type="button" className={`btn btn-danger ${isDeleteVisible ? "" : "d-none"}`}>
                                        <i className="fa fa-trash"></i>
                                    </button>
                                </NavLink>
                            </div>
                            <div className="col-lg-2 text-end">
                                <NavLink to="/product-delete-at">
                                    <button type="button" className="btn btn-rounded btn-warning">
                                        <span className="btn-icon-start text-warning">
                                            <i className="fa fa-trash"></i>
                                        </span>
                                        Deleted List
                                    </button>
                                </NavLink>
                            </div>
                            <div className="col-lg-3 text-end">
                                <NavLink to="/product-create">
                                    <button type="button" className="btn btn-rounded btn-info">
                                        <span className="btn-icon-start text-info">
                                            <i className="fa fa-plus color-info"></i>
                                        </span>
                                        Create New Product
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
                                                <strong>Product Name</strong>
                                            </th>
                                            <th>
                                                <strong>Price</strong>
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
                                        {products.map((item, index) => {
                                            return (
                                                <tr>
                                                    <td>
                                                        <div className="form-check custom-checkbox checkbox-primary">
                                                            <input type="checkbox" className="form-check-input" onChange={() => handleTbodyCheckboxChange(index)} checked={tbodyCheckboxes[index]} />
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <img src={item.image} className="rounded-lg me-2 movie-thumb" alt="" />
                                                    </td>
                                                    <td>{item.name}</td>
                                                    <td>{item.price}</td>
                                                    <td>{item.description}</td>
                                                    <td>
                                                        <div className="d-flex">
                                                            <Link to={`/product-edit/${item.id}`} className="btn btn-primary shadow btn-xs sharp me-1">
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
                    </Layout>
                </>
            )}
        </>
    );
}

export default ListProductOfShop;
