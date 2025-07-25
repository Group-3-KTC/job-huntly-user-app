import { useEffect } from "react";
import { setAuthHydrated, setCredentials } from "@/features/auth/authSlice";
import { useDispatch } from "react-redux";

const AppInitializer = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        const user = JSON.parse(localStorage.getItem("authUser"));

        if (token && user) {
            dispatch(setCredentials({ token, user }));
        } else {
            dispatch(setAuthHydrated());
        }
    }, []);

    return null;
};

export default AppInitializer;
