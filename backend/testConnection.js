const sequelize = require('./config/database');

async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');

        // Menjalankan query untuk menguji
        await sequelize.query("SELECT NOW();");
        console.log('Query executed successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    } finally {
        await sequelize.close();
    }
}

testConnection();
