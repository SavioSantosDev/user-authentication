# User autentications

Sistema para cadastro e autenticação de usuários utlizando uma arquitetura MVC.

## Modo de usar

Instale todas dependências e rode o comando `npm run dev` ou `yarn dev`, para ligar o servidor, e acesse: `http://localhost:3333`

## Sobre o sistema

Possui uma rota inicial com links para cadastro ou login do usuário, as rotas de login e cadastro proprieamente dito e uma rota privada com acesso restrito somente à usuários autenticados.

Foi utilizado uma arquitetura MVC onde o servidor vai servir as páginas para o cliente já com os dados devidamente preenchidos.

### Express

Utilizado para gerenciar as rotas do projeto, receber as requisições do cliente e devolver uma resposta apropriada para o mesmo.

### Middlewares

**helmet** - Uso recomendado pelo Node. Vai basicamente configurar de maneira adequada os cabeçalhos da aplicação para previnir ataques muito conhecidos.

**express-session** - Para armazenar o usuário autenticado e as flash messages. Para este projeto, como é apenas desenvolvimento, a sessão está sendo armazenada na memória mesmo.

**connect-flash** - Mensagens autodestrutivas, que serão utilizadas para dar feedback de sucesso ou erro para o usuário.

**csurf** - Criar um CSRF token que deverá ser postado pelo cliente em todas as requisições envolvedor envio de dados para o server, para evitar ataques de Cross-Site Request Forgery.

### Outras dependências

**sequelize e sqlite3** - Sequelize para lidar com os Models, Migrations e armazenar os dados no banco de dados (Sqlite).

**yup** - Biblioteca para lidar com as validações dos dados postado pelo cliente.

**ejs** - É a view engine utilizada para escrever código JavaScript dentro de HTML.

**bcryptjs** - Para encriptar/desincriptar a senha mandada pelo usuário e armazena-la dentro do banco de dados.

### Dependências de desenvolvimento

**nodemon** - Ficar observando sempre que houver mudanças na aplicação e atualizar o servidor.

**sucrase** - Utilizado em conjutno com o *nodemon* para converter código mais moderno de JavaScript em código legado, que pode ser entendido pelo Node.js

**eslint e prettier** - Para melhor organização do código, seguindo algumas boas práticas de codificação.


