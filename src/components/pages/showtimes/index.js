import Layout from "../../layouts/index";
import Breadcrumb from "../../layouts/breadcrumb";
import { Link, NavLink, useLocation, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import api from "../../services/api";
import url from "../../services/url";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import moment from "moment";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";
import Loading from "../../layouts/loading";

function ShowTimes() {
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, []);

    const { id } = useParams();
    const [currentRoomId, setCurrentRoomId] = useState(id);
    const location = useLocation();
    const isActive = (path) => {
        return location.pathname === path;
    };
    const [events, setEvents] = useState([]);
    const eventColors = ["#53CAFD", "#FFAA2B", "#1EAE7A", "#B9A8FF"];
    const [isSelecting, setIsSelecting] = useState(false);
    const [selectedTime, setSelectedTime] = useState("");
    const [movies, setMovies] = useState([]);
    const [selectedMovieId, setSelectedMovieId] = useState("");
    const [languages, setLanguages] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [formShow, setFormShow] = useState({
        movieId: "",
        roomId: id,
        startDate: "",
        language: "",
        seatPricings: [
            { seatTypeId: 1, price: 0 }, // normal
            { seatTypeId: 2, price: 0 }, // vip
            { seatTypeId: 3, price: 0 }, // couple
        ],
    });

    //select ngày ở FullCalendar thì hiển thị modal
    const handleDateSelect = (selectInfo) => {
        const startDate = new Date(selectInfo.startStr);
        const localStartDate = moment(startDate).format();
        setFormShow((prevFormShow) => ({
            ...prevFormShow,
            startDate: localStartDate,
        }));
        setSelectedTime(
            startDate.toLocaleString("en-US", {
                year: "numeric",
                month: "numeric",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
            })
        );
        //khi FullCalendar ở mục tháng thì sẽ không hiển thị modal để thêm phim
        if (selectInfo.view.type === "dayGridMonth") {
            setIsSelecting(false);
        } else {
            setIsSelecting(true);
        }
    };
    useEffect(() => {
        if (isSelecting) {
            const $ = window.$;
            $("#add-movie").modal("show");
        } else {
            setFormShow((prevFormShow) => ({
                ...prevFormShow,
                startDate: "",
            }));
        }
    }, [isSelecting]);

    //đóng modal
    const handleCloseModal = () => {
        const $ = window.$;
        $("#add-movie").modal("hide");
        setIsSelecting(false);
    };

    //chỉ select được từ thời điểm hiện tại trở đi trên mục FullCalendar
    const handleSelectAllow = (selectInfo) => {
        const currentTime = moment();
        const selectedStartTime = moment(selectInfo.startStr);
        return selectedStartTime.isSameOrAfter(currentTime);
    };

    //hien thi select phim
    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await api.get(url.MOVIE.LIST);
                setMovies(response.data);
            } catch (error) {}
        };
        fetchMovies();
    }, []);
    //hiển thị select language
    useEffect(() => {
        const fetchLanguages = async () => {
            try {
                if (selectedMovieId) {
                    const response = await api.get(`${url.LANGUAGE.GETBYMOVIE.replace("{}", selectedMovieId)}`);
                    setLanguages(response.data);
                }
            } catch (error) {}
        };

        if (!selectedMovieId) {
            setLanguages([]);
        }
        fetchLanguages();
    }, [selectedMovieId]);

    //validate
    const [errors, setErrors] = useState({});
    const validateForm = () => {
        let valid = true;
        const newErrors = {};
        if (formShow.movieId === "") {
            newErrors.movieId = "Please choose movie";
            valid = false;
        }
        if (formShow.language === "") {
            newErrors.language = "Please choose language";
            valid = false;
        }
        if (formShow.seatPricings[0].price === 0) {
            newErrors.seatPricings = "Please enter seat prices";
            valid = false;
        }
        setErrors(newErrors);
        return valid;
    };

    //xử lý thêm phim vào vào FullCalendar và lưu vào database
    const handleSubmit = async (e) => {
        e.preventDefault();
        const isFormValid = validateForm();
        if (isFormValid) {
            try {
                const response = await api.post(url.SHOW.CREATE, formShow);
                if (response && response.data) {
                    // console.log(response.data);
                    toast.success("Added movie to showtime successfully", {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 3000,
                    });
                    const $ = window.$;
                    $("#add-movie").modal("hide"); //đóng modal
                    setIsSelecting(false);

                    //hiển thị lịch chiếu vừa thêm trên FullCalendar
                    const newShow = response.data;
                    const movie = durationMovie.find((m) => m.id === newShow.movieId);
                    const durationMinutes = movie ? movie.duration : 0;
                    const startDate = moment(newShow.startDate);
                    const endDate = startDate.clone().add(durationMinutes, "minutes");
                    const randomColor = eventColors[Math.floor(Math.random() * eventColors.length)];
                    setEvents((prevEvents) => [
                        ...prevEvents,
                        {
                            id: newShow.id,
                            title: movie ? movie.title : newShow.movieId,
                            start: startDate.toISOString(),
                            end: endDate.toISOString(),
                            backgroundColor: randomColor,
                        },
                    ]);
                } else {
                }
            } catch (error) {
                if (error.response.status === 400 && error.response.data.message === "Invalid time") {
                    toast.error("Unable to create movie showtime for this time, please choose another time!", {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 3000,
                    });
                } else if (error.response.status === 400 && error.response.data.title === "Bad Request") {
                    toast.error("Each movie must be 10 minutes apart, please choose the time again!", {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 3000,
                    });
                } else {
                    toast.error("Unable to add movie to showtime, please try again!", {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 3000,
                    });
                }
                console.error("Error creating test:", error);
                console.error("Response data:", error.response.data);
            }
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormShow({ ...formShow, [name]: value });

        if (name === "movieId") {
            setSelectedMovieId(value);
            setFormShow((prevFormShow) => ({
                ...prevFormShow,
                language: "",
            }));
        }
    };
    //chọn giá vé normal thì giá vip và couple tự đổi
    const handleNormalSeatPriceChange = (e) => {
        const { value } = e.target;
        setFormShow((formShow) => ({
            ...formShow,
            seatPricings: [
                { seatTypeId: 1, price: parseFloat(value) },
                { seatTypeId: 2, price: parseFloat(value) + 2 },
                { seatTypeId: 3, price: parseFloat(value) + 3 },
            ],
        }));
    };

    //hiển thị danh sách show trên FullCalendar
    const durationMovie = movies; //lấy thời lượng chiếu của phim và sau đó cộng với startDate ra endDate
    const [showslist, setShowsList] = useState([]);
    useEffect(() => {
        const loadShowsList = async () => {
            try {
                const response = await api.get(`${url.SHOW.GETBYROOM.replace("{}", currentRoomId)}`);
                setShowsList(response.data);
                // console.log(response.data);
            } catch (error) {}
        };
        loadShowsList();
    }, [currentRoomId]);

    useEffect(() => {
        const updatedEvents = showslist.map((show) => {
            const movie = durationMovie.find((m) => m.id === show.movieId);
            const durationMinutes = movie ? movie.duration : 0;
            const startDate = moment(show.startDate);
            const endDate = startDate.clone().add(durationMinutes, "minutes");
            const randomColor = eventColors[Math.floor(Math.random() * eventColors.length)];
            return {
                id: show.id,
                title: movie ? movie.title : show.movieId,
                start: startDate.toISOString(),
                end: endDate.toISOString(),
                backgroundColor: randomColor,
            };
        });
        setEvents(updatedEvents);
    }, [showslist, durationMovie]);

    // lấy ra danh sách phòng
    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const response = await api.get(url.ROOM.LIST);
                setRooms(response.data);
                // console.log(response.data);
            } catch (error) {}
        };
        fetchRooms();
    }, []);

    return (
        <>
            <Helmet>
                <title>Show Times | R Mall</title>
            </Helmet>
            {loading ? <Loading /> : ""}
            <Layout>
                <Breadcrumb title="Show Times" />
                <div className="row">
                    <div className="col-xl-3 col-xxl-4">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-intro-title">Rooms List</h4>
                                <div id="external-events" className="my-3">
                                    <p>Click on each room to see that room's showtime!</p>
                                    <div className="nav flex-column nav-pills mb-3">
                                        {rooms.map((item, index) => (
                                            <NavLink key={index} to={`/show-times/${item.id}`}>
                                                <a className={`nav-link ${isActive(`/show-times/${item.id}`) ? "active show" : ""}`} onClick={() => setCurrentRoomId(item.id)}>
                                                    {item.name}
                                                </a>
                                            </NavLink>
                                        ))}
                                    </div>
                                </div>

                                {/* <a href="javascript:void()" className="btn btn-primary btn-event w-100">
                                    <span className="align-middle">
                                        <i className="ti-plus me-1"></i>
                                    </span>{" "}
                                    Create New Room
                                </a> */}
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-9 col-xxl-8">
                        <div className="card">
                            <div className="card-body">
                                <FullCalendar
                                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
                                    headerToolbar={{
                                        left: "prev,next today",
                                        center: "title",
                                        right: "dayGridMonth,timeGridWeek,timeGridDay,listDay",
                                    }}
                                    initialView="dayGridMonth"
                                    editable={false}
                                    selectable={true}
                                    selectMirror={true}
                                    dayMaxEvents={true}
                                    events={events}
                                    selectAllow={handleSelectAllow}
                                    select={handleDateSelect}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="modal fade none-border" id="add-movie">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h4 className="modal-title">
                                        <strong>Add Movie To Showtime At {selectedTime}</strong>
                                    </h4>
                                </div>
                                <div className="modal-body">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label className="text-label form-label">Choose Movie</label>
                                                <select className="form-control" name="movieId" value={formShow.movieId} onChange={handleChange}>
                                                    <option value="">Please select movie</option>
                                                    {movies.map((movieItem) => (
                                                        <option key={movieItem.id} value={movieItem.id}>
                                                            {movieItem.title}
                                                        </option>
                                                    ))}
                                                </select>
                                                {errors.movieId && <div className="text-danger">{errors.movieId}</div>}
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label className="text-label form-label">Language</label>
                                                <select className="form-control select" name="language" value={formShow.language} onChange={handleChange}>
                                                    <option value="">Please select language</option>
                                                    {languages.map((languageItem) => (
                                                        <option key={languageItem.id} value={languageItem.name}>
                                                            {languageItem.name}
                                                        </option>
                                                    ))}
                                                </select>
                                                {errors.language && <div className="text-danger">{errors.language}</div>}
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label className="text-label form-label">Normal seat price</label>
                                                {/* phần này dành cho ghế normal (seatTypeId là 1) */}
                                                <select className="form-control" value={formShow.seatPricings[0].price} onChange={handleNormalSeatPriceChange}>
                                                    <option value="">Please select price</option>
                                                    <option value="6">6$</option>
                                                    <option value="8">8$</option>
                                                    <option value="10">10$</option>
                                                    <option value="12">12$</option>
                                                </select>
                                                {errors.seatPricings && <div className="text-danger">{errors.seatPricings}</div>}
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label className="text-label form-label">Vip seat price</label>
                                                {/* phần này dành cho ghế vip (seatTypeId là 2) */}
                                                <select className="form-control" value={formShow.seatPricings[1].price} disabled>
                                                    <option value={formShow.seatPricings[1].price}>{formShow.seatPricings[1].price}$</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label className="text-label form-label">Couple seat price</label>
                                                {/* phần này dành cho ghế couple (seatTypeId là 3) */}
                                                <select className="form-control" value={formShow.seatPricings[2].price} disabled>
                                                    <option value={formShow.seatPricings[2].price}>{formShow.seatPricings[2].price}$</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-default waves-effect" data-bs-dismiss="modal" onClick={handleCloseModal}>
                                        Close
                                    </button>
                                    <button type="button" onClick={handleSubmit} className="btn btn-primary">
                                        Save
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
}
export default ShowTimes;
