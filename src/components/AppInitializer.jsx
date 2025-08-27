import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authHydrated, meThunk } from "@/features/auth/authSlice";

const STORAGE_KEY = "authState";

const AppInitializer = () => {
    const dispatch = useDispatch();
    const auth = useSelector((s) => s.auth);

    useEffect(() => {
        const raw = localStorage.getItem(STORAGE_KEY);
        const parsed = raw ? JSON.parse(raw) : {};
        dispatch(authHydrated(parsed));
        if (!parsed?.user) {
            dispatch(meThunk());
        }
    }, [dispatch]);

    useEffect(() => {
        const user = auth || {};
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
        } catch {}
    }, [auth]);

    // của mock api
    // useEffect(() => {
    //     const token = Cookies.get("authToken");
    //     const user = Cookies.get("authUser");
    //
    //     console.log("Found cookies:", { token: !!token, user: !!user });
    //
    //     const timer = setTimeout(() => {
    //         console.log("Timeout reached, forcing isAuthHydrated to true");
    //         dispatch(setAuthHydrated());
    //     }, 1000);
    //
    //     if (token && user) {
    //         try {
    //             const parsedUser = JSON.parse(user);
    //             console.log("Parsed user:", parsedUser);
    //             if (
    //                 parsedUser &&
    //                 typeof parsedUser === "object" &&
    //                 parsedUser.id
    //             ) {
    //                 console.log(
    //                     "Dispatching setCredentials for user:",
    //                     parsedUser.id,
    //                     "role:",
    //                     parsedUser.role,
    //                 );
    //                 dispatch(setCredentials({ token, user: parsedUser }));
    //             } else {
    //                 console.log(
    //                     "Invalid user data structure, hydrating without credentials",
    //                 );
    //                 dispatch(setAuthHydrated());
    //             }
    //         } catch (err) {
    //             console.log(
    //                 "Invalid cookie data error:",
    //                 err.message,
    //                 "Raw user:",
    //                 user,
    //             );
    //             dispatch(setAuthHydrated());
    //         }
    //     } else {
    //         dispatch(setAuthHydrated());
    //     }
    //
    //     return () => clearTimeout(timer);
    // }, [dispatch]);

    return null;
};

export default AppInitializer;
