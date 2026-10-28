const Pack = require('../../package');
const JobRoutes = require('./job.routes');

exports.plugin = {
    name: 'job',
    version: Pack.version,
    register: async function (server, _options) {
        server.route(JobRoutes);
    }
};
