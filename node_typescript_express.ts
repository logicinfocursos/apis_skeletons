import express, { Express, Request, Response, Router } from 'express';
import cors from 'cors';

const app: Express = express();

app.use(cors());
app.use(express.json());

const port: number = 3001;

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});

interface IProduct {
    id: number;
    name: string;
    price: number;
    categoryid: number;
}

interface ICategory {
    id: number;
    name: string;
}

const db: { [key: string]: (IProduct | ICategory)[] } = {
    "product": [
        {
            "id": 1,
            "name": 'Produto 1',
            "price": 100,
            "categoryid": 1
        }, 
        {
            "id": 2,
            "name": 'Produto 2',
            "price": 200,
            "categoryid": 2
        }
    ],
    "category": [
        {
            "id": 1,
            "name": 'Categoria 1'
        }, 
        {
            "id": 2,
            "name": 'Categoria 2**'
        }
    ]
};

class AppRouter {
    private app: Express;
    constructor(app: Express) {
        this.app = app;
        this.routes();
    }

    routes(): void {
        this.app.use('/products', new ProductRoute().router);
        this.app.use('/categories', new CategoryRoute().router);
    }
}

class BaseRoute {
    public router: Router;
    private controller: BaseController;
    constructor(controller: BaseController) {
        this.router = express.Router();
        this.controller = controller;
        this.setRoutes();
    }

    setRoutes(): void {
        this.router.get('/', (req: Request, res: Response) => this.controller.getAll(req, res));
        this.router.get('/:id?', (req: Request, res: Response) => this.controller.getById(req, res));
        this.router.post('/', (req: Request, res: Response) => this.controller.create(req, res));
        this.router.put('/:id?', (req: Request, res: Response) => this.controller.update(req, res));
        this.router.patch('/:id?', (req: Request, res: Response) => this.controller.update(req, res));
        this.router.delete('/:id?', (req: Request, res: Response) => this.controller.erase(req, res));
    }
}

class ProductRoute extends BaseRoute {
    constructor() {
        super(new ProductController());
    }
}

class CategoryRoute extends BaseRoute {
    constructor() {
        super(new CategoryController());
    }
}

class BaseController {
    private repository: BaseRepository;
    constructor(repository: BaseRepository) {
        this.repository = repository;
    }

    async getAll(_: Request, response: Response): Promise<void> {
        try {
            const result = await this.repository.getAll();
            const objectList = result.map(object => this.repository.mapObject(object));

            response.status(200).send(objectList);

        } catch (e) {
            response.status(400).send(e);
        }
    }

    async getById(request: Request, response: Response): Promise<void> {
        try {
            const result = await this.repository.getById(Number(request.params.id));
            const mappedObject = this.repository.mapObject(result!);

            response.status(200).send(mappedObject);

        } catch (e) {
            response.status(400).send(e);
        }
    }

    async create(request: Request, response: Response): Promise<void> {
        response.status(200).send(await this.repository.create(request.body));
    }

    async update(request: Request, response: Response): Promise<void> {
        response.status(200).send(await this.repository.update(Number(request.params.id), request.body));
    }

    async erase(request: Request, response: Response): Promise<void> {
        response.status(200).send(await this.repository.erase(Number(request.params.id)));
    }
}

class ProductController extends BaseController {
    constructor() {
        super(new ProductRepository());
    }
}

class CategoryController extends BaseController {
    constructor() {
        super(new CategoryRepository());
    }
}

class BaseRepository {
    private entity: string;
    constructor(entity: string) {
        this.entity = entity;
    }

    async getAll(): Promise<any[]> {
        return db[this.entity];
    }

    async getById(id: number): Promise<any | undefined> {
        return db[this.entity].find((object) => object.id === id);
    }

    async create(data: any): Promise<any> {
        data.id = db[this.entity].length + 1;
        db[this.entity].push(data);

        return data;
    }

    async update(id: number, data: any): Promise<any | undefined> {
        const index = db[this.entity].findIndex((object) => object.id === id);

        db[this.entity][index] = {
            ...db[this.entity][index],
            ...data
        };

        return db[this.entity][index];
    }

    async erase(id: number): Promise<any[]> {
        const index = db[this.entity].findIndex((object) => object.id === id);
        db[this.entity].splice(index, 1);
        return db[this.entity];
    }

    mapObject(object: any): any {
        let newObject: any = {};
        Object.keys(object).forEach((key) => {
            newObject[key] = object[key];
        });
        return newObject;
    }
}

class ProductRepository extends BaseRepository {
    constructor() {
        super('product');
    }
}

class CategoryRepository extends BaseRepository {
    constructor() {
        super('category');
    }
}

new AppRouter(app);
