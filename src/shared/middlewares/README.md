# MIDDLEWARE NO NESTJS

Middleware é uma função que é executada ANTES do manipulador de rota (route handler).

## Conceitos principais

- Middlewares têm acesso aos objetos Request e Response
- Podem executar qualquer código
- Podem modificar os objetos Request e Response
- Podem encerrar o ciclo request-response
- Podem chamar o próximo middleware na pilha usando next()

## No NestJS, middlewares podem ser:

1. Funções (functional middleware)
2. Classes com o método use() que implementam NestMiddleware

## Casos de uso comuns

- Logging de requisições
- Autenticação e autorização
- Validação de dados
- Manipulação de erros
- CORS
- Compressão de resposta
- Parsing de cookies/body

## Ordem de execução

1. Middleware
2. Guards
3. Interceptors (antes)
4. Pipes
5. Route Handler
6. Interceptors (depois)
7. Exception Filters

## Aplicação

- Middlewares são aplicados no módulo usando configure() do NestModule
- Podem ser aplicados globalmente ou em rotas específicas
