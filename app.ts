import App from './src/config/app.config';
import DatabaseConfig from './src/config/db.config';
//import { dbtest } from './src/config/db.config';


function main() {
    const app: App = new App(4000);
    app.listen();
    // Prueba de conexión a la DB
    DatabaseConfig.connectDB();
}

main();