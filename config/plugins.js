const HapiSwagger = require('hapi-swagger');
const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const Pack = require('../package');
const mongoosePlugin = require('../plugins/index');

const mongoDbUri = process.env.MONGO_URI;

module.exports = [
    Inert,
    Vision,
    {
        plugin: HapiSwagger,
        options: {
            info: {
                title: 'API Documentation',
                version: Pack.version
            },
            //Isso informa ao Swagger que a autenticação será enviada pelo header:
            securityDefinitions: {
                jwt: {
                    type: 'apiKey',
                    name: 'Authorization',
                    in: 'header'
                }
            },
            security: [
                {
                    jwt: []
                }
            ]
        }
    },
    {
        plugin: mongoosePlugin,
        options: {
            uri: mongoDbUri,
        }
    },
    require('hapi-auth-jwt2'),
    {
        plugin: require('hapi-pino'),
        options: {
            redact: [
                'req.headers.authorization'
            ]
        }
    }
];
