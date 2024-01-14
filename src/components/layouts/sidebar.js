import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { removeAccessToken } from "../../utils/auth";
import api from "../services/api";
import url from "../services/url";

function Sidebar() {
    const navigate = useNavigate();
    const location = useLocation();
    const isActive = (path) => {
        // Kiểm tra xem đường dẫn hiện tại có trùng với path hay không
        return location.pathname === path;
    };

    const [menu, setMenu] = useState([]);
    useEffect(() => {
        const fetchMenu = async () => {
            const adminToken = localStorage.getItem("access_token");
            try {
                const response = await api.get(url.MENU.LIST, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${adminToken}`,
                    },
                });
                // const data = response.data;
                setMenu(response.data);
            } catch (error) {
                console.error("Error fetching menu:", error);
            }
        };
        fetchMenu();
    }, []);

    const handleLogout = () => {
        removeAccessToken();
        navigate("/login");
    };

    return (
        <div className="dlabnav">
            <div className="dlabnav-scroll">
                <ul className="metismenu" id="menu">
                    {menu.map((menuItem, index) => (
                        <li className={isActive(menuItem.url) ? "mm-active" : ""}>
                            <Link className="has-arrow" to={menuItem.url} aria-expanded="false">
                                <div className="menu-icon">
                                    <span
                                        dangerouslySetInnerHTML={{
                                            __html: menuItem.icon,
                                        }}
                                    ></span>
                                </div>
                                <span className="nav-text">{menuItem.title}</span>
                            </Link>
                        </li>
                    ))}
                    <li>
                        <Link to="/login" onClick={handleLogout} className="has-arrow" aria-expanded="false">
                            <div className="menu-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" height="21" width="21" viewBox="0 0 512 512" transform="rotate(180)">
                                    <path
                                        fill="#c8c8c8"
                                        d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"
                                    />
                                </svg>
                            </div>

                            <span className="nav-text">Logout</span>
                        </Link>
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
