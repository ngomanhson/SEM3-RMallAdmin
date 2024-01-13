import { Helmet } from "react-helmet";
import Layout from "../../layouts";
import Loading from "../../layouts/loading";
import { useEffect, useState } from "react";
import api from "../../services/api";
import url from "../../services/url";
import { Link, NavLink } from "react-router-dom";

function Dashboard() {
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, []);

    const [totalShops, setTotalShops] = useState([]);
    const [totalMovies, setTotalMovies] = useState([]);
    const [totalShowToday, setTotalShowToday] = useState([]);
    const [listShowToday, setListShowToday] = useState([]);
    const [totalOrderToday, setTotalOrderToday] = useState([]);
    const [listOrderToday, setListOrderToday] = useState([]);
    const [totalCusAndSta, setTotalCusAndSta] = useState([]);
    const [totalShowAndUp, setTotalShowAndUp] = useState([]);
    const [totalRevenue, setTotalRevenue] = useState([]);
    const [topMovieSelling, setTopMovieSelling] = useState([]);
    const [topShopTraffic, setTopShopTraffic] = useState([]);
    const [orderOverview, setOrderOverview] = useState([]);

    //hiển thị total shop
    useEffect(() => {
        const loadTotalShops = async () => {
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
            try {
                const response = await api.get(url.DASHBOARD.TOTAL_MOVIE);
                setTotalMovies(response.data);
            } catch (error) {}
        };
        loadTotalMovies();
    }, []);

    //hiển thị total show today
    useEffect(() => {
        const loadTotalShowToday = async () => {
            try {
                const response = await api.get(url.DASHBOARD.TOTAL_SHOW_TODAY);
                setTotalShowToday(response.data);
            } catch (error) {}
        };
        loadTotalShowToday();
    }, []);

    //hiển thị list show today
    useEffect(() => {
        const loadListShowToday = async () => {
            try {
                const response = await api.get(url.DASHBOARD.LIST_SHOW_TODAY);
                setListShowToday(response.data);
            } catch (error) {}
        };
        loadListShowToday();
    }, []);

    //hiển thị total order today
    useEffect(() => {
        const loadTotalOrderToday = async () => {
            try {
                const response = await api.get(url.DASHBOARD.TOTAL_ORDER_TODAY);
                setTotalOrderToday(response.data);
            } catch (error) {}
        };
        loadTotalOrderToday();
    }, []);

    //hiển thị list order today
    useEffect(() => {
        const loadListOrderToday = async () => {
            try {
                const response = await api.get(url.DASHBOARD.LIST_ORDER_TODAY);
                setListOrderToday(response.data);
            } catch (error) {}
        };
        loadListOrderToday();
    }, []);

    //hiển thị total customer and staff
    useEffect(() => {
        const loadTotalCusAndSta = async () => {
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
            try {
                const response = await api.get(url.DASHBOARD.TOTAL_SHOW);
                setTotalShowAndUp(response.data);
            } catch (error) {}
        };
        loadTotalShowAndUp();
    }, []);

    //hiển thị total revenue
    useEffect(() => {
        const loadTotalRevenue = async () => {
            try {
                const response = await api.get(url.DASHBOARD.TOTAL_REVENUE);
                setTotalRevenue(response.data);
            } catch (error) {}
        };
        loadTotalRevenue();
    }, []);

    //hiển thị top 10 phim ban chay
    useEffect(() => {
        const loadTopMovieSelling = async () => {
            try {
                const response = await api.get(url.DASHBOARD.TOPMOVIESELLING);
                setTopMovieSelling(response.data);
            } catch (error) {}
        };
        loadTopMovieSelling();
    }, []);

    //hiển thị top 10 shop pho bien
    useEffect(() => {
        const loadTopShopTraffic = async () => {
            try {
                const response = await api.get(url.DASHBOARD.TOPSHOPTRAFFIC);
                setTopShopTraffic(response.data);
            } catch (error) {}
        };
        loadTopShopTraffic();
    }, []);

    //hiển thị top 10 shop pho bien
    useEffect(() => {
        const loadOrderOrverview = async () => {
            try {
                const response = await api.get(url.DASHBOARD.ORDEROVERVIEW);
                setOrderOverview(response.data);
            } catch (error) {}
        };
        loadOrderOrverview();
    }, []);
    return (
        <>
            <Helmet>
                <title>Dashboard | R Mall</title>
            </Helmet>
            {loading ? <Loading /> : ""}
            <Layout>
                <div className="row">
                    <div className="col-xl-12">
                        <div className="row">
                            <div className="col-xl-9 col-lg-9 col-md-9">
                                <div className="card">
                                    <div className="card-body py-3 py-md-2 px-4">
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
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-3 col-lg-3 col-md-3">
                                <div className="card Expense overflow-hidden">
                                    <div className="card-body p-4 p-lg-3 p-xl-4 ">
                                        <div className="students1 one d-flex align-items-center justify-content-between ">
                                            <div className="content">
                                                <h2 className="mb-0">${totalRevenue.totalRevenue}</h2>
                                                <span className="mb-2">Dollar</span>
                                                <h5>Total revenue of the entire system!</h5>
                                            </div>
                                            <div>
                                                <div className="d-inline-block position-relative donut-chart-sale mb-3">
                                                    <svg width="60" height="58" viewBox="0 0 60 58" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M39.0469 2.3125C38.3437 3.76563 38.9648 5.52344 40.418 6.22657C44.4609 8.17188 47.8828 11.1953 50.3203 14.9805C52.8164 18.8594 54.1406 23.3594 54.1406 28C54.1406 41.3125 43.3125 52.1406 30 52.1406C16.6875 52.1406 5.85937 41.3125 5.85937 28C5.85937 23.3594 7.18359 18.8594 9.66797 14.9688C12.0937 11.1836 15.5273 8.16016 19.5703 6.21485C21.0234 5.51173 21.6445 3.76563 20.9414 2.30079C20.2383 0.847664 18.4922 0.226569 17.0273 0.929694C12 3.34376 7.74609 7.09375 4.73437 11.8047C1.64062 16.6328 -1.56336e-06 22.2344 -1.31134e-06 28C-9.60967e-07 36.0156 3.11719 43.5508 8.78906 49.2109C14.4492 54.8828 21.9844 58 30 58C38.0156 58 45.5508 54.8828 51.2109 49.2109C56.8828 43.5391 60 36.0156 60 28C60 22.2344 58.3594 16.6328 55.2539 11.8047C52.2305 7.10547 47.9766 3.34375 42.9609 0.929693C41.4961 0.238287 39.75 0.84766 39.0469 2.3125V2.3125Z"
                                                            fill="#53CAFD"
                                                        />
                                                        <path
                                                            d="M41.4025 26.4414C41.9767 25.8671 42.258 25.1171 42.258 24.3671C42.258 23.6171 41.9767 22.8671 41.4025 22.2929L34.0314 14.9218C32.9533 13.8437 31.5236 13.2578 30.0119 13.2578C28.5002 13.2578 27.0587 13.8554 25.9923 14.9218L18.6212 22.2929C17.4728 23.4414 17.4728 25.2929 18.6212 26.4414C19.7697 27.5898 21.6212 27.5898 22.7697 26.4414L27.0939 22.1171L27.0939 38.7695C27.0939 40.3867 28.4064 41.6992 30.0236 41.6992C31.6408 41.6992 32.9533 40.3867 32.9533 38.7695L32.9533 22.1054L37.2775 26.4296C38.4025 27.5781 40.2541 27.5781 41.4025 26.4414Z"
                                                            fill="#53CAFD"
                                                        />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-xl-12">
                        <div className="row">
                            <div className="col-xl-6 col-lg-6 col-md-6">
                                <div className="card pia-chart">
                                    <div className="card-header border-0 pb-0 flex-wrap">
                                        <div>
                                            <h5 className="fs-18 font-w600">Biểu đồ 1</h5>
                                        </div>
                                        <div className="dropdown">
                                            <a href="javascript:void(0);" className="btn-link btn sharp tp-btn-light btn-primary" data-bs-toggle="dropdown" aria-expanded="false">
                                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M8.33319 9.99985C8.33319 10.9203 9.07938 11.6665 9.99986 11.6665C10.9203 11.6665 11.6665 10.9203 11.6665 9.99986C11.6665 9.07938 10.9203 8.33319 9.99986 8.33319C9.07938 8.33319 8.33319 9.07938 8.33319 9.99985Z"
                                                        fill="#B9A8FF"
                                                    />
                                                    <path
                                                        d="M8.33319 3.33329C8.33319 4.25376 9.07938 4.99995 9.99986 4.99995C10.9203 4.99995 11.6665 4.25376 11.6665 3.33329C11.6665 2.41282 10.9203 1.66663 9.99986 1.66663C9.07938 1.66663 8.33319 2.41282 8.33319 3.33329Z"
                                                        fill="#B9A8FF"
                                                    />
                                                    <path
                                                        d="M8.33319 16.6667C8.33319 17.5871 9.07938 18.3333 9.99986 18.3333C10.9203 18.3333 11.6665 17.5871 11.6665 16.6667C11.6665 15.7462 10.9203 15 9.99986 15C9.07938 15 8.33319 15.7462 8.33319 16.6667Z"
                                                        fill="#B9A8FF"
                                                    />
                                                </svg>
                                            </a>
                                            <div className="dropdown-menu dropdown-menu-end">
                                                <a className="dropdown-item" href="javascript:void(0);">
                                                    Delete
                                                </a>
                                                <a className="dropdown-item" href="javascript:void(0);">
                                                    Edit
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-body d-flex align-items-center justify-content-center custome-tooltip">
                                        <div id="pieChart1"></div>
                                    </div>
                                    <div className="card-footer border-0">
                                        <div className="d-flex justify-content-center flex-wrap color-tag">
                                            <span className="application d-flex align-items-center px-2">
                                                <svg className="me-1" xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 13 13">
                                                    <rect width="13" height="13" rx="6.5" fill="#DD3CFF"></rect>
                                                </svg>
                                                Pink
                                            </span>
                                            <span className="application d-flex align-items-center px-2">
                                                <svg className="me-1" xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 13 13">
                                                    <rect width="13" height="13" rx="6.5" fill="#FFE27A"></rect>
                                                </svg>
                                                Yellow
                                            </span>
                                            <span className="application d-flex align-items-center px-2">
                                                <svg className="me-1" xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 13 13">
                                                    <rect width="13" height="13" rx="6.5" fill="#53CAFD"></rect>
                                                </svg>
                                                Blue
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-xl-6 col-lg-6 col-md-6">
                                <div className="card student-chart">
                                    <div className="card-header border-0 pb-0">
                                        <h4>Biểu đồ 2</h4>
                                    </div>
                                    <div className="card-body pt-0 custome-tooltip">
                                        <canvas id="activeUser"></canvas>
                                        <div className="d-flex justify-content-between align-items-center flex-wrap std-info d-none">
                                            <h4 className="fs-18 font-w600 mb-0">12.345</h4>
                                            <span>
                                                <small className="text-secondary">5.4% </small>than last year
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-xl-12">
                                <div className="card mb-2">
                                    <div className="row gx-0">
                                        <div className="col-xl-8 col-sm-6">
                                            <div className="card progressbar bg-transparent mb-0">
                                                <div className="card-header border-0 pb-0">
                                                    <div>
                                                        <h4 className="fs-18 font-w600">Order overview</h4>
                                                        <span className="fs-14">The total amount collected up to today, to this month and the amount to be achieved by day, month</span>
                                                    </div>
                                                </div>
                                                <div className="card-body">
                                                    <div className="progress default-progress">
                                                        <div
                                                            className="progress-bar linear bg-vigit progress-animated"
                                                            style={{ width: `${(orderOverview.dailyRevenue / 500).toFixed(2) * 100}%`, height: "8px" }}
                                                            role="progressbar"
                                                        ></div>
                                                    </div>
                                                    <div className="d-flex align-items-end mt-2 pb-2 justify-content-between">
                                                        <span className="fs-16 font-w600 value">#Total proceeds today</span>
                                                        <span>
                                                            <span className="text-black pe-2"></span>${orderOverview.dailyRevenue} / $500 (Reached{" "}
                                                            {((orderOverview.dailyRevenue / 500) * 100).toFixed(2)}% of today's revenue)
                                                        </span>
                                                    </div>

                                                    <div className="progress default-progress">
                                                        <div
                                                            className="progress-bar linear bg-contact progress-animated"
                                                            style={{ width: `${((orderOverview.monthlyRevenue / 15000) * 100).toFixed(2)}%`, height: "8px" }}
                                                            role="progressbar"
                                                        ></div>
                                                    </div>
                                                    <div className="d-flex align-items-end mt-2 pb-2 justify-content-between">
                                                        <span className="fs-16 font-w600 value">#Total proceeds this month</span>
                                                        <span>
                                                            <span className="text-black pe-2"></span>${orderOverview.monthlyRevenue} / $15000 (Reached{" "}
                                                            {((orderOverview.monthlyRevenue / 15000) * 100).toFixed(2)}% of this month's revenue)
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-xl-4 col-sm-6">
                                            <div className="card tags bg-transparent">
                                                <div className="card-header border-0">
                                                    <div>
                                                        <h4 className="font-w600 fs-18">Others</h4>
                                                        <span>Some information about showtimes and ticket orders</span>
                                                    </div>
                                                </div>
                                                <div className="card-body py-1">
                                                    <div>
                                                        <Link to="" className="tag">
                                                            {totalShowToday.totalShowToday} Showtimes today
                                                        </Link>
                                                        <Link to="" className="tag">
                                                            {totalOrderToday.totalShowToday} Orders today
                                                        </Link>
                                                        <Link to="" className="tag">
                                                            #projectmanagement
                                                        </Link>
                                                        <Link to="" className="tag">
                                                            16+
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-xl-6 col-lg-6 col-md-6">
                                <div className="card student-chart">
                                    <div className="card-header border-0 pb-0">
                                        <h4>Top 10 best-selling movies</h4>
                                    </div>
                                    <div className="card-body pt-0 custome-tooltip">
                                        <div className="table-responsive">
                                            <div className="text-end"></div>
                                            <table className="table table-sm mb-0">
                                                <thead>
                                                    <tr>
                                                        <th>
                                                            <strong>Movie Title</strong>
                                                        </th>
                                                        <th>
                                                            <strong>Tickets sold</strong>
                                                        </th>
                                                        <th>
                                                            <strong>Action</strong>
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {topMovieSelling.map((item, index) => {
                                                        return (
                                                            <tr>
                                                                <td>{item.movieTitle}</td>
                                                                <td>{item.ticketCount}</td>
                                                                <td>
                                                                    <div className="d-flex">
                                                                        <NavLink to="" className="btn btn-success shadow btn-xs sharp me-1">
                                                                            <i className="fa fa-eye"></i>
                                                                        </NavLink>
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

                            <div className="col-xl-6 col-lg-6 col-md-6">
                                <div className="card student-chart">
                                    <div className="card-header border-0 pb-0">
                                        <h4>Top 10 most outstanding shops</h4>
                                    </div>
                                    <div className="card-body pt-0 custome-tooltip">
                                        <div className="table-responsive">
                                            <div className="text-end"></div>
                                            <table className="table table-sm mb-0">
                                                <thead>
                                                    <tr>
                                                        <th>
                                                            <strong>Shop Avatar</strong>
                                                        </th>
                                                        <th>
                                                            <strong>Shop Name</strong>
                                                        </th>
                                                        <th>
                                                            <strong>Contact</strong>
                                                        </th>
                                                        <th>
                                                            <strong>Category</strong>
                                                        </th>
                                                        <th>
                                                            <strong>Action</strong>
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {topShopTraffic.map((item, index) => {
                                                        return (
                                                            <tr>
                                                                <td>
                                                                    <img src={item.imagePath} className="rounded-lg me-2 movie-thumb" alt="" />
                                                                </td>
                                                                <td>{item.name}</td>
                                                                <td>{item.contactInfo}</td>
                                                                <td>{item.categoryName}</td>
                                                                <td>
                                                                    <div className="d-flex">
                                                                        <NavLink to={`/product-list/${item.slug}`} className="btn btn-success shadow btn-xs sharp me-1">
                                                                            <i className="fa fa-eye"></i>
                                                                        </NavLink>
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
                    </div>
                </div>
            </Layout>
        </>
    );
}
export default Dashboard;
