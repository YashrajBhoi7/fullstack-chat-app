import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
    if (!process.env.JWT_SECRET) {
        console.error("JWT_SECRET is not defined in the environment variables.");
        throw new Error("JWT_SECRET must be set in environment variables.");
    }

    console.log("JWT_SECRET:", process.env.JWT_SECRET);
    console.log("Generating token for userId:", userId);

    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "7d",
    });

    res.cookie("jwt", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV !== "development",
    });

    return token;
};
