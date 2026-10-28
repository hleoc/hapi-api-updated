const Pack = require('../../package');
const CandidateRoutes = require('./candidate.routes');

exports.plugin = {
    name: 'candidate',
    version: Pack.version,
    register: async function (server, _options) {
        server.route(CandidateRoutes);
    }
};
