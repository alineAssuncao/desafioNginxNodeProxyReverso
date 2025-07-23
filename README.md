# 🌀 Desafio Nginx + Node.js: Proxy Reverso com Docker

Neste desafio você colocará em prática os conceitos de **proxy reverso com Nginx**. A proposta é simples e objetiva: quando um usuário acessar o Nginx, ele deve redirecionar a requisição para uma aplicação Node.js que, por sua vez, adiciona um registro no banco de dados MySQL e retorna uma página HTML com os nomes cadastrados.

## ✨ Resultado Esperado

Ao acessar `http://localhost:8080`, o usuário verá:

```html
<h1>Full Cycle Rocks!</h1>
- Uma lista de nomes cadastrados no banco de dados.
```

## 🔧 Tecnologias Utilizadas
- Node.js (JavaScript)
- Nginx
- MySQL
- Docker & Docker Compose
  
## 📁 Estrutura do Projeto
- /node-app: Aplicação Node.js
- /nginx: Configuração personalizada do Nginx
- docker-compose.yml: Orquestra os containers e serviços
- Volume configurado na aplicação para facilitar o ambiente de desenvolvimento
  
## 🚀 Como Executar
1. Clone o repositório:
  ```
  git clone https://github.com/alineAssuncao/desafioNginxNodeProxyReverso.git
  cd desafioNginxNodeProxyReverso
  ```

2. Execute os serviços com Docker Compose:

  ```
  docker-compose up -d
  ```

3. Acesse a aplicação via navegador:

  ```
  http://localhost:8080
  ```

## 📦 docker-compose.yml
O arquivo docker-compose.yml está configurado para subir automaticamente os três serviços:
- Node.js: Aplicação que cadastra nomes no banco e retorna HTML.
- MySQL: Banco de dados com a tabela people.
- Nginx: Responsável por encaminhar as requisições para o Node.js na porta 8080.




