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

function GalleryList() {
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, []);

    const [gallerys, setGallerys] = useState([]);
    const [isDeleteVisible, setDeleteVisible] = useState(false);
    const [tbodyCheckboxes, setTbodyCheckboxes] = useState([]);
    const [selectAll, setSelectAll] = useState(false);

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

    //hiển thị danh sách gallery
    useEffect(() => {
        const loadGallerys = async () => {
            try {
                const response = await api.get(url.GALLERY.LIST);
                setGallerys(response.data);
            } catch (error) {}
        };
        loadGallerys();
    }, []);

    //xử lý xoá gallery
    const handleDeleteGallery = async () => {
        const selectedGalleryIds = [];

        // lấy id của các food đã được chọn
        gallerys.forEach((item, index) => {
            if (selectAll || tbodyCheckboxes[index]) {
                selectedGalleryIds.push(item.id);
            }
        });

        const isConfirmed = await Swal.fire({
            title: "Are you sure?",
            text: "You want to delete selected gallery?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "I'm sure",
        });
        if (isConfirmed.isConfirmed) {
            try {
                const deleteResponse = await api.delete(url.GALLERY.DELETE, {
                    data: selectedGalleryIds,
                });
                if (deleteResponse.status === 200) {
                    setGallerys((prevGallerys) => prevGallerys.filter((gallery) => !selectedGalleryIds.includes(gallery.id)));
                    toast.success("Delete Gallery Successfully.", {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 3000,
                    });
                } else {
                }
            } catch (error) {
                toast.error("Cannot Delete Gallery!", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 3000,
                });
                console.error("Failed to delete gallery:", error);
            }
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

    //search, filter
    const [searchName, setSearchName] = useState("");
    const handleSearchNameChange = (e) => {
        setSearchName(e.target.value);
    };
    const filteredGallerys = currentGallerys.filter((item) => {
        const nameMatch = item.productName.toLowerCase().includes(searchName.toLowerCase());
        return nameMatch;
    });

    return (
        <>
            <Helmet>
                <title>Gallery List | R Mall</title>
            </Helmet>
            {loading ? <Loading /> : ""}
            <Layout>
                <Breadcrumb title="Gallery List" />

                <div className="row page-titles">
                    <div className="col-lg-5">
                        <input type="text" className="form-control input-rounded" placeholder="Search name gallery . . ." value={searchName} onChange={handleSearchNameChange} />
                    </div>
                    <div className="col-lg-1 text-end">
                        <NavLink onClick={handleDeleteGallery}>
                            <button type="button" className={`btn btn-danger ${isDeleteVisible ? "" : "d-none"}`}>
                                <i className="fa fa-trash"></i>
                            </button>
                        </NavLink>
                    </div>
                    <div className="col-lg-3 text-center">
                        <NavLink to="/gallery-delete-at">
                            <button type="button" className="btn btn-rounded btn-warning">
                                <span className="btn-icon-start text-warning">
                                    <i className="fa fa-trash"></i>
                                </span>
                                Deleted List
                            </button>
                        </NavLink>
                    </div>
                    <div className="col-lg-3">
                        <NavLink to="/gallery-create">
                            <button type="button" className="btn btn-rounded btn-info">
                                <span className="btn-icon-start text-info">
                                    <i className="fa fa-plus color-info"></i>
                                </span>
                                Create New Gallery
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
                                {filteredGallerys.map((item, index) => {
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
                                            <td>{item.productName}</td>
                                            <td>{item.description}</td>
                                            <td>
                                                <div className="d-flex">
                                                    <Link to={`/gallery-edit/${item.id}`} className="btn btn-primary shadow btn-xs sharp me-1">
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

export default GalleryList;
