"use client";

import {useEffect, useRef} from "react";
import {useRouter} from "next/navigation";
import {toast} from "react-toastify";
import {useDispatch} from "react-redux";
import {meThunk} from "@/features/auth/authSlice";

export default function GoogleSignIn({role = "CANDIDATE"}) {
    const btnRef = useRef(null);
    const router = useRouter();
    const dispatch = useDispatch();

    useEffect(() => {
        if (!window.google) return;
        if (btnRef.current && btnRef.current.childElementCount > 0) return;

        const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
        if (!clientId) {
            console.error("Missing NEXT_PUBLIC_GOOGLE_CLIENT_ID");
            return;
        }

        // 1) Init GIS
        window.google.accounts.id.initialize({
            client_id: clientId,
            // Callback nhận ID Token
            callback: async ({credential}) => {
                try {
                    const res = await fetch(
                        // "http://localhost:8080/api/v1/auth/google", 
                        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/google`,
                        {
                            method: "POST",
                            headers: {"Content-Type": "application/json"},
                            credentials: "include",
                            body: JSON.stringify({idToken: credential}),
                        },
                    );

                    const data = await res.json();
                    if (!res.ok) throw data;

                    await dispatch(meThunk()).unwrap();

                    toast.success(
                        data?.message || "Google sign-in successful!",
                    );
                    router.replace("/");
                } catch (err) {
                    const msg =
                        err?.detail ||
                        err?.title ||
                        err?.message ||
                        err?.data?.message ||
                        "Google sign-in failed";
                    toast.error(msg);
                }
            },
            // Tùy chọn UX
            ux_mode: "popup",
            auto_select: false,
            use_fedcm_for_prompt: true,
        });

        // 2) Render nút "Sign in with Google"
        window.google.accounts.id.renderButton(btnRef.current, {
            type: "standard",
            theme: "outline",
            size: "large",
            text: "sign_in_with",
            shape: "pill",
            logo_alignment: "left",
            width: 360,
        });

        // 3) (Optional) One Tap prompt
        window.google.accounts.id.prompt();
    }, [role]);

    return <div ref={btnRef} className="w-full flex justify-center"/>;
}
