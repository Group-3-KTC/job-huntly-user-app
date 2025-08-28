export const API_CONFIG = {
    BASE_URL:
        process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080/api/v1",
    TIMEOUT: 10000, // 10 seconds
};

// export const API_CONFIG = {
//     BASE_URL: "http://localhost:8080/api/v1",
//     TIMEOUT: 10000, // 10 seconds
// };

if (!process.env.NEXT_PUBLIC_API_BASE_URL) {
    console.warn("NEXT_PUBLIC_API_BASE_URL is not defined");
}
