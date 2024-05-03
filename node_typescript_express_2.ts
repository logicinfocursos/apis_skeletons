import express, { Express, Request, Response, Router } from 'express'
import cors from 'cors'

const app: Express = express()

interface Product {
    id: number
    name: string
    price: number
    categoryid: number
}

interface Category {
    id: number
    name: string
}

const db: { [key: string]: Product[] | Category[] } = {
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
}

app.use(cors())
app.use(express.json())

const port: number = 3002

const config = { "entities": ["product", "category"] }

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`)
})

class AppRouter {
    constructor(private app: Express) {
        this.routes()
    }

    routes(): void {
        for (const entity of config.entities) {

            const repository = new BaseRepository(entity)
            const controller = new BaseController(repository)
            const route = new BaseRoute(controller)

            this.app.use(`/${entity}`, route.router)
        }
    }
}

class BaseRoute {
    public router: Router
    
    constructor(private controller: BaseController) {
        this.router = express.Router()
        this.setRoutes()
    }

    setRoutes(): void {
        this.router.get('/', (req: Request, res: Response) => this.controller.getAll(req, res))
        this.router.get('/:id?', (req: Request, res: Response) => this.controller.getById(req, res))
        this.router.post('/', (req: Request, res: Response) => this.controller.create(req, res))
        this.router.put('/:id?', (req: Request, res: Response) => this.controller.update(req, res))
        this.router.patch('/:id?', (req: Request, res: Response) => this.controller.update(req, res))
        this.router.delete('/:id?', (req: Request, res: Response) => this.controller.erase(req, res))
    }
}

class BaseController {
    constructor(private repository: BaseRepository) {}

    async getAll(_: Request, response: Response): Promise<void> {
        try {
            const result = await this.repository.getAll()
            const objectList = result.map(object => this.repository.mapObject(object))

            response.status(200).send(objectList)

        } catch (e) {
            response.status(400).send(e)
        }
    }

    async getById(request: Request, response: Response): Promise<void> {
        try {
            const result = await this.repository.getById(Number(request.params.id))
            const mappedObject = this.repository.mapObject(result!)

            response.status(200).send(mappedObject)

        } catch (e) {
            response.status(400).send(e)
        }
    }

    async create(request: Request, response: Response): Promise<void> {
        response.status(200).send(await this.repository.create(request.body as Product | Category))
    }

    async update(request: Request, response: Response): Promise<void> {
        response.status(200).send(await this.repository.update(Number(request.params.id), request.body))
    }

    async erase(request: Request, response: Response): Promise<void> {
        response.status(200).send(await this.repository.erase(Number(request.params.id)))
    }
}

class BaseRepository {
    private db = db

    constructor(private entity: string) {}

    async getAll(): Promise<(Product | Category)[]> {
        return this.db[this.entity] as (Product | Category)[]
    }

    async getById(id: number): Promise<Product | Category | undefined> {
        return (this.db[this.entity] as (Product | Category)[]).find((object) => object.id === id)
    }

    async create(data: Product | Category): Promise<Product | Category> {
        data.id = (this.db[this.entity] as (Product | Category)[]).length + 1;
        (this.db[this.entity] as (Product | Category)[]).push(data)

        return data
    }

    async update(id: number, data: Partial<Product | Category>): Promise<Product | Category | undefined> {
        const index = (this.db[this.entity] as (Product | Category)[]).findIndex((object) => object.id === id);

        (this.db[this.entity] as (Product | Category)[])[index] = {
            ...(this.db[this.entity] as (Product | Category)[])[index],
            ...data
        }

        return (this.db[this.entity] as (Product | Category)[])[index]
    }

    async erase(id: number): Promise<(Product | Category)[]> {
        const index = (this.db[this.entity] as (Product | Category)[]).findIndex((object) => object.id === id);
        (this.db[this.entity] as (Product | Category)[]).splice(index, 1)

        return this.db[this.entity] as (Product | Category)[]
    }

    mapObject(object: Product | Category): Product | Category {
        let newObject: any = {}
        Object.keys(object).forEach((key) => {
            newObject[key] = object[key as keyof (Product | Category)]
        })

        return newObject as Product | Category
    }
}

new AppRouter(app)
