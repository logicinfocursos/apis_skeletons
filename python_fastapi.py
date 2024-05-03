from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import json

app = FastAPI()

with open('db.json') as f:
    db = json.load(f)


class BaseRepository:
    def __init__(self, entity):
        self.entity = entity

    def get_all(self):
        return db[self.entity]

    def get_by_id(self, id):
        return next((item for item in db[self.entity] if int(item['id']) == int(id)), None)

    def create(self, data):
        data['id'] = len(db[self.entity]) + 1
        db[self.entity].append(data)
        return data
       
    def update(self, id, data):
        item = self.get_by_id(id)
        if item:
            item.update(data)
            return item
        return None
    
    def erase(self, id):
        item = self.get_by_id(id)
      
        if item:
            db[self.entity].remove(item)
            return  db[self.entity]
        return None

class ProductRepository(BaseRepository):
    def __init__(self):
        super().__init__('product')

class CategoryRepository(BaseRepository):
    def __init__(self):
        super().__init__('category')

class BaseController:
    def __init__(self, repository):
        self.repository = repository

    def get_all(self):
        return self.repository.get_all()

    def get_by_id(self, id: int):
        item = self.repository.get_by_id(id)
        if item is None:
            raise HTTPException(status_code=404, detail="Item not found")
        return item

    def create(self, data):
        return self.repository.create(data)

    def update(self, id: int, data):
        item = self.repository.update(id, data)
        if item is None:
            raise HTTPException(status_code=404, detail="Item not found")
        return item

    def erase(self, id: int):
        item = self.repository.erase(id)
        if item is None:
            raise HTTPException(status_code=404, detail="Item not found")
        return item

class ProductController(BaseController):
    def __init__(self):
        super().__init__(ProductRepository())

class CategoryController(BaseController):
    def __init__(self):
        super().__init__(CategoryRepository())

class BaseRoute:
    def __init__(self, controller, route_name):
        self.controller = controller
        self.route_name = route_name

    def register_routes(self, app):
        app.add_api_route(f'/{self.route_name}',
                          self.controller.get_all,
                          methods=['GET'])
        app.add_api_route(f'/{self.route_name}/{{id}}',
                          self.controller.get_by_id,
                          methods=['GET'])
        app.add_api_route(f'/{self.route_name}',
                          self.controller.create,
                          methods=['POST'])
        app.add_api_route(f'/{self.route_name}/{{id}}',
                          self.controller.update,
                          methods=['PUT'])
        app.add_api_route(f'/{self.route_name}/{{id}}',
                          self.controller.erase,
                          methods=['DELETE'])

class ProductRoute(BaseRoute):
    def __init__(self):
        super().__init__(ProductController(), 'products')

class CategoryRoute(BaseRoute):
    def __init__(self):
        super().__init__(CategoryController(), 'categories')

class AppRouter:
    def __init__(self, app):
        self.app = app
        self.routes = [ProductRoute(), CategoryRoute()]

    def register_routes(self):
        for route in self.routes:
            route.register_routes(self.app)

class Item(BaseModel):
    name: str
    price: float
    categoryid: int

class Category(BaseModel):
    name: str

@app.post("/products")
def create_product(item: Item):
    controller = ProductController()
    return controller.create(item.dict())

@app.put("/products/{id}")
def update_product(id: int, item: Item):
    controller = ProductController()
    return controller.update(id, item.dict())

@app.post("/categories")
def create_category(category: Category):
    controller = CategoryController()
    return controller.create(category.dict())

@app.put("/categories/{id}")
def update_category(id: int, category: Category):
    controller = CategoryController()
    return controller.update(id, category.dict())

router = AppRouter(app)
router.register_routes()
