import { Routes, Route } from "react-router";
import App from "../App";
import Login from "../pages/Login/Login";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            {/* <Route path="/karam-bhomi" element={<App />} /> */}
        </Routes>
    )
}   

export default AppRoutes;