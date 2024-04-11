import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";

import { Alert } from "../components/alert/Alert";

export default function ProtectedRoute() {
    const token = Cookies.get("token");

    const [isAuthorized, setIsAuthorized] = useState(true);

    const location = useLocation();

    useEffect(() => {
        if (!token) {
            setIsAuthorized(false);
        } else {
            try {
                const decodedToken = jwt_decode(token);
                if (!(decodedToken.role==="admin")) {
                    setIsAuthorized(false);
                }
            } catch (error) {
                console.error("Error decoding token:", error);
                setIsAuthorized(false);
            }
        }
    }, [token]);

    return isAuthorized ? (
        <Outlet />
    ) : (
        <>
            {Alert(1500, 'Thông báo', 'Bạn không có quyền vào tài nguyên này!','warning', 'OK')}
            <Navigate to="/" replace state={{ from: location }} />
        </>
    );
}
