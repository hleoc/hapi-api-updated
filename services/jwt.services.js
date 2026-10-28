const jwt = require('jsonwebtoken');
const User = require('../modules/user/user.model');

const SECRET_KEY = process.env.JWT_SECRET;

module.exports = {
    issue({ payload, expiresIn = '1d' } ) {
        return jwt.sign(payload, SECRET_KEY, {
            algorithm: 'HS256',
            expiresIn: expiresIn
        });
    },
    async validate(decodedToken, request, _h) {
        try {
            const user = await User.findOne({
                _id: decodedToken.id,
                email: decodedToken.email
            }).select('_id email role');

            if (!user) {
                return {
                    isValid: false
                };
            }

            return {
                isValid: true,
                credentials: {
                    id: user._id,
                    email: user.email,
                    role: user.role,
                    scope: [user.role]
                }
            };

        } catch (err) {
            request.log([ 'error', 'auth' ], err);

            return {
                isValid: false
            };
        }
    }
};
