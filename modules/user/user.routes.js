const UserController = require('./user.controller');
const UserValidation = require('./user.validation');

module.exports = [
    {
        method: 'POST',
        path: '/users/signup',
        options: {
            validate: {
                payload: UserValidation.userSchema,
                failAction: (_request, h, err) => {
                    return h.response({ error: err.details[0].message }).code(400).takeover();
                }
            },
            description: 'User can create new Account',
            tags: ['api', 'users'],
            notes: 'Returns a signup response',
            auth: false
        },
        handler: UserController.signup
    },
    {
        method: 'POST',
        path: '/users/login',
        options: {
            validate: {
                payload: UserValidation.userSchema,
                failAction: (_request, h, err) => {
                    return h.response({ error: err.details[0].message }).code(400).takeover();
                }
            },
            description: 'User can Login to his Account',
            tags: ['api', 'login'],
            notes: 'Returns a JSON Web Token',
            auth: false
        },
        handler: UserController.login
    }
];
