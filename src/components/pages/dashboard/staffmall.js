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
    const [totalProducts, setTotalProducts] = useState([]);
    const [totalFeedbacks, setTotalFeedbacks] = useState([]);
    const [totalGallerys, setTotalGallerys] = useState([]);
    const [topShopTraffic, setTopShopTraffic] = useState([]);
    const [topProducts, setTopProducts] = useState([]);

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

    //hiển thị total product
    useEffect(() => {
        const loadTotalProducts = async () => {
            const userToken = localStorage.getItem("access_token");
            api.defaults.headers.common["Authorization"] = `Bearer ${userToken}`;
            try {
                const response = await api.get(url.DASHBOARD.TOTAL_PRODUCT);
                setTotalProducts(response.data);
            } catch (error) {}
        };
        loadTotalProducts();
    }, []);

    //hiển thị total feedback
    useEffect(() => {
        const loadTotalFeedbacks = async () => {
            const userToken = localStorage.getItem("access_token");
            api.defaults.headers.common["Authorization"] = `Bearer ${userToken}`;
            try {
                const response = await api.get(url.DASHBOARD.TOTAL_FEEDBACK);
                setTotalFeedbacks(response.data);
            } catch (error) {}
        };
        loadTotalFeedbacks();
    }, []);

    //hiển thị total gallery
    useEffect(() => {
        const loadTotalGallerys = async () => {
            const userToken = localStorage.getItem("access_token");
            api.defaults.headers.common["Authorization"] = `Bearer ${userToken}`;
            try {
                const response = await api.get(url.DASHBOARD.TOTAL_GALLERY);
                setTotalGallerys(response.data);
            } catch (error) {}
        };
        loadTotalGallerys();
    }, []);

    //hiển thị top 10 shop pho bien
    useEffect(() => {
        const loadTopShopTraffic = async () => {
            const userToken = localStorage.getItem("access_token");
            api.defaults.headers.common["Authorization"] = `Bearer ${userToken}`;
            try {
                const response = await api.get(url.DASHBOARD.TOPSHOPTRAFFIC);
                setTopShopTraffic(response.data);
            } catch (error) {}
        };
        loadTopShopTraffic();
    }, []);

    //hiển thị top 10 product
    useEffect(() => {
        const loadTopProducts = async () => {
            const userToken = localStorage.getItem("access_token");
            api.defaults.headers.common["Authorization"] = `Bearer ${userToken}`;
            try {
                const response = await api.get(url.DASHBOARD.LIST10PRODUCT);
                setTopProducts(response.data);
            } catch (error) {}
        };
        loadTopProducts();
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
                        <title>Dashboard | R Admin</title>
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
                                                <svg width="30" height="30" viewBox="0 0 1024 1024" class="icon" xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        fill="#FFFFFF"
                                                        d="M192 352h640l64 544H128l64-544zm128 224h64V448h-64v128zm320 0h64V448h-64v128zM384 288h-64a192 192 0 11384 0h-64a128 128 0 10-256 0z"
                                                    />
                                                </svg>
                                            </div>
                                            <div className="">
                                                <h4 className="fs-18 font-w600 mb-1 text-break">Total Product</h4>
                                                <span className="fs-14">{totalProducts.totalProduct}</span>
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
                                                <h4 className="fs-18 font-w600 mb-1 text-break">Total Feedback</h4>
                                                <span className="fs-14">{totalFeedbacks.totalShop}</span>
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
                                                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M18.5116 10.0771C18.5116 10.8157 17.8869 11.4146 17.1163 11.4146C16.3457 11.4146 15.7209 10.8157 15.7209 10.0771C15.7209 9.33841 16.3457 8.7396 17.1163 8.7396C17.8869 8.7396 18.5116 9.33841 18.5116 10.0771Z"
                                                        fill="#FFFFFF"
                                                    ></path>
                                                    <path
                                                        fill-rule="evenodd"
                                                        clip-rule="evenodd"
                                                        d="M18.0363 5.53245C16.9766 5.39588 15.6225 5.39589 13.9129 5.39591H10.0871C8.37751 5.39589 7.02343 5.39588 5.9637 5.53245C4.87308 5.673 3.99033 5.96913 3.29418 6.63641C2.59803 7.30369 2.28908 8.14982 2.14245 9.19521C1.99997 10.211 1.99999 11.5089 2 13.1475V13.2482C1.99999 14.8868 1.99997 16.1847 2.14245 17.2005C2.28908 18.2459 2.59803 19.092 3.29418 19.7593C3.99033 20.4266 4.87307 20.7227 5.9637 20.8633C7.02344 20.9998 8.37751 20.9998 10.0871 20.9998H13.9129C15.6225 20.9998 16.9766 20.9998 18.0363 20.8633C19.1269 20.7227 20.0097 20.4266 20.7058 19.7593C21.402 19.092 21.7109 18.2459 21.8575 17.2005C22 16.1847 22 14.8868 22 13.2482V13.1476C22 11.5089 22 10.211 21.8575 9.19521C21.7109 8.14982 21.402 7.30369 20.7058 6.63641C20.0097 5.96913 19.1269 5.673 18.0363 5.53245ZM6.14963 6.858C5.21373 6.97861 4.67452 7.20479 4.28084 7.58215C3.88716 7.9595 3.65119 8.47635 3.52536 9.37343C3.42443 10.093 3.40184 10.9923 3.3968 12.1686L3.86764 11.7737C4.99175 10.8309 6.68596 10.885 7.74215 11.8974L11.7326 15.7223C12.1321 16.1053 12.7611 16.1575 13.2234 15.8461L13.5008 15.6593C14.8313 14.763 16.6314 14.8668 17.8402 15.9096L20.2479 17.9866C20.3463 17.7226 20.4206 17.4075 20.4746 17.0223C20.6032 16.106 20.6047 14.8981 20.6047 13.1979C20.6047 11.4976 20.6032 10.2897 20.4746 9.37343C20.3488 8.47635 20.1128 7.9595 19.7192 7.58215C19.3255 7.20479 18.7863 6.97861 17.8504 6.858C16.8944 6.7348 15.6343 6.73338 13.8605 6.73338H10.1395C8.36575 6.73338 7.10559 6.7348 6.14963 6.858Z"
                                                        fill="#FFFFFF"
                                                    ></path>
                                                    <path
                                                        d="M17.0863 2.61039C16.2265 2.49997 15.1318 2.49998 13.7672 2.5H10.6775C9.31284 2.49998 8.21815 2.49997 7.35834 2.61039C6.46796 2.72473 5.72561 2.96835 5.13682 3.53075C4.79725 3.8551 4.56856 4.22833 4.41279 4.64928C4.91699 4.41928 5.48704 4.28374 6.12705 4.20084C7.21143 4.06037 8.597 4.06038 10.3463 4.06039H14.2612C16.0105 4.06038 17.396 4.06037 18.4804 4.20084C19.0394 4.27325 19.545 4.38581 20 4.56638C19.8454 4.17917 19.625 3.83365 19.3078 3.53075C18.719 2.96835 17.9767 2.72473 17.0863 2.61039Z"
                                                        fill="#FFFFFF"
                                                    ></path>
                                                </svg>
                                            </div>
                                            <div className=" ">
                                                <h4 className="fs-18 font-w600 mb-1 text-break">Total Gallery</h4>
                                                <span className="fs-14">{totalGallerys.totalShop}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-xl-6 col-lg-6 col-md-6">
                                <div className="card student-chart">
                                    <div className="card-header border-0 pb-0">
                                        <h4>Top 10 shops</h4>
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

                            <div className="col-xl-6 col-lg-6 col-md-6">
                                <div className="card student-chart">
                                    <div className="card-header border-0 pb-0">
                                        <h4>Top 10 products</h4>
                                    </div>
                                    <div className="card-body pt-0 custome-tooltip">
                                        <div className="table-responsive">
                                            <div className="text-end"></div>
                                            <table className="table table-sm mb-0">
                                                <thead>
                                                    <tr>
                                                        <th>
                                                            <strong>Product Avatar</strong>
                                                        </th>
                                                        <th>
                                                            <strong>Product Name</strong>
                                                        </th>
                                                        <th>
                                                            <strong>Price</strong>
                                                        </th>
                                                        <th>
                                                            <strong>Shop Name</strong>
                                                        </th>
                                                        <th>
                                                            <strong>Description</strong>
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {topProducts.map((item, index) => {
                                                        return (
                                                            <tr>
                                                                <td>
                                                                    <img src={item.image} className="rounded-lg me-2 movie-thumb" alt="" />
                                                                </td>
                                                                <td>{item.name}</td>
                                                                <td>{item.price}</td>
                                                                <td>{item.shopName}</td>
                                                                <td>{item.description}</td>
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
            )}
        </>
    );
}
export default MallDashboard;
