import { Routes, Route } from "react-router";
import App from "../App";
import Login from "../pages/Login/Login";
import ProtectedRoute from "../components/ProtectedRoute";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route element={<ProtectedRoute />}>
                <Route path="/karam-bhomi" element={<App />} />
            </Route>
        </Routes>
    )
}   

export default AppRoutes;