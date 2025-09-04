"use client";

import {useEffect, useRef, useState} from "react";
import { useSearchParams, useRouter } from "next/navigation";

const API_BASE = process.env.NEXT_PUBLIC_API_PROXY_TARGET + process.env.NEXT_PUBLIC_API_BASE_URL;

export default function ActivatePage() {
    const search = useSearchParams();
    const router = useRouter();
    const [status, setStatus] = useState("pending");
    const [message, setMessage] = useState("Verifying the activation link...");

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
                const res = await fetch(`${API_BASE}/auth/activate?token=${encodeURIComponent(token)}`, {
                    method: "GET",
                });

                if (!res.ok) {
                    try {
                        const prob = await res.json();
                        setMessage(prob?.detail || prob?.title || "Link is invalid or expired.");
                    } catch {
                        setMessage("Link is invalid or expired.");
                    }
                    setStatus("failed");
                    return;
                }

                const data = await res.json().catch(() => ({}));
                setMessage(data?.message || "Active account successfully. You can now login.");
                setStatus("success");
            } catch (err) {
                setStatus("failed");
                setMessage("Cant connect to server. Please try again later.");
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
                                Go to Home
                            </button>
                        </div>
                    </>
                )}

                {status === "failed" && (
                    <>
                        <h1 className="text-2xl font-semibold text-red-600 mb-3">Failed</h1>
                        <p className="text-gray-700 mb-6">{message}</p>
                        
                        <ResendForm />
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

    const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

    const onSubmit = async (e) => {
        e.preventDefault();
        setSending(true);
        setNote("");
        try {
            await fetch(`${API_BASE}/auth/activation/resend?email=${encodeURIComponent(email)}`, {
                method: "POST",
            });
            // BE nên luôn trả 200 để tránh lộ email tồn tại hay không
            setNote("If the email is valid and the account is not activated, a new activation link has been sent.");
        } catch {
            setNote("Failed to send the request. Please try again.");
        } finally {
            setSending(false);
        }
    };

    return (
        <form onSubmit={onSubmit} className="space-y-3">
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
