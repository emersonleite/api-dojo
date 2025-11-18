import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app/app.module";

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
    })
  );

  // Inicia o servidor na porta 3000
  await app.listen(3000);
}
bootstrap();
