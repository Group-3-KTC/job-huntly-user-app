import { jwtVerify, SignJWT } from "jose";

// const SECRET = process.env.JWT_SECRET;
const SECRET = new TextEncoder().encode("fbcb21b477ce89f9fdfae598210eb685");
// const SECRET = new TextEncoder().encode(process.env.JWT_SECRET);
// console.log("Secret: ", SECRET);

export async function signToken(payload) {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setExpirationTime("1h")
        .sign(SECRET);
}

export async function verifyToken(token) {
    try {
        const { payload } = await jwtVerify(token, SECRET);
        return payload;
    } catch (err) {
        console.error("Failed to verify token:", err.message);
        return null;
    }
}
