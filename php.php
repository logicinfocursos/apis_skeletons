<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header('Content-Type: application/json');

$db = json_decode(file_get_contents('db.json'), true);

$router = new AppRouter($db);
$router->route($_SERVER);

class BaseRoute {
    protected $controller;

    public function __construct($controller) {
        $this->controller = $controller;
    }

    public function getAll() {
        return $this->controller->getAll();
    }

    public function getById($id) {
        return $this->controller->getById($id);
    }

    public function create($data) {
        return $this->controller->create($data);
    }

    public function update($id, $data) {
        return $this->controller->update($id, $data);
    }

    public function erase($id) {
        return $this->controller->erase($id);
    }
}

class ProductRoute extends BaseRoute {
    public function __construct($db) {
        parent::__construct(new ProductController($db));
    }
}

class CategoryRoute extends BaseRoute {
    public function __construct($db) {
        parent::__construct(new CategoryController($db));
    }
}

class AppRouter {
    private $productRoute;
    private $categoryRoute;

    public function __construct($db) {
        $this->productRoute = new ProductRoute($db);
        $this->categoryRoute = new CategoryRoute($db);
    }

    public function route($request) {
        $uri = $request['REQUEST_URI'];
        $method = $request['REQUEST_METHOD'];
        $body = file_get_contents('php://input');

        if (preg_match('/\/product(\/(\d+))?/', $uri, $matches)) {
            $id = $matches[2] ?? null;
            $this->handle($this->productRoute, $method, $id, $body);
        } elseif (preg_match('/\/category(\/(\d+))?/', $uri, $matches)) {
            $id = $matches[2] ?? null;
            $this->handle($this->categoryRoute, $method, $id, $body);
        } else {
            http_response_code(404);
            echo "Not found";
        }
    }

    private function handle($route, $method, $id, $body) {
        switch ($method) {
            case 'GET':
                if ($id) {
                    echo json_encode($route->getById($id));
                } else {
                    echo json_encode($route->getAll());
                }
                break;
            case 'POST':
                echo json_encode($route->create(json_decode($body, true)));
                break;
            case 'PUT':
            case 'PATCH':
                echo json_encode($route->update($id, json_decode($body, true)));
                break;
            case 'DELETE':
                echo json_encode($route->erase($id));
                break;
            default:
                http_response_code(405);
                echo "Method not allowed";
                break;
        }
    }
}

class BaseController {
    protected $repository;

    public function __construct($repository) {
        $this->repository = $repository;
    }

    public function getAll() {
        $result = $this->repository->getAll();
        $objectList = array_map([$this->repository, 'mapObject'], $result);
        return $objectList;
    }

    public function getById($id) {
        $result = $this->repository->getById($id);
        $mappedObject = $this->repository->mapObject($result);
        return $mappedObject;
    }

    public function create($data) {
        return $this->repository->create($data);
    }

    public function update($id, $data) {
        return $this->repository->update($id, $data);
    }

    public function erase($id) {
        return $this->repository->erase($id);
    }
}

class ProductController extends BaseController {
    public function __construct($db) {
        parent::__construct(new ProductRepository($db));
    }
}

class CategoryController extends BaseController {
    public function __construct($db) {
        parent::__construct(new CategoryRepository($db));
    }
}

class BaseRepository {
    protected $entity;
    protected $db;

    public function __construct($entity, $db) {
        $this->entity = $entity;
        $this->db = $db;
    }

    public function getAll() {
        return $this->db[$this->entity];
    }

    public function getById($id) {

        foreach ($this->db[$this->entity] as $object) {
            if (intval($object['id']) === intval($id)) {              
                return $object;
            }
        }
        return null;
    }

    public function create($data) {
        $data['id'] = count($this->db[$this->entity]) + 1;
        array_push($this->db[$this->entity], $data);
        return $data;
    }

    public function update($id, $data) {
        foreach ($this->db[$this->entity] as $index => $object) {
            if (intval($object['id']) === intval($id)) {
                $this->db[$this->entity][$index] = array_merge($object, $data);
                return $this->db[$this->entity][$index];
            }
        }
        return null;
    }

    public function erase($id) {
        foreach ($this->db[$this->entity] as $index => $object) {
            if (intval($object['id']) === intval($id)) {
                array_splice($this->db[$this->entity], $index, 1);
                return $this->db[$this->entity];
            }
        }
        return null;
    }

    public function mapObject($object) {
        $newObject = [];
        foreach ($object as $key => $value) {
            $newObject[$key] = $value;
        }
        return $newObject;
    }
}

class ProductRepository extends BaseRepository {
    public function __construct($db) {
        parent::__construct('product', $db);
    }
}

class CategoryRepository extends BaseRepository {
    public function __construct($db) {
        parent::__construct('category', $db);
    }
}
