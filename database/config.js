const mongoose = require('mongoose');

const dbConnection = async() => {

    try {

        await mongoose.connect( process.env.DB_CONN, {
            autoIndex: true,
        })

        console.log('DB Online');

    } catch (error) {
        console.log(error);
        throw new Error('Erro n base de daos - favor, consultar o admin')
    }

}

module.exports = {
    dbConnection
}