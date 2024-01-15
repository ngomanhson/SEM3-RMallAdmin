import { Helmet } from "react-helmet";
import Layout from "../../layouts";
import Loading from "../../layouts/loading";
import { useEffect, useState } from "react";
import api from "../../services/api";
import url from "../../services/url";
import { Link, NavLink } from "react-router-dom";
import Chart from "react-apexcharts";
import { format } from "date-fns";
import NotFound from "../../pages/other/not-found";

function MallDashboard() {
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, []);

    const [userRole, setUserRole] = useState(null);
    const [error, setError] = useState(null);
    const [totalShops, setTotalShops] = useState([]);
    const [totalMovies, setTotalMovies] = useState([]);
    const [totalCusAndSta, setTotalCusAndSta] = useState([]);
    const [totalShowAndUp, setTotalShowAndUp] = useState([]);

    //hiển thị total shop
    useEffect(() => {
        const loadTotalShops = async () => {
            const userToken = localStorage.getItem("access_token");
            api.defaults.headers.common["Authorization"] = `Bearer ${userToken}`;
            try {
                const response = await api.get(url.DASHBOARD.TOTAL_SHOP);
                setTotalShops(response.data);
            } catch (error) {}
        };
        loadTotalShops();
    }, []);

    //hiển thị total movie
    useEffect(() => {
        const loadTotalMovies = async () => {
            const userToken = localStorage.getItem("access_token");
            api.defaults.headers.common["Authorization"] = `Bearer ${userToken}`;
            try {
                const response = await api.get(url.DASHBOARD.TOTAL_MOVIE);
                setTotalMovies(response.data);
            } catch (error) {}
        };
        loadTotalMovies();
    }, []);

    //hiển thị total customer and staff
    useEffect(() => {
        const loadTotalCusAndSta = async () => {
            const userToken = localStorage.getItem("access_token");
            api.defaults.headers.common["Authorization"] = `Bearer ${userToken}`;
            try {
                const response = await api.get(url.DASHBOARD.TOTAL_CUSANDSTA);
                setTotalCusAndSta(response.data);
            } catch (error) {}
        };
        loadTotalCusAndSta();
    }, []);

    //hiển thị tong so show va show san dien da
    useEffect(() => {
        const loadTotalShowAndUp = async () => {
            const userToken = localStorage.getItem("access_token");
            api.defaults.headers.common["Authorization"] = `Bearer ${userToken}`;
            try {
                const response = await api.get(url.DASHBOARD.TOTAL_SHOW);
                setTotalShowAndUp(response.data);
            } catch (error) {}
        };
        loadTotalShowAndUp();
    }, []);

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
                        <title>Dashboard | R Mall</title>
                    </Helmet>
                    {loading ? <Loading /> : ""}
                    <Layout>
                        <div className="row">
                            <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6">
                                <div className="card mt-1 mt-md-3">
                                    <div className="card-body p-3">
                                        <div className="align-items-center h-100 d-flex flex-wrap">
                                            <div className="d-inline-block position-relative donut-chart-sale me-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" height="30" width="30" viewBox="0 0 576 512">
                                                    <path
                                                        fill="#FFFFFF"
                                                        d="M547.6 103.8L490.3 13.1C485.2 5 476.1 0 466.4 0H109.6C99.9 0 90.8 5 85.7 13.1L28.3 103.8c-29.6 46.8-3.4 111.9 51.9 119.4c4 .5 8.1 .8 12.1 .8c26.1 0 49.3-11.4 65.2-29c15.9 17.6 39.1 29 65.2 29c26.1 0 49.3-11.4 65.2-29c15.9 17.6 39.1 29 65.2 29c26.2 0 49.3-11.4 65.2-29c16 17.6 39.1 29 65.2 29c4.1 0 8.1-.3 12.1-.8c55.5-7.4 81.8-72.5 52.1-119.4zM499.7 254.9l-.1 0c-5.3 .7-10.7 1.1-16.2 1.1c-12.4 0-24.3-1.9-35.4-5.3V384H128V250.6c-11.2 3.5-23.2 5.4-35.6 5.4c-5.5 0-11-.4-16.3-1.1l-.1 0c-4.1-.6-8.1-1.3-12-2.3V384v64c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V384 252.6c-4 1-8 1.8-12.3 2.3z"
                                                    ></path>
                                                </svg>
                                            </div>
                                            <div className=" ">
                                                <h4 className="fs-18 font-w600 mb-1 text-break">Total Shop</h4>
                                                <span className="fs-14">{totalShops.totalShop}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6">
                                <div className="card mt-3">
                                    <div className="card-body p-3">
                                        <div className="align-items-center h-100 d-flex flex-wrap">
                                            <div className="d-inline-block position-relative donut-chart-sale me-2">
                                                <svg width="30" height="30" viewBox="0 -2 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
                                                    <g id="Icon-Set-Filled" transform="translate(-206.000000, -519.000000)" fill="#FFFFFF">
                                                        <path
                                                            d="M225,531.012 C222.232,531.012 219.989,528.768 219.989,526 C219.989,523.232 222.232,520.989 225,520.989 C227.768,520.989 230.011,523.232 230.011,526 C230.011,528.768 227.768,531.012 225,531.012 L225,531.012 Z M212,531 C209.791,531 208,529.209 208,527 C208,524.791 209.791,523 212,523 C214.209,523 216,524.791 216,527 C216,529.209 214.209,531 212,531 L212,531 Z M236,531 L230,535 C230,533.786 229.448,532.712 228.594,531.979 C230.626,530.753 232,528.546 232,526 C232,522.134 228.866,519 225,519 C221.134,519 218,522.134 218,526 C218,527.962 218.812,529.729 220.111,531 L216.443,531 C217.4,529.937 218,528.544 218,527 C218,523.687 215.313,521 212,521 C208.687,521 206,523.687 206,527 C206,528.809 206.816,530.41 208.082,531.511 C206.847,532.191 206,533.49 206,535 L206,543 C206,545.209 207.791,547 210,547 L226,547 C228.209,547 230,545.209 230,543 L236,547 C237.104,547 238,546.104 238,545 L238,533 C238,531.896 237.104,531 236,531 L236,531 Z"
                                                            id="movie-recorder"
                                                        ></path>
                                                    </g>
                                                </svg>
                                            </div>
                                            <div className="">
                                                <h4 className="fs-18 font-w600 mb-1 text-break">Total Movie</h4>
                                                <span className="fs-14">{totalMovies.totalMovie}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6">
                                <div className="card mt-3">
                                    <div className="card-body p-3">
                                        <div className="align-items-center h-100 d-flex flex-wrap">
                                            <div className="d-inline-block position-relative donut-chart-sale me-2">
                                                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M9.34933 14.8577C5.38553 14.8577 2 15.47 2 17.9174C2 20.3666 5.364 21 9.34933 21C13.3131 21 16.6987 20.3877 16.6987 17.9404C16.6987 15.4911 13.3347 14.8577 9.34933 14.8577Z"
                                                        fill="#FFFFFF"
                                                    ></path>
                                                    <path
                                                        opacity="0.4"
                                                        d="M9.34935 12.5248C12.049 12.5248 14.2124 10.4062 14.2124 7.76241C14.2124 5.11865 12.049 3 9.34935 3C6.65072 3 4.48633 5.11865 4.48633 7.76241C4.48633 10.4062 6.65072 12.5248 9.34935 12.5248Z"
                                                        fill="#FFFFFF"
                                                    ></path>
                                                    <path
                                                        opacity="0.4"
                                                        d="M16.1734 7.84875C16.1734 9.19507 15.7605 10.4513 15.0364 11.4948C14.9611 11.6021 15.0276 11.7468 15.1587 11.7698C15.3407 11.7995 15.5276 11.8177 15.7184 11.8216C17.6167 11.8704 19.3202 10.6736 19.7908 8.87118C20.4885 6.19676 18.4415 3.79543 15.8339 3.79543C15.5511 3.79543 15.2801 3.82418 15.0159 3.87688C14.9797 3.88454 14.9405 3.90179 14.921 3.93246C14.8955 3.97174 14.9141 4.02253 14.9395 4.05607C15.7233 5.13216 16.1734 6.44207 16.1734 7.84875Z"
                                                        fill="#FFFFFF"
                                                    ></path>
                                                    <path
                                                        d="M21.7791 15.1693C21.4317 14.444 20.5932 13.9466 19.3172 13.7023C18.7155 13.5586 17.0853 13.3545 15.5697 13.3832C15.5472 13.3861 15.5344 13.4014 15.5325 13.411C15.5295 13.4263 15.5364 13.4493 15.5658 13.4656C16.2663 13.8048 18.9738 15.2805 18.6333 18.3928C18.6186 18.5289 18.7292 18.6439 18.8671 18.6247C19.5335 18.5318 21.2478 18.1705 21.7791 17.0475C22.0736 16.4534 22.0736 15.7635 21.7791 15.1693Z"
                                                        fill="#FFFFFF"
                                                    ></path>
                                                </svg>
                                            </div>
                                            <div className=" ">
                                                <h4 className="fs-18 font-w600 mb-1 text-break">User/Staff</h4>
                                                <span className="fs-14">
                                                    {totalCusAndSta.totalUser}/{totalCusAndSta.totalStaff}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6">
                                <div className="card mt-3">
                                    <div className="card-body p-3">
                                        <div className="align-items-center h-100 d-flex flex-wrap ">
                                            <div className="d-inline-block position-relative donut-chart-sale me-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" height="30" width="30" viewBox="0 0 512 512">
                                                    <path
                                                        fill="#FFFFFF"
                                                        d="M0 96C0 60.7 28.7 32 64 32H448c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zM48 368v32c0 8.8 7.2 16 16 16H96c8.8 0 16-7.2 16-16V368c0-8.8-7.2-16-16-16H64c-8.8 0-16 7.2-16 16zm368-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V368c0-8.8-7.2-16-16-16H416zM48 240v32c0 8.8 7.2 16 16 16H96c8.8 0 16-7.2 16-16V240c0-8.8-7.2-16-16-16H64c-8.8 0-16 7.2-16 16zm368-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V240c0-8.8-7.2-16-16-16H416zM48 112v32c0 8.8 7.2 16 16 16H96c8.8 0 16-7.2 16-16V112c0-8.8-7.2-16-16-16H64c-8.8 0-16 7.2-16 16zM416 96c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V112c0-8.8-7.2-16-16-16H416zM160 128v64c0 17.7 14.3 32 32 32H320c17.7 0 32-14.3 32-32V128c0-17.7-14.3-32-32-32H192c-17.7 0-32 14.3-32 32zm32 160c-17.7 0-32 14.3-32 32v64c0 17.7 14.3 32 32 32H320c17.7 0 32-14.3 32-32V320c0-17.7-14.3-32-32-32H192z"
                                                    ></path>
                                                </svg>
                                            </div>
                                            <div className=" ">
                                                <h4 className="fs-18 font-w600 mb-1 text-break">Total Show</h4>
                                                <span className="fs-14">
                                                    {totalShowAndUp.totalShows} ({totalShowAndUp.upcomingShows} Upcoming)
                                                </span>
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
export default MallDashboard;
