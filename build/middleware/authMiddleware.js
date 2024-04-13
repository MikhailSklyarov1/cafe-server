import jwt from 'jsonwebtoken';
export default function (req, res, next) {
    var _a;
    if (req.method === 'OPTIONS') {
        next();
    }
    try {
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        if (!token) {
            return res.status(403).json({ message: 'Not authorized' });
        }
        const decoded = jwt.verify(token, 'secretKey');
        //@ts-ignore
        req.user = decoded;
        next();
    }
    catch (e) {
        res.status(403).json({ message: 'Not authorized' });
    }
}
//# sourceMappingURL=authMiddleware.js.map