import express, { Application } from "express";
import morgan from 'morgan';
import path from 'path';
import dotenv from 'dotenv';

/**
 * API Routes
 */
import CategoryRoutes from '../routes/category.routes';
import ProductRoutes from '../routes/product.routes';


export default class App {

    private app: Application;

    constructor(private port?: string|number) {
        this.app = express();
        this.settings();
        this.middlewares();
        this.routes();
    }

    settings() {
        dotenv.config();
        this.app.set('port', process.env.PORT || this.port || 4000);
    }

    routes() {
        this.app.use('/api/products', ProductRoutes);
        this.app.use('/api/categories', CategoryRoutes);
    }

    middlewares() {
        this.app.use(morgan('dev'));
        this.app.use(express.static(path.join(__dirname, '/../../public')));
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
    }

    listen() {
        this.app.listen(this.app.get('port'), () => {
            console.log(`Run in port -p ${ this.app.get('port') }`);
        });
    }
}