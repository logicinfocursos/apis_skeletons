from flask import Flask, request, jsonify
import json

app = Flask(__name__)

with open('db.json') as f:
    db = json.load(f)

class BaseRepository:
    def __init__(self, entity):
        self.entity = entity

    def get_all(self):
        return db[self.entity]

    def get_by_id(self, id):
        return next((item for item in db[self.entity] if item['id'] == id), None)

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
        return jsonify(self.repository.get_all())

    def get_by_id(self, id):
        return jsonify(self.repository.get_by_id(id))

    def create(self, data):
        return jsonify(self.repository.create(data))

    def update(self, id, data):
        return jsonify(self.repository.update(id, data))

    def erase(self, id):
        return jsonify(self.repository.erase(id))

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
        app.add_url_rule(f'/{self.route_name}',
                         view_func=self.controller.get_all,
                         methods=['GET'],
                         endpoint=f'{self.route_name}_get_all')
        app.add_url_rule(f'/{self.route_name}/<int:id>',
                         view_func=self.controller.get_by_id,
                         methods=['GET'],
                         endpoint=f'{self.route_name}_get_by_id')
        app.add_url_rule(f'/{self.route_name}',
                         view_func=lambda: self.controller.create(request.json),
                         methods=['POST'],
                         endpoint=f'{self.route_name}_create')
        app.add_url_rule(f'/{self.route_name}/<int:id>',
                         view_func=lambda id: self.controller.update(id, request.json),
                         methods=['PUT'],
                         endpoint=f'{self.route_name}_update')
        app.add_url_rule(f'/{self.route_name}/<int:id>',
                         view_func=self.controller.erase,
                         methods=['DELETE'],
                         endpoint=f'{self.route_name}_erase')

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

if __name__ == '__main__':
    router = AppRouter(app)
    router.register_routes()
    app.run(port=3005)
