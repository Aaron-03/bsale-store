import { Sequelize } from "sequelize";

/**
 * Class containing the database configuration
 */
export default class DatabaseConfig {
    private host: string;
    private database: string;
    private username: string;
    private password: string;

    // Set the database parameters
    constructor() {
        this.host = 'mdb-test.c6vunyturrl6.us-west-1.rds.amazonaws.com';
        this.database = 'bsale_test';
        this.username = 'bsale_test';
        this.password = 'bsale_test';
    }

    // Start connection with the database
    static async connectDB() {
        try {
            await sequelize.authenticate();
            console.log('Conexión exitosa!');
        } catch (error) {
            console.error('No es posible conectar con la DB');
        }
    }
}


const databaseConfig: DatabaseConfig = new DatabaseConfig();

// Assign the database configuration to Sequelize
export const sequelize: Sequelize = new Sequelize({
    ...databaseConfig,
    dialect: 'mysql'
});