import { Helmet } from "react-helmet";
import Layout from "../../layouts";
import Breadcrumb from "../../layouts/breadcrumb";
import { useState } from "react";
import { useCallback } from "react";
import api from "../../services/api";
import url from "../../services/url";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../../layouts/loading";
import { QrReader } from "react-qr-reader";
import { format } from "date-fns";
import NotFound from "../../pages/other/not-found";

function BookingList() {
    const navigate = useNavigate();
    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, []);

    const [userRole, setUserRole] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [bookings, setBookings] = useState([]);
    const [scannerOn, setScannerOn] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);

    const [data, setData] = useState("No result");

    useEffect(() => {
        const loadBooking = async () => {
            const userToken = localStorage.getItem("access_token");
            api.defaults.headers.common["Authorization"] = `Bearer ${userToken}`;
            try {
                const bookingResponse = await api.get(url.BOOKING.LIST);
                const filteredBookings = selectedDate
                    ? bookingResponse.data.filter((item) => format(new Date(item.createdAt), "yyyy-MM-dd") === format(new Date(selectedDate), "yyyy-MM-dd"))
                    : bookingResponse.data;
                setBookings(filteredBookings);
            } catch (error) {}
        };
        loadBooking();
    }, [selectedDate]);

    const startScanner = () => {
        setScannerOn(true);
    };

    const stopScanner = () => {
        setScannerOn(false);
    };

    const handleScan = (result, error) => {
        if (!!result) {
            setData(result.text);
            stopScanner();
            navigateToLink(result.text);
        }

        if (!!error) {
            console.info(error);
        }
    };

    const navigateToLink = (qrCodeData) => {
        // Close the modal after successful scan
        const modalElement = document.getElementById("scanner");
        if (modalElement) {
            modalElement.classList.remove("show");
            modalElement.style.display = "none";
            document.body.classList.remove("modal-open");
            const modalBackdrop = document.querySelector(".modal-backdrop");
            if (modalBackdrop) {
                modalBackdrop.remove();
            }
        }
        navigate(`/booking-detail/${qrCodeData}`);
    };

    //paginate
    const [currentPage, setCurrentPage] = useState(1);
    const bookingsPerPage = 10;
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    const handlePrevPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };
    const handleNextPage = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
    };
    const totalPages = Math.ceil(bookings.length / bookingsPerPage);
    const indexOfLastBooking = currentPage * bookingsPerPage;
    const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
    const currentCodes = bookings.slice(indexOfFirstBooking, indexOfLastBooking);

    //search, filter
    const [searchCode, setSearchCode] = useState("");
    const handleSearchCodeChange = (e) => {
        setSearchCode(e.target.value);
    };
    const filteredCodes = currentCodes.filter((item) => {
        const codeMatch = item.orderCode.toLowerCase().includes(searchCode.toLowerCase());
        return codeMatch;
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
                        <title>Booking List | R Admin</title>
                    </Helmet>

                    {loading ? <Loading /> : ""}

                    <Layout>
                        <Breadcrumb title="Booking List" />
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="card">
                                    <div className="card-header row">
                                        <div className="col-lg-4">
                                            <input type="text" className="form-control input-rounded" placeholder="Search code . . ." value={searchCode} onChange={handleSearchCodeChange} />
                                        </div>
                                        <div className="col-lg-4">
                                            <input type="date" className="form-control input-rounded" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />
                                        </div>

                                        {/* <div className="col-lg-2"></div> */}
                                        <div className="col-lg-4 text-end">
                                            <button type="button" className="btn btn-rounded btn-primary" data-bs-toggle="modal" data-bs-target="#scanner" onClick={startScanner}>
                                                <span className="btn-icon-start text-primary">
                                                    <i className="mdi mdi-qrcode-scan font-18 align-middle"></i>
                                                </span>
                                                Start Scanner
                                            </button>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <div className="table-responsive">
                                            <table className="table table-sm mb-0">
                                                <thead>
                                                    <tr>
                                                        <th className="align-middle">
                                                            <strong>No.</strong>
                                                        </th>
                                                        <th className="align-middle">
                                                            <strong>Booking</strong>
                                                        </th>
                                                        <th className="align-middle pe-7">
                                                            <strong>Movie</strong>
                                                        </th>
                                                        <th className="align-middle pe-7">
                                                            <strong>Show</strong>
                                                        </th>
                                                        <th className="align-middle">
                                                            <strong>Payment</strong>
                                                        </th>
                                                        <th className="align-middle">
                                                            <strong>Final Total</strong>
                                                        </th>
                                                        <th className="align-middle">
                                                            <strong>Booking Date</strong>
                                                        </th>
                                                        <th className="align-middle text-end">
                                                            <strong>Actions</strong>
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody id="orders">
                                                    {filteredCodes.map((item, index) => {
                                                        return (
                                                            <tr className="btn-reveal-trigger" key={index}>
                                                                <td className="py-2">
                                                                    <strong> {index + 1}</strong>
                                                                </td>
                                                                <td className="py-2">
                                                                    <Link to="">
                                                                        <strong>#{item.orderCode}</strong>
                                                                    </Link>
                                                                    <br />
                                                                    <Link to="">by {item.userName}</Link>
                                                                </td>
                                                                <td className="py-2">{item.movieTitle}</td>
                                                                <td className="py-2">{item.showId}</td>
                                                                <td className="py-2">{item.paymentMethod}</td>
                                                                <td className="py-2">${item.finalTotal}</td>
                                                                <td className="py-2">{format(new Date(item.createdAt), "yyyy-MM-dd HH:mm")}</td>
                                                                <td className="py-2 text-end">
                                                                    <Link to={`/booking-detail/${item.orderCode}`} className="btn btn-primary shadow btn-xs sharp me-1">
                                                                        <i className="fa fa-eye"></i>
                                                                    </Link>
                                                                </td>
                                                            </tr>
                                                        );
                                                    })}
                                                </tbody>
                                            </table>
                                        </div>
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
                                <div className="modal fade" id="scanner" onClick={stopScanner}>
                                    <div className="modal-dialog modal-dialog-centered" role="document">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h5 className="modal-title">Scanner QR Code</h5>
                                                <button type="button" className="btn-close" data-bs-dismiss="modal" onClick={stopScanner}></button>
                                            </div>
                                            <div className="modal-body">
                                                {scannerOn && <QrReader onResult={handleScan} />}
                                                <p className="text-center">{data}</p>
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
export default BookingList;
