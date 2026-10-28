const Pack = require('../../package');
const CompanyRoutes = require('./company.routes');

exports.plugin = {
    name: 'company',
    version: Pack.version,
    register: async function (server, _options) {
        server.route(CompanyRoutes);
    }
};
