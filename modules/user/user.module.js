const Pack = require('../../package');
const UserRoutes = require('./user.routes');

exports.plugin = {
    name: 'user',
    version: Pack.version,
    register: async function (server, _options) {
        server.route(UserRoutes);
    }
};
