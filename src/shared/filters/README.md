# EXCEPTION FILTERS NO NESTJS

Exception Filters são responsáveis por processar todas as exceções não tratadas na aplicação e enviar respostas apropriadas ao cliente.

## Conceitos principais

- Capturam exceções lançadas durante o processamento da requisição
- Permitem controle total sobre o fluxo de exceções
- Podem formatar respostas de erro de forma consistente
- Implementam a interface `ExceptionFilter`
- Usam o decorator `@Catch()` para especificar quais exceções capturar

## Estrutura básica

```typescript
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status = exception.getStatus();

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
```

## Tipos de Exception Filters

1. **Filtros específicos**: Capturam tipos específicos de exceções

   - `@Catch(HttpException)`
   - `@Catch(BadRequestException)`

2. **Filtros globais**: Capturam todas as exceções
   - `@Catch()` sem parâmetros

## Casos de uso comuns

- Padronização de respostas de erro
- Logging de exceções
- Transformação de erros técnicos em mensagens amigáveis
- Integração com sistemas de monitoramento
- Ocultar detalhes internos em produção
- Internacionalização de mensagens de erro

## Aplicação

### Método-específico

```typescript
@Post()
@UseFilters(new HttpExceptionFilter())
create(@Body() createDto: CreateDto) {}
```

### Controller-específico

```typescript
@Controller("cats")
@UseFilters(new HttpExceptionFilter())
export class CatsController {}
```

### Global

```typescript
// main.ts
app.useGlobalFilters(new HttpExceptionFilter());

// ou no módulo
{
  provide: APP_FILTER,
  useClass: HttpExceptionFilter,
}
```

## Ordem de execução

1. Middleware
2. Guards
3. Interceptors (antes)
4. Pipes
5. Route Handler
6. Interceptors (depois)
7. **Exception Filters** ← Último na cadeia

## Exceções HTTP built-in do NestJS

- `BadRequestException` (400)
- `UnauthorizedException` (401)
- `ForbiddenException` (403)
- `NotFoundException` (404)
- `MethodNotAllowedException` (405)
- `NotAcceptableException` (406)
- `RequestTimeoutException` (408)
- `ConflictException` (409)
- `GoneException` (410)
- `PayloadTooLargeException` (413)
- `UnsupportedMediaTypeException` (415)
- `UnprocessableEntityException` (422)
- `InternalServerErrorException` (500)
- `NotImplementedException` (501)
- `BadGatewayException` (502)
- `ServiceUnavailableException` (503)
- `GatewayTimeoutException` (504)

## Boas práticas

- Use filtros globais para tratamento consistente
- Crie filtros específicos para lógicas de negócio
- Não exponha detalhes sensíveis em produção
- Sempre faça log das exceções para debugging
- Retorne mensagens claras e acionáveis para o cliente
