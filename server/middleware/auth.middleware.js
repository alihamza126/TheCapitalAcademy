import jwt from "jsonwebtoken";

export const authUser = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1]
        if (!token) return res.status(401).json({ error: 'Token missing' })

        try {
            const decoded = jwt.verify(token, process.env.NEXTAUTH_SECRET)
            req.user = decoded
            next()
        } catch (err) {
            return res.status(401).json({ error: 'Invalid token' })
        }
    } catch (error) {
        console.error("Auth middleware error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};


export const isAdmin = async (req, res, next) => {
    if (!req.user || req.user.role !== 'admin') {
        return res.status(403).json({ message: "Forbidden: Insufficient role" });
    }

    next();
};
