import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// gộp các class name nếu if = true
export function cn(...inputs) {
    return twMerge(clsx(inputs));
}
