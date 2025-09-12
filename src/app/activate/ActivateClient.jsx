"use client";

import {useEffect, useRef, useState} from "react";
import {useSearchParams, useRouter} from "next/navigation";

// Build API base once, avoid "undefinedundefined" and trailing slashes
const API_BASE = (() => {
    const proxy = process.env.NEXT_PUBLIC_API_PROXY_TARGET || "";
    const base = process.env.NEXT_PUBLIC_API_BASE_URL || "";
    return (proxy + base).replace(/\/+$/, "");
})();

function parseJsonSafe(res) {
    return res
        .json()
        .catch(() => ({}));
}

export default function ActivateClient() {
    const search = useSearchParams();
    const router = useRouter();

    const [status, setStatus] = useState("pending"); // pending | success | failed
    const [message, setMessage] = useState("Verifying your activation link...");
    const calledRef = useRef(false);

    useEffect(() => {
        if (calledRef.current) return;
        calledRef.current = true;

        const token = search.get("token");
        if (!token) {
            setStatus("failed");
            setMessage("Invalid token. Please check the link again.");
            return;
        }

        const activate = async () => {
            try {
                // 1) Try GET (compatible with your current backend)
                let res = await fetch(
                    `${API_BASE}/auth/activate?token=${encodeURIComponent(token)}`,
                    {method: "GET", credentials: "include"}
                );

                // 2) If BE later switches to POST, fallback gracefully
                if (!res.ok && (res.status === 404 || res.status === 405)) {
                    res = await fetch(`${API_BASE}/auth/activate`, {
                        method: "POST",
                        headers: {"Content-Type": "application/json"},
                        credentials: "include",
                        body: JSON.stringify({token}),
                    });
                }

                const data = await parseJsonSafe(res);

                if (res.ok) {
                    setStatus("success");
                    setMessage(data?.message || "Account activated successfully. You can now log in.");
                    return;
                }

                // common error mappings
                if (res.status === 409) {
                    setStatus("success");
                    setMessage(data?.message || "Your account is already activated. You can log in now.");
                    return;
                }
                if (res.status === 410 || res.status === 422) {
                    setStatus("failed");
                    setMessage(
                        data?.message || "Activation link is expired or invalid. Please request a new one."
                    );
                    return;
                }

                setStatus("failed");
                setMessage(data?.detail || data?.title || data?.message || "Activation link is invalid or expired.");
            } catch {
                setStatus("failed");
                setMessage("Cannot connect to the server. Please try again later.");
            }
        };

        activate();
    }, [search]);

    const goLogin = () => router.push("/login");
    const goHome = () => router.push("/");

    return (
        <div className="min-h-[60vh] flex items-center justify-center px-4">
            <div className="max-w-md w-full rounded-2xl shadow p-6 text-center">
                {status === "pending" && (
                    <>
                        <h1 className="text-xl font-semibold mb-3">Activate Your Account</h1>
                        <p className="text-gray-600">{message}</p>
                        <div className="mt-4 h-2 w-full animate-pulse rounded bg-gray-200"/>
                    </>
                )}

                {status === "success" && (
                    <>
                        <h1 className="text-2xl font-semibold text-green-600 mb-3">Success</h1>
                        <p className="text-gray-700 mb-6">{message}</p>
                        <div className="flex gap-3 justify-center">
                            <button onClick={goLogin} className="px-4 py-2 rounded-xl border">
                                Log In
                            </button>
                            <button onClick={goHome} className="px-4 py-2 rounded-xl border">
                                Go Home
                            </button>
                        </div>
                    </>
                )}

                {status === "failed" && (
                    <>
                        <h1 className="text-2xl font-semibold text-red-600 mb-3">Failed</h1>
                        <p className="text-gray-700 mb-6">{message}</p>
                        <ResendForm/>
                    </>
                )}
            </div>
        </div>
    );
}

function ResendForm() {
    const [email, setEmail] = useState("");
    const [sending, setSending] = useState(false);
    const [note, setNote] = useState("");

    const onSubmit = async (e) => {
        e.preventDefault();
        setSending(true);
        setNote("");

        try {
            // Keep your current contract (POST with query param).
            // If later you switch BE to JSON body, just change to body: JSON.stringify({ email })
            await fetch(
                `${API_BASE}/auth/activation/resend?email=${encodeURIComponent(email)}`,
                {method: "POST", credentials: "include"}
            );

            // To avoid user enumeration, BE should always return 200.
            setNote(
                "If the email is valid and the account is not activated, a new activation link has been sent."
            );
        } catch {
            setNote("Failed to send the request. Please try again.");
        } finally {
            setSending(false);
        }
    };

    return (
        <form onSubmit={onSubmit} className="space-y-3 text-left">
            <input
                type="email"
                placeholder="Enter your email to receive the activation link again"
                className="w-full border rounded-xl px-3 py-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <button
                type="submit"
                className="w-full px-4 py-2 rounded-xl border"
                disabled={sending}
            >
                {sending ? "Sending..." : "Resend Activation Link"}
            </button>
            {note && <p className="text-sm text-gray-600">{note}</p>}
        </form>
    );
}
