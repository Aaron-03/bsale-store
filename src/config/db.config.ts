import { Sequelize } from "sequelize";

export default class DatabaseConfig {
    private host: string;
    private database: string;
    private username: string;
    private password: string;

    constructor() {
        this.host = 'mdb-test.c6vunyturrl6.us-west-1.rds.amazonaws.com';
        this.database = 'bsale_test';
        this.username = 'bsale_test';
        this.password = 'bsale_test';
    }

    static async connectDB() {
        try {
            await sequelize.authenticate();
            console.log('Prueba de conexión exitosa');
        } catch (error) {
            console.error('No es posible conectar con la DB');
        }
    }
}

const databaseConfig: DatabaseConfig = new DatabaseConfig();

export const sequelize: Sequelize = new Sequelize({
    ...databaseConfig,
    dialect: 'mysql'
});