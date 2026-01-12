import { DataSource } from "typeorm";

const dataSource = new DataSource({
  type: "sqlite",
  database: "database/db.sqlite", // Caminho do banco de dados usado para migrações e CLI do TypeORM (deve coincidir com app.module.ts para consistência)
  entities: [__dirname + "/../**/*.entity.{js,ts}"],
  migrations: [__dirname + "/../migrations/*.{js,ts}"],
  synchronize: false,
  logging: true,
});

export default dataSource;
