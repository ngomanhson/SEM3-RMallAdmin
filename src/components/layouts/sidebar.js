import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

function Sidebar() {
    const location = useLocation();

    const isActive = (path) => {
        // Kiểm tra xem đường dẫn hiện tại có trùng với path hay không
        return location.pathname === path;
    };
    return (
        <div className="dlabnav">
            <div className="dlabnav-scroll">
                <ul className="metismenu" id="menu">
                    <li className={isActive("/") ? "mm-active" : ""}>
                        <Link className="has-arrow" to="/" aria-expanded="false">
                            <div className="menu-icon">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g id="IconlyHome">
                                        <g id="Home">
                                            <path
                                                id="Home_2"
                                                d="M9.13478 20.7733V17.7156C9.13478 16.9351 9.77217 16.3023 10.5584 16.3023H13.4326C13.8102 16.3023 14.1723 16.4512 14.4393 16.7163C14.7063 16.9813 14.8563 17.3408 14.8563 17.7156V20.7733C14.8539 21.0978 14.9821 21.4099 15.2124 21.6402C15.4427 21.8705 15.7561 22 16.0829 22H18.0438C18.9596 22.0023 19.8388 21.6428 20.4872 21.0008C21.1356 20.3588 21.5 19.487 21.5 18.5778V9.86686C21.5 9.13246 21.1721 8.43584 20.6046 7.96467L13.934 2.67587C12.7737 1.74856 11.1111 1.7785 9.98539 2.74698L3.46701 7.96467C2.87274 8.42195 2.51755 9.12064 2.5 9.86686V18.5689C2.5 20.4639 4.04738 22 5.95617 22H7.87229C8.55123 22 9.103 21.4562 9.10792 20.7822L9.13478 20.7733Z"
                                                fill="#130F26"
                                            />
                                        </g>
                                    </g>
                                </svg>
                            </div>
                            <span className="nav-text">Dashboard</span>
                        </Link>
                    </li>

                    <li className={isActive("/booth-list") ? "mm-active" : ""}>
                        <NavLink className="has-arrow" to="/booth-list" aria-expanded="false">
                            <div className="menu-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" viewBox="0 0 576 512">
                                    <path
                                        fill="#130F26"
                                        d="M547.6 103.8L490.3 13.1C485.2 5 476.1 0 466.4 0H109.6C99.9 0 90.8 5 85.7 13.1L28.3 103.8c-29.6 46.8-3.4 111.9 51.9 119.4c4 .5 8.1 .8 12.1 .8c26.1 0 49.3-11.4 65.2-29c15.9 17.6 39.1 29 65.2 29c26.1 0 49.3-11.4 65.2-29c15.9 17.6 39.1 29 65.2 29c26.2 0 49.3-11.4 65.2-29c16 17.6 39.1 29 65.2 29c4.1 0 8.1-.3 12.1-.8c55.5-7.4 81.8-72.5 52.1-119.4zM499.7 254.9l-.1 0c-5.3 .7-10.7 1.1-16.2 1.1c-12.4 0-24.3-1.9-35.4-5.3V384H128V250.6c-11.2 3.5-23.2 5.4-35.6 5.4c-5.5 0-11-.4-16.3-1.1l-.1 0c-4.1-.6-8.1-1.3-12-2.3V384v64c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V384 252.6c-4 1-8 1.8-12.3 2.3z"
                                    />
                                </svg>
                            </div>
                            <span className="nav-text">Booth</span>
                        </NavLink>
                    </li>

                    <li className={isActive("/food-counter-list") ? "mm-active" : ""}>
                        <NavLink className="has-arrow" to="/food-counter-list" aria-expanded="false">
                            <div className="menu-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" viewBox="0 0 512 512">
                                    <path
                                        fill="#130F26"
                                        d="M0 192c0-35.3 28.7-64 64-64c.5 0 1.1 0 1.6 0C73 91.5 105.3 64 144 64c15 0 29 4.1 40.9 11.2C198.2 49.6 225.1 32 256 32s57.8 17.6 71.1 43.2C339 68.1 353 64 368 64c38.7 0 71 27.5 78.4 64c.5 0 1.1 0 1.6 0c35.3 0 64 28.7 64 64c0 11.7-3.1 22.6-8.6 32H8.6C3.1 214.6 0 203.7 0 192zm0 91.4C0 268.3 12.3 256 27.4 256H484.6c15.1 0 27.4 12.3 27.4 27.4c0 70.5-44.4 130.7-106.7 154.1L403.5 452c-2 16-15.6 28-31.8 28H140.2c-16.1 0-29.8-12-31.8-28l-1.8-14.4C44.4 414.1 0 353.9 0 283.4z"
                                    />
                                </svg>
                            </div>
                            <span className="nav-text">Food counter</span>
                        </NavLink>
                    </li>

                    <li className={isActive("/movie-list") ? "mm-active" : ""}>
                        <NavLink className="has-arrow" to="/movie-list" aria-expanded="false">
                            <div className="menu-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" viewBox="0 0 512 512">
                                    <path
                                        fill="#130F26"
                                        d="M0 96C0 60.7 28.7 32 64 32H448c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zM48 368v32c0 8.8 7.2 16 16 16H96c8.8 0 16-7.2 16-16V368c0-8.8-7.2-16-16-16H64c-8.8 0-16 7.2-16 16zm368-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V368c0-8.8-7.2-16-16-16H416zM48 240v32c0 8.8 7.2 16 16 16H96c8.8 0 16-7.2 16-16V240c0-8.8-7.2-16-16-16H64c-8.8 0-16 7.2-16 16zm368-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V240c0-8.8-7.2-16-16-16H416zM48 112v32c0 8.8 7.2 16 16 16H96c8.8 0 16-7.2 16-16V112c0-8.8-7.2-16-16-16H64c-8.8 0-16 7.2-16 16zM416 96c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V112c0-8.8-7.2-16-16-16H416zM160 128v64c0 17.7 14.3 32 32 32H320c17.7 0 32-14.3 32-32V128c0-17.7-14.3-32-32-32H192c-17.7 0-32 14.3-32 32zm32 160c-17.7 0-32 14.3-32 32v64c0 17.7 14.3 32 32 32H320c17.7 0 32-14.3 32-32V320c0-17.7-14.3-32-32-32H192z"
                                    />
                                </svg>
                            </div>
                            <span className="nav-text">Movie</span>
                        </NavLink>
                    </li>

                    <li className={isActive("/room") ? "mm-active" : ""}>
                        <NavLink className="has-arrow " to="/room" aria-expanded="false">
                            <div className="menu-icon">
                                <svg width="24" height="24" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                                    {" "}
                                    <path
                                        fill="var(--ci-primary-color, #000000)"
                                        d="M440,424V88H352V13.005L88,58.522V424H16v32h86.9L352,490.358V120h56V456h88V424ZM320,453.642,120,426.056V85.478L320,51Z"
                                        class="ci-primary"
                                    />{" "}
                                    <rect width="32" height="64" x="256" y="232" fill="var(--ci-primary-color, #000000)" class="ci-primary" />{" "}
                                </svg>
                            </div>
                            <span className="nav-text">Room</span>
                        </NavLink>
                    </li>

                    <li className={isActive("/booking-list") ? "mm-active" : ""}>
                        <NavLink className="has-arrow" to="/booking-list" aria-expanded="false">
                            <div className="menu-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" viewBox="0 0 384 512">
                                    <path
                                        fill="#130F26"
                                        d="M14 2.2C22.5-1.7 32.5-.3 39.6 5.8L80 40.4 120.4 5.8c9-7.7 22.3-7.7 31.2 0L192 40.4 232.4 5.8c9-7.7 22.3-7.7 31.2 0L304 40.4 344.4 5.8c7.1-6.1 17.1-7.5 25.6-3.6s14 12.4 14 21.8V488c0 9.4-5.5 17.9-14 21.8s-18.5 2.5-25.6-3.6L304 471.6l-40.4 34.6c-9 7.7-22.3 7.7-31.2 0L192 471.6l-40.4 34.6c-9 7.7-22.3 7.7-31.2 0L80 471.6 39.6 506.2c-7.1 6.1-17.1 7.5-25.6 3.6S0 497.4 0 488V24C0 14.6 5.5 6.1 14 2.2zM96 144c-8.8 0-16 7.2-16 16s7.2 16 16 16H288c8.8 0 16-7.2 16-16s-7.2-16-16-16H96zM80 352c0 8.8 7.2 16 16 16H288c8.8 0 16-7.2 16-16s-7.2-16-16-16H96c-8.8 0-16 7.2-16 16zM96 240c-8.8 0-16 7.2-16 16s7.2 16 16 16H288c8.8 0 16-7.2 16-16s-7.2-16-16-16H96z"
                                    />
                                </svg>
                            </div>
                            <span className="nav-text">Booking</span>
                        </NavLink>
                    </li>

                    <li className={isActive("/promotion-list") ? "mm-active" : ""}>
                        <NavLink className="has-arrow " to="/promotion-list" aria-expanded="false">
                            <div className="menu-icon">
                                <svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M3.75 6.75L4.5 6H20.25L21 6.75V10.7812H20.25C19.5769 10.7812 19.0312 11.3269 19.0312 12C19.0312 12.6731 19.5769 13.2188 20.25 13.2188H21V17.25L20.25 18L4.5 18L3.75 17.25V13.2188H4.5C5.1731 13.2188 5.71875 12.6731 5.71875 12C5.71875 11.3269 5.1731 10.7812 4.5 10.7812H3.75V6.75ZM5.25 7.5V9.38602C6.38677 9.71157 7.21875 10.7586 7.21875 12C7.21875 13.2414 6.38677 14.2884 5.25 14.614V16.5L9 16.5L9 7.5H5.25ZM10.5 7.5V16.5L19.5 16.5V14.614C18.3632 14.2884 17.5312 13.2414 17.5312 12C17.5312 10.7586 18.3632 9.71157 19.5 9.38602V7.5H10.5Z"
                                        fill="#080341"
                                    />
                                </svg>
                            </div>
                            <span className="nav-text">Promotion</span>
                        </NavLink>
                    </li>

                    <li className={isActive("/customer-list") ? "mm-active" : ""}>
                        <NavLink className="has-arrow" to="/customer-list" aria-expanded="false">
                            <div className="menu-icon">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M9.34933 14.8577C5.38553 14.8577 2 15.47 2 17.9174C2 20.3666 5.364 21 9.34933 21C13.3131 21 16.6987 20.3877 16.6987 17.9404C16.6987 15.4911 13.3347 14.8577 9.34933 14.8577Z"
                                        fill="#B9A8FF"
                                    />
                                    <path
                                        opacity="0.4"
                                        d="M9.34935 12.5248C12.049 12.5248 14.2124 10.4062 14.2124 7.76241C14.2124 5.11865 12.049 3 9.34935 3C6.65072 3 4.48633 5.11865 4.48633 7.76241C4.48633 10.4062 6.65072 12.5248 9.34935 12.5248Z"
                                        fill="#763ed0"
                                    />
                                    <path
                                        opacity="0.4"
                                        d="M16.1734 7.84875C16.1734 9.19507 15.7605 10.4513 15.0364 11.4948C14.9611 11.6021 15.0276 11.7468 15.1587 11.7698C15.3407 11.7995 15.5276 11.8177 15.7184 11.8216C17.6167 11.8704 19.3202 10.6736 19.7908 8.87118C20.4885 6.19676 18.4415 3.79543 15.8339 3.79543C15.5511 3.79543 15.2801 3.82418 15.0159 3.87688C14.9797 3.88454 14.9405 3.90179 14.921 3.93246C14.8955 3.97174 14.9141 4.02253 14.9395 4.05607C15.7233 5.13216 16.1734 6.44207 16.1734 7.84875Z"
                                        fill="#763ed0"
                                    />
                                    <path
                                        d="M21.7791 15.1693C21.4317 14.444 20.5932 13.9466 19.3172 13.7023C18.7155 13.5586 17.0853 13.3545 15.5697 13.3832C15.5472 13.3861 15.5344 13.4014 15.5325 13.411C15.5295 13.4263 15.5364 13.4493 15.5658 13.4656C16.2663 13.8048 18.9738 15.2805 18.6333 18.3928C18.6186 18.5289 18.7292 18.6439 18.8671 18.6247C19.5335 18.5318 21.2478 18.1705 21.7791 17.0475C22.0736 16.4534 22.0736 15.7635 21.7791 15.1693Z"
                                        fill="#B9A8FF"
                                    />
                                </svg>
                            </div>

                            <span className="nav-text">Customers</span>
                        </NavLink>
                    </li>

                    <li className={isActive("/profile") ? "mm-active" : ""}>
                        <NavLink className="has-arrow" to="/profile" aria-expanded="false">
                            <div className="menu-icon">
                                <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g id="SVGRepo_bgCarrier" strokeWidth="0" />

                                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />

                                    <g id="SVGRepo_iconCarrier">
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2Z"
                                            fill="#c8c8c8"
                                        />
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M9 13C7.33726 13 5.73823 13.7585 4.80115 14.9004C4.32556 15.48 3.99121 16.1971 3.9621 16.9919C3.93237 17.8036 4.22536 18.5958 4.82958 19.2871C6.30215 20.9716 8.65327 22 12 22C15.3467 22 17.6979 20.9716 19.1704 19.2871C19.7746 18.5958 20.0676 17.8036 20.0379 16.9919C20.0088 16.1971 19.6744 15.48 19.1989 14.9004C18.2618 13.7585 16.6627 13 15 13H9Z"
                                            fill="#c8c8c8"
                                        />
                                    </g>
                                </svg>
                            </div>

                            <span className="nav-text">Profile</span>
                        </NavLink>
                    </li>

                    <li>
                        <a href="javascript:void()" className="has-arrow" aria-expanded="false">
                            <div className="menu-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" height="21" width="21" viewBox="0 0 512 512" transform="rotate(180)">
                                    <path
                                        fill="#c8c8c8"
                                        d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"
                                    />
                                </svg>
                            </div>

                            <span className="nav-text">Logout</span>
                        </a>
                    </li>
                </ul>

                <div className="copyright">
                    <p className="fs-14">
                        <strong>Copyright</strong> © 2023 All Rights Reserved
                    </p>
                    <p className="fs-14">
                        Made with <span className="heart"></span> by Four Idiots
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
