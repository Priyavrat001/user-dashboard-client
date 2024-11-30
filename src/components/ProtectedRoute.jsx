import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { server } from "../config/server";

const ProtectedRoute = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // Track loading state
    const [error, setError] = useState(false); // Track errors

    useEffect(() => {
        const fetchUser = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${server}/api/v1/user/me`, {
                    withCredentials: true,
                });
                setUser(response?.data?.user);
            } catch (err) {
                setError(true); // Set error if the request fails
            } finally {
                setLoading(false); // Stop loading regardless of outcome
            }
        };

        fetchUser();
    }, []);

    if (loading) return <div>Loading...</div>; // Show a loading spinner or message

    if (error || !user) return <Navigate to="/login" />; // Redirect on error or if no user

    return children; // Render children if the user is authenticated
};

export default ProtectedRoute;
