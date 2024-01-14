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

function ShowList() {
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, []);

    const [shows, setShows] = useState([]);
    const [movies, setMovies] = useState([]);
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        const loadShows = async () => {
            try {
                const response = await api.get(url.SHOW.LIST);
                setShows(response.data);
            } catch (error) {}
        };
        loadShows();
    }, []);

    //hiển thị ra toàn bộ movie và room (dùng để lọc)
    useEffect(() => {
        api.get(url.MOVIE.LIST)
            .then((response) => {
                setMovies(response.data);
            })
            .catch((error) => {});

        api.get(url.ROOM.LIST)
            .then((response) => {
                setRooms(response.data);
            })
            .catch((error) => {});
    }, []);

    //hiển thị chi tiết ghế
    const SeatPricing = ({ seatPricings }) => (
        <div className="payment-details accordion-body-text">
            <div className="me-3 mb-3">
                <p className="fs-12 mb-2">Type Seat</p>
                <span className="font-w500">Price</span>
            </div>
            {seatPricings.map((priceseat) => (
                <div className="me-3 mb-3" key={priceseat.id}>
                    <p className="fs-12 mb-2">
                        Seat Type {priceseat.seatTypeId} ({priceseat.seatTypeName})
                    </p>
                    <span className="font-w500">{priceseat.price}$</span>
                </div>
            ))}
        </div>
    );

    //xử lý xoá show
    const handleDeleteShow = async (id) => {
        const isConfirmed = await Swal.fire({
            title: "Are you sure?",
            text: "You want to delete this show?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "I'm sure",
        });
        if (isConfirmed.isConfirmed) {
            try {
                const deleteResponse = await api.delete(`${url.SHOW.DELETE.replace("{}", id)}`);
                if (deleteResponse.status === 200) {
                    setShows((prevShows) => prevShows.filter((show) => show.id !== id));
                    toast.success("Delete Show Successfully.", {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 3000,
                    });
                    // console.log("data:", deleteResponse.data);
                } else {
                }
            } catch (error) {
                if (error.response.status === 400 && error.response.data.message === "Show cannot be deleted") {
                    toast.error("Tickets have been purchased for this show schedule, the show cannot be deleted", {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 3000,
                    });
                } else {
                    toast.error("Unable to delete show, please try again", {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 3000,
                    });
                }
                // console.error("Error creating test:", error);
                // console.error("Response data:", error.response.data);
            }
        }
    };

    //paginate
    const [currentPage, setCurrentPage] = useState(1);
    const showsPerPage = 10;
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    const handlePrevPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };
    const handleNextPage = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
    };
    const totalPages = Math.ceil(shows.length / showsPerPage);
    const indexOfLastShow = currentPage * showsPerPage;
    const indexOfFirstShow = indexOfLastShow - showsPerPage;
    const currentShows = shows.slice(indexOfFirstShow, indexOfLastShow);

    //search, filter
    const [searchCode, setSearchCode] = useState("");
    const [selectedMovie, setSelectedMovie] = useState("");
    const [selectedRoom, setSelectedRoom] = useState("");
    const handleSearchCodeChange = (e) => {
        setSearchCode(e.target.value);
    };
    const handleMovieChange = (e) => {
        setSelectedMovie(e.target.value);
    };
    const handleRoomChange = (e) => {
        setSelectedRoom(e.target.value);
    };
    const filteredShows = currentShows.filter((item) => {
        const nameMatch = item.showCode.toLowerCase().includes(searchCode.toLowerCase());
        const movieMatch = !selectedMovie || item.movieName === selectedMovie;
        const roomMatch = !selectedRoom || item.roomName === selectedRoom;
        return nameMatch && movieMatch && roomMatch;
    });

    return (
        <>
            <Helmet>
                <title>Showtime List | R Mall</title>
            </Helmet>
            {loading ? <Loading /> : ""}
            <Layout>
                <Breadcrumb title="Showtime List" />

                <div className="row page-titles">
                    <div className="col-lg-4">
                        <input type="text" className="form-control input-rounded" placeholder="Search show code . . ." value={searchCode} onChange={handleSearchCodeChange} />
                    </div>
                    <div className="col-lg-4">
                        <select className="form-control input-rounded" value={selectedMovie} onChange={handleMovieChange}>
                            <option value="">Filter by Movie</option>
                            {movies.map((movie) => (
                                <option key={movie.id} value={movie.title}>
                                    {movie.title}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="col-lg-4">
                        <select className="form-control input-rounded" value={selectedRoom} onChange={handleRoomChange}>
                            <option value="">Filter by Room</option>
                            {rooms.map((room) => (
                                <option key={room.id} value={room.name}>
                                    {room.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-12">
                        <div class="col-xl-12">
                            <div class="card user-data-table">
                                <div class="card-body tab-content p-0">
                                    <div class="tab-pane fade active show" id="monthly" role="tabpanel">
                                        <div id="accordion-one" class="accordion style-1">
                                            <div class="card">
                                                <div class="accordion-header my-2">
                                                    <div class="d-flex align-items-center">
                                                        <div class="user-info">
                                                            <h6 class="fs-16 font-w500 mb-0">
                                                                <a href="javascript:void(0)">Show Code</a>
                                                            </h6>
                                                        </div>
                                                    </div>
                                                    <span>Movie</span>
                                                    <span>Room</span>
                                                    <span>Start Date</span>
                                                    <span>Language</span>
                                                    <span>Action</span>
                                                    <span class="accordion-header-indicator"></span>
                                                </div>
                                            </div>
                                            <div class="accordion-item bg-transparent mb-0">
                                                {filteredShows.map((item, index) => {
                                                    const accordionTargetId = `linkopenaccordion_${index}`;
                                                    return (
                                                        <>
                                                            <div class="accordion-header collapsed my-2" data-bs-toggle="collapse" data-bs-target={`#${accordionTargetId}`}>
                                                                <div class="d-flex align-items-center">
                                                                    <div class="user-info">
                                                                        <h6 class="fs-16 font-w500 mb-0">
                                                                            <a href="javascript:void(0)">{item.showCode}</a>
                                                                        </h6>
                                                                    </div>
                                                                </div>
                                                                <span>{item.movieName.length > 15 ? `${item.movieName.slice(0, 15)}...` : item.movieName}</span>
                                                                <span>{item.roomName}</span>
                                                                <span>{format(new Date(item.startDate), "yyyy-MM-dd HH:mm")}</span>
                                                                <NavLink to="">{item.language}</NavLink>
                                                                <span class="accordion-header-indicator"></span>
                                                                <NavLink onClick={() => handleDeleteShow(item.id)} className="btn btn-danger" style={{ zIndex: "99" }}>
                                                                    <i className="fa fa-trash"></i>
                                                                </NavLink>
                                                            </div>
                                                            <div id={accordionTargetId} class="collapse accordion_body" data-bs-parent="#accordion-one">
                                                                <SeatPricing seatPricings={item.seatPricings || []} />
                                                            </div>
                                                        </>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* paginate */}
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
            </Layout>
        </>
    );
}
export default ShowList;
