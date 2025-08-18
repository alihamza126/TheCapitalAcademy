import jwt from 'jsonwebtoken'



export const authUser = async (req, res, next) => {
    try {
        // Pass the Express request object to getTokeclgn
        const token = req.headers.authorization.split(' ')[1]
        const decoded = jwt.verify(token, process.env.NEXTAUTH_SECRET);
        console.log("decoded token is", decoded)

        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        // Attach the decoded token (ser data) to the request
        req.user = {
            id: decoded.userId,
            role: decoded.role,
            email: decoded.email
        };
        next();
    } catch (error) {
        console.error("Authentication error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const isAdmin = async (req, res, next) => {
    if (!req.user || req.user.role.toLowerCase() !== 'admin') {
        return res.status(403).json({ message: "Forbidden: Insufficient role" });
    }

    next();
};

export const optionalAuth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (authHeader) {
            const token = authHeader.split(" ")[1];
            if (token) {
                try {
                    const decoded = jwt.verify(token, process.env.NEXTAUTH_SECRET);
                    req.user = {
                        id: decoded.userId,
                        role: decoded.role,
                        email: decoded.email,
                    };
                } catch (err) {
                    console.warn("Invalid token, continuing as guest");
                    req.user = null;
                }
            }
        } else {
            req.user = null; // guest
        }

        next();
    } catch (error) {
        console.error("Optional auth error:", error);
        req.user = null;
        next();
    }
};