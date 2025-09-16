"use client";

import {useEffect, useState} from "react";
import {Button} from "@/components/ui/button";
import {ChevronLeft, ChevronRight, Star} from "lucide-react";

export default function TestimonialsSection() {
    const [index, setIndex] = useState(0);
    const [perView, setPerView] = useState(1); // 1 (mobile) / 3 (desktop)

    const testimonials = [
        {
            rating: 5,
            text: "JobHuntly có giao diện hiện đại...",
            name: "Võ Hoàng Phúc",
            title: "UI/UX Designer",
            avatar: "https://ca.slack-edge.com/T092B4T8XTN-U092ZEL3C3A-f1db21fda0f9-512"
        },
        {
            rating: 5,
            text: "Việc tìm kiếm và ứng tuyển...",
            name: "Nguyễn Anh Huy",
            title: "Creative Director",
            avatar: "https://ca.slack-edge.com/T092B4T8XTN-U092ZEMP5CG-1fb35ba9101d-512"
        },
        {
            rating: 5,
            text: "Việc tìm kiếm và ứng tuyển...",
            name: "Nguyễn Anh Huy",
            title: "Creative Director",
            avatar: "https://ca.slack-edge.com/T092B4T8XTN-U092ZEMP5CG-1fb35ba9101d-512"
        },
        {
            rating: 5,
            text: "Việc tìm kiếm và ứng tuyển...",
            name: "Nguyễn Anh Huy",
            title: "Creative Director",
            avatar: "https://ca.slack-edge.com/T092B4T8XTN-U092ZEMP5CG-1fb35ba9101d-512"
        },
        {
            rating: 5,
            text: "Việc tìm kiếm và ứng tuyển...",
            name: "Nguyễn Anh Huy",
            title: "Creative Director",
            avatar: "https://ca.slack-edge.com/T092B4T8XTN-U092ZEMP5CG-1fb35ba9101d-512"
        },
    ];

    // 1) xác định slidesPerView theo breakpoint
    useEffect(() => {
        const mq = window.matchMedia("(min-width: 768px)");
        const update = () => setPerView(mq.matches ? 3 : 1);
        update();
        mq.addEventListener("change", update);
        return () => mq.removeEventListener("change", update);
    }, []);

    // 2) clamp index để không vượt quá
    const lastIndex = Math.max(0, testimonials.length - perView);
    const next = () => setIndex((i) => Math.min(i + 1, lastIndex));
    const prev = () => setIndex((i) => Math.max(i - 1, 0));

    // 3) dịch theo tỉ lệ của 1 item trong khung
    const translatePct = (100 / perView) * index;

    // số trang cho dots
    const pages = lastIndex + 1;

    return (
        <section className="py-16">
            <div className="container px-4 mx-auto">
                <h2 className="mb-12 text-3xl font-bold text-center text-gray-900">
                    Clients Testimonial
                </h2>

                <div className="relative max-w-6xl mx-auto overflow-hidden">
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={prev}
                        className="absolute left-0 z-10 transform -translate-y-1/2 bg-white shadow-lg top-1/2"
                    >
                        <ChevronLeft className="w-4 h-4"/>
                    </Button>

                    <div className="w-full px-12">
                        <div
                            className="flex transition-transform duration-500 ease-in-out"
                            style={{transform: `translateX(-${translatePct}%)`}}
                        >
                            {testimonials.map((t, i) => (
                                <div
                                    key={i}
                                    className="flex-none basis-full md:basis-1/3 px-2" // quan trọng: flex-none + basis thay vì min-w
                                >
                                    <div
                                        className="flex h-full flex-col justify-between rounded-lg bg-white p-6 shadow-sm">
                                        <div>
                                            <div className="mb-4 flex">
                                                {[...Array(t.rating)].map((_, k) => (
                                                    <Star key={k} className="h-5 w-5 text-yellow-400 fill-yellow-400"/>
                                                ))}
                                            </div>
                                            <p className="mb-6 italic text-gray-600">"{t.text}"</p>
                                        </div>
                                        <div className="flex items-center">
                                            <img
                                                src={t.avatar || "/placeholder.svg"}
                                                alt={t.name}
                                                className="mr-3 h-10 w-10 rounded-full"
                                            />
                                            <div>
                                                <p className="font-semibold text-gray-900">{t.name}</p>
                                                <p className="text-sm text-gray-600">{t.title}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <Button
                        variant="outline"
                        size="icon"
                        onClick={next}
                        className="absolute right-0 z-10 transform -translate-y-1/2 bg-white shadow-lg top-1/2"
                    >
                        <ChevronRight className="w-4 h-4"/>
                    </Button>

                    {/* Pagination dots theo "trang" */}
                    <div className="mt-8 flex justify-center space-x-2">
                        {Array.from({length: pages}).map((_, p) => (
                            <button
                                key={p}
                                onClick={() => setIndex(p)}
                                className={`h-3 w-3 rounded-full transition-colors ${
                                    p === index ? "bg-blue-600" : "bg-gray-300"
                                }`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
