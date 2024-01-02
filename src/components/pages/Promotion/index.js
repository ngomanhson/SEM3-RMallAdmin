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
function PromotionList() {
    const [promotions, setPromotions] = useState([]);
    const [isDeleteVisible, setDeleteVisible] = useState(false);
    const [tbodyCheckboxes, setTbodyCheckboxes] = useState([]);
    const [selectAll, setSelectAll] = useState(false);

    useEffect(() => {
        const loadPromotions = async () => {
            try {
                const response = await api.get(url.PROMOTION.LIST);
                setPromotions(response.data);
            } catch (error) {}
        };
        loadPromotions();
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
            try {
                const deleteResponse = await api.delete(url.PROMOTION.DELETE, { params: { ids: selectedPromotionIds } });
                if (deleteResponse.status === 200) {
                    setPromotions((prevPromotions) => prevPromotions.filter((promotion) => !selectedPromotionIds.includes(promotion.id)));
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

    return (
        <>
            <Helmet>
                <title>Promotion List | R Mall</title>
            </Helmet>
            <Layout>
                <Breadcrumb title="Promotion Create" />
                <div className="row page-titles">
                    <div className="col-lg-4">
                        <input type="text" class="form-control input-rounded" placeholder="Search name . . ." />
                    </div>
                    <div className="col-lg-4">
                        <input type="datetime-local" class="form-control input-rounded" />
                    </div>
                    <div className="col-lg-4">
                        <input type="datetime-local" class="form-control input-rounded" />
                    </div>
                </div>
                <div className="row page-titles">
                    <div className="col-lg-4 text-center">
                        <NavLink to="/promotion-create">
                            <button type="button" className="btn btn-rounded btn-info">
                                <span className="btn-icon-start text-info">
                                    <i className="fa fa-plus color-info"></i>
                                </span>
                                Create Promotion
                            </button>
                        </NavLink>
                    </div>
                    <div className="col-lg-4 text-center">
                        <NavLink to="">
                            <button type="button" className="btn btn-rounded btn-warning">
                                <span className="btn-icon-start text-warning">
                                    <i class="fa fa-trash"></i>
                                </span>
                                Deleted List
                            </button>
                        </NavLink>
                    </div>
                    <div className="col-lg-4 text-center">
                        <NavLink onClick={handleDeletePromotion}>
                            <button type="button" className={`btn btn-danger ${isDeleteVisible ? "" : "d-none"}`}>
                                <i className="fa fa-trash"></i>
                            </button>
                        </NavLink>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="card">
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
                                            {promotions.map((item, index) => {
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
                                                        <td className="py-2">{format(new Date(item.startDate), "yyyy-MM-dd")}</td>
                                                        <td className="py-2">{format(new Date(item.endDate), "yyyy-MM-dd")}</td>
                                                        <td className="py-2">{item.discountPercentage}%</td>
                                                        <td className="py-2">{item.limit}</td>
                                                        <td className="py-2 text-center">${item.minPurchaseAmount}</td>
                                                        <td className="py-2 text-end">
                                                            <div className="d-flex">
                                                                <a href="#!" className="btn btn-success shadow btn-xs sharp me-1">
                                                                    <i className="fa fa-eye"></i>
                                                                </a>
                                                                <Link to={`/movie-edit/${item.id}`} className="btn btn-primary shadow btn-xs sharp me-1">
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
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
}
export default PromotionList;
