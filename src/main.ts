import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app/app.module";
import { ParseUuidIdPipe } from "./shared/pipes/parse-uuid-id.pipe";
// import { AddHeaderInterceptor } from "./shared/interceptors/add-header.interceptor";

// Função principal para inicializar a aplicação NestJS
async function bootstrap() {
  // Cria a instância da aplicação usando o módulo raiz
  const app = await NestFactory.create(AppModule);

  // Configuração do ValidationPipe global para validação de dados de entrada
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Remove propriedades não declaradas nos DTOs, evitando dados extras
      forbidNonWhitelisted: true, // Retorna erro se propriedades desconhecidas forem enviadas, garantindo segurança
      transform: true, // Converte automaticamente os tipos de dados conforme os DTOs
    }),
    new ParseUuidIdPipe(),
  );

  // Exemplo de como registrar interceptors globalmente:
  // app.useGlobalInterceptors(new AddHeaderInterceptor());
  // Interceptors globais são aplicados a TODAS as rotas da aplicação.
  // Alternativamente, use APP_INTERCEPTOR no AppModule para integração com DI.

  // Inicia o servidor na porta 3000
  await app.listen(3000);
}
bootstrap();
