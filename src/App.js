import { Route, Routes } from "react-router-dom";
import Dashboard from "./components/pages/dashboard";

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Dashboard />} />
            </Routes>
        </div>
    );
}

export default App;
