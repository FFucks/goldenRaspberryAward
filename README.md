API desenvolvida utilizando SQLite como banco de dados em memória.

A arquitetura e bastante simples, possui apenas o arquivo app.js que roda o express e os endpoints, o arquivo db.js para criação e manipulação dos dados e a pasta tests para os testes.

A aplicação está configurada para rodar na porta 8000 caso queira modificar necessário apenas alterar no arquivo app.js.

Para rodar a aplicação é necessário apenas utilizar o comando 'npm install' para instalar as dependencias, 'npm start' para startar o servidor, 'npm start:debug' para iniciar em modo debug e 'npm test' para rodar os testes.

Collection do postman também está disponivel caso queira utilizar os endpoints. existem apenas 2 endpoints:
/minMaxMovies (apresenta o resultado desejado do desafio)
/getMoviesList (imprime todos os filmes que estão no BD de memória)


