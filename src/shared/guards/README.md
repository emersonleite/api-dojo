# GUARDS NO NESTJS

Guards são responsáveis por determinar se uma requisição deve ser processada pelo manipulador de rota ou não.

## Conceitos principais

- Determinam se uma requisição será tratada pelo route handler
- Têm acesso ao contexto de execução (ExecutionContext)
- Executam APÓS middlewares e ANTES de interceptors
- Implementam a interface `CanActivate`
- Retornam um booleano (ou Promise/Observable de booleano)
- Focados em lógica de autorização e autenticação

## Estrutura básica

```typescript
@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return validateRequest(request);
  }
}
```

## Tipos de Guards

1. **Authentication Guards**: Verificam se o usuário está autenticado

   - Validação de tokens JWT
   - Verificação de sessões
   - API key validation

2. **Authorization Guards**: Verificam se o usuário tem permissões

   - Role-based access control (RBAC)
   - Permission-based access
   - Resource ownership

3. **Business Logic Guards**: Verificam condições específicas
   - Feature flags
   - Rate limiting
   - Validações customizadas

## Casos de uso comuns

- Proteção de rotas que exigem autenticação
- Controle de acesso baseado em roles (admin, user, etc.)
- Verificação de permissões específicas
- Validação de tokens e credenciais
- Implementação de políticas de segurança
- Rate limiting por usuário ou endpoint
- Verificação de propriedade de recursos

## Aplicação

### Método-específico

```typescript
@Post()
@UseGuards(AuthGuard)
create(@Body() createDto: CreateDto) {}
```

### Controller-específico

```typescript
@Controller("cats")
@UseGuards(AuthGuard)
export class CatsController {}
```

### Global

```typescript
// main.ts
app.useGlobalGuards(new AuthGuard());

// ou no módulo
{
  provide: APP_GUARD,
  useClass: AuthGuard,
}
```

## Ordem de execução

1. Middleware
2. **Guards** ← Executam neste ponto
3. Interceptors (antes)
4. Pipes
5. Route Handler
6. Interceptors (depois)
7. Exception Filters

## Diferenças importantes

### Guards vs Middleware

- **Middleware**: Não sabe qual handler será executado após next()
- **Guards**: Têm acesso ao ExecutionContext, sabem exatamente qual handler será executado

### Guards vs Interceptors

- **Guards**: Executam antes, focados em autorização (sim/não)
- **Interceptors**: Executam antes e depois, focados em transformação de dados

## Exceções em Guards

Quando um guard retorna `false` ou lança uma exceção:

```typescript
throw new UnauthorizedException("Acesso negado");
throw new ForbiddenException("Permissão insuficiente");
```

## Combinando múltiplos Guards

```typescript
@UseGuards(AuthGuard, RolesGuard, PermissionsGuard)
```

Os guards são executados na ordem especificada. Se qualquer guard retornar `false`, os seguintes não são executados.

## Boas práticas

- Mantenha guards simples e focados em uma responsabilidade
- Use guards para autorização, não para lógica de negócio complexa
- Lance exceções descritivas quando o acesso for negado
- Utilize o ExecutionContext para acessar metadados customizados
- Combine guards com decorators customizados para melhor legibilidade
