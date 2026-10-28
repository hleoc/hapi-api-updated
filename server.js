'use strict';

const Hapi = require('@hapi/hapi');
const plugins = require('./config/plugins');
const jwtServices = require('./services/jwt.services');
const modules = require('./config/modules');


const init = async () => {
    const server = Hapi.server({
        port: process.env.PORT,
        host: process.env.HOST,
    });

    // 1. Registra plugins
    await server.register(plugins);

    // 2. Configura autenticação JWT
    server.auth.strategy('jwt', 'jwt', {
        key: process.env.JWT_SECRET,
        verifyOptions: {
            algorithms: ['HS256']
        },
        validate: jwtServices.validate
    });

     // 3. Define JWT como autenticação padrão
    server.auth.default('jwt');

    // 4. Agora registra as rotas
    await server.register(modules);

     // 5. Inicia o servidor
    await server.start();
    console.log(`Server running at PORT ${server.info.port}`);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();
