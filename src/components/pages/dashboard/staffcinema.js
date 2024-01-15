// Staff Cinema
import { Helmet } from "react-helmet";
import Layout from "../../layouts";
import Loading from "../../layouts/loading";
import { useEffect, useState } from "react";
import api from "../../services/api";
import url from "../../services/url";
import { getAccessToken } from "../../../utils/auth";
import { format } from "date-fns";
import { Link } from "react-router-dom";

function CinemaDashboard() {
    const [loading, setLoading] = useState(false);

    const [totalShowToDay, setTotalShowToDay] = useState([]);
    const [totalShowAndUp, setTotalShowAndUp] = useState([]);
    const [totalOrderToDay, setTotalOrderToDay] = useState([]);
    const [totalPromotion, setTotalPromotion] = useState([]);
    const [totalFood, setTotalFood] = useState([]);
    const [orderOverview, setOrderOverview] = useState([]);
    const [listShowToday, setListShowToday] = useState([]);
    const [listOrderToday, setListOrderToday] = useState([]);

    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getAccessToken()}`,
        },
    };
    const loadData = async () => {
        try {
            const showToDayResponse = await api.get(url.DASHBOARD.TOTAL_SHOW_TODAY, config);
            const showAndUpResponse = await api.get(url.DASHBOARD.TOTAL_SHOW, config);
            const totalBookingToDayResponse = await api.get(url.DASHBOARD.TOTAL_ORDER_TODAY, config);
            const totalPromotionResponse = await api.get(url.DASHBOARD.TOTAL_PROMOTION, config);
            const totalFoodResponse = await api.get(url.DASHBOARD.TOTAL_FOOD, config);
            const orderOverview = await api.get(url.DASHBOARD.ORDEROVERVIEW, config);
            const listShowToDayResponse = await api.get(url.DASHBOARD.LIST_SHOW_TODAY, config);
            const listOrderToDayResponse = await api.get(url.DASHBOARD.LIST_ORDER_TODAY, config);

            setTotalShowToDay(showToDayResponse.data);
            setTotalShowAndUp(showAndUpResponse.data);
            setTotalOrderToDay(totalBookingToDayResponse.data);
            setTotalPromotion(totalPromotionResponse.data);
            setTotalFood(totalFoodResponse.data);
            setOrderOverview(orderOverview.data);
            setListShowToday(listShowToDayResponse.data);
            setListOrderToday(listOrderToDayResponse.data);
            console.log(listOrderToDayResponse.data);
        } catch (error) {}
    };

    useEffect(() => {
        loadData();
    }, []);

    useEffect(() => {
        setLoading(true);

        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, []);

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
                    <span className="font-w500">${priceseat.price}</span>
                </div>
            ))}
        </div>
    );

    return (
        <>
            <Helmet>
                <title>Dashboard | R Mall</title>
            </Helmet>
            {loading ? <Loading /> : ""}
            <Layout>
                <div className="row">
                    <div className="col-xl-12">
                        {/* <div className="row">
                            <div className="col-xl-9 col-lg-9 col-md-9"> */}
                        <div className="card">
                            <div className="card-body py-3 py-md-2 px-4">
                                <div className="row">
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
                                                    <div>
                                                        <h4 className="fs-18 font-w600 mb-1 text-break">Total shows</h4>
                                                        <span className="fs-14">
                                                            {totalShowAndUp.totalShows} ({totalShowAndUp.upcomingShows} Upcoming)
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6">
                                        <div className="card mt-1 mt-md-3">
                                            <div className="card-body p-3">
                                                <div className="align-items-center h-100 d-flex flex-wrap">
                                                    <div className="d-inline-block position-relative donut-chart-sale me-2">
                                                        <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" viewBox="0 0 384 512">
                                                            <path
                                                                fill="#ffffff"
                                                                d="M14 2.2C22.5-1.7 32.5-.3 39.6 5.8L80 40.4 120.4 5.8c9-7.7 22.3-7.7 31.2 0L192 40.4 232.4 5.8c9-7.7 22.3-7.7 31.2 0L304 40.4 344.4 5.8c7.1-6.1 17.1-7.5 25.6-3.6s14 12.4 14 21.8V488c0 9.4-5.5 17.9-14 21.8s-18.5 2.5-25.6-3.6L304 471.6l-40.4 34.6c-9 7.7-22.3 7.7-31.2 0L192 471.6l-40.4 34.6c-9 7.7-22.3 7.7-31.2 0L80 471.6 39.6 506.2c-7.1 6.1-17.1 7.5-25.6 3.6S0 497.4 0 488V24C0 14.6 5.5 6.1 14 2.2zM96 144c-8.8 0-16 7.2-16 16s7.2 16 16 16H288c8.8 0 16-7.2 16-16s-7.2-16-16-16H96zM80 352c0 8.8 7.2 16 16 16H288c8.8 0 16-7.2 16-16s-7.2-16-16-16H96c-8.8 0-16 7.2-16 16zM96 240c-8.8 0-16 7.2-16 16s7.2 16 16 16H288c8.8 0 16-7.2 16-16s-7.2-16-16-16H96z"
                                                            ></path>
                                                        </svg>
                                                    </div>
                                                    <div>
                                                        <h4 className="fs-18 font-w600 mb-1 text-break">Orders Today</h4>
                                                        <span className="fs-14">{totalOrderToDay.totalShowToday}</span>
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
                                                        <svg viewBox="0 0 24 24" width="30px" height="30px" xmlns="http://www.w3.org/2000/svg" id="discount" className="icon glyph" fill="#ffffff">
                                                            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                                            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                                                            <g id="SVGRepo_iconCarrier">
                                                                <path
                                                                    d="M21.59,9.83A4.21,4.21,0,0,1,21.17,9,4.73,4.73,0,0,1,21,8.07a4.19,4.19,0,0,0-.64-2.16,4.15,4.15,0,0,0-1.87-1.28,4.36,4.36,0,0,1-.84-.43A4.55,4.55,0,0,1,17,3.54a4.29,4.29,0,0,0-1.81-1.4A4.19,4.19,0,0,0,13,2.21a4.24,4.24,0,0,1-1.94,0A4.19,4.19,0,0,0,8.8,2.14,4.29,4.29,0,0,0,7,3.54a4.55,4.55,0,0,1-.66.66,4.36,4.36,0,0,1-.84.43A4.15,4.15,0,0,0,3.62,5.91,4.19,4.19,0,0,0,3,8.07,4.73,4.73,0,0,1,2.83,9a4.21,4.21,0,0,1-.42.81A4.3,4.3,0,0,0,1.64,12a4.3,4.3,0,0,0,.77,2.17,4.21,4.21,0,0,1,.42.81,4.73,4.73,0,0,1,.15.95,4.19,4.19,0,0,0,.64,2.16,4.15,4.15,0,0,0,1.87,1.28,4.36,4.36,0,0,1,.84.43,4.55,4.55,0,0,1,.66.66,4.29,4.29,0,0,0,1.81,1.4,2.91,2.91,0,0,0,.87.13,6,6,0,0,0,1.36-.2,4.24,4.24,0,0,1,1.94,0,4.19,4.19,0,0,0,2.23.07A4.29,4.29,0,0,0,17,20.46a4.55,4.55,0,0,1,.66-.66,4.36,4.36,0,0,1,.84-.43,4.15,4.15,0,0,0,1.87-1.28A4.19,4.19,0,0,0,21,15.93a4.73,4.73,0,0,1,.15-.95,4.21,4.21,0,0,1,.42-.81A4.3,4.3,0,0,0,22.36,12,4.3,4.3,0,0,0,21.59,9.83ZM9.5,8A1.5,1.5,0,1,1,8,9.5,1.5,1.5,0,0,1,9.5,8Zm5,8A1.5,1.5,0,1,1,16,14.5,1.5,1.5,0,0,1,14.5,16Zm1.21-6.29-6,6a1,1,0,0,1-1.42,0,1,1,0,0,1,0-1.42l6-6a1,1,0,0,1,1.42,1.42Z"
                                                                    style={{ fill: "#ffffff" }}
                                                                ></path>
                                                            </g>
                                                        </svg>
                                                    </div>
                                                    <div className=" ">
                                                        <h4 className="fs-18 font-w600 mb-1 text-break">Total Promotions</h4>
                                                        <span className="fs-14">
                                                            {totalPromotion.totalPromotion} ({totalPromotion.totalPromotionStillValid} Still validated)
                                                        </span>
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
                                                        <svg
                                                            fill="#ffffff"
                                                            viewBox="0 0 14 14"
                                                            width="30px"
                                                            height="30px"
                                                            role="img"
                                                            focusable="false"
                                                            aria-hidden="true"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                                            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                                                            <g id="SVGRepo_iconCarrier">
                                                                <path d="m 6.32363,12.99015 c -0.16785,-0.032 -0.3516,-0.1238 -0.49656,-0.2491 l -0.0873,-0.076 -0.1198,0.031 c -0.2219,0.057 -0.4493,0.037 -0.64966,-0.057 -0.11636,-0.054 -0.29375,-0.2295 -0.34597,-0.3415 -0.0279,-0.06 -0.044,-0.079 -0.0612,-0.071 -0.4227,0.1859 -0.7904,0.2206 -1.12604,0.1065 -0.17267,-0.059 -0.26212,-0.1146 -0.39671,-0.2476 -0.21095,-0.2085 -0.29695,-0.4362 -0.27949,-0.7399 0.0169,-0.2931 0.12205,-0.5205 0.34657,-0.7492 l 0.14285,-0.1455 0,-0.1122 c 0,-0.202 0.062,-0.4191999 0.17213,-0.6030999 0.10669,-0.1781 0.37349,-0.4249 0.57326,-0.5303 0.0402,-0.021 0.0731,-0.047 0.0731,-0.058 0,-0.011 -0.0735,-0.3268 -0.16325,-0.7027 -0.0898,-0.376 -0.2005,-0.84 -0.24604,-1.0311 -0.0455,-0.1911 -0.13924,-0.5838 -0.20824,-0.8726 -0.29803,-1.2474 -0.28168,-1.1584 -0.23918,-1.3015 0.013,-0.044 0.0481,-0.1115 0.0781,-0.1508 l 0.0545,-0.071 -0.0639,-0.069 c -0.0788,-0.086 -0.14926,-0.2326 -0.17127,-0.3575 -0.0223,-0.1268 0.004,-0.2771 0.0738,-0.4229 0.0978,-0.2042 0.36317,-0.4298 0.60328,-0.5129 l 0.0578,-0.02 -0.004,-0.1144 c -0.0115,-0.2988 0.11744,-0.6084 0.33407,-0.8021 0.0804,-0.072 0.30077,-0.1972 0.3852,-0.2192 0.0328,-0.01 0.0347,-0.017 0.0347,-0.1501 0,-0.534 0.29611,-0.9818 0.80728,-1.2208 0.19761,-0.092 0.35746,-0.12870002 0.5672,-0.12880002 0.18709,-10e-5 0.29664,0.021 0.46743,0.091 0.18284,0.074 0.42715,0.2714 0.55227,0.4457 l 0.0488,0.068 0.0951,-0.039 c 0.49623,-0.203 1.02254,-0.1473 1.3342,0.1412 0.0503,0.047 0.11032,0.1119 0.13334,0.1451 l 0.0419,0.06 0.16542,10e-5 c 0.25488,10e-5 0.45847,0.066 0.65058,0.2091 0.0788,0.059 0.0864,0.061 0.13127,0.043 0.22117,-0.09 0.42953,-0.1138 0.62678,-0.072 0.32901,0.07 0.63787,0.318 0.79012,0.6347 0.12115,0.2521 0.13637,0.5132 0.0447,0.7657 l -0.0481,0.1324 0.0545,0.091 c 0.18787,0.312 0.19436,0.7131 0.0181,1.1208 l -0.0519,0.12 0.0661,0.065 c 0.0364,0.036 0.0855,0.1074 0.10921,0.1594 0.0366,0.08 0.043,0.1143 0.0426,0.2257 -4.5e-4,0.1153 -0.0311,0.2592 -0.25151,1.1814 -0.13805,0.5776 -0.41351,1.7382 -0.61213,2.5791 -0.19863,0.8408999 -0.37567,1.5810999 -0.39343,1.6447999 -0.0381,0.1365 -0.11363,0.2546 -0.2047,0.3199 -0.036,0.026 -0.56771,0.2981 -1.18154,0.605 l -1.11607,0.558 -0.0361,0.081 c -0.11094,0.2484 -0.37864,0.4878 -0.65404,0.5848 -0.10043,0.035 -0.35259,0.051 -0.46756,0.03 z m 0.33314,-0.4278 c 0.1532,-0.051 0.32603,-0.2013 0.40264,-0.3494 0.08,-0.1547 0.0144,-0.4718 -0.13088,-0.6326 -0.0705,-0.078 -0.14278,-0.114 -0.25759,-0.1282 -0.0791,-0.01 -0.10107,-0.02 -0.15186,-0.071 -0.0566,-0.057 -0.059,-0.063 -0.0526,-0.1407 0.004,-0.045 0.0228,-0.1231 0.0424,-0.1741 0.0441,-0.1144 0.0589,-0.3286 0.0313,-0.4538 -0.0636,-0.2897 -0.29144,-0.5006 -0.58567,-0.5422 -0.1323,-0.019 -0.19758,-0.01 -0.29691,0.04 -0.16171,0.081 -0.3793,0.3775 -0.4602,0.6272 -0.0102,0.031 -0.0427,0.078 -0.0722,0.1042 -0.0443,0.039 -0.0669,0.047 -0.12979,0.047 -0.063,0 -0.0855,-0.01 -0.13036,-0.048 -0.0784,-0.069 -0.0923,-0.1349 -0.0531,-0.252 0.0456,-0.1362 0.17402,-0.3752 0.2707,-0.5038 l 0.0836,-0.1110999 -0.0569,-0.069 c -0.20598,-0.2513 -0.55896,-0.3802 -0.8548,-0.312 -0.32967,0.076 -0.5875,0.4067 -0.5872,0.7531999 1.2e-4,0.1412 0.0241,0.2155 0.0916,0.2829 l 0.0574,0.057 -0.0784,0.018 c -0.3351,0.078 -0.58044,0.4034 -0.56167,0.7453 0.0131,0.2395 0.14824,0.4072 0.39628,0.492 0.0831,0.028 0.13601,0.035 0.28006,0.035 0.20631,0 0.33232,-0.032 0.52822,-0.1333 0.0998,-0.052 0.124,-0.072 0.15025,-0.1263 0.0389,-0.08 0.10032,-0.118 0.19285,-0.118 0.12916,0 0.20832,0.1084 0.20937,0.2868 9.2e-4,0.1566 0.0927,0.3138 0.2221,0.3804 0.077,0.04 0.265,0.055 0.35981,0.029 0.0353,-0.01 0.10567,-0.045 0.15638,-0.079 0.0752,-0.05 0.10576,-0.062 0.16543,-0.062 0.0645,0 0.0804,0.01 0.13319,0.06 0.0382,0.038 0.06,0.074 0.06,0.099 0,0.1164 0.26428,0.2716 0.46441,0.2728 0.0473,3e-4 0.1203,-0.011 0.16216,-0.025 z m 1.40064,-1.2437 c 0.0218,-0.1692 0.402,-4.8161999 0.39467,-4.8234999 -0.006,-0.01 -0.53396,0.2393 -0.90455,0.4214 l -0.0502,0.025 0,2.36 0,2.3600999 0.27574,-0.138 0.27575,-0.138 0.009,-0.067 z m 1.06044,-0.4677 c 0.20142,-0.1008 0.32611,-0.172 0.33132,-0.1892 0.005,-0.015 0.0846,-0.3507 0.17786,-0.7455999 0.18234,-0.7726 0.74284,-3.1401 0.90492,-3.8223 0.15728,-0.6621 0.15936,-0.6718 0.14283,-0.6718 -0.0359,0 -0.86211,0.4084 -0.84185,0.4162 0.0232,0.01 0.0276,-0.015 -0.1491,0.8192 -0.0399,0.1885 -0.66261,3.1479 -0.89605,4.2585999 -0.0112,0.053 -0.0141,0.097 -0.007,0.097 0.008,0 0.15903,-0.073 0.33666,-0.1617 z m -2.17648,-2.1522999 0,-1.7579 -0.47262,-0.2276 c -0.25994,-0.1251 -0.47661,-0.2235 -0.4815,-0.2186 -0.008,0.01 0.232,2.9877 0.25375,3.1534 0.008,0.062 0.011,0.065 0.13922,0.1286 0.22957,0.1138 0.40857,0.3140999 0.50776,0.5680999 0.024,0.062 0.0459,0.112 0.0485,0.112 0.003,0 0.005,-0.7910999 0.005,-1.7579999 z m -1.93028,-0.9979 c -0.20379,-1.0187 -0.37608,-1.8578 -0.38288,-1.8646 -0.0214,-0.021 -0.85393,-0.4164 -0.86686,-0.4113 -0.007,0 0.11783,0.5539 0.27689,1.2249 0.15906,0.671 0.35621,1.505 0.43811,1.8533 0.0819,0.3482 0.15432,0.6429 0.16095,0.6547 0.007,0.012 0.0491,0.031 0.0945,0.043 0.19651,0.05 0.36957,0.1418 0.53931,0.2851 0.0565,0.048 0.10452,0.082 0.10665,0.077 0.002,-0.01 -0.16285,-0.8431 -0.36663,-1.8619 z m 3.06091,-1.7371 c 0.83584,-0.3164 0.86986,-0.331 1.61062,-0.6879 0.4162,-0.2005 0.79066,-0.3765 0.83212,-0.391 0.0869,-0.03 0.1245,-0.08 0.19474,-0.2554 0.0579,-0.1448 0.0835,-0.2976 0.0729,-0.4364 -0.0193,-0.2555 -0.16524,-0.4152 -0.40877,-0.4475 l -0.0799,-0.011 0.0882,-0.057 c 0.10946,-0.071 0.20422,-0.1732 0.26093,-0.281 0.0387,-0.074 0.0434,-0.098 0.0434,-0.23 0,-0.1394 -0.003,-0.154 -0.0579,-0.2648 -0.0763,-0.1543 -0.19393,-0.272 -0.3483,-0.3483 -0.11075,-0.055 -0.12541,-0.058 -0.26476,-0.058 -0.13135,0 -0.15681,0 -0.23245,0.043 -0.10462,0.053 -0.20174,0.1447 -0.27821,0.2612 l -0.0581,0.089 -0.0103,-0.068 c -0.026,-0.1736 -0.16077,-0.3434 -0.33845,-0.4265 -0.25828,-0.1209 -0.50182,-0.084 -0.67179,0.1021 l -0.0761,0.083 -0.006,-0.1654 c -0.005,-0.1426 -0.0116,-0.1775 -0.0485,-0.2528 -0.1362,-0.2782 -0.51053,-0.3776 -0.91445,-0.2428 -0.0764,0.025 -0.17211,0.068 -0.21259,0.093 -0.0752,0.048 -0.1961,0.1732 -0.19736,0.2041 -3.8e-4,0.01 -0.01,0.038 -0.0206,0.063 l -0.0199,0.046 -0.02,-0.062 c -0.011,-0.034 -0.0511,-0.1243 -0.0891,-0.2007 -0.28122,-0.5662 -0.72157,-0.7772 -1.20405,-0.5768 -0.39327,0.1633 -0.61071,0.4871 -0.61028,0.9088 1.8e-4,0.1882 0.0425,0.415 0.10572,0.567 0.004,0.01 -0.0344,0 -0.086,-0.03 -0.0805,-0.042 -0.11013,-0.048 -0.20914,-0.048 -0.1017,0 -0.12894,0.01 -0.22979,0.057 -0.13488,0.067 -0.21135,0.1449 -0.27545,0.2819 -0.0895,0.1912 -0.073,0.4121 0.0491,0.6568 0.034,0.068 0.0618,0.1262 0.0618,0.129 0,0 -0.0261,0 -0.0579,-0.01 -0.0933,-0.022 -0.20685,-0.016 -0.33194,0.016 -0.15599,0.04 -0.26201,0.096 -0.36335,0.1916 -0.19322,0.1828 -0.20429,0.3564 -0.0326,0.5108 0.0423,0.038 0.113,0.083 0.15719,0.099 0.0719,0.027 0.74685,0.3164 2.58992,1.1105 0.32702,0.1408 0.6467,0.2788 0.71041,0.3065 0.0637,0.028 0.11729,0.051 0.11907,0.051 0.002,5e-4 0.38749,-0.1445 0.85712,-0.3222 z m -1.26925,-0.9702 c -0.0491,-0.049 -0.0595,-0.072 -0.0693,-0.1504 -0.006,-0.051 -0.0244,-0.1179 -0.0403,-0.1489 -0.0418,-0.082 -0.14311,-0.1623 -0.23129,-0.1835 -0.0864,-0.021 -0.13843,-0.012 -0.25662,0.042 -0.0956,0.044 -0.16085,0.04 -0.22792,-0.013 -0.0642,-0.051 -0.0862,-0.1092 -0.0862,-0.2297 0,-0.1318 -0.0316,-0.2036 -0.12473,-0.2833 -0.16366,-0.1401 -0.42277,-0.085 -0.52286,0.1112 -0.0158,0.031 -0.034,0.098 -0.0403,0.1489 -0.01,0.079 -0.0202,0.1012 -0.0693,0.1504 -0.0521,0.052 -0.0658,0.058 -0.13862,0.058 -0.0733,0 -0.0864,-0.01 -0.14081,-0.06 -0.0585,-0.058 -0.06,-0.063 -0.06,-0.1704 0,-0.118 0.0389,-0.2605 0.0973,-0.3565 0.084,-0.1382 0.24997,-0.2765 0.39694,-0.3307 l 0.0695,-0.026 -0.005,-0.1119 c -0.0164,-0.369 0.2336,-0.7423 0.61664,-0.9209 0.35241,-0.1643 0.69588,-0.1205 1.03117,0.1315 0.14635,0.1101 0.23663,0.226 0.35207,0.4521 0.001,0 0.0601,-0.01 0.13035,-0.027 0.22487,-0.057 0.47734,-0.03 0.66733,0.071 0.18651,0.099 0.34563,0.3092 0.40162,0.5295 0.0119,0.047 0.0277,0.085 0.0353,0.085 0.008,-10e-5 0.0589,-0.016 0.11407,-0.035 0.24906,-0.085 0.51107,-0.072 0.73357,0.039 0.29134,0.1448 0.48647,0.4653 0.48647,0.7991 0,0.1326 -0.0282,0.1868 -0.11768,0.2264 -0.0774,0.034 -0.14093,0.028 -0.20846,-0.019 -0.0507,-0.036 -0.0687,-0.083 -0.0897,-0.2346 -0.0191,-0.1382 -0.0579,-0.2254 -0.13796,-0.3096 -0.0997,-0.1049 -0.15717,-0.1261 -0.34198,-0.1261 -0.15207,0 -0.16863,0 -0.26627,0.051 -0.0618,0.03 -0.15077,0.094 -0.21893,0.1574 -0.12948,0.1201 -0.18828,0.142 -0.28354,0.1058 -0.0321,-0.012 -0.073,-0.045 -0.0936,-0.075 -0.0336,-0.049 -0.0356,-0.062 -0.024,-0.1617 0.007,-0.059 0.0127,-0.181 0.0129,-0.2702 4e-4,-0.1894 -0.024,-0.2528 -0.13307,-0.3462 -0.17158,-0.1469 -0.47494,-0.1318 -0.61041,0.03 -0.0929,0.1111 -0.2095,0.1383 -0.31026,0.072 -0.0536,-0.035 -0.0773,-0.094 -0.0949,-0.234 -0.0286,-0.2283 -0.17032,-0.4244 -0.38181,-0.5284 -0.0959,-0.047 -0.11763,-0.052 -0.24448,-0.052 -0.12521,10e-5 -0.14933,0.01 -0.23961,0.049 -0.22201,0.1091 -0.34317,0.2722 -0.37177,0.5003 -0.009,0.07 -0.0195,0.1333 -0.0239,0.1403 -0.004,0.01 0.005,0.017 0.0201,0.022 0.231,0.078 0.42387,0.2519 0.49983,0.4521 l 0.0268,0.071 0.11597,0 c 0.12296,0 0.27291,0.045 0.36603,0.102 0.0811,0.049 0.20951,0.1752 0.2609,0.2559 0.0693,0.1087 0.10975,0.2466 0.10975,0.374 0,0.1076 -10e-4,0.1119 -0.06,0.1703 -0.0544,0.054 -0.0675,0.06 -0.14081,0.06 -0.0729,0 -0.0866,-0.01 -0.13862,-0.058 z"></path>
                                                            </g>
                                                        </svg>
                                                    </div>
                                                    <div className=" ">
                                                        <h4 className="fs-18 font-w600 mb-1 text-break">Total Food</h4>
                                                        <span className="fs-14">{totalFood.totalPromotion}</span>
                                                    </div>
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
                            <div className="col-xl-12">
                                <div className="card mb-2">
                                    <div className="row gx-0">
                                        <div className="col-xl-7 col-sm-6">
                                            <div className="card progressbar bg-transparent mb-0">
                                                <div className="card-header border-0 pb-0">
                                                    <div>
                                                        <h4 className="fs-18 font-w600">Order overview</h4>
                                                        <span className="fs-14">Revenue needs to be achieved daily and monthly</span>
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

                                        <div className="col-xl-5 col-sm-6">
                                            <div className="card tags bg-transparent">
                                                <div className="card-header border-0">
                                                    <div>
                                                        <h4 className="font-w600 fs-18">Others</h4>
                                                        <span>Some information about total showtimes and ticket orders</span>
                                                    </div>
                                                </div>
                                                <div className="card-body py-1">
                                                    <div className="row d-flex">
                                                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6">
                                                            <span style={{ cursor: "pointer" }}>
                                                                <div className="card mt-1 mt-md-3">
                                                                    <div className="card-body p-3">
                                                                        <div className="align-items-center h-100 d-flex flex-wrap">
                                                                            <div className=" ">
                                                                                <h4 className="fs-18 font-w600 mb-1 text-break">
                                                                                    Show Today: <span className="text-primary">{totalShowToDay.totalShowToday}</span>
                                                                                </h4>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </span>
                                                        </div>
                                                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6">
                                                            <span style={{ cursor: "pointer" }}>
                                                                <div className="card mt-1 mt-md-3">
                                                                    <div className="card-body p-3">
                                                                        <div className="align-items-center h-100 d-flex flex-wrap">
                                                                            <div className=" ">
                                                                                <h4 className="fs-18 font-w600 mb-1 text-break">
                                                                                    Order Today: <span className="text-primary">{totalOrderToDay.totalShowToday}</span>
                                                                                </h4>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-xl-12">
                                <div class="card">
                                    <div class="card-header">
                                        <h5 class="modal-title">List Order Today</h5>
                                    </div>
                                    <div class="card-body">
                                        <div className="table-responsive">
                                            <table className="table table-sm mb-0">
                                                <thead>
                                                    <tr>
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
                                                    </tr>
                                                </thead>
                                                <tbody id="orders">
                                                    {listOrderToday.map((item, index) => {
                                                        return (
                                                            <tr className="btn-reveal-trigger" key={index}>
                                                                <td className="py-2">
                                                                    <Link to="">
                                                                        <strong>#{item.orderCode}</strong>
                                                                    </Link>
                                                                    <br />
                                                                    <Link to="">by {item.userName}</Link>
                                                                </td>
                                                                <td className="py-2">{item.movieTitle.length > 15 ? `${item.movieTitle.slice(0, 15)}...` : item.movieTitle}</td>

                                                                <td className="py-2">{item.showId}</td>
                                                                <td className="py-2">{item.paymentMethod}</td>
                                                                <td className="py-2">${item.finalTotal}</td>
                                                                <td className="py-2">{format(new Date(item.createdAt), "yyyy-MM-dd HH:mm")}</td>
                                                            </tr>
                                                        );
                                                    })}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-xl-12">
                                <div class="card">
                                    <div class="card-header">
                                        <h5 class="modal-title">List Show Today</h5>
                                    </div>
                                    <div class="card-body">
                                        <div class="card user-data-table">
                                            <div class="card-body tab-content p-0">
                                                <div class="tab-pane fade active show" id="monthly" role="tabpanel">
                                                    <div id="accordion-one" class="accordion style-1">
                                                        <div class="row">
                                                            <div class="col-md-12">
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
                                                                        <span class="accordion-header-indicator"></span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="row">
                                                            <div class="col-md-12">
                                                                <div class="accordion-item bg-transparent mb-0">
                                                                    {listShowToday.map((item, index) => {
                                                                        const accordionTargetId = `linkopenaccordion_${index}`;
                                                                        return (
                                                                            <>
                                                                                <div class="accordion-header collapsed my-2" data-bs-toggle="collapse" data-bs-target={`#${accordionTargetId}`}>
                                                                                    <div class="d-flex align-items-center">
                                                                                        <div class="user-info">
                                                                                            <h6 class="fs-16 font-w500 mb-0">
                                                                                                <a href="javascript:void(0)">#{item.showCode}</a>
                                                                                            </h6>
                                                                                        </div>
                                                                                    </div>
                                                                                    <span>{item.movieName.length > 10 ? `${item.movieName.slice(0, 10)}...` : item.movieName}</span>
                                                                                    <span>{item.roomName}</span>
                                                                                    <span>{format(new Date(item.startDate), "yyyy-MM-dd HH:mm")}</span>
                                                                                    <Link to="">{item.language}</Link>
                                                                                    <span class="accordion-header-indicator"></span>
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
                                            </div>
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
export default CinemaDashboard;
