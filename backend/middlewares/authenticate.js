const jwt = require('jsonwebtoken');
const secretKey = "VENKATARAMANA_SECRET_TOKEN";

function authenticateToken(request, response, next) {
    const authHeader = request.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return response.status(401).json({ error: "No token provided" });

    jwt.verify(token, secretKey, (error, user) => {
        if (error) {
            return response.status(403).json({ error: "Invalid token" });
        }
        request.user = user;
        next();
    });
}

module.exports = authenticateToken;
