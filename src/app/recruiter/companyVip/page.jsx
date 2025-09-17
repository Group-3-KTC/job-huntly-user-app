"use client";

import { useEffect, useMemo, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { getMyCompany } from "@/services/companyService";
import { Check, ArrowRight, Briefcase, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "react-toastify";
import { cn } from "@/lib/utils";

    const NEXT_PUBLIC_API_BASE = `${process.env.NEXT_PUBLIC_API_PROXY_TARGET}${process.env.NEXT_PUBLIC_API_BASE_URL}/`;
    const API_BASE_URL = (NEXT_PUBLIC_API_BASE || "").replace(/\/+$/, "");
const VND = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
});

function extractRedirectUrl(data) {
    if (!data || typeof data !== "object") return null;
    return (
        data.payUrl ||
        data.paymentUrl ||
        data.redirectUrl ||
        data.checkoutUrl ||
        data.url ||
        null
    );
}

const UI_PLANS = [
    {
        key: "BASIC",
        targetPackageId: 1,
        displayName: "VIP 1 month",
        features: [
            "Tag VIP Company",
            "Your company will be recommended by JobHuntly",
            "Your job will be suggested at the top",
            "24/7 Support",
        ],
    },
    {
        key: "STANDARD",
        targetPackageId: 2,
        displayName: "VIP 3 months",
        popular: true,
        features: [
            "Tag VIP Company",
            "Your company will be recommended by JobHuntly",
            "Your job will be suggested at the top",
            "24/7 Support",
        ],
    },
    {
        key: "PREMIUM",
        targetPackageId: 3,
        displayName: "VIP 6 months",
        features: [
            "Tag VIP Company",
            "Your company will be recommended by JobHuntly",
            "Your job will be suggested at the top",
            "24/7 Support",
        ],
    },
];

