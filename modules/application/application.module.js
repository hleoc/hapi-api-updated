const Pack = require('../../package');
const ApplicationRoutes = require('./application.routes');

exports.plugin = {
    name: 'application',
    version: Pack.version,
    register: async function (server, _options) {
        server.route(ApplicationRoutes);
    }
};