import { Helmet } from "react-helmet";
import Layout from "../../layouts";
import Breadcrumb from "../../layouts/breadcrumb";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import url from "../../services/url";
import api from "../../services/api";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { format } from "date-fns";
import Loading from "../../layouts/loading";
import NotFound from "../../pages/other/not-found";

function MovieDetail() {
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, []);

    const [userRole, setUserRole] = useState(null);
    const [error, setError] = useState(null);
    const { id } = useParams();

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
                        <title>Movie Detail | R Mall</title>
                    </Helmet>
                    {loading ? <Loading /> : ""}
                    <Layout>
                        <Breadcrumb title="Movie Detail" /> <h1>Movie Detail</h1>
                    </Layout>
                </>
            )}
        </>
    );
}
export default MovieDetail;
