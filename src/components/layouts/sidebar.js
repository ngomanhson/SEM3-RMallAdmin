import { Link } from "react-router-dom";

function Sidebar() {
    return (
        <div className="dlabnav">
            <div className="dlabnav-scroll">
                <ul className="metismenu" id="menu">
                    <li>
                        <a className="has-arrow" href="javascript:void()" aria-expanded="false">
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
                        </a>
                        <ul aria-expanded="false">
                            <li>
                                <Link to="/">Dashboard</Link>
                            </li>
                        </ul>
                    </li>

                    <li>
                        <a className="has-arrow" href="javascript:void()" aria-expanded="false">
                            <div className="menu-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" viewBox="0 0 384 512">
                                    <path
                                        fill="#130F26"
                                        d="M14 2.2C22.5-1.7 32.5-.3 39.6 5.8L80 40.4 120.4 5.8c9-7.7 22.3-7.7 31.2 0L192 40.4 232.4 5.8c9-7.7 22.3-7.7 31.2 0L304 40.4 344.4 5.8c7.1-6.1 17.1-7.5 25.6-3.6s14 12.4 14 21.8V488c0 9.4-5.5 17.9-14 21.8s-18.5 2.5-25.6-3.6L304 471.6l-40.4 34.6c-9 7.7-22.3 7.7-31.2 0L192 471.6l-40.4 34.6c-9 7.7-22.3 7.7-31.2 0L80 471.6 39.6 506.2c-7.1 6.1-17.1 7.5-25.6 3.6S0 497.4 0 488V24C0 14.6 5.5 6.1 14 2.2zM96 144c-8.8 0-16 7.2-16 16s7.2 16 16 16H288c8.8 0 16-7.2 16-16s-7.2-16-16-16H96zM80 352c0 8.8 7.2 16 16 16H288c8.8 0 16-7.2 16-16s-7.2-16-16-16H96c-8.8 0-16 7.2-16 16zM96 240c-8.8 0-16 7.2-16 16s7.2 16 16 16H288c8.8 0 16-7.2 16-16s-7.2-16-16-16H96z"
                                    />
                                </svg>
                            </div>
                            <span className="nav-text">Order</span>
                        </a>
                        <ul aria-expanded="false">
                            <li>
                                <Link to="/order-list">Order List</Link>
                            </li>
                        </ul>
                    </li>

                    <li>
                        <a className="has-arrow" href="javascript:void()" aria-expanded="false">
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
                        </a>
                        <ul aria-expanded="false">
                            <li>
                                <Link to="/customer-list">Customer List</Link>
                            </li>
                            <li>
                                <Link to="/customer-create">Customer Create</Link>
                            </li>
                            <li>
                                <Link to="/customer-edit">Customer Edit</Link>
                            </li>
                            <li>
                                <Link to="/customer-delete-at">Customer Delete At</Link>
                            </li>
                        </ul>
                    </li>

                    <li>
                        <button className="has-arrow-custom">
                            <div className="menu-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" height="21" width="21" viewBox="0 0 512 512" transform="rotate(180)" style={{ marginRight: "0.850rem" }}>
                                    <path
                                        fill="#c8c8c8"
                                        d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"
                                    />
                                </svg>
                            </div>

                            <span className="nav-text">Logout</span>
                        </button>
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
