# apis_skeletons
github[apis_skeletons](https://github.com/logicinfocursos/apis_skeletons)

Fico feliz com o seu interesse nesse código realizado com grande carinho. A ideia é ter um template básico para que você possa usar como ponto de partida para os seus próximos projetos de api.

A ideia é apresentar estruturas de código em diferentes estágios, inicialmente sem acesso a banco de dados e depois usando sqlite e outros sgbd (mysql, postgres, mongodb, firebase, reddis, etc).Também teremos uma versão implementando orms de acordo com a tecnologia empregada.

Inicialmente iremos concentrar todas as funcionalidades concentradas em arquivo único, afim de facilitar a comparação entre os projetos. Independente da tecnologia tentaremos manter o padrão de projetos MVC. Tendo isso em mente, implementaremos a seguinte estrutura de pastas:
<pre>
.
├── src
│   ├── config
│   ├── controllers
│   │   ├── BaseController
│   │   ├── ProductController
│   │   └── CategoryController
│   ├── models
│   │   ├── IEntity
│   │   ├── Product
│   │   └── Category
│   ├── repositories
│   │   ├── BaseRepository
│   │   ├── ProductRepository
│   │   └── CategoryRepository
│   ├── routes
│   │   ├── Router
│   │   ├── BaseRoute
│   │   ├── ProductRoute
│   │   └── CategoryRoute
│   └── arquivo inicial (app / main / index)
├── assets
</pre>

no momento já disponibilizamos códigos em
- node js com javascript + express (arquivo: [node_javascript_express.js](https://github.com/logicinfocursos/apis_skeletons/blob/main/node_javascript_express.js))
- node js com typescript + express (arquivo:  [node_typescript_express.ts](https://github.com/logicinfocursos/apis_skeletons/blob/main/node_typescript_express.ts))
- php (arquivo:  [php.php](https://github.com/logicinfocursos/apis_skeletons/blob/main/php.php))

## 1 - api em node js c/ javascript e express
arquivo: [node_javascript_express.js](https://github.com/logicinfocursos/apis_skeletons/blob/main/node_javascript_express.js)

Primeiro, você precisa ter o [node.js](https://nodejs.org/en/) e o [npm](https://www.npmjs.com/) (gerenciador de pacotes do [node.js](https://nodejs.org/en/)) instalados em seu sistema. Se você ainda não os tem, você pode baixá-los do site oficial do [node.js](https://nodejs.org/en/).

Agora, você precisa criar um novo diretório para o seu projeto e inicializar um novo projeto [node.js](https://nodejs.org/en/). No terminal, navegue até onde você quer criar o projeto e execute os seguintes comandos:
<pre>
c:\my_api> mkdir my_api
cd my-my_api
npm init -y
</pre>

Em seguida, você pode instalar as dependências necessárias para o seu projeto. No caso deste projeto, você precisa do [express](https://expressjs.com/) e cors. Você pode instalá-los com o seguinte comando:
<pre>
c:\my_api> npm install express cors
</pre>

Você pode automatizar o processo através do [nodemon](https://nodemon.io/), siga os passos abaixo:

Primeiro, instale o [nodemon](https://nodemon.io/) como uma dependência de desenvolvimento em seu projeto. Você pode fazer isso usando o [npm](https://www.npmjs.com/) (Node Package Manager) com o seguinte comando no terminal:

<pre>
c:\my_api> npm install --save-dev nodemon
</pre>

Em seguida, você precisa configurar o [nodemon](https://nodemon.io/)  para iniciar o seu aplicativo. Para isso, abra o arquivo package.json do seu projeto e adicione uma nova entrada no objeto scripts. Por exemplo, você pode adicionar um script chamado "start" que inicia o seu aplicativo usando o [nodemon](https://nodemon.io/):

<pre>
  "scripts": {
    "dev": "node index.js",
    "start": "nodemon index.js"
},
</pre>

Neste exemplo, index.js é o arquivo principal do seu aplicativo. Substitua pelo nome do arquivo principal do seu projeto, se for diferente.

Agora, você pode iniciar o seu aplicativo com o [nodemon](https://nodemon.io/) usando o seguinte comando no terminal:

<pre>
c:\my_api> npm run start
</pre>

Com isso, o [nodemon](https://nodemon.io/) irá iniciar o seu aplicativo e reiniciá-lo automaticamente sempre que um arquivo for alterado. Isso pode ser muito útil durante o desenvolvimento, pois você não precisa parar e iniciar o seu aplicativo manualmente toda vez que fizer uma alteração.

esse é o arquivo package.json completo
<pre>
{
  "name": "api",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "type": "module",
  "scripts": {
    "dev": "node index.js",
    "start": "nodemon index.js"
},
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "cors": "^2.8.5",
    "express": "^4.19.2"
  },
  "devDependencies": {
    "nodemon": "^3.1.0"
  }
}
</pre>
Agora, você pode iniciar o projeto com o comando npm start
<pre>
c:\my_api> npm start
</pre>


## 2 - api em node js c/ typescript e express
arquivo: [node_typescript_express.ts](https://github.com/logicinfocursos/apis_skeletons/blob/main/node_typescript_express.ts)

Agora chegou a vez de usar o [typescript](https://www.typescriptlang.org/) para aprimorar a nossa api em [node.js](https://nodejs.org/en/).

Primeiro, você precisa ter o [node.js](https://nodejs.org/en/) e o [npm](https://www.npmjs.com/) (gerenciador de pacotes do [node.js](https://nodejs.org/en/)) instalados em seu sistema. Se você ainda não os tem, você pode baixá-los do site oficial do [node.js](https://nodejs.org/en/).

Em seguida, você pode instalar o [typescript](https://www.typescriptlang.org/) globalmente em seu sistema usando o npm. Abra um terminal e execute o seguinte comando:
<pre>
c:\my_api> npm install -g typescript
</pre>

Agora, você precisa criar um novo diretório para o seu projeto e inicializar um novo projeto [node.js](https://nodejs.org/en/). No terminal, navegue até onde você quer criar o projeto e execute os seguintes comandos:
<pre>
c:\my_api> mkdir my-project
cd my-project
npm init -y
</pre>

Em seguida, você pode instalar as dependências necessárias para o seu projeto. No caso deste projeto, você precisa do [express](https://expressjs.com/) e cors. Você pode instalá-los com o seguinte comando:
<pre>
c:\my_api> npm install express cors
</pre>

Para usar o [typescript](https://www.typescriptlang.org/), você também precisará dos tipos [typescript](https://www.typescriptlang.org/) para essas bibliotecas. Você pode instalá-los com o seguinte comando:
<pre>
c:\my_api> npm install @types/express @types/cors
</pre>

Agora, você pode criar um novo arquivo tsconfig.json na raiz do seu projeto. Este arquivo é usado para configurar o compilador [typescript](https://www.typescriptlang.org/). Você pode criar um básico com o seguinte comando:
<pre>
c:\my_api> tsc --init
</pre>

Finalmente, você pode copiar o código [typescript](https://www.typescriptlang.org/) para um novo arquivo .ts em seu projeto, por exemplo index.ts

Para executar o projeto, você precisará compilar o código [typescript](https://www.typescriptlang.org/) para [javascript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript) e, em seguida, executar o código [javascript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript) resultante com o Node.js. Você pode fazer isso com os seguintes comandos:
<pre>
c:\my_api> tsc
c:\my_api> node index.js
</pre>

O comando tsc compila todo o código [typescript](https://www.typescriptlang.org/) em seu projeto para [javascript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript). O comando node index.js executa o arquivo JavaScript resultante.

Se você quiser automatizar esse processo, você pode adicionar um script start ao seu arquivo package.json que faz isso por você. Aqui está como você pode fazer isso:
<pre>
"scripts": {
    "start": "tsc && node index.js"
}
</pre>

esse é o arquivo package.json completo
<pre>
{
  "name": "api_typescript",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "tsc && node index.js"
},
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "@types/cors": "^2.8.17",
    "@types/express": "^4.17.21",
    "cors": "^2.8.5",
    "express": "^4.19.2"
  }
}

</pre>
Agora, você pode iniciar o projeto com o comando npm start
<pre>
c:\my_api> npm start
</pre>

### referências node:
- [node.js](https://nodejs.org/en/)
- [npm](https://www.npmjs.com/)
- [javascript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)
- [typescript](https://www.typescriptlang.org/)
- [express](https://expressjs.com/)
- [npm express](https://www.npmjs.com/package/express)
- [cors](https://developer.mozilla.org/pt-BR/docs/Web/HTTP/CORS)
- [npm cors](https://www.npmjs.com/package/cors)

### plugins vscode p/node
- [node essentials](https://marketplace.visualstudio.com/items?itemName=afractal.node-essentials)
- [javascript and typescript nightly](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-typescript-next)


## 3 - api em php
arquivo: [php.php](https://github.com/logicinfocursos/apis_skeletons/blob/main/php.php)

Chegou a vez de prepararmos um código de api em [php](https://www.php.net/). A estratégia nesse primeiro momento é usar um código sem dependências externas, apenas php puro. Também iremos abrir mão do uso do [composer](https://getcomposer.org/) e deixaremos de lado o uso de [namespaces](https://www.php.net/manual/pt_BR/language.namespaces.definition.).

Agora, você precisa criar um novo diretório para o seu projeto e inicializar um novo projeto [php](https://www.php.net/). No terminal, navegue até onde você quer criar o projeto e execute os seguintes comandos:
<pre>
c:\my_api> mkdir my_api
cd my-my_api
</pre>

Normalmente os projetos em [php](https://www.php.net/) iniciam com uma arquivo de nome index.php.

Para executar o seu projeto php
<pre>
c:\my_api> php -S localhost:3003
</pre>

Com isso, a sua api em [php](https://www.php.net/) está pronta para ser utilizada.

### referências em php
- [php](https://www.php.net/manual/pt_BR/index.php)


### plugins vscode para php
- [PHP Debug](https://marketplace.visualstudio.com/items?itemName=xdebug.php-debug)
- [PHP Intelephense](https://marketplace.visualstudio.com/items?itemName=bmewburn.vscode-intelephense-client)
- [PHP Extension Pack](https://marketplace.visualstudio.com/items?itemName=xdebug.php-pack)
- [PHP IntelliSense](https://marketplace.visualstudio.com/items?itemName=zobo.php-intellisense)
- [PHP](https://marketplace.visualstudio.com/items?itemName=DEVSENSE.phptools-vscode)


## 4 - api em python com flask
Instale o [python](https://www.python.org/downloads/) (se ainda não estiver instalado). Você pode baixá-lo do site oficial do [python](https://www.python.org/downloads/).

Agora vamos iniciar o projeto da nossa api em [python](https://www.python.org/downloads/) usando o framework [flask](https://flask.palletsprojects.com/en/3.0.x/). Os primeiros passos serão através do terminal:

<pre>
c:\> mkdir my_api
c:\> cd my-my_api
c:\my-my_api> 
</pre>

Em [python](https://www.python.org/downloads/) é comum usar um recurso imensamente importante chamado de ambiente virtual ([venv](https://docs.python.org/3/library/venv.html)), isso irá permitir instalar versões de dependências que afetarão apenas o projeto em questão. Na prática você poderá inclusive manter projetos em versões diferentes do [python](https://www.python.org/downloads/).

<pre>
c:\my-my_api> python -m venv myenv
c:\my-my_api> myenv\Scripts\activate
(myenv) c:\my-my_api> pip install flask
</pre>

Onde:
- na primeira linha criamos um ambiente virtual de nome myenv
-depois "ativamos" esse ambiente usando "activate" (esse procedimento é para o windows, existem pequenas variações do procedimento de ativação no mac e no linux)
- com o ambiente virtual já ativo, temos a informação "(myenv)", à esquerda do próprio prompt do terminal, já podemos instalar o [flask](https://flask.palletsprojects.com/en/3.0.x/)
- a instalação das dependências em [python](https://www.python.org/downloads/) ocorrem com o uso do comando [pip](https://pypi.org/) que funciona de forma análoga ao [npm](https://www.npmjs.com/) no [node js](https://nodejs.org/en).

Pronto, agora podemos abrir o visual studio code ou a ide de sua preferência para iniciarmos o projeto.

Um detalhe importante é que podemos criar um arquivo com todas as dependências do projeto. Isso será útil pois podemos baixar as dependências usando apenas esse arquivo. Isso funciona de forma análoga ao package.json do node js.

Caso deseje criar o arquivo de dependências (ação recomendada), no terminal digite:
<pre>
(myenv) c:\my-my_api> pip freeze > requirements.txt
</pre>

Se depois você baixar esse projeto aqui no github e quiser instalar as dependências do projeto através do "requirements.txt", basta fazê-lo da seguinte forma:
<pre>
c:\my-my_api> myenv\Scripts\activate
(myenv) c:\my-my_api> pip install -r requirements.txt
</pre>

esse é o conteúdo do arquivo requirements.txt
<pre>
blinker==1.8.1
click==8.1.7
colorama==0.4.6
Flask==3.0.3
itsdangerous==2.2.0
Jinja2==3.1.3
MarkupSafe==2.1.5
Werkzeug==3.0.2
</pre>

Agora basta você criar o arquivo inicial para o seu projeto, por exemplo app.py e copiar o conteúdo do arquivo com o código da api em python usando o flask arquivo [python_flask.py](https://github.com/logicinfocursos/apis_skeletons/blob/main/python_flask.py).

para executar o projeto:
<pre>
(myenv) c:\my-my_api> python app.py
</pre>

Pronto, o servidor estará executando na porta 3005, ou seja [localhost:3005](http://localhost:3005).

Primeiro você ativa o ambiente virtual e depois instala as dependências do projeto

Instale o [flask](https://flask.palletsprojects.com/en/3.0.x/). Abra o terminal no Visual Studio Code e digite o seguinte comando: pip install flask

Salve o código acima em um arquivo chamado app.py no seu workspace do Visual Studio Code.

No terminal do Visual Studio Code, navegue até o diretório onde você salvou app.py e digite o seguinte comando para executar o aplicativo: python app.py

O servidor Flask deve agora estar rodando na porta 3001. Você pode acessá-lo em um navegador web em http://localhost:3001.

### referências em python
- [python](https://www.python.org/downloads/)
- [flask](https://flask.palletsprojects.com/en/3.0.x/)
- [venv](https://docs.python.org/3/library/venv.html)

### plugins para o vscode para o python
- [python](https://marketplace.visualstudio.com/items?itemName=ms-python.python)
- [python debugger](https://marketplace.visualstudio.com/items?itemName=ms-python.debugpy)


## 5 - api em python com fastapi
Instale o [python](https://www.python.org/downloads/) (se ainda não estiver instalado). Você pode baixá-lo do site oficial do [python](https://www.python.org/downloads/).

Agora vamos iniciar o projeto da nossa api em [python](https://www.python.org/downloads/) usando o framework [fastapi](https://fastapi.tiangolo.com/). Os primeiros passos serão através do terminal:

<pre>
c:\> mkdir my_api
c:\> cd my-my_api
c:\my-my_api> 
</pre>

Em [python](https://www.python.org/downloads/) é comum usar um recurso imensamente importante chamado de ambiente virtual ([venv](https://docs.python.org/3/library/venv.html)), isso irá permitir instalar versões de dependências que afetarão apenas o projeto em questão. Na prática você poderá inclusive manter projetos em versões diferentes do [python](https://www.python.org/downloads/).

<pre>
c:\my-my_api> python -m venv myenv
c:\my-my_api> myenv\Scripts\activate
(myenv) c:\my-my_api> pip install fastapi
(myenv) c:\my-my_api> pip install uvicorn
</pre>

Onde:
- na primeira linha criamos um ambiente virtual de nome myenv
-depois "ativamos" esse ambiente usando "activate" (esse procedimento é para o windows, existem pequenas variações do procedimento de ativação no mac e no linux)
- com o ambiente virtual já ativo, temos a informação "(myenv)", à esquerda do próprio prompt do terminal, já podemos instalar o [fastapi](https://fastapi.tiangolo.com/)

- a instalação das dependências em [python](https://www.python.org/downloads/) ocorrem com o uso do comando [pip](https://pypi.org/) que funciona de forma análoga ao [npm](https://www.npmjs.com/) no [node js](https://nodejs.org/en).

Pronto, agora podemos abrir o visual studio code ou a ide de sua preferência para iniciarmos o projeto.

Um detalhe importante é que podemos criar um arquivo com todas as dependências do projeto. Isso será útil pois podemos baixar as dependências usando apenas esse arquivo. Isso funciona de forma análoga ao package.json do node js.

Caso deseje criar o arquivo de dependências (ação recomendada), no terminal digite:
<pre>
(myenv) c:\my-my_api> pip freeze > requirements.txt
</pre>

Se depois você baixar esse projeto aqui no github e quiser instalar as dependências do projeto através do "requirements.txt", basta fazê-lo da seguinte forma:
<pre>
c:\my-my_api> myenv\Scripts\activate
(myenv) c:\my-my_api> pip install -r requirements.txt
</pre>

esse é o conteúdo do arquivo requirements.txt
<pre>
annotated-types==0.6.0
anyio==4.3.0
certifi==2024.2.2
click==8.1.7
colorama==0.4.6
dnspython==2.6.1
email_validator==2.1.1
fastapi==0.111.0
fastapi-cli==0.0.2
h11==0.14.0
httpcore==1.0.5
httptools==0.6.1
httpx==0.27.0
idna==3.7
Jinja2==3.1.3
markdown-it-py==3.0.0
MarkupSafe==2.1.5
mdurl==0.1.2
orjson==3.10.3
pydantic==2.7.1
pydantic_core==2.18.2
Pygments==2.17.2
python-dotenv==1.0.1
python-multipart==0.0.9
PyYAML==6.0.1
rich==13.7.1
shellingham==1.5.4
sniffio==1.3.1
starlette==0.37.2
typer==0.12.3
typing_extensions==4.11.0
ujson==5.9.0
uvicorn==0.29.0
watchfiles==0.21.0
websockets==12.0
</pre>

Agora basta você criar o arquivo inicial para o seu projeto, por exemplo main.py e copiar o conteúdo do arquivo com o código da api em python usando o flask arquivo [python_flask.py](https://github.com/logicinfocursos/apis_skeletons/blob/main/python_flask.py).

para executar o projeto:
<pre>
(myenv) c:\my-my_api> uvicorn main:app --reload --port 3004
</pre>

Neste comando, main:app indica que o [uvicorn](https://www.uvicorn.org/) deve importar um objeto chamado app do módulo main.py. A opção --reload indica que o servidor deve ser reiniciado sempre que um arquivo for modificado. A opção --port 3004 indica que o servidor deve ser disponibilizado na porta 3004, , ou seja [localhost:3004](http://localhost:3004).

### referências em python
- [python](https://www.python.org/downloads/)
- [fastapi](https://fastapi.tiangolo.com/)
- [uvicorn](https://www.uvicorn.org/)
- [venv](https://docs.python.org/3/library/venv.html)

### plugins para o vscode para o python
- [python](https://marketplace.visualstudio.com/items?itemName=ms-python.python)
- [python debugger](https://marketplace.visualstudio.com/items?itemName=ms-python.debugpy)


### referências de uso geral
- [vscode](https://code.visualstudio.com/download)
- [postman](https://www.postman.com/downloads/)
- [insomnia](https://insomnia.rest/download)
- [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/)

### plugins vscode de uso geral
- [live server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)
- [prettier - code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [eslint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [thunder client](https://marketplace.visualstudio.com/items?itemName=rangav.vscode-thunder-client)

# sobre a logicinfo

somos uma consultoria em T.I. e atuamos com desenvolvimento de aplicações para todos os segumentos e mantemos também uma estrutura de treinamento com as melhores soluções para o aprendizado em programação.

alguns de nossos serviços:

- desenvolvimento de aplicações mobile, web e desktop
- a.i. generative - tenha uma i.a. focada em seu negócio, atendendo os seus clientes e fornecedores por whatsapp, chat e u.r.a.

visite o nosso site:
[logicinfo.com.br](https://logicinfo.com.br)

fale consoco:
whatsapp: [11 9 8627 4173](11-9-8627-4173)
e-mail: [contato@logicinfo.com.br](contato@logicinfo.com.br)
