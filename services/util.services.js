const bcrypt = require('bcrypt');
const SALT_ROUND = 10;

module.exports = {
    hashPassword(password) {
        // nao precisa do try/catch
        // Como o bcrypt.hash() e bcrypt.compare() retornam Promise,
        //  o erro vai subir naturalmente para quem chamou a função.
        return bcrypt.hash(password, SALT_ROUND);
    },
    comparePassword(password, hash) {
        // nao precisa do try/catch
        // Como o bcrypt.hash() e bcrypt.compare() retornam Promise,
        //  o erro vai subir naturalmente para quem chamou a função.
        return bcrypt.compare(password, hash);
    }
};
