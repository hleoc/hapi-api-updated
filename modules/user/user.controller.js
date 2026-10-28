const Boom = require('boom');
const User = require('./user.model');
const UtilService = require('../../services/util.services');
const JwtServices = require('../../services/jwt.services');

module.exports = {
    async signup(request, h) {
        try {
            const { email, password } = request.payload;
            const existingUser = await User.exists({ email });

            if (existingUser) {
                throw Boom.conflict('Email already registred');
            }

            //create new user
            const user = new User({ email, password });

            //encode user password
            user.password = await UtilService.hashPassword(user.password);

            //save the user
            await user.save();

            //user created sucessfully
            return h.response('Signup successful!').code(201);
        } catch (err) {
            if (Boom.isBoom(err)) {
                throw err;
            }
            //A IA aconselhou usar o Boom para os erros 
            throw Boom.badImplementation('Signup failed');
        }
    },
    async login(request, h) {
        try {
            const { email } = request.payload;
            //find user by email
            const user = await User.findOne({ email });

            // if no user found
            if (!user) {
                // send the unauthorized error
                throw Boom.unauthorized('Invalid crentials provided 1');
            }

            // compare the user password
            const matched = await UtilService.comparePassword(request.payload.password, user.password);

            // if password matched
            if (matched) {
                // send the json web token in the response
                const token = JwtServices.issue({
                    payload: {
                        id: user._id,
                        email: user.email
                    },
                    expiresIn: '1d'
                });
                
                return h.response({ token: token }).code(200);
            } else {
                //unathorized error
                throw Boom.unauthorized('Invalid creadentials provided 2')
            }
        } catch (err) {
            // console.error('aquiiiii ==>', err)
            throw Boom.unauthorized('Invalid crentials provided 3');
        }
    }
};
 