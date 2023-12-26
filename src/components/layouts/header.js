import { Link, useNavigate } from "react-router-dom";
import { getDecodedToken, removeAccessToken } from "../../utils/auth";
import { useEffect, useState } from "react";

function Header() {
    const navigate = useNavigate();
    const [userName, setUserName] = useState("");
    const [roleName, setRole] = useState("");

    useEffect(() => {
        // Get information form token
        const decodedToken = getDecodedToken();

        if (decodedToken) {
            const userName = decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
            const roleName = decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

            setUserName(userName);
            setRole(roleName);
        }
    }, []);

    const handleLogout = () => {
        removeAccessToken();
        navigate("/login");
    };
    return (
        <div className="header">
            <div className="header-content">
                <nav className="navbar navbar-expand">
                    <div className="collapse navbar-collapse justify-content-between">
                        <div className="header-left">
                            <div className="dashboard_bar">Dashboard</div>
                        </div>
                        <ul className="navbar-nav header-right">
                            <li className="nav-item d-flex align-items-start">
                                <div className="input-group search-area">
                                    <input type="text" className="form-control" id="search" placeholder="Search here..." />
                                    <span className="input-group-text">
                                        <a href="javascript:void(0)">
                                            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    opacity="1"
                                                    d="M16.6751 19.4916C16.2194 19.036 16.2194 18.2973 16.6751 17.8417C17.1307 17.3861 17.8694 17.3861 18.325 17.8417L22.9916 22.5084C23.4473 22.964 23.4473 23.7027 22.9916 24.1583C22.536 24.6139 21.7973 24.6139 21.3417 24.1583L16.6751 19.4916Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M12.8333 18.6667C16.055 18.6667 18.6667 16.055 18.6667 12.8334C18.6667 9.61169 16.055 7.00002 12.8333 7.00002C9.61166 7.00002 6.99999 9.61169 6.99999 12.8334C6.99999 16.055 9.61166 18.6667 12.8333 18.6667ZM12.8333 21C8.323 21 4.66666 17.3437 4.66666 12.8334C4.66666 8.32303 8.323 4.66669 12.8333 4.66669C17.3436 4.66669 21 8.32303 21 12.8334C21 17.3437 17.3436 21 12.8333 21Z"
                                                    fill="white"
                                                />
                                            </svg>
                                        </a>
                                    </span>
                                </div>
                            </li>
                        </ul>
                        <div className="dropdown header-profile2">
                            <ul className="navbar-nav header-right me-sm-4">
                                <li className="nav-item dropdown notification_dropdown">
                                    <a className="nav-link" href="javascript:void(0);" role="button" data-bs-toggle="dropdown">
                                        <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M15.8333 11H17.5833C18.5498 11 19.3333 11.7835 19.3333 12.75C19.3333 13.7165 18.5498 14.5 17.5833 14.5H2.41666C1.45016 14.5 0.666656 13.7165 0.666656 12.75C0.666656 11.7835 1.45016 11 2.41666 11H4.16666L4.81798 5.13812C5.11136 2.49763 7.34325 0.5 9.99999 0.5C12.6567 0.5 14.8886 2.49763 15.182 5.13812L15.8333 11Z"
                                                fill="#B9A8FF"
                                            />
                                            <path
                                                opacity="0.3"
                                                d="M12.3333 18C12.3333 16.7114 11.2887 15.6667 9.99999 15.6667C8.71133 15.6667 7.66666 16.7114 7.66666 18C7.66666 19.2887 8.71133 20.3334 9.99999 20.3334C11.2887 20.3334 12.3333 19.2887 12.3333 18Z"
                                                fill="#B9A8FF"
                                            />
                                        </svg>
                                    </a>
                                    <div className="dropdown-menu dropdown-menu-end">
                                        <div id="DZ_W_Notification1" className="widget-media dz-scroll p-3" style={{ height: "380px" }}>
                                            <ul className="timeline">
                                                <li>
                                                    <div className="timeline-panel">
                                                        <div className="media me-2">
                                                            <img src="assets/images/avatar/1.jpg" alt="" width={50} />
                                                        </div>
                                                        <div className="media-body">
                                                            <h6 className="mb-1">
                                                                <a href="javascript:voiud(0)"> Dr sultads Send you Photo</a>
                                                            </h6>
                                                            <small className="d-block">29 July 2020 - 02:26 PM</small>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="timeline-panel">
                                                        <div className="media me-2 media-info">KG</div>
                                                        <div className="media-body">
                                                            <h6 className="mb-1">
                                                                <a href="javascript:voiud(0)">Resport created successfully</a>
                                                            </h6>
                                                            <small className="d-block">29 July 2020 - 02:26 PM</small>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="timeline-panel">
                                                        <div className="media me-2 media-success">
                                                            <i className="fa fa-home"></i>
                                                        </div>
                                                        <div className="media-body">
                                                            <h6 className="mb-1">
                                                                <a href="javascript:voiud(0)">Reminder : Treatment Time!</a>
                                                            </h6>
                                                            <small className="d-block">29 July 2020 - 02:26 PM</small>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="timeline-panel">
                                                        <div className="media me-2">
                                                            <img src="assets/images/avatar/1.jpg" alt="" width={50} />
                                                        </div>
                                                        <div className="media-body">
                                                            <h6 className="mb-1">
                                                                <a href="javascript:voiud(0)">Dr sultads Send you Photo</a>
                                                            </h6>
                                                            <small className="d-block">29 July 2020 - 02:26 PM</small>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="timeline-panel">
                                                        <div className="media me-2 media-danger">KG</div>
                                                        <div className="media-body">
                                                            <h6 className="mb-1">
                                                                <a href="javascript:voiud(0)"> Resport created successfully </a>
                                                            </h6>
                                                            <small className="d-block">29 July 2020 - 02:26 PM</small>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="timeline-panel">
                                                        <div className="media me-2 media-primary">
                                                            <i className="fa fa-home"></i>
                                                        </div>
                                                        <div className="media-body">
                                                            <h6 className="mb-1">
                                                                <a href="javascript:voiud(0)"> Reminder : Treatment Time! </a>
                                                            </h6>
                                                            <small className="d-block">29 July 2020 - 02:26 PM</small>
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                        <a className="all-notification" href="javascript:void(0);">
                                            See all notifications <i className="ti-arrow-end"></i>
                                        </a>
                                    </div>
                                </li>
                                <li className="nav-item dropdown notification_dropdown">
                                    <a className="nav-link bell-link" href="javascript:void(0);">
                                        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                opacity="0.3"
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M7.00001 2.33331H21C21.6443 2.33331 22.1667 2.85565 22.1667 3.49998V15.1666C22.1667 15.811 21.6443 16.3333 21 16.3333H7.00001C6.35568 16.3333 5.83334 15.811 5.83334 15.1666V3.49998C5.83334 2.85565 6.35568 2.33331 7.00001 2.33331ZM16.1 4.66665C15.3489 4.66665 14.4705 5.51814 14 6.06665C13.5295 5.51814 12.6511 4.66665 11.9 4.66665C10.5705 4.66665 9.80001 5.70366 9.80001 7.0235C9.80001 8.4856 11.2 10.0333 14 11.6666C16.8 10.0333 18.2 8.51665 18.2 7.11665C18.2 5.79681 17.4295 4.66665 16.1 4.66665Z"
                                                fill="#B9A8FF"
                                            />
                                            <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M4.42487 7.66798L14 14.5833L23.5751 7.66798C23.8363 7.47935 24.2009 7.53816 24.3896 7.79933C24.4614 7.89874 24.5 8.01825 24.5 8.14087V19.8333C24.5 21.122 23.4553 22.1667 22.1667 22.1667H5.83333C4.54467 22.1667 3.5 21.122 3.5 19.8333V8.14087C3.5 7.81871 3.76117 7.55754 4.08333 7.55754C4.20596 7.55754 4.32546 7.59618 4.42487 7.66798Z"
                                                fill="#B9A8FF"
                                            />
                                        </svg>
                                    </a>
                                </li>
                                <li className="nav-item dropdown notification_dropdown">
                                    <a className="nav-link" href="javascript:void(0);" data-bs-toggle="dropdown">
                                        <svg width="28" height="29" viewBox="0 0 28 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M3.5 19.7699V10.8881H24.5V19.8411C24.5 23.5032 22.1948 25.7549 18.5066 25.7549H9.48189C5.82821 25.7549 3.5 23.4566 3.5 19.7699ZM9.28595 16.8999C8.75576 16.9244 8.31778 16.5032 8.29473 15.9677C8.29473 15.4311 8.70966 14.9877 9.23985 14.9632C9.75851 14.9632 10.185 15.3727 10.1965 15.8966C10.2195 16.4344 9.80461 16.8777 9.28595 16.8999ZM14.0231 16.8999C13.4929 16.9244 13.0549 16.5032 13.0318 15.9677C13.0318 15.4311 13.4468 14.9877 13.9769 14.9632C14.4956 14.9632 14.9221 15.3727 14.9336 15.8966C14.9566 16.4344 14.5417 16.8777 14.0231 16.8999ZM18.7256 21.1932C18.1954 21.1816 17.7689 20.7382 17.7689 20.2016C17.7574 19.6649 18.1839 19.2227 18.714 19.2111H18.7256C19.2673 19.2111 19.7053 19.6544 19.7053 20.2016C19.7053 20.7499 19.2673 21.1932 18.7256 21.1932ZM13.0318 20.2016C13.0549 20.7382 13.4929 21.1594 14.0231 21.1349C14.5417 21.1127 14.9566 20.6694 14.9336 20.1327C14.9221 19.6077 14.4956 19.1982 13.9769 19.1982C13.4468 19.2227 13.0318 19.6649 13.0318 20.2016ZM8.28321 20.2016C8.30626 20.7382 8.74424 21.1594 9.27442 21.1349C9.79308 21.1127 10.208 20.6694 10.185 20.1327C10.1734 19.6077 9.74698 19.1982 9.22832 19.1982C8.69813 19.2227 8.28321 19.6649 8.28321 20.2016ZM17.7805 15.9561C17.7805 15.4194 18.1954 14.9877 18.7256 14.9761C19.2442 14.9761 19.6592 15.3949 19.6822 15.9094C19.6937 16.4461 19.2788 16.8894 18.7602 16.8999C18.23 16.9116 17.792 16.5032 17.7805 15.9677V15.9561Z"
                                                fill="#B9A8FF"
                                            />
                                            <path
                                                opacity="0.4"
                                                d="M3.50391 10.888C3.51889 10.2031 3.57652 8.84396 3.68486 8.40646C4.2381 5.94596 6.1168 4.38262 8.80232 4.15979H19.1986C21.861 4.39429 23.7628 5.96812 24.316 8.40646C24.4232 8.83229 24.4809 10.202 24.4958 10.888H3.50391Z"
                                                fill="#B9A8FF"
                                            />
                                            <path
                                                d="M9.689 7.77657C10.1961 7.77657 10.5765 7.39274 10.5765 6.87824V3.32107C10.5765 2.80657 10.1961 2.42157 9.689 2.42157C9.18187 2.42157 8.80151 2.80657 8.80151 3.32107V6.87824C8.80151 7.39274 9.18187 7.77657 9.689 7.77657Z"
                                                fill="#B9A8FF"
                                            />
                                            <path
                                                d="M18.3108 7.77657C18.8064 7.77657 19.1983 7.39274 19.1983 6.87824V3.32107C19.1983 2.80657 18.8064 2.42157 18.3108 2.42157C17.8036 2.42157 17.4233 2.80657 17.4233 3.32107V6.87824C17.4233 7.39274 17.8036 7.77657 18.3108 7.77657Z"
                                                fill="#B9A8FF"
                                            />
                                        </svg>
                                    </a>
                                    <div className="dropdown-menu dropdown-menu-end">
                                        <div id="DZ_W_TimeLine02" className="widget-timeline dz-scroll style-1 ps ps--active-y p-3 height370">
                                            <ul className="timeline">
                                                <li>
                                                    <div className="timeline-badge primary"></div>
                                                    <a className="timeline-panel text-muted" href="javascript:void(0);">
                                                        <span>10 minutes ago</span>
                                                        <h6 className="mb-0">
                                                            Youtube, a video-sharing website, goes live <strong className="text-primary">$500</strong>.
                                                        </h6>
                                                    </a>
                                                </li>
                                                <li>
                                                    <div className="timeline-badge info"></div>
                                                    <a className="timeline-panel text-muted" href="javascript:void(0);">
                                                        <span>20 minutes ago</span>
                                                        <h6 className="mb-0">
                                                            New order placed <strong className="text-info">#XF-2356.</strong>
                                                        </h6>
                                                        <p className="mb-0">Quisque a consequat ante Sit amet magna at volutapt...</p>
                                                    </a>
                                                </li>
                                                <li>
                                                    <div className="timeline-badge danger"></div>
                                                    <a className="timeline-panel text-muted" href="javascript:void(0);">
                                                        <span>30 minutes ago</span>
                                                        <h6 className="mb-0">
                                                            john just buy your product <strong className="text-warning">Sell $250</strong>
                                                        </h6>
                                                    </a>
                                                </li>
                                                <li>
                                                    <div className="timeline-badge success"></div>
                                                    <a className="timeline-panel text-muted" href="javascript:void(0);">
                                                        <span>15 minutes ago</span>
                                                        <h6 className="mb-0">StumbleUpon is acquired by eBay.</h6>
                                                    </a>
                                                </li>
                                                <li>
                                                    <div className="timeline-badge warning"></div>
                                                    <a className="timeline-panel text-muted" href="javascript:void(0);">
                                                        <span>20 minutes ago</span>
                                                        <h6 className="mb-0">Mashable, a news website and blog, goes live.</h6>
                                                    </a>
                                                </li>
                                                <li>
                                                    <div className="timeline-badge dark"></div>
                                                    <a className="timeline-panel text-muted" href="javascript:void(0);">
                                                        <span>20 minutes ago</span>
                                                        <h6 className="mb-0">Mashable, a news website and blog, goes live.</h6>
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                            <a className="nav-link user-profile" href="javascript:void(0);" role="button" data-bs-toggle="dropdown">
                                <div className="header-info2 d-flex align-items-center">
                                    <img src="./assets/images/avatar/4.jpeg" alt="" />
                                    <div className="d-flex align-items-center sidebar-info">
                                        <div className="user-info">
                                            <span className="font-w500 d-block fs-5 text-white">{userName}</span>
                                            <small className="text-end font-w400">{roleName}</small>
                                        </div>
                                        <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12.8334 1.08331L7.00002 6.91665L1.16669 1.08331" stroke="#FFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                </div>
                            </a>
                            <div className="dropdown-menu profile dropdown-menu-end">
                                <Link to="/profile" className="dropdown-item ai-icon">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="text-primary"
                                        width="18"
                                        height="18"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                        <circle cx="12" cy="7" r="4"></circle>
                                    </svg>
                                    <span className="ms-2">Profile </span>
                                </Link>
                                <a href="email-inbox.html" className="dropdown-item ai-icon">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="text-success"
                                        width="18"
                                        height="18"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                        <polyline points="22,6 12,13 2,6"></polyline>
                                    </svg>
                                    <span className="ms-2">Inbox </span>
                                </a>
                                <p className="dropdown-item ai-icon" onClick={handleLogout}>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="text-danger"
                                        width="18"
                                        height="18"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                                        <polyline points="16 17 21 12 16 7"></polyline>
                                        <line x1="21" y1="12" x2="9" y2="12"></line>
                                    </svg>
                                    <span className="ms-2">Logout </span>
                                </p>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    );
}

export default Header;
