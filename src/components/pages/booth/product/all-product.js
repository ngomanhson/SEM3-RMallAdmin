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

function ListProduct() {
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, []);

    const [products, setProducts] = useState([]);
    const [isDeleteVisible, setDeleteVisible] = useState(false);
    const [tbodyCheckboxes, setTbodyCheckboxes] = useState([]);
    const [selectAll, setSelectAll] = useState(false);

    //hiển thị danh sách product
    useEffect(() => {
        const loadProducts = async () => {
            try {
                const response = await api.get(url.PRODUCT.LIST);
                setProducts(response.data);
            } catch (error) {}
        };
        loadProducts();
    }, []);

    //xử lý check tất cả và hiển thị thùng rác
    const handleSelectAll = () => {
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
            try {
                const deleteResponse = await api.delete(url.PRODUCT.DELETE, {
                    data: selectedProductIds,
                });

                if (deleteResponse.status === 200) {
                    setProducts((prevProducts) => prevProducts.filter((product) => !selectedProductIds.includes(product.id)));
                    toast.success("Delete Product Successfully.", {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 3000,
                    });
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

    //paginate
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 10;
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    const handlePrevPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };
    const handleNextPage = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
    };
    const totalPages = Math.ceil(products.length / productsPerPage);
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
    return (
        <>
            <Helmet>
                <title>Product List | R Mall</title>
            </Helmet>
            {loading ? <Loading /> : ""}
            <Layout>
                <Breadcrumb title="Product List" />

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
                                    </th>{" "}
                                    <th>
                                        <strong>Shop Name</strong>
                                    </th>
                                    <th>
                                        <strong>Action</strong>
                                    </th>
                                </tr>
                            </thead>
                            <tbody id="orders">
                                {currentProducts.map((item, index) => {
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
                                            <td>{item.shopId}</td>
                                            <td>
                                                <div className="d-flex">
                                                    <Link to={`/product-edit/${item.slug}`} className="btn btn-primary shadow btn-xs sharp me-1">
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
    );
}

export default ListProduct;