export default function CompanyVip() {
    const user = useSelector((s) => s.auth?.user);
    const userCompanyId =
        user?.companyId || user?.company?.id || user?.company_id || null;

    const [resolvedCompanyId, setResolvedCompanyId] = useState(
        userCompanyId || null
    );
    const [resolvingCompany, setResolvingCompany] = useState(false);

    const [packages, setPackages] = useState(null);
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState(null);

    const [open, setOpen] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [paying, setPaying] = useState(false);

    useEffect(() => {
        if (typeof window === "undefined") return;
        const url = new URL(window.location.href);
        const payStatus = url.searchParams.get("pay_status"); // "success" | "fail"
        const payCode = url.searchParams.get("pay_code");
        const txnRef = url.searchParams.get("txnRef");

        if (payStatus) {
            if (payStatus === "success") {
                const msg =
                    payCode === "ALREADY_PAID"
                        ? "Gói VIP đã được thanh toán trước đó."
                        : "Payment successful. VIP package activated!";
                toast.success(
                    `${msg}${txnRef ? " (Code: " + txnRef + ")" : ""}`
                );
            } else {
                toast.error(
                    `Payment failed: ${payCode || "UNKNOWN"}${
                        txnRef ? " (Code: " + txnRef + ")" : ""
                    }`
                );
            }

            // Xóa query để tránh toast lại khi refresh
            url.searchParams.delete("pay_status");
            url.searchParams.delete("pay_code");
            url.searchParams.delete("txnRef");
            const clean =
                url.pathname + (url.search ? "?" + url.search : "") + url.hash;
            window.history.replaceState({}, "", clean);
        }
    }, []);

    useEffect(() => {
        let mounted = true;
        const ensureCompanyId = async () => {
            if (userCompanyId) {
                setResolvedCompanyId(userCompanyId);
                return;
            }
            try {
                setResolvingCompany(true);
                const res = await getMyCompany();
                const cid =
                    res?.company_id ||
                    res?.id ||
                    res?.companyId ||
                    res?.company?.id;
                if (mounted) setResolvedCompanyId(cid ?? null);
            } catch {
                if (mounted) setResolvedCompanyId(null);
            } finally {
                if (mounted) setResolvingCompany(false);
            }
        };
        ensureCompanyId();
        return () => {
            mounted = false;
        };
    }, [userCompanyId]);

    useEffect(() => {
        let mounted = true;
        (async () => {
            try {
                setLoading(true);
                setErr(null);
                const res = await fetch(`${API_BASE_URL}/packages`, {
                    credentials: "include",
                    headers: { Accept: "application/json" },
                });
                if (!res.ok)
                    throw new Error(`Failed to load packages (${res.status})`);
                const data = await res.json();
                if (mounted) setPackages(data);
            } catch (e) {
                if (mounted) setErr(e?.message || "Failed to load packages");
            } finally {
                if (mounted) setLoading(false);
            }
        })();
        return () => {
            mounted = false;
        };
    }, []);

    const packageMap = useMemo(() => {
        const m = new Map();
        (packages || []).forEach((p) => m.set(p.packageId, p));
        return m;
    }, [packages]);

    const displayPlans = useMemo(() => {
        return UI_PLANS.map((ui) => {
            const dto = packageMap.get(ui.targetPackageId);
            return {
                ...ui,
                package: dto || null,
                priceLabel: dto ? VND.format(dto.priceVnd) : "—",
                description: dto
                    ? `${ui.displayName} (${dto.durationDays} days)`
                    : ui.displayName,
            };
        });
    }, [packageMap]);

    const handleChoosePlan = useCallback((plan) => {
        setSelectedPlan(plan);
        setOpen(true);
    }, []);

    const handlePay = useCallback(async () => {
        if (!selectedPlan) return;
        const pkg = packageMap.get(selectedPlan.targetPackageId);
        if (!pkg) {
            setErr("Package not found.");
            return;
        }
        if (!resolvedCompanyId) {
            setErr("Company not found.");
            return;
        }

        try {
            setPaying(true);
            // gửi body kiểu form-urlencoded
            const params = new URLSearchParams({
                companyId: String(resolvedCompanyId),
                packageId: String(pkg.packageId),
                amountVnd: String(pkg.priceVnd),
                bankCode: "NCB", // mặc định
                locale: "vn",
            });

            const res = await fetch(
                `${API_BASE_URL}/payments/vnpay/checkout`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                    body: params.toString(),
                    credentials: "include",
                }
            );

            if (!res.ok) throw new Error(`Checkout failed (${res.status})`);

            const data = await res.json();
            const redirectUrl = extractRedirectUrl(data);
            if (!redirectUrl) throw new Error("No redirect URL");

            window.location.href = redirectUrl;
        } catch (e) {
            setErr(e?.message || "Checkout failed");
        } finally {
            setPaying(false);
        }
    }, [selectedPlan, packageMap, resolvedCompanyId]);

    const canCheckout = !!resolvedCompanyId;

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
            <div className="container px-4 py-16 mx-auto">
                {/* Header */}
                <div className="grid items-center gap-12 mb-16 lg:grid-cols-2">
                    <div className="space-y-6">
                        <div className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-700 bg-blue-100 rounded-full">
                            <Briefcase className="w-4 h-4" />
                            Job Huntly Platform
                        </div>
                        <h1 className="text-4xl font-bold leading-tight text-gray-900 lg:text-5xl">
                            Buy Premium Subscription to{" "}
                            <span className="text-blue-600">Post a Job</span>
                        </h1>
                        <p className="text-lg leading-relaxed text-gray-600">
                            Unlock premium job posting with extended visibility
                            & priority support.
                        </p>
                    </div>
                </div>

                {/* Error */}
                {(err || resolvingCompany) && (
                    <div className="max-w-4xl mx-auto mb-6 text-sm">
                        {resolvingCompany ? (
                            <div className="inline-flex items-center gap-2 text-gray-600">
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Resolving your company...
                            </div>
                        ) : (
                            <span className="text-red-600">{err}</span>
                        )}
                    </div>
                )}

                {/* Plans */}
                <div className="grid gap-8 mx-auto md:grid-cols-3 max-w-7xl">
                    {displayPlans.map((plan) => (
                        <Card
                            key={plan.key}
                            className={cn(
                                "transition-all hover:shadow-2xl hover:-translate-y-2",
                                plan.popular
                                    ? "border-2 border-blue-500 shadow-xl scale-105"
                                    : "border border-gray-200 hover:border-blue-300"
                            )}
                        >
                            <CardHeader className="pb-8 text-center">
                                <CardTitle>{plan.displayName}</CardTitle>
                                <CardDescription>
                                    {plan.description}
                                </CardDescription>
                                <div className="space-y-2">
                                    <span className="text-2xl font-bold">
                                        {plan.priceLabel}
                                    </span>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                {plan.features.map((f, i) => (
                                    <div
                                        key={i}
                                        className="flex items-center gap-2"
                                    >
                                        <Check className="w-5 h-5 text-green-500" />
                                        <span className="text-sm">{f}</span>
                                    </div>
                                ))}
                            </CardContent>
                            <CardFooter>
                                <Button
                                    onClick={() => handleChoosePlan(plan)}
                                    disabled={!plan.package || !canCheckout}
                                >
                                    Choose Plan
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>

            {/* Confirm Modal */}
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="max-w-lg">
                    <DialogHeader>
                        <DialogTitle>Confirm your order</DialogTitle>
                    </DialogHeader>

                    <Tabs defaultValue="vnpay">
                        <TabsList>
                            <TabsTrigger value="vnpay">VNPay</TabsTrigger>
                        </TabsList>
                        <TabsContent value="vnpay" className="space-y-4 pt-4">
                            <div className="p-4 border rounded-md">
                                <div className="flex justify-between text-sm">
                                    <span>Package:</span>
                                    <span>{selectedPlan?.displayName}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span>Payment method:</span>
                                    <span>VNPay</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span>Company ID:</span>
                                    <span>{resolvedCompanyId ?? "—"}</span>
                                </div>
                                <div className="flex justify-between font-semibold">
                                    <span>Total:</span>
                                    <span>
                                        {selectedPlan
                                            ? (() => {
                                                  const dto = packageMap.get(
                                                      selectedPlan.targetPackageId
                                                  );
                                                  return dto
                                                      ? VND.format(dto.priceVnd)
                                                      : "—";
                                              })()
                                            : "—"}
                                    </span>
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <Button
                                    variant="outline"
                                    className="flex-1"
                                    onClick={() => setOpen(false)}
                                    disabled={paying}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    className="flex-1"
                                    onClick={handlePay}
                                    disabled={
                                        !selectedPlan || !canCheckout || paying
                                    }
                                >
                                    {paying ? (
                                        <>
                                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                            Processing...
                                        </>
                                    ) : (
                                        <>
                                            Pay with VNPay
                                            <ArrowRight className="w-4 h-4 ml-2" />
                                        </>
                                    )}
                                </Button>
                            </div>
                        </TabsContent>
                    </Tabs>
                </DialogContent>
            </Dialog>
        </div>
    );
}
