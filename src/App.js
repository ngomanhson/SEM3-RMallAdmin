import { Route, Routes } from "react-router-dom";
import Dashboard from "./components/pages/dashboard";
import Login from "./components/pages/auth/login";
import ForgotPassword from "./components/pages/auth/forgot-password";

function App() {
    return (
        <div className="App">
            <Routes>
                {/* Start Dashboard */}
                <Route path="/" element={<Dashboard />} />
                {/* End Dashboard */}

                {/* Start Auth */}
                <Route path="/login" element={<Login />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />

                {/* End Auth */}
            </Routes>
        </div>
    );
}

export default App;
