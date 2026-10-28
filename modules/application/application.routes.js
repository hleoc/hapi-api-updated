const ApplicationController = require('./application.controller.js');
const ApplicationValidade = require('./application.validation.js');

module.exports = [
    {
        method: 'GET',
        path: '/applications',
        options: {
            auth: {
                strategy: 'jwt',
                access: {
                    // aqui eu indico para qual perfil a api dará acesso
                    scope: ['candidate']
                }
            },
            description: 'Find all the Applications',
            tags: ['api', 'Applications'],
            notes: 'Returns all the Applications' 
        },
        handler: ApplicationController.find
    },
    {
        method: 'POST',
        path: '/applications',
        options: {
            validate: {
                payload: ApplicationValidade.applicationSchema,
                failAction: (_request, h, err) => {
                    return h.response({ error: err.details[0].message }).code(400).takeover();
                }
            },
            description: 'Create new application',
            tags: ['api', 'Applications'],
            notes: 'Returns newly created application'
        },
        handler: ApplicationController.create
    }
];
