import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 * Chuyển đổi đường dẫn ảnh để sử dụng với Next.js Image
 * @param {string} src - Đường dẫn ảnh gốc
 * @returns {string} - Đường dẫn ảnh đã được xử lý
 */
export function getImageUrl(src) {
  if (!src) return "/logo_example.png";
  
  // Nếu đã là URL tuyệt đối hoặc bắt đầu bằng "/", giữ nguyên
  if (src.startsWith("http://") || src.startsWith("https://") || src.startsWith("/")) {
    return src;
  }
  
  // Thêm tiền tố URL API nếu là đường dẫn tương đối
  return `http://localhost:8080/${src}`;
}
