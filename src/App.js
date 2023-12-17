import { Route, Routes } from "react-router-dom";
import Dashboard from "./components/pages/dashboard";
import Login from "./components/pages/auth/login";
import ForgotPassword from "./components/pages/auth/forgot-password";
import NotFound from "./components/pages/other/not-found";
import CustomerList from "./components/pages/customer";
import OrderList from "./components/pages/order";
import CustomerEdit from "./components/pages/customer/edit";
import CustomerCreate from "./components/pages/customer/create";
import CustomerDeleteAt from "./components/pages/customer/delete-at";

function App() {
    return (
        <div className="App">
            <Routes>
                {/* Start Dashboard */}
                <Route path="/" element={<Dashboard />} />
                {/* End Dashboard */}

                {/* Start Order */}
                <Route path="/order-list" element={<OrderList />} />
                {/* End Order */}

                {/* Start Customer */}
                <Route path="/customer-list" element={<CustomerList />} />
                <Route path="/customer-create" element={<CustomerCreate />} />
                <Route path="/customer-edit" element={<CustomerEdit />} />
                <Route path="/customer-delete-at" element={<CustomerDeleteAt />} />
                {/* End Customer */}

                {/* Start Auth */}
                <Route path="/login" element={<Login />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                {/* End Auth */}

                {/* Start Other page */}
                <Route path="*" element={<NotFound />} />
                {/* End Other page */}
            </Routes>
        </div>
    );
}

export default App;
