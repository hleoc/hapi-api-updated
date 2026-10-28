'use strict';

const mongoose = require('mongoose');
const Pack = require('../package');

exports.plugin = {
    name: 'mongoose',
    version: Pack.version,
    register: async function (server, options) {
        const {uri, ...mongooseOptions } = options;

        // Limpa listeners antigos para evitar warning
        mongoose.connection.removeAllListeners('connected');
        mongoose.connection.removeAllListeners('error');

        mongoose.connection.on('connected', () => {
            server.log(['info', 'mongoose'], `Connected to MongoDB at ${uri}`);
        });

        mongoose.connection.on('error', err => {
            server.log(['error', 'mongoose'], `MongoDB connection error: ${err}`);
        });

        await mongoose.connect(uri, mongooseOptions);

        // Opcional: expor o mongoose para uso em outros lugares via server.app
        // server.app.mongoose = mongoose;
    }
};
