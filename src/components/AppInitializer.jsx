import { useEffect } from "react";
import { setAuthHydrated, setCredentials } from "@/features/auth/authSlice";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";

const AppInitializer = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const token = Cookies.get("authToken");
        const user = Cookies.get("authUser");

        if (token && user) {
            try {
                const parsedUser = JSON.parse(user);
                if (
                    parsedUser &&
                    typeof parsedUser === "object" &&
                    parsedUser.id
                ) {
                    console.log(
                        "Restoring auth state for user:",
                        parsedUser.id,
                    );
                    dispatch(setCredentials({ token, user: parsedUser }));
                } else {
                    console.log("Invalid user data structure");
                }
            } catch (err) {
                console.log("Invalid cookie data:");
                dispatch(setAuthHydrated());
            }
        } else {
            dispatch(setAuthHydrated());
        }
    }, []);

    return null;
};

export default AppInitializer;
