// components/ui/pagination.js
"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({ currentPage, totalPages, onPageChange }) {
    if (totalPages <= 1) return null;

    return (
        <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
            <Button
                variant="outline"
                size="icon"
                onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
                disabled={currentPage === 1}
                className="w-9 h-9"
            >
                <ChevronLeft className="w-4 h-4" />
            </Button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                    key={page}
                    variant={page === currentPage ? "default" : "outline"}
                    onClick={() => onPageChange(page)}
                    className={`w-9 h-9 text-sm ${
                        page === currentPage ? "bg-[#0a66c2] text-white" : ""
                    }`}
                >
                    {page}
                </Button>
            ))}

            <Button
                variant="outline"
                size="icon"
                onClick={() =>
                    onPageChange(Math.min(currentPage + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="w-9 h-9"
            >
                <ChevronRight className="w-4 h-4" />
            </Button>
        </div>
    );
}
