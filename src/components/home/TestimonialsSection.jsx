"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const TestimonialsSection = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const testimonials = [
        {
            rating: 5,
            text: "JobHuntly có giao diện hiện đại, dễ sử dụng và cực kỳ thân thiện với người dùng – đúng chuẩn một nền tảng tuyển dụng chuyên nghiệp.",
            name: "Võ Hoàng Phúc",
            title: "UI/UX Designer",
            avatar: "https://ca.slack-edge.com/T092B4T8XTN-U092ZEL3C3A-f1db21fda0f9-512",
        },
        {
            rating: 5,
            text: "Việc tìm kiếm và ứng tuyển công việc chưa bao giờ đơn giản đến thế! JobHuntly thực sự giúp tiết kiệm thời gian và công sức.",
            name: "Nguyễn Anh Huy",
            title: "Creative Director",
            avatar: "https://ca.slack-edge.com/T092B4T8XTN-U092ZEMP5CG-1fb35ba9101d-512",
        },
    ];

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    };

    const prevSlide = () => {
        setCurrentSlide(
            (prev) => (prev - 1 + testimonials.length) % testimonials.length,
        );
    };

    return (
        <section className="py-16">
            <div className="container px-4 mx-auto">
                <h2 className="mb-12 text-3xl font-bold text-center text-gray-900">
                    Clients Testimonial
                </h2>

                <div className="relative max-w-6xl mx-auto overflow-hidden">
                    <div className="flex items-center justify-between">
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={prevSlide}
                            className="absolute left-0 z-10 transform -translate-y-1/2 bg-white shadow-lg top-1/2"
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </Button>

                        {/* Slide container */}
                        <div className="w-full px-12">
                            <div
                                className="flex transition-transform duration-500 ease-in-out"
                                style={{
                                    transform: `translateX(-${currentSlide * 100}%)`,
                                }}
                            >
                                {testimonials.map((testimonial, index) => (
                                    <div
                                        key={index}
                                        className="min-w-full md:min-w-[33.3333%] px-2"
                                    >
                                        <div className="flex flex-col justify-between h-full p-6 bg-white rounded-lg shadow-sm">
                                            <div>
                                                <div className="flex mb-4">
                                                    {[
                                                        ...Array(
                                                            testimonial.rating,
                                                        ),
                                                    ].map((_, i) => (
                                                        <Star
                                                            key={i}
                                                            className="w-5 h-5 text-yellow-400 fill-yellow-400"
                                                        />
                                                    ))}
                                                </div>
                                                <p className="mb-6 italic text-gray-600">
                                                    "{testimonial.text}"
                                                </p>
                                            </div>
                                            <div className="flex items-center">
                                                <img
                                                    src={
                                                        testimonial.avatar ||
                                                        "/placeholder.svg"
                                                    }
                                                    alt={testimonial.name}
                                                    className="w-10 h-10 mr-3 rounded-full"
                                                />
                                                <div>
                                                    <p className="font-semibold text-gray-900">
                                                        {testimonial.name}
                                                    </p>
                                                    <p className="text-sm text-gray-600">
                                                        {testimonial.title}
                                                    </p>
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
                            onClick={nextSlide}
                            className="absolute right-0 z-10 transform -translate-y-1/2 bg-white shadow-lg top-1/2"
                        >
                            <ChevronRight className="w-4 h-4" />
                        </Button>
                    </div>

                    {/* Pagination dots */}
                    <div className="flex justify-center mt-8 space-x-2">
                        {testimonials.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentSlide(index)}
                                className={`w-3 h-3 rounded-full transition-colors ${
                                    index === currentSlide
                                        ? "bg-blue-600"
                                        : "bg-gray-300"
                                }`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TestimonialsSection;
