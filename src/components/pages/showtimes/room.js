import { Helmet } from "react-helmet";
import Layout from "../../layouts";
import Loading from "../../layouts/loading";
import { useEffect, useState } from "react";
import api from "../../services/api";
import url from "../../services/url";
import { NavLink } from "react-router-dom";
import NotFound from "../../pages/other/not-found";

function Room() {
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, []);

    const [userRole, setUserRole] = useState(null);
    const [error, setError] = useState(null);
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        const fetchRooms = async () => {
            const userToken = localStorage.getItem("access_token");
            api.defaults.headers.common["Authorization"] = `Bearer ${userToken}`;
            try {
                const response = await api.get(url.ROOM.LIST);
                setRooms(response.data);
                // console.log(response.data);
            } catch (error) {}
        };
        fetchRooms();
    }, []);

    // kiểm tra role
    useEffect(() => {
        const fetchUserRole = async () => {
            const token = localStorage.getItem("access_token");
            try {
                const decodedToken = JSON.parse(atob(token.split(".")[1]));
                const userRole = decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
                setUserRole(userRole);

                if (userRole === "User" || userRole === "Shopping Center Manager Staff") {
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
                        <title>Room | R Admin</title>
                    </Helmet>
                    {loading ? <Loading /> : ""}
                    <Layout>
                        <div className="row">
                            <div className="col-xl-2"></div>
                            <div className="col-xl-8">
                                <div className="card h-auto">
                                    <div className="card-body text-center ai-icon text-primary p-5">
                                        <svg width="80" height="80" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                                            {" "}
                                            <path
                                                fill="var(--ci-primary-color, #000000)"
                                                d="M440,424V88H352V13.005L88,58.522V424H16v32h86.9L352,490.358V120h56V456h88V424ZM320,453.642,120,426.056V85.478L320,51Z"
                                                class="ci-primary"
                                            />{" "}
                                            <rect width="32" height="64" x="256" y="232" fill="var(--ci-primary-color, #000000)" class="ci-primary" />{" "}
                                        </svg>
                                        <h4 className="my-2">Select the room you want to see showtimes!</h4>
                                        {rooms.map((item, index) => (
                                            <NavLink to={`/show-times/${item.id}`}>
                                                <button className="btn my-2 btn-primary btn-lg px-4" style={{ marginLeft: "10px" }}>
                                                    <i className="fa fa-usd"></i> {item.name}
                                                </button>
                                            </NavLink>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-2"></div>
                        </div>
                    </Layout>
                </>
            )}
        </>
    );
}
export default Room;
