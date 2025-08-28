"use client";

import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authHydrated, meThunk } from "@/features/auth/authSlice";

const STORAGE_KEY = "authState";

const safeParse = (raw) => {
    try {
        return JSON.parse(raw);
    } catch {
        return null;
    }
};

const AppInitializer = () => {
    const dispatch = useDispatch();
    const { hydrated, user } = useSelector((s) => s.auth);
    const didInit = useRef(false);

    useEffect(() => {
        if (didInit.current) return;
        didInit.current = true;

        const parsed = safeParse(localStorage.getItem(STORAGE_KEY));

        dispatch(authHydrated({ user: parsed?.user ?? null }));

        dispatch(meThunk());
    }, [dispatch]);

    useEffect(() => {
        if (!hydrated) return;
        try {
            if (user) {
                localStorage.setItem(STORAGE_KEY, JSON.stringify({ user }));
            } else {
                localStorage.removeItem(STORAGE_KEY);
            }
        } catch {}
    }, [hydrated, user]);

    return null;
};

export default AppInitializer;
