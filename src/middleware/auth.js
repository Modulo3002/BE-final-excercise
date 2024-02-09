// import {auth} from 'express-oauth2-jwt-bearer';

// const authMiddleware = auth({
//     audience: 'https://booking-api',
//     issuerBaseURL: 'dev-vhut4rbpxdmw2vbe.eu.auth0.com',
// });

// export default authMiddleware;

import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization;
    const secretKey = process.env.AUTH_SECRET_KEY || 'my-secret-key';

    if (!token) {
        return res.status(401).json({ message: 'You cannot access this operation without a token!' });
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token provided!' });
        }

        req.user = decoded;
        next();
    });
};

export default authMiddleware;
