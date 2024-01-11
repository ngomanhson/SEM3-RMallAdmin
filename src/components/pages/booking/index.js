import { Helmet } from "react-helmet";
import Layout from "../../layouts";
import Breadcrumb from "../../layouts/breadcrumb";
import { useState } from "react";
import { useCallback } from "react";
import api from "../../services/api";
import url from "../../services/url";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Loading from "../../layouts/loading";

function BookingList() {
    const [loading, setLoading] = useState(false);
    const [bookings, setBookings] = useState([]);
    const loadBooking = useCallback(async () => {
        try {
            const bookingResponse = await api.get(url.BOOKING.LIST);
            setBookings(bookingResponse.data);
        } catch (error) {}
    }, []);

    useEffect(() => {
        setLoading(true);
        loadBooking();
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, [loadBooking]);

    return (
        <>
            <Helmet>
                <title>Booking List | R Mall</title>
            </Helmet>

            {loading ? <Loading /> : ""}

            <Layout>
                <Breadcrumb title="Booking List" />
                <div className="row">
                    <div className="col-lg-12">
                        <div className="card">
                            <div className="card-header">
                                <div className="col-lg-7"></div>
                                <div className="col-lg-2 text-end">
                                    <button type="button" className="btn btn-rounded btn-primary">
                                        <span className="btn-icon-start text-primary">
                                            <i className="mdi mdi-qrcode-scan font-18 align-middle"></i>
                                        </span>
                                        Scan QR Code
                                    </button>
                                </div>
                            </div>
                            <div className="card-body">
                                <div className="table-responsive">
                                    <table className="table table-sm mb-0">
                                        <thead>
                                            <tr>
                                                <th className="align-middle">
                                                    <div className="form-check custom-checkbox">
                                                        <input type="checkbox" className="form-check-input" id="checkAll" />
                                                        <label className="form-check-label" for="checkAll"></label>
                                                    </div>
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
                                                {/* <th className="align-middle">
                                                    <strong>Status</strong>
                                                </th> */}
                                                <th className="align-middle text-end">
                                                    <strong>Actions</strong>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody id="orders">
                                            {bookings.map((item, index) => {
                                                return (
                                                    <tr className="btn-reveal-trigger" key={index}>
                                                        <td className="py-2">
                                                            <div className="form-check custom-checkbox checkbox-success">
                                                                <input type="checkbox" className="form-check-input" id="checkbox" />
                                                                <label className="form-check-label" htmlFor="checkbox"></label>
                                                            </div>
                                                        </td>
                                                        <td className="py-2">
                                                            <Link to="">
                                                                <strong>#{item.orderCode}</strong>
                                                            </Link>
                                                            <br />
                                                            <Link to="">by Ngo Manh Son</Link>
                                                        </td>
                                                        <td className="py-2">{item.movieTitle}</td>
                                                        <td className="py-2">{item.showId}</td>
                                                        <td className="py-2">{item.paymentMethod}</td>
                                                        <td className="py-2">${item.finalTotal}</td>
                                                        {/* <td className="py-2">
                                                            {item.isPaid === 0 ? (
                                                                <span class="badge badge-secondary text-white">
                                                                    Haven't gotten a ticket yet<span class="ms-1 fa fa-ban"></span>
                                                                </span>
                                                            ) : (
                                                                <span className="badge badge-success">
                                                                    Got the ticket<span className="ms-1 fa fa-check"></span>
                                                                </span>
                                                            )}
                                                        </td> */}
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
                    </div>
                </div>
            </Layout>
        </>
    );
}
export default BookingList;
