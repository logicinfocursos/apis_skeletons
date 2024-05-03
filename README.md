# apis_skeletons
github[apis_skeletons](https://github.com/logicinfocursos/apis_skeletons)

Fico feliz com o seu interesse nesse código realizado com grande carinho. A ideia é ter um template básico para que você possa usar como ponto de partida para os seus próximos projetos de api.

Optei em criar um arquivo para cada linguagem, afim de facilitar a comparação entre os projetos, mas a ideia é utilizar o padrão de projetos MVC e para tanto, sugiro a seguinte estrutura de pastas:
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

### referências:
- [node.js](https://nodejs.org/en/)
- [npm](https://www.npmjs.com/)
- [javascript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)
- [typescript](https://www.typescriptlang.org/)
- [express](https://expressjs.com/)
- [npm express](https://www.npmjs.com/package/express)
- [cors](https://developer.mozilla.org/pt-BR/docs/Web/HTTP/CORS)
- [npm cors](https://www.npmjs.com/package/cors)

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

### referências:
- [node.js](https://nodejs.org/en/)
- [npm](https://www.npmjs.com/)
- [javascript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)
- [typescript](https://www.typescriptlang.org/)
- [express](https://expressjs.com/)
- [npm express](https://www.npmjs.com/package/express)
- [cors](https://developer.mozilla.org/pt-BR/docs/Web/HTTP/CORS)
- [npm cors](https://www.npmjs.com/package/cors)

### plugins vscode
- [node essentials](https://marketplace.visualstudio.com/items?itemName=afractal.node-essentials)
-[javascript and typescript nightly](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-typescript-next)
- [live server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)
- [prettier - code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [eslint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [thunder client](https://marketplace.visualstudio.com/items?itemName=rangav.vscode-thunder-client)
- [mysql](https://marketplace.visualstudio.com/items?itemName=cweijan.vscode-mysql-client2)
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
