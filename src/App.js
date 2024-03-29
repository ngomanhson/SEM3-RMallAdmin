import { Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./components/pages/dashboard";
import Login from "./components/pages/auth/login";
import ForgotPassword from "./components/pages/auth/forgot-password";
import NotFound from "./components/pages/other/not-found";
import CustomerList from "./components/pages/customer";
import MovieList from "./components/pages/movie";
import MovieCreate from "./components/pages/movie/create";
import MovieEdit from "./components/pages/movie/edit";
import MovieDeleteAt from "./components/pages/movie/delete-at";
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
import GenreList from "./components/pages/genre";
import GenreCreate from "./components/pages/genre/create";
import GenreEdit from "./components/pages/genre/edit";
import GenreDeleteAt from "./components/pages/genre/delete-at";
import ShopList from "./components/pages/booth/index";
import ShopDeleteAt from "./components/pages/booth/delete-at";
import ShopEdit from "./components/pages/booth/edit";
import ListProductOfShop from "./components/pages/booth/product";
import ProductDeleteAt from "./components/pages/booth/product/delete-at";
import ProductCreate from "./components/pages/booth/product/create";
import ListProduct from "./components/pages/booth/product/all-product";
import ProductEdit from "./components/pages/booth/product/edit";
import MallDashboard from "./components/pages/dashboard/staffmall";
import CinemaDashboard from "./components/pages/dashboard/staffcinema";
import ResetPassword from "./components/pages/auth/reset-password";
import ShopCreate from "./components/pages/booth/create";
import BookingDetail from "./components/pages/booking/detail";
import ShowList from "./components/pages/showtimes/show-list";
import GalleryList from "./components/pages/gallery";
import GalleryCreate from "./components/pages/gallery/create";
import GalleryEdit from "./components/pages/gallery/edit";
import GalleryDeleteAt from "./components/pages/gallery/delete-at";
import MovieDetail from "./components/pages/movie/detail";
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
                <Route path="/shopping-center-manager-staff-dashboard" element={<ProtectedRoute element={<MallDashboard />} />} />
                <Route path="/movie-theater-manager-staff-dashboard" element={<ProtectedRoute element={<CinemaDashboard />} />} />
                {/* End Dashboard */}

                {/* Start Shop And Product*/}
                <Route path="/shop-list" element={<ProtectedRoute element={<ShopList />} />} />
                <Route path="/shop-create" element={<ProtectedRoute element={<ShopCreate />} />} />
                <Route path="/shop-edit/:slug" element={<ProtectedRoute element={<ShopEdit />} />} />
                <Route path="/shop-delete-at" element={<ProtectedRoute element={<ShopDeleteAt />} />} />
                <Route path="/product-list" element={<ProtectedRoute element={<ListProduct />} />} />
                <Route path="/product-list/:slug" element={<ProtectedRoute element={<ListProductOfShop />} />} />
                <Route path="/product-edit/:id" element={<ProtectedRoute element={<ProductEdit />} />} />
                <Route path="/product-create" element={<ProtectedRoute element={<ProductCreate />} />} />
                <Route path="/product-delete-at" element={<ProtectedRoute element={<ProductDeleteAt />} />} />
                {/* End Shop And Product*/}

                {/* Start Gallery */}
                <Route path="/gallery-list" element={<ProtectedRoute element={<GalleryList />} />} />
                <Route path="/gallery-create" element={<ProtectedRoute element={<GalleryCreate />} />} />
                <Route path="/gallery-edit/:id" element={<ProtectedRoute element={<GalleryEdit />} />} />
                <Route path="/gallery-delete-at" element={<ProtectedRoute element={<GalleryDeleteAt />} />} />
                {/* End Genre */}

                {/* Start Movie */}
                <Route path="/movie-list" element={<ProtectedRoute element={<MovieList />} />} />
                <Route path="/movie-detail/:id" element={<ProtectedRoute element={<MovieDetail />} />} />
                <Route path="/movie-create" element={<ProtectedRoute element={<MovieCreate />} />} />
                <Route path="/movie-edit/:id" element={<ProtectedRoute element={<MovieEdit />} />} />
                <Route path="/movie-delete-at" element={<ProtectedRoute element={<MovieDeleteAt />} />} />
                {/* End Movie */}

                {/* Start Show */}
                <Route path="/show-list" element={<ProtectedRoute element={<ShowList />} />} />
                {/* End Show */}

                {/* Start Room and Show Time */}
                <Route path="/room" element={<ProtectedRoute element={<Room />} />} />
                <Route path="/show-times/:id" element={<ProtectedRoute element={<ShowTimes />} />} />
                {/* End Room and Show Time */}

                {/* Start Genre */}
                <Route path="/genre-list" element={<ProtectedRoute element={<GenreList />} />} />
                <Route path="/genre-create" element={<ProtectedRoute element={<GenreCreate />} />} />
                <Route path="/genre-edit/:id" element={<ProtectedRoute element={<GenreEdit />} />} />
                <Route path="/genre-delete-at" element={<ProtectedRoute element={<GenreDeleteAt />} />} />
                {/* End Genre */}

                {/* Start Food */}
                <Route path="/food-list" element={<ProtectedRoute element={<FoodList />} />} />
                <Route path="/food-create" element={<ProtectedRoute element={<FoodCreate />} />} />
                <Route path="/food-edit/:id" element={<ProtectedRoute element={<FoodEdit />} />} />
                <Route path="/food-delete-at" element={<ProtectedRoute element={<FoodDeleteAt />} />} />
                {/* End Food */}

                {/* Start Booking */}
                <Route path="/booking-list" element={<ProtectedRoute element={<BookingList />} />} />
                <Route path="/booking-detail/:bookingCode" element={<ProtectedRoute element={<BookingDetail />} />} />
                {/* End Booking */}

                {/* Start Promotion */}
                <Route path="/promotion-list" element={<ProtectedRoute element={<PromotionList />} />} />
                <Route path="/promotion-create" element={<ProtectedRoute element={<PromotionCreate />} />} />
                <Route path="/promotion-edit/:id" element={<ProtectedRoute element={<PromotionEdit />} />} />
                <Route path="/promotion-delete-at" element={<ProtectedRoute element={<PromotionDeleteAt />} />} />
                {/* End Promotion */}

                {/* Start Customer */}
                <Route path="/customer-list" element={<ProtectedRoute element={<CustomerList />} />} />
                {/* End Customer */}

                {/* Start Auth */}
                <Route path="/login" element={<ProtectedLoginRoute element={<Login />} />} />
                <Route path="/forgot-password" element={<ProtectedLoginRoute element={<ForgotPassword />} />} />
                <Route path="/reset-password/:resetToken" element={<ProtectedLoginRoute element={<ResetPassword />} />} />
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
