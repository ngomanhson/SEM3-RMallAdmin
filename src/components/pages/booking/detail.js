import { Helmet } from "react-helmet";
import Layout from "../../layouts";
import Breadcrumb from "../../layouts/breadcrumb";
import { useParams } from "react-router-dom";
import { useCallback, useEffect, useState, useRef } from "react";
import api from "../../services/api";
import url from "../../services/url";
import { format } from "date-fns";
import { useReactToPrint } from "react-to-print";
import Barcode from "react-barcode";
import Swal from "sweetalert2";
import Loading from "../../layouts/loading";
import NotFound from "../other/not-found";

function BookingDetail() {
    const [userRole, setUserRole] = useState(null);
    const { bookingCode } = useParams();
    const [loading, setLoading] = useState(false);
    const [bookingDetail, setBookingDetail] = useState([]);
    const [error, setError] = useState(false);

    const loadBooking = useCallback(async () => {
        const userToken = localStorage.getItem("access_token");
        api.defaults.headers.common["Authorization"] = `Bearer ${userToken}`;
        try {
            const bookingResponse = await api.get(url.BOOKING.DETAIL + `/${bookingCode}`);
            setBookingDetail(bookingResponse.data);
        } catch (error) {
            setError(true);
        }
    }, [bookingCode]);

    useEffect(() => {
        setLoading(true);

        loadBooking();

        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, [loadBooking]);

    const tickets = bookingDetail.tickets || [];
    const foods = bookingDetail.foods || [];

    const printRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => printRef.current,
    });

    const handleConfirmTicket = async (bookingCode) => {
        const userToken = localStorage.getItem("access_token");
        api.defaults.headers.common["Authorization"] = `Bearer ${userToken}`;
        try {
            const confirmResponse = await api.put(url.BOOKING.USE_TICKET + `?orderCode=${bookingCode}`);
            if (confirmResponse.status === 200) {
                Swal.fire({
                    title: "Successfully!",
                    text: "Status update successfully!",
                    icon: "success",
                });
                loadBooking();
            }
        } catch (error) {}
    };

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
                        <title>Booking Detail | R Mall</title>
                    </Helmet>

                    {loading ? <Loading /> : ""}

                    {error ? (
                        <NotFound />
                    ) : (
                        <Layout>
                            <Breadcrumb title="Booking Detail" />

                            <div className="row">
                                <div className="col-lg-6 col-md-12">
                                    <div className="card" style={{ height: "auto" }}>
                                        <div className="card-header">
                                            Invoice
                                            <span className="float-end">#{bookingDetail.orderCode}</span>
                                        </div>
                                        <div className="card-body">
                                            <div className="row mb-5">
                                                <div className="mt-4 col-12 text-center">
                                                    <h4>Information</h4>
                                                    <div>
                                                        <strong>User Name: {bookingDetail.userName}</strong>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="table-responsive">
                                                <table className="table table-striped">
                                                    <thead>
                                                        <tr>
                                                            <th>Movie</th>
                                                            <th>Show</th>
                                                            <th>Screen</th>
                                                            <th>Start date</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td className="left strong text-white">{bookingDetail.movieName}</td>
                                                            <td className="left text-white">{bookingDetail.showId}</td>
                                                            <td className="center text-white">{bookingDetail.roomName}</td>
                                                            <td className="right text-white">
                                                                {bookingDetail && bookingDetail.startDate && format(new Date(bookingDetail.startDate), "HH:mm:ss dd/MM/yyyy")}
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div className="table-responsive mt-3">
                                                <table className="table table-striped">
                                                    <thead>
                                                        <tr>
                                                            <th>Ticket</th>
                                                            <th>Seat</th>
                                                            <th>Price</th>
                                                            {/* <th>Status</th> */}
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {tickets.map((item, index) => {
                                                            return (
                                                                <tr key={index}>
                                                                    <td className="left strong text-white">#{item.code}</td>
                                                                    <td className="left text-white">{item.seatName}</td>
                                                                    <td className="center text-white">${item.price}</td>
                                                                    {/* <td className="center text-white">{item.isUsed === 0 ? "Unused" : "Is Used"}</td> */}
                                                                </tr>
                                                            );
                                                        })}
                                                    </tbody>
                                                </table>
                                            </div>

                                            {foods.length === 0 ? (
                                                ""
                                            ) : (
                                                <div className="table-responsive mt-3">
                                                    <table className="table table-striped">
                                                        <thead>
                                                            <tr>
                                                                <th>Food</th>
                                                                <th>Quantity</th>
                                                                <th>Price</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {foods.map((item, index) => {
                                                                return (
                                                                    <tr key={index}>
                                                                        <td className="left strong text-white">{item.foodName}</td>
                                                                        <td className="left text-white">{item.quantity}</td>
                                                                        <td className="center text-white">${item.price}</td>
                                                                    </tr>
                                                                );
                                                            })}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            )}

                                            <div className="row">
                                                <div className="col-lg-4 col-sm-5">
                                                    <div className="text-left mt-3">
                                                        <img src={bookingDetail.qrCode} alt="QR Code" width={"190px"} />
                                                    </div>
                                                </div>
                                                <div className="col-lg-4 col-sm-5 ms-auto">
                                                    <table className="table table-clear">
                                                        <tbody>
                                                            <tr>
                                                                <td className="left">
                                                                    <strong>Subtotal</strong>
                                                                </td>
                                                                <td className="right">${bookingDetail.total}</td>
                                                            </tr>
                                                            <tr>
                                                                <td className="left">
                                                                    <strong>Discount</strong>
                                                                </td>
                                                                <td className="right">${bookingDetail.discountAmount}</td>
                                                            </tr>
                                                            <tr>
                                                                <td className="left">
                                                                    <strong>Final Total</strong>
                                                                </td>
                                                                <td className="right">
                                                                    <strong>${bookingDetail.finalTotal}</strong>
                                                                </td>
                                                            </tr>

                                                            <tr>
                                                                <td className="left">
                                                                    <strong>Payment Method</strong>
                                                                </td>
                                                                <td className="right">
                                                                    <strong>{bookingDetail.paymentMethod}</strong>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-12">
                                    <div className="card">
                                        <div className="card-header" style={{ padding: "5px 20px" }}>
                                            Ticket: {tickets.length}
                                            <span className="float-end">
                                                {tickets.length > 0 && tickets[0].isUsed === 0 ? (
                                                    <button type="button" className="btn btn-rounded btn-warning" onClick={() => handleConfirmTicket(bookingDetail.orderCode)}>
                                                        <span className="btn-icon-start text-warning">
                                                            <i className="fa fa-upload text-warning"></i>
                                                        </span>
                                                        Update tickets taken
                                                    </button>
                                                ) : (
                                                    <button type="button" className="btn btn-rounded btn-success" style={{ cursor: "default" }}>
                                                        <span className="btn-icon-start text-success">
                                                            <i className="fa fa-check text-success"></i>
                                                        </span>
                                                        Ticket received
                                                    </button>
                                                )}

                                                {tickets.length > 0 && tickets[0].isUsed === 0 && (
                                                    <button type="button" className="btn btn-rounded btn-primary" style={{ marginLeft: "10px" }} onClick={handlePrint}>
                                                        <span className="btn-icon-start text-primary">
                                                            <i className="fa fa-print"></i>
                                                        </span>
                                                        Print tickets
                                                    </button>
                                                )}
                                            </span>
                                        </div>
                                        <div className="card-body" ref={printRef}>
                                            {tickets.map((item, index) => {
                                                return (
                                                    <div className="container-ticket mb-4" key={index}>
                                                        <div className="ticket">
                                                            <div className="head-ticket">
                                                                <p className="x-bold ">Cinema ticket</p>
                                                            </div>
                                                            <div className="body-ticket">
                                                                <div className="hr-lg"></div>
                                                                <div className="produits">
                                                                    <div className="col2">
                                                                        <p>Customer: {bookingDetail.userName}</p>
                                                                    </div>
                                                                    <div className="hr-sm"></div>
                                                                    <div className="col2">
                                                                        <p>Movie</p>
                                                                        <p className="prix">{bookingDetail.movieName}</p>
                                                                    </div>
                                                                    <div className="col2">
                                                                        <p>Screen</p>
                                                                        <p className="prix">{bookingDetail.roomName}</p>
                                                                    </div>
                                                                    <div className="col2">
                                                                        <p>Start Date</p>
                                                                        <p className="prix">
                                                                            {bookingDetail && bookingDetail.startDate && format(new Date(bookingDetail.startDate), "HH:mm:ss dd/MM/yyyy")}
                                                                        </p>
                                                                    </div>
                                                                    <div className="hr-lg"></div>
                                                                    <div className="col2">
                                                                        <p>Seat code</p>
                                                                        <p className="prix">{item.code}</p>
                                                                    </div>
                                                                    <div className="col2">
                                                                        <p>Seat symbol</p>
                                                                        <p className="prix">{item.seatName}</p>
                                                                    </div>
                                                                    <div className="col2">
                                                                        <p>Price of the seat</p>
                                                                        <p className="prix">${item.price}</p>
                                                                    </div>
                                                                    <div className="col2">
                                                                        <Barcode value={item.code} />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="footer-ticket">
                                                                <p className="title-footer">Thank you. Wishing you a pleasant experience.</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Layout>
                    )}
                </>
            )}
        </>
    );
}

export default BookingDetail;
