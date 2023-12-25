import { Route, Routes } from "react-router-dom";
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

function App() {
    return (
        <div className="App">
            <Routes>
                {/* Start Dashboard */}
                <Route path="/" element={<Dashboard />} />
                {/* End Dashboard */}

                {/* Start Booth */}
                <Route path="/booth-list" element={<BoothList />} />
                <Route path="/booth-create" element={<BoothCreate />} />
                <Route path="/booth-edit" element={<BoothEdit />} />
                <Route path="/booth-delete-at" element={<BoothDeleteAt />} />
                {/* End Booth */}

                {/* Start Food Counter */}
                <Route path="/food-counter-list" element={<FoodCounterList />} />
                <Route path="/food-counter-create" element={<FoodCounterCreate />} />
                <Route path="/food-counter-edit" element={<FoodCounterEdit />} />
                <Route path="/food-counter-delete-at" element={<FoodCounterDeleteAt />} />
                {/* End Food Counter */}

                {/* Start Movie */}
                <Route path="/movie-list" element={<MovieList />} />
                <Route path="/movie-create" element={<MovieCreate />} />
                <Route path="/movie-edit/:id" element={<MovieEdit />} />
                <Route path="/movie-delete-at" element={<MovieDeleteAt />} />
                {/* End Movie */}

                {/* Start Booking */}
                <Route path="/booking-list" element={<BookingList />} />
                {/* End Booking */}

                {/* Start Customer */}
                <Route path="/customer-list" element={<CustomerList />} />
                <Route path="/customer-create" element={<CustomerCreate />} />
                <Route path="/customer-edit" element={<CustomerEdit />} />
                <Route path="/customer-delete-at" element={<CustomerDeleteAt />} />
                {/* End Customer */}

                {/* Start Auth */}
                <Route path="/login" element={<Login />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/profile" element={<Profile />} />

                {/* End Auth */}

                {/* Start Other page */}
                <Route path="*" element={<NotFound />} />
                {/* End Other page */}
            </Routes>
        </div>
    );
}

export default App;
