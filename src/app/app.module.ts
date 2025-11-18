import { Module } from "@nestjs/common";
import { ResidentsModule } from "../residents/residents.module";
import { NoticesModule } from "../notices/notices.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { ClassSerializerInterceptor } from "@nestjs/common";
import { AppService } from "./app.service";

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
      autoLoadEntities: true, // Carrega entidades sem precisar especificá-las
      synchronize: true, // Configuração de sincronização automática (não recomendado em produção)
      migrations: [__dirname + "/../migrations/*.{js,ts}"],
    }),
    ResidentsModule,
    NoticesModule,
  ], // Importa os módulos de moradores e avisos
  providers: [
    {
      // O `APP_INTERCEPTOR` é um token especial do NestJS que permite registrar interceptores globalmente.
      // Isso significa que o interceptor configurado aqui será aplicado a todas as rotas do aplicativo,
      // sem a necessidade de registrá-lo manualmente em cada controller ou handler.
      provide: APP_INTERCEPTOR,
      // O `ClassSerializerInterceptor` é um interceptor embutido do NestJS que utiliza o pacote `class-transformer`.
      // Ele é usado para transformar e serializar objetos retornados pelas rotas antes de enviá-los como resposta HTTP.
      // Um uso típico é excluir ou formatar campos em entidades, como ocultar a senha do usuário,
      // utilizando decoradores como `@Exclude` ou `@Transform` nas entidades ou DTOs.
      useClass: ClassSerializerInterceptor,
    },
    AppService,
  ],
})
export class AppModule {}
