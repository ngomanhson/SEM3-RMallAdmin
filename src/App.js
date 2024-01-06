import { Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./components/pages/dashboard";
import Login from "./components/pages/auth/login";
import ForgotPassword from "./components/pages/auth/forgot-password";
import NotFound from "./components/pages/other/not-found";
import CustomerList from "./components/pages/customer";
import CustomerEdit from "./components/pages/customer/edit";
import CustomerCreate from "./components/pages/customer/create";
import CustomerDeleteAt from "./components/pages/customer/delete-at";
import MovieList from "./components/pages/movie";
import MovieCreate from "./components/pages/movie/create";
import MovieEdit from "./components/pages/movie/edit";
import MovieDeleteAt from "./components/pages/movie/delete-at";
import BoothList from "./components/pages/booth/index";
import BoothCreate from "./components/pages/booth/create";
import BoothEdit from "./components/pages/booth/edit";
import BoothDeleteAt from "./components/pages/booth/delete-at";
import FoodCounterList from "./components/pages/food-counter";
import FoodCounterCreate from "./components/pages/food-counter/create";
import FoodCounterEdit from "./components/pages/food-counter/edit";
import FoodCounterDeleteAt from "./components/pages/food-counter/delete-at";
import BookingList from "./components/pages/booking";
import Profile from "./components/pages/auth/profile";
import { useJwt } from "react-jwt";
import { getAccessToken, removeAccessToken } from "./utils/auth";
import ShowTimes from "./components/pages/showtimes";
import PromotionList from "./components/pages/Promotion";
import PromotionCreate from "./components/pages/Promotion/create";
import PromotionEdit from "./components/pages/Promotion/edit";
import Room from "./components/pages/showtimes/room";
import PromotionDeleteAt from "./components/pages/Promotion/delete-at";
import FoodList from "./components/pages/food";
import FoodCreate from "./components/pages/food/create";
import FoodEdit from "./components/pages/food/edit";
import FoodDeleteAt from "./components/pages/food/delete-at";

function App() {
    const ProtectedRoute = ({ element }) => {
        const token = getAccessToken();
        const { isExpired, isInvalid } = useJwt(token);

        if (!token || isExpired || isInvalid) {
            removeAccessToken();
            return <Navigate to="/login" />;
        }

        return element;
    };

    const ProtectedLoginRoute = ({ element }) => {
        const token = getAccessToken();
        const { isExpired, isInvalid } = useJwt(token);

        if (token && !isExpired && !isInvalid) {
            return <Navigate to="/" />;
        }

        return element;
    };

    return (
        <div className="App">
            <Routes>
                {/* Start Dashboard */}
                <Route path="/" element={<ProtectedRoute element={<Dashboard />} />} />
                {/* End Dashboard */}

                {/* Start Booth */}
                <Route path="/booth-list" element={<ProtectedRoute element={<BoothList />} />} />
                <Route path="/booth-create" element={<ProtectedRoute element={<BoothCreate />} />} />
                <Route path="/booth-edit" element={<ProtectedRoute element={<BoothEdit />} />} />
                <Route path="/booth-delete-at" element={<ProtectedRoute element={<BoothDeleteAt />} />} />
                {/* End Booth */}

                {/* Start Food Counter */}
                <Route path="/food-counter-list" element={<ProtectedRoute element={<FoodCounterList />} />} />
                <Route path="/food-counter-create" element={<ProtectedRoute element={<FoodCounterCreate />} />} />
                <Route path="/food-counter-edit" element={<ProtectedRoute element={<FoodCounterEdit />} />} />
                <Route path="/food-counter-delete-at" element={<ProtectedRoute element={<FoodCounterDeleteAt />} />} />
                {/* End Food Counter */}

                {/* Start Movie */}
                <Route path="/movie-list" element={<ProtectedRoute element={<MovieList />} />} />
                <Route path="/movie-create" element={<ProtectedRoute element={<MovieCreate />} />} />
                <Route path="/movie-edit/:id" element={<ProtectedRoute element={<MovieEdit />} />} />
                <Route path="/movie-delete-at" element={<ProtectedRoute element={<MovieDeleteAt />} />} />
                {/* End Movie */}

                {/* Start Room and Show Time */}
                <Route path="/room" element={<ProtectedRoute element={<Room />} />} />
                <Route path="/show-times/:id" element={<ProtectedRoute element={<ShowTimes />} />} />
                {/* End Room and Show Time */}

                {/* Start Food */}
                <Route path="/food-list" element={<ProtectedRoute element={<FoodList />} />} />
                <Route path="/food-create" element={<ProtectedRoute element={<FoodCreate />} />} />
                <Route path="/food-edit/:id" element={<ProtectedRoute element={<FoodEdit />} />} />
                <Route path="/food-delete-at" element={<ProtectedRoute element={<FoodDeleteAt />} />} />
                {/* End Food */}

                {/* Start Booking */}
                <Route path="/booking-list" element={<ProtectedRoute element={<BookingList />} />} />
                {/* End Booking */}

                {/* Start Promotion */}
                <Route path="/promotion-list" element={<ProtectedRoute element={<PromotionList />} />} />
                <Route path="/promotion-create" element={<ProtectedRoute element={<PromotionCreate />} />} />
                <Route path="/promotion-edit/:id" element={<ProtectedRoute element={<PromotionEdit />} />} />
                <Route path="/promotion-delete-at" element={<ProtectedRoute element={<PromotionDeleteAt />} />} />
                {/* End Promotion */}

                {/* Start Customer */}
                <Route path="/customer-list" element={<ProtectedRoute element={<CustomerList />} />} />
                <Route path="/customer-create" element={<ProtectedRoute element={<CustomerCreate />} />} />
                <Route path="/customer-edit" element={<ProtectedRoute element={<CustomerEdit />} />} />
                <Route path="/customer-delete-at" element={<ProtectedRoute element={<CustomerDeleteAt />} />} />
                {/* End Customer */}

                {/* Start Auth */}
                <Route path="/login" element={<ProtectedLoginRoute element={<Login />} />} />
                <Route path="/forgot-password" element={<ProtectedLoginRoute element={<ForgotPassword />} />} />
                <Route path="/profile" element={<ProtectedRoute element={<Profile />} />} />

                {/* End Auth */}

                {/* Start Other page */}
                <Route path="*" element={<NotFound />} />
                {/* End Other page */}
            </Routes>
        </div>
    );
}

export default App;
