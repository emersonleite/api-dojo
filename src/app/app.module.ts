import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from "@nestjs/common";
import { ResidentsModule } from "../residents/residents.module";
import { NoticesModule } from "../notices/notices.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from "@nestjs/core";
import { ClassSerializerInterceptor } from "@nestjs/common";
import { AppService } from "./app.service";
import { SimpleMiddleware } from "src/shared/middlewares/simple.middleware";
import { OtherMiddleware } from "src/shared/middlewares/other.middleware";
import { NotFoundExceptionError } from "src/shared/filters/not-found.filter";
import { IsFromAgent } from "src/shared/guards/is-from-agent-api-dog.guard";

/**
 * O módulo principal da aplicação (AppModule).
 * Aqui importamos os módulos de moradores (ResidentsModule) e avisos (NoticesModule),
 *  * conectando todos os recursos relacionados com o aplicativo principal.
 */
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "sqlite",
      database: "database/db.sqlite",
      // Caminho do banco de dados usado em runtime pela aplicação (deve coincidir com data-source.ts para consistência)
      autoLoadEntities: true,
      // Carrega automaticamente todas as entidades decoradas com @Entity() no projeto, evitando listá-las manualmente
      synchronize: true,
      // synchronize: Atualiza automaticamente o schema do banco ao iniciar a aplicação com base nas entidades
      // DESENVOLVIMENTO: true - Facilita prototipagem rápida sem precisar criar migrations
      // PRODUÇÃO: false - Pode causar perda de dados, remover colunas ou alterar tipos inesperadamente
      // Para produção, sempre use migrations (npm run migration:generate e npm run migration:run)
      migrations: [__dirname + "/../migrations/*.{js,ts}"],
    }),
    ResidentsModule,
    NoticesModule,
  ], // Importa os módulos de moradores e avisos
  providers: [
    {
      // APP_INTERCEPTOR: Token especial do NestJS para registro de interceptors globais via Dependency Injection.
      // Vantagens sobre app.useGlobalInterceptors():
      // 1. Permite injeção de dependências no interceptor
      // 2. Integração completa com o sistema de módulos do NestJS
      // 3. Pode ser sobrescrito em módulos específicos
      provide: APP_INTERCEPTOR,

      // ClassSerializerInterceptor: Interceptor nativo que serializa entidades antes de retorná-las ao cliente.
      // Usa decorators do class-transformer para controlar a serialização:
      // - @Exclude(): Remove campos da resposta (ex: senhas, tokens)
      // - @Expose(): Expõe apenas campos específicos
      // - @Transform(): Transforma valores antes de enviar
      // Exemplo: @Exclude() password: string; // Este campo nunca será retornado na API
      useClass: ClassSerializerInterceptor,
    },
    { provide: APP_FILTER, useClass: NotFoundExceptionError },
    {
      // APP_GUARD: Token para registro de guards globais via Dependency Injection.
      // Guards globais são executados em TODAS as rotas antes dos handlers.
      // IsFromAgent: Verifica se a requisição vem de um user-agent específico (API Dog ou similar)
      // Para desabilitar em rotas específicas, use metadata customizado com @SetMetadata()
      provide: APP_GUARD,
      useClass: IsFromAgent,
    },
    AppService,
  ],
})
export class AppModule implements NestModule {
  /* Aplicando os middlewares. A ordem em apply determina a ordem de execução */
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SimpleMiddleware, OtherMiddleware).forRoutes({
      path: "residents",
      method: RequestMethod.ALL,
    });
  }
}
