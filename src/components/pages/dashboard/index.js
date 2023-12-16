import Layout from "../../layouts";

function Dashboard() {
    return (
        <Layout>
            <div className="row">
                <div className="col-xl-9">
                    <div className="row">
                        <div className="col-xl-8">
                            <div className="card balance-data">
                                <div className="card-header border-0 flex-wrap">
                                    <h4 className="fs-18 font-w600">Your Balance Summary</h4>
                                    <div className="d-flex align-items-center">
                                        <div className="round" id="dzNewSeries">
                                            <input type="checkbox" id="checkbox" name="balance_summary" value="monthly" />
                                            <label htmlFor="checkbox" className="checkmark monthy"></label>
                                            <span>Monthly</span>
                                        </div>
                                        <div className="round" id="dzOldSeries">
                                            <input type="checkbox" id="checkbox1" name="balance_summary" value="weekly" />
                                            <label htmlFor="checkbox1" className="checkmark weekly"></label>
                                            <span>Weekly</span>
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
                                </div>
                                <div className="card-body py-0 custome-tooltip">
                                    <div className="d-flex align-items-center flex-wrap income">
                                        <div className="d-flex align-items-center mb-2 me-3 arrow">
                                            <div className="me-3">
                                                <svg className="theme-col" width="45" height="45" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <circle cx="26" cy="26" r="26" fill="var(--bs-body-bg)" />
                                                    <g clipPath="url(#clip0)">
                                                        <path
                                                            d="M34.9293 30.4004C34.9294 30.3966 34.9293 30.3927 34.9293 30.3889L34.9371 18.5152C34.9369 18.4212 34.9264 18.3275 34.906 18.2357L34.8284 17.9716L34.7507 17.8163L34.6653 17.7309C34.5585 17.5759 34.4243 17.4417 34.2693 17.3348L34.1916 17.2572L34.0984 17.164L33.8965 17.1019C33.783 17.0683 33.6654 17.0499 33.547 17.0475L21.6112 17.0708C20.8167 17.0676 20.17 17.7092 20.1668 18.5037C20.1668 18.5075 20.1668 18.5114 20.1668 18.5152C20.1853 19.3009 20.8178 19.9334 21.6035 19.9519L28.6935 19.9596C28.9967 19.9626 29.2402 20.2109 29.2372 20.5141C29.2358 20.6552 29.1802 20.7903 29.0818 20.8915L17.5187 32.4546C16.9568 33.0164 16.9568 33.9273 17.5186 34.4892C18.0804 35.0511 18.9913 35.0511 19.5532 34.4893C19.5533 34.4893 19.5533 34.4892 19.5534 34.4892L31.1164 22.9261C31.3338 22.7147 31.6815 22.7196 31.8929 22.937C31.9912 23.0382 32.0469 23.1733 32.0483 23.3144L32.0405 30.3889C32.0551 31.1805 32.6933 31.8188 33.4849 31.8333C34.2795 31.8365 34.9262 31.195 34.9293 30.4004Z"
                                                            fill="white"
                                                        />
                                                    </g>
                                                    <defs>
                                                        <clipPath>
                                                            <rect width="24" height="24" fill="white" transform="translate(26 9.02945) rotate(45)" />
                                                        </clipPath>
                                                    </defs>
                                                </svg>
                                            </div>
                                            <div>
                                                <span className="fs-14">Income</span>
                                                <h4 className="fs-5 font-w600">$459,234.08</h4>
                                            </div>
                                        </div>
                                        <div className="d-flex align-items-center ms-sm-2 mb-2 arrow">
                                            <div className="me-3">
                                                <svg className="" width="45" height="45" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <circle cx="26" cy="26" r="26" transform="rotate(-180 26 26)" fill="#5E3ED0" />
                                                    <g clipPath="url(#clip0)">
                                                        <path
                                                            d="M17.0707 21.5996C17.0706 21.6034 17.0707 21.6073 17.0707 21.6111L17.0629 33.4848C17.0631 33.5788 17.0736 33.6725 17.094 33.7643L17.1716 34.0284L17.2493 34.1837L17.3347 34.2691C17.4415 34.4241 17.5757 34.5583 17.7307 34.6652L17.8084 34.7428L17.9016 34.836L18.1035 34.8981C18.217 34.9317 18.3346 34.9501 18.453 34.9525L30.3888 34.9292C31.1833 34.9324 31.83 34.2908 31.8332 33.4963C31.8332 33.4925 31.8332 33.4886 31.8332 33.4848C31.8147 32.6991 31.1822 32.0666 30.3965 32.0481L23.3065 32.0404C23.0033 32.0374 22.7598 31.7891 22.7628 31.4859C22.7642 31.3448 22.8198 31.2097 22.9182 31.1085L34.4813 19.5454C35.0432 18.9836 35.0432 18.0727 34.4814 17.5108C33.9196 16.9489 33.0087 16.9489 32.4468 17.5107C32.4467 17.5107 32.4467 17.5108 32.4466 17.5108L20.8836 29.0739C20.6662 29.2853 20.3185 29.2804 20.1071 29.063C20.0088 28.9618 19.9531 28.8267 19.9517 28.6856L19.9595 21.6111C19.9449 20.8195 19.3067 20.1812 18.5151 20.1667C17.7205 20.1635 17.0738 20.805 17.0707 21.5996Z"
                                                            fill="white"
                                                        />
                                                    </g>
                                                    <defs>
                                                        <clipPath>
                                                            <rect width="24" height="24" fill="white" transform="translate(26 42.9706) rotate(-135)" />
                                                        </clipPath>
                                                    </defs>
                                                </svg>
                                            </div>
                                            <div>
                                                <span className="fs-14">Expense</span>
                                                <h4 className="fs-5 font-w700">$ 23,456</h4>
                                            </div>
                                        </div>
                                    </div>
                                    <div id="reservationChart" className="reservationChart"></div>
                                </div>
                            </div>
                        </div>

                        <div className="col-xl-4">
                            <div className="row">
                                <div className="col-xl-12 col-lg-4 col-md-6">
                                    <div className="card Expense overflow-hidden">
                                        <div className="card-body p-4 p-lg-3 p-xl-4">
                                            <div className="students1 one d-flex align-items-center justify-content-between">
                                                <div className="content">
                                                    <h2 className="mb-0">$19,522</h2>
                                                    <span className="mb-2 fs-14">Expense</span>
                                                    <h5>+0,5% than last month</h5>
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

                                <div className="col-xl-12 col-lg-4 col-md-6">
                                    <div className="card">
                                        <div className="card-body p-4 p-lg-3 p-xl-4">
                                            <div className="students1 two d-flex align-items-center justify-content-between">
                                                <div className="content">
                                                    <h2 className="mb-0">$45,234</h2>
                                                    <span className="mb-2 fs-14">Income</span>
                                                    <h5 className="fs-13">-2% than last month</h5>
                                                </div>
                                                <div className="d-inline-block position-relative donut-chart-sale">
                                                    <span className="donut3" data-peity='{ "fill": ["rgba(204, 97, 255, 0.9)", "rgba(255, 255, 255, 0.1"],   "innerRadius": 30, "radius": 8}'>
                                                        4/8
                                                    </span>
                                                    <small>38%</small>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-xl-12 col-lg-4 col-md-12">
                                    <div className="card overflow-hidden">
                                        <div className="card-body p-4 p-lg-3 p-xl-4">
                                            <div className="students1 three d-flex align-items-center justify-content-between">
                                                <div className="content">
                                                    <h2 className="mb-0">$984</h2>
                                                    <span className="fs-14">Transactions</span>
                                                </div>
                                                <div className="newCustomers">
                                                    <div className="d-inline-block position-relative donut-chart-sale mb-3">
                                                        <div id="NewCustomers"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-xl-4 col-lg-4 col-md-6">
                            <div className="card pia-chart">
                                <div className="card-header border-0 pb-0 flex-wrap">
                                    <div>
                                        <h5 className="fs-18 font-w600">Pie Chart</h5>
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

                        <div className="col-xl-4 col-lg-4 col-md-6">
                            <div className="card student-chart">
                                <div className="card-header border-0 pb-0">
                                    <h4>Your Balance</h4>
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

                        <div className="col-xl-4 col-lg-4 col-md-12">
                            <div className="card">
                                <div className="card-header border-0 pb-4 arrow">
                                    <div>
                                        <h5 className="fs-18 font-w600">Admission Summary</h5>
                                        <h4 className="fs-24 font-w600 mb-0 d-inline-flex me-2">$4,563</h4>
                                        <span className="d-inline-flex align-items-center">
                                            <small className="text-success font-w500 me-1">+1.6%</small> than last week
                                        </span>
                                    </div>
                                    <svg className="theme-col" width="45" height="45" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect width="52" height="52" rx="26" fill="var(--bs-body-bg)" />
                                        <g clipPath="url(#clip0)">
                                            <path
                                                d="M17.0704 21.5996C17.0704 21.6034 17.0704 21.6073 17.0704 21.6111L17.0626 33.4848C17.0629 33.5788 17.0733 33.6725 17.0937 33.7643L17.1713 34.0284L17.249 34.1837L17.3344 34.2691C17.4413 34.4241 17.5755 34.5583 17.7305 34.6652L17.8081 34.7428L17.9013 34.836L18.1032 34.8981C18.2168 34.9317 18.3343 34.9501 18.4527 34.9525L30.3885 34.9292C31.183 34.9324 31.8297 34.2908 31.8329 33.4963C31.8329 33.4925 31.8329 33.4886 31.8329 33.4848C31.8144 32.6991 31.1819 32.0666 30.3962 32.0481L23.3062 32.0404C23.003 32.0374 22.7595 31.7891 22.7625 31.4859C22.7639 31.3448 22.8195 31.2097 22.9179 31.1085L34.481 19.5454C35.0429 18.9836 35.043 18.0727 34.4811 17.5108C33.9193 16.9489 33.0084 16.9489 32.4465 17.5107C32.4465 17.5107 32.4464 17.5108 32.4464 17.5108L20.8833 29.0739C20.6659 29.2853 20.3182 29.2804 20.1068 29.063C20.0085 28.9618 19.9528 28.8267 19.9514 28.6856L19.9592 21.6111C19.9447 20.8195 19.3064 20.1812 18.5148 20.1667C17.7202 20.1635 17.0735 20.805 17.0704 21.5996Z"
                                                fill="white"
                                            />
                                        </g>
                                        <defs>
                                            <clipPath>
                                                <rect width="24" height="24" fill="white" transform="translate(25.9997 42.9706) rotate(-135)" />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                </div>
                                <div className="card-body py-2 custome-tooltip">
                                    <div id="chartBarRunning" className="chartBarRunning"></div>
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
                                                    <h4 className="fs-18 font-w600">Earning Categories</h4>
                                                    <span className="fs-14">Lorem ipsum dolor sit amet</span>
                                                </div>
                                            </div>
                                            <div className="card-body">
                                                <div className="progress default-progress">
                                                    <div className="progress-bar linear bg-vigit progress-animated" style={{ width: "90%", height: "8px" }} role="progressbar">
                                                        <span className="sr-only">90% Complete</span>
                                                    </div>
                                                </div>
                                                <div className="d-flex align-items-end mt-2 pb-2 justify-content-between">
                                                    <span className="fs-16 font-w600 value">#investement</span>
                                                    <span>
                                                        <span className="text-black pe-2"></span>$ 89.24
                                                    </span>
                                                </div>
                                                <div className="progress default-progress">
                                                    <div className="progress-bar linear bg-contact progress-animated" style={{ width: "68%", height: "8px" }} role="progressbar">
                                                        <span className="sr-only">45% Complete</span>
                                                    </div>
                                                </div>
                                                <div className="d-flex align-items-end mt-2 pb-2 justify-content-between">
                                                    <span className="fs-16 font-w600 value">#transfer</span>
                                                    <span>
                                                        <span className="text-black pe-2"></span>$ 441.45
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-xl-4 col-sm-6">
                                        <div className="card tags bg-transparent">
                                            <div className="card-header border-0">
                                                <div>
                                                    <h4 className="font-w600 fs-18">Others tag</h4>
                                                    <span>Lorem ipsum dolor sit amet</span>
                                                </div>
                                            </div>
                                            <div className="card-body py-1">
                                                <div>
                                                    <a href="javascript:voiud(0);" className="tag">
                                                        #teamwork
                                                    </a>
                                                    <a href="javascript:voiud(0);" className="tag">
                                                        #design
                                                    </a>
                                                    <a href="javascript:voiud(0);" className="tag">
                                                        #projectmanagement
                                                    </a>
                                                    <a href="javascript:voiud(0);" className="tag">
                                                        16+
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-xl-3">
                    <div className="card">
                        <div className="row">
                            <div className="col-xl-12 col-lg-6">
                                <div className="card-header border-0 pb-0">
                                    <div>
                                        <h4 className="mb-0 fs-18 font-w600">Others</h4>
                                        <span>Lorem ipsum dolor sit amet</span>
                                    </div>
                                </div>
                                <div className="card-body pb-2">
                                    <div className="row">
                                        <div className="col-xl-12 col-lg-12 col-md-6">
                                            <div className="card">
                                                <div className="card-body p-3">
                                                    <div className="align-items-center d-flex flex-wrap">
                                                        <div className="d-inline-block position-relative donut-chart-sale me-1">
                                                            <span className="donut2" data-peity='{ "fill": ["rgba(39, 174, 96, 1)", "rgba(255, 255, 255, 0.1"],   "innerRadius": 18, "radius": 8}'>
                                                                3/9
                                                            </span>
                                                        </div>
                                                        <div className="other-content">
                                                            <h4 className="fs-18 font-w600 mb-1">Installment</h4>
                                                            <span className="fs-14">$5,412</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-xl-12 col-lg-12 col-md-6">
                                            <div className="card">
                                                <div className="card-body p-3">
                                                    <div className="align-items-center d-flex flex-wrap">
                                                        <div className="d-inline-block position-relative donut-chart-sale me-1">
                                                            <span className="donut2" data-peity='{ "fill": ["rgba(253, 83, 83, 1)", "rgba(255, 255, 255, 0.1"],   "innerRadius": 18, "radius": 8}'>
                                                                5/9
                                                            </span>
                                                        </div>
                                                        <div className="other-content">
                                                            <h4 className="fs-18 font-w600 mb-1">Investment</h4>
                                                            <span className="fs-14">$3,784</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-xl-12 col-lg-12 col-md-6">
                                            <div className="card">
                                                <div className="card-body p-3">
                                                    <div className="align-items-center d-flex flex-wrap">
                                                        <div className="d-inline-block position-relative donut-chart-sale me-1">
                                                            <span className="donut2" data-peity='{ "fill": ["rgba(253, 191, 32, 1)", "rgba(255, 255, 255, 0.1"],   "innerRadius": 18, "radius": 8}'>
                                                                5/6
                                                            </span>
                                                        </div>
                                                        <div className="other-content">
                                                            <h4 className="fs-18 font-w600 mb-1">Property</h4>
                                                            <span className="fs-14">$3,784</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-xl-12 col-lg-6">
                                <div className="card bg-transparent contacts mb-1">
                                    <div className="card-header border-0 pt-xl-0 pb-xl-0">
                                        <div>
                                            <h4 className="fs-18 font-w600">Contacts</h4>
                                            <span className="fs-14 font-w400">You have 245 clients</span>
                                        </div>
                                        <div>
                                            <a href="#" className="add" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                                <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M4.732 8.064H0V4.704H4.732V0H8.092V4.704H12.88V8.064H8.092V12.824H4.732V8.064Z" fill="white" />
                                                </svg>
                                            </a>

                                            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                <div className="modal-dialog modal-dialog-centered">
                                                    <div className="modal-content">
                                                        <div className="modal-header">
                                                            <h5 className="modal-title" id="exampleModalLabel">
                                                                Add Person
                                                            </h5>
                                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                        </div>
                                                        <div className="modal-body">
                                                            <label htmlFor="PersonName" className="form-label d-block">
                                                                Enter Name
                                                            </label>
                                                            <input type="text" id="PersonName" className="form-control w-100 mb-3" placeholder="Username" />
                                                            <label htmlFor="PersonPosition" className="form-label d-block">
                                                                Enter Position
                                                            </label>
                                                            <input type="text" id="PersonPosition" className="form-control w-100" placeholder="Position" />
                                                        </div>
                                                        <div className="modal-footer">
                                                            <button type="button" className="btn btn-secondary btn-sm" data-bs-dismiss="modal">
                                                                Close
                                                            </button>
                                                            <button type="button" className="btn btn-primary btn-sm">
                                                                Save changes
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-body loadmore-content dz-scroll recent-activity-wrapper px-3 py-3" id="RecentActivityContent">
                                        <div className="d-flex py-sm-3 py-1 px-3 align-items-center student">
                                            <span className="me-3 me-lg-2">
                                                <img src="assets/images/profile/small/pic1.jpg" alt="" width="50" />
                                            </span>
                                            <div className="ms-2">
                                                <h6 className="font-w500 fs-16 mb-0">
                                                    <a href="app-profile.html">Dedi Cahyadi</a>
                                                </h6>
                                                <span className="fs-14 font-w400 text-wrap">Head Manager</span>
                                            </div>
                                            <div className="indox">
                                                <a href="#">
                                                    <svg width="20" height="14" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M12.23 8.62999C12.0824 8.70906 11.9175 8.75043 11.75 8.75043C11.5825 8.75043 11.4177 8.70906 11.27 8.62999L5.96002 5.72999L4.62002 4.99999H2.00002C1.7348 4.99999 1.48045 5.10535 1.29291 5.29289C1.10537 5.48042 1.00002 5.73478 1.00002 5.99999C1.00002 6.26521 1.10537 6.51956 1.29291 6.7071C1.48045 6.89464 1.7348 6.99999 2.00002 6.99999H4.00002V8.99999H3.00002C2.7348 8.99999 2.48045 9.10535 2.29291 9.29289C2.10538 9.48042 2.00002 9.73478 2.00002 9.99999C2.00002 10.2652 2.10538 10.5196 2.29291 10.7071C2.48045 10.8946 2.7348 11 3.00002 11H4.13002C4.35028 11.8588 4.85022 12.6199 5.55097 13.1631C6.25171 13.7063 7.11338 14.0008 8.00002 14H16C16.5253 14.0001 17.0456 13.8968 17.5309 13.6958C18.0163 13.4948 18.4573 13.2002 18.8288 12.8287C19.2002 12.4573 19.4949 12.0163 19.6958 11.5309C19.8968 11.0455 20.0002 10.5253 20 9.99999V4.38999L12.23 8.62999Z"
                                                            fill="#B9A8FF"
                                                        />
                                                        <path
                                                            d="M5.13 3L11.75 6.6108L19.521 2.372C19.556 2.35899 19.5917 2.34804 19.6279 2.3392C19.3105 1.64299 18.7999 1.05251 18.1568 0.637868C17.5137 0.223225 16.7652 0.00183959 16 0H8C7.03378 0.00181915 6.10171 0.357571 5.38 1H1C0.734784 1 0.48043 1.10536 0.292893 1.29289C0.105357 1.48043 0 1.73478 0 2C0 2.26522 0.105357 2.51957 0.292893 2.70711C0.48043 2.89464 0.734784 3 1 3H5.13Z"
                                                            fill="#B9A8FF"
                                                        />
                                                    </svg>
                                                </a>
                                            </div>
                                        </div>
                                        <div className="d-flex py-sm-3 py-1 px-3 align-items-center student">
                                            <span className="me-3 me-lg-2">
                                                <img src="assets/images/profile/small/pic2.jpg" alt="" width="50" />
                                            </span>
                                            <div className="ms-2">
                                                <h6 className="font-w500 fs-16 mb-0">
                                                    <a href="app-profile.html">Evans John</a>
                                                </h6>
                                                <span className="fs-14 font-w400 text-wrap text-break">Programmer</span>
                                            </div>
                                            <div className="indox">
                                                <a href="#">
                                                    <svg width="20" height="14" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M12.23 8.62999C12.0824 8.70906 11.9175 8.75043 11.75 8.75043C11.5825 8.75043 11.4177 8.70906 11.27 8.62999L5.96002 5.72999L4.62002 4.99999H2.00002C1.7348 4.99999 1.48045 5.10535 1.29291 5.29289C1.10537 5.48042 1.00002 5.73478 1.00002 5.99999C1.00002 6.26521 1.10537 6.51956 1.29291 6.7071C1.48045 6.89464 1.7348 6.99999 2.00002 6.99999H4.00002V8.99999H3.00002C2.7348 8.99999 2.48045 9.10535 2.29291 9.29289C2.10538 9.48042 2.00002 9.73478 2.00002 9.99999C2.00002 10.2652 2.10538 10.5196 2.29291 10.7071C2.48045 10.8946 2.7348 11 3.00002 11H4.13002C4.35028 11.8588 4.85022 12.6199 5.55097 13.1631C6.25171 13.7063 7.11338 14.0008 8.00002 14H16C16.5253 14.0001 17.0456 13.8968 17.5309 13.6958C18.0163 13.4948 18.4573 13.2002 18.8288 12.8287C19.2002 12.4573 19.4949 12.0163 19.6958 11.5309C19.8968 11.0455 20.0002 10.5253 20 9.99999V4.38999L12.23 8.62999Z"
                                                            fill="#B9A8FF"
                                                        />
                                                        <path
                                                            d="M5.13 3L11.75 6.6108L19.521 2.372C19.556 2.35899 19.5917 2.34804 19.6279 2.3392C19.3105 1.64299 18.7999 1.05251 18.1568 0.637868C17.5137 0.223225 16.7652 0.00183959 16 0H8C7.03378 0.00181915 6.10171 0.357571 5.38 1H1C0.734784 1 0.48043 1.10536 0.292893 1.29289C0.105357 1.48043 0 1.73478 0 2C0 2.26522 0.105357 2.51957 0.292893 2.70711C0.48043 2.89464 0.734784 3 1 3H5.13Z"
                                                            fill="#B9A8FF"
                                                        />
                                                    </svg>
                                                </a>
                                            </div>
                                        </div>
                                        <div className="d-flex py-sm-3 py-1 px-3 align-items-center student">
                                            <span className="me-3 me-lg-2">
                                                <img src="assets/images/profile/small/pic3.jpg" alt="" width="50" />
                                            </span>
                                            <div className="ms-2">
                                                <h6 className="font-w500 fs-16 mb-0">
                                                    <a href="app-profile.html">Brian Brandon</a>
                                                </h6>
                                                <span className="fs-14 font-w400 text-wrap">Graphic Designer</span>
                                            </div>
                                            <div className="indox">
                                                <a href="#">
                                                    <svg width="20" height="14" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M12.23 8.62999C12.0824 8.70906 11.9175 8.75043 11.75 8.75043C11.5825 8.75043 11.4177 8.70906 11.27 8.62999L5.96002 5.72999L4.62002 4.99999H2.00002C1.7348 4.99999 1.48045 5.10535 1.29291 5.29289C1.10537 5.48042 1.00002 5.73478 1.00002 5.99999C1.00002 6.26521 1.10537 6.51956 1.29291 6.7071C1.48045 6.89464 1.7348 6.99999 2.00002 6.99999H4.00002V8.99999H3.00002C2.7348 8.99999 2.48045 9.10535 2.29291 9.29289C2.10538 9.48042 2.00002 9.73478 2.00002 9.99999C2.00002 10.2652 2.10538 10.5196 2.29291 10.7071C2.48045 10.8946 2.7348 11 3.00002 11H4.13002C4.35028 11.8588 4.85022 12.6199 5.55097 13.1631C6.25171 13.7063 7.11338 14.0008 8.00002 14H16C16.5253 14.0001 17.0456 13.8968 17.5309 13.6958C18.0163 13.4948 18.4573 13.2002 18.8288 12.8287C19.2002 12.4573 19.4949 12.0163 19.6958 11.5309C19.8968 11.0455 20.0002 10.5253 20 9.99999V4.38999L12.23 8.62999Z"
                                                            fill="#B9A8FF"
                                                        />
                                                        <path
                                                            d="M5.13 3L11.75 6.6108L19.521 2.372C19.556 2.35899 19.5917 2.34804 19.6279 2.3392C19.3105 1.64299 18.7999 1.05251 18.1568 0.637868C17.5137 0.223225 16.7652 0.00183959 16 0H8C7.03378 0.00181915 6.10171 0.357571 5.38 1H1C0.734784 1 0.48043 1.10536 0.292893 1.29289C0.105357 1.48043 0 1.73478 0 2C0 2.26522 0.105357 2.51957 0.292893 2.70711C0.48043 2.89464 0.734784 3 1 3H5.13Z"
                                                            fill="#B9A8FF"
                                                        />
                                                    </svg>
                                                </a>
                                            </div>
                                        </div>
                                        <div className="d-flex py-sm-3 py-1 px-3 align-items-center student">
                                            <span className="me-3 me-lg-2">
                                                <img src="assets/images/profile/small/pic4.jpg" alt="" width="50" />
                                            </span>
                                            <div className="ms-2">
                                                <h6 className="font-w500 fs-16 mb-0">
                                                    <a href="app-profile.html">Bella Brownlee</a>
                                                </h6>
                                                <span className="fs-14 font-w400 text-wrap">Software Engineer</span>
                                            </div>
                                            <div className="indox">
                                                <a href="#">
                                                    <svg width="20" height="14" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M12.23 8.62999C12.0824 8.70906 11.9175 8.75043 11.75 8.75043C11.5825 8.75043 11.4177 8.70906 11.27 8.62999L5.96002 5.72999L4.62002 4.99999H2.00002C1.7348 4.99999 1.48045 5.10535 1.29291 5.29289C1.10537 5.48042 1.00002 5.73478 1.00002 5.99999C1.00002 6.26521 1.10537 6.51956 1.29291 6.7071C1.48045 6.89464 1.7348 6.99999 2.00002 6.99999H4.00002V8.99999H3.00002C2.7348 8.99999 2.48045 9.10535 2.29291 9.29289C2.10538 9.48042 2.00002 9.73478 2.00002 9.99999C2.00002 10.2652 2.10538 10.5196 2.29291 10.7071C2.48045 10.8946 2.7348 11 3.00002 11H4.13002C4.35028 11.8588 4.85022 12.6199 5.55097 13.1631C6.25171 13.7063 7.11338 14.0008 8.00002 14H16C16.5253 14.0001 17.0456 13.8968 17.5309 13.6958C18.0163 13.4948 18.4573 13.2002 18.8288 12.8287C19.2002 12.4573 19.4949 12.0163 19.6958 11.5309C19.8968 11.0455 20.0002 10.5253 20 9.99999V4.38999L12.23 8.62999Z"
                                                            fill="#B9A8FF"
                                                        />
                                                        <path
                                                            d="M5.13 3L11.75 6.6108L19.521 2.372C19.556 2.35899 19.5917 2.34804 19.6279 2.3392C19.3105 1.64299 18.7999 1.05251 18.1568 0.637868C17.5137 0.223225 16.7652 0.00183959 16 0H8C7.03378 0.00181915 6.10171 0.357571 5.38 1H1C0.734784 1 0.48043 1.10536 0.292893 1.29289C0.105357 1.48043 0 1.73478 0 2C0 2.26522 0.105357 2.51957 0.292893 2.70711C0.48043 2.89464 0.734784 3 1 3H5.13Z"
                                                            fill="#B9A8FF"
                                                        />
                                                    </svg>
                                                </a>
                                            </div>
                                        </div>
                                        <div className="d-flex py-sm-3 py-1 px-3 align-items-center student">
                                            <span className="me-3 me-lg-2">
                                                <img src="assets/images/profile/small/pic5.jpg" alt="" width="50" />
                                            </span>
                                            <div className="ms-2">
                                                <h6 className="font-w500 fs-16 mb-0">
                                                    <a href="app-profile.html">Chynthia Lawra</a>
                                                </h6>
                                                <span className="fs-14 font-w400 text-wrap">CEO</span>
                                            </div>
                                            <div className="indox">
                                                <a href="#">
                                                    <svg width="20" height="14" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M12.23 8.62999C12.0824 8.70906 11.9175 8.75043 11.75 8.75043C11.5825 8.75043 11.4177 8.70906 11.27 8.62999L5.96002 5.72999L4.62002 4.99999H2.00002C1.7348 4.99999 1.48045 5.10535 1.29291 5.29289C1.10537 5.48042 1.00002 5.73478 1.00002 5.99999C1.00002 6.26521 1.10537 6.51956 1.29291 6.7071C1.48045 6.89464 1.7348 6.99999 2.00002 6.99999H4.00002V8.99999H3.00002C2.7348 8.99999 2.48045 9.10535 2.29291 9.29289C2.10538 9.48042 2.00002 9.73478 2.00002 9.99999C2.00002 10.2652 2.10538 10.5196 2.29291 10.7071C2.48045 10.8946 2.7348 11 3.00002 11H4.13002C4.35028 11.8588 4.85022 12.6199 5.55097 13.1631C6.25171 13.7063 7.11338 14.0008 8.00002 14H16C16.5253 14.0001 17.0456 13.8968 17.5309 13.6958C18.0163 13.4948 18.4573 13.2002 18.8288 12.8287C19.2002 12.4573 19.4949 12.0163 19.6958 11.5309C19.8968 11.0455 20.0002 10.5253 20 9.99999V4.38999L12.23 8.62999Z"
                                                            fill="#B9A8FF"
                                                        />
                                                        <path
                                                            d="M5.13 3L11.75 6.6108L19.521 2.372C19.556 2.35899 19.5917 2.34804 19.6279 2.3392C19.3105 1.64299 18.7999 1.05251 18.1568 0.637868C17.5137 0.223225 16.7652 0.00183959 16 0H8C7.03378 0.00181915 6.10171 0.357571 5.38 1H1C0.734784 1 0.48043 1.10536 0.292893 1.29289C0.105357 1.48043 0 1.73478 0 2C0 2.26522 0.105357 2.51957 0.292893 2.70711C0.48043 2.89464 0.734784 3 1 3H5.13Z"
                                                            fill="#B9A8FF"
                                                        />
                                                    </svg>
                                                </a>
                                            </div>
                                        </div>
                                        <div className="d-flex py-sm-3 py-1 px-3 align-items-center student">
                                            <span className="me-3 me-lg-2">
                                                <img src="assets/images/profile/small/pic6.jpg" alt="" width="50" />
                                            </span>
                                            <div className="ms-2">
                                                <h6 className="font-w500 fs-16 mb-0">
                                                    <a href="app-profile.html">Dedi Cahyadi</a>
                                                </h6>
                                                <span className="fs-14 font-w400 text-wrap">Head Manager</span>
                                            </div>
                                            <div className="indox">
                                                <a href="#">
                                                    <svg width="20" height="14" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M12.23 8.62999C12.0824 8.70906 11.9175 8.75043 11.75 8.75043C11.5825 8.75043 11.4177 8.70906 11.27 8.62999L5.96002 5.72999L4.62002 4.99999H2.00002C1.7348 4.99999 1.48045 5.10535 1.29291 5.29289C1.10537 5.48042 1.00002 5.73478 1.00002 5.99999C1.00002 6.26521 1.10537 6.51956 1.29291 6.7071C1.48045 6.89464 1.7348 6.99999 2.00002 6.99999H4.00002V8.99999H3.00002C2.7348 8.99999 2.48045 9.10535 2.29291 9.29289C2.10538 9.48042 2.00002 9.73478 2.00002 9.99999C2.00002 10.2652 2.10538 10.5196 2.29291 10.7071C2.48045 10.8946 2.7348 11 3.00002 11H4.13002C4.35028 11.8588 4.85022 12.6199 5.55097 13.1631C6.25171 13.7063 7.11338 14.0008 8.00002 14H16C16.5253 14.0001 17.0456 13.8968 17.5309 13.6958C18.0163 13.4948 18.4573 13.2002 18.8288 12.8287C19.2002 12.4573 19.4949 12.0163 19.6958 11.5309C19.8968 11.0455 20.0002 10.5253 20 9.99999V4.38999L12.23 8.62999Z"
                                                            fill="#B9A8FF"
                                                        />
                                                        <path
                                                            d="M5.13 3L11.75 6.6108L19.521 2.372C19.556 2.35899 19.5917 2.34804 19.6279 2.3392C19.3105 1.64299 18.7999 1.05251 18.1568 0.637868C17.5137 0.223225 16.7652 0.00183959 16 0H8C7.03378 0.00181915 6.10171 0.357571 5.38 1H1C0.734784 1 0.48043 1.10536 0.292893 1.29289C0.105357 1.48043 0 1.73478 0 2C0 2.26522 0.105357 2.51957 0.292893 2.70711C0.48043 2.89464 0.734784 3 1 3H5.13Z"
                                                            fill="#B9A8FF"
                                                        />
                                                    </svg>
                                                </a>
                                            </div>
                                        </div>
                                        <div className="d-flex py-sm-3 py-1 px-3 align-items-center student">
                                            <span className="me-3 me-lg-2">
                                                <img src="assets/images/profile/small/pic4.jpg" alt="" width="50" />
                                            </span>
                                            <div className="ms-2">
                                                <h6 className="font-w500 fs-16 mb-0">
                                                    <a href="app-profile.html">Bella Brownlee</a>
                                                </h6>
                                                <span className="fs-14 font-w400 text-wrap">Software Engineer</span>
                                            </div>
                                            <div className="indox">
                                                <a href="#">
                                                    <svg width="20" height="14" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M12.23 8.62999C12.0824 8.70906 11.9175 8.75043 11.75 8.75043C11.5825 8.75043 11.4177 8.70906 11.27 8.62999L5.96002 5.72999L4.62002 4.99999H2.00002C1.7348 4.99999 1.48045 5.10535 1.29291 5.29289C1.10537 5.48042 1.00002 5.73478 1.00002 5.99999C1.00002 6.26521 1.10537 6.51956 1.29291 6.7071C1.48045 6.89464 1.7348 6.99999 2.00002 6.99999H4.00002V8.99999H3.00002C2.7348 8.99999 2.48045 9.10535 2.29291 9.29289C2.10538 9.48042 2.00002 9.73478 2.00002 9.99999C2.00002 10.2652 2.10538 10.5196 2.29291 10.7071C2.48045 10.8946 2.7348 11 3.00002 11H4.13002C4.35028 11.8588 4.85022 12.6199 5.55097 13.1631C6.25171 13.7063 7.11338 14.0008 8.00002 14H16C16.5253 14.0001 17.0456 13.8968 17.5309 13.6958C18.0163 13.4948 18.4573 13.2002 18.8288 12.8287C19.2002 12.4573 19.4949 12.0163 19.6958 11.5309C19.8968 11.0455 20.0002 10.5253 20 9.99999V4.38999L12.23 8.62999Z"
                                                            fill="#B9A8FF"
                                                        />
                                                        <path
                                                            d="M5.13 3L11.75 6.6108L19.521 2.372C19.556 2.35899 19.5917 2.34804 19.6279 2.3392C19.3105 1.64299 18.7999 1.05251 18.1568 0.637868C17.5137 0.223225 16.7652 0.00183959 16 0H8C7.03378 0.00181915 6.10171 0.357571 5.38 1H1C0.734784 1 0.48043 1.10536 0.292893 1.29289C0.105357 1.48043 0 1.73478 0 2C0 2.26522 0.105357 2.51957 0.292893 2.70711C0.48043 2.89464 0.734784 3 1 3H5.13Z"
                                                            fill="#B9A8FF"
                                                        />
                                                    </svg>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-footer text-center border-0 pt-0">
                                        <a href="javascript:void(0);" className="btn btn-block dz-load-more" id="RecentActivity" rel="ajax/recentactivity.html">
                                            View More
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
export default Dashboard;
