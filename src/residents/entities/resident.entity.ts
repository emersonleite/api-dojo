import { Exclude } from "class-transformer";
import { Notice } from "../../notices/entities/notice.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Role } from "../../shared/enums";

@Entity()
export class Resident {
  @PrimaryGeneratedColumn("uuid") // id de tipo UUID
  id: string;

  @Column({ type: "varchar", length: 50 })
  name: string;

  @Column({ unique: true }) // Garante que o e-mail seja único no banco
  email: string;

  @Column({ type: "varchar" })
  apartment: string;

  @Column({ type: "varchar" })
  building: string; // Bloco do condomínio

  @Column()
  @Exclude() // Exclui, na resposta, o envio do campo passwordHash
  passwordHash: string;

  @Column({ type: "varchar" })
  phone: string;

  // Define automaticamente a data de criação da entidade quando inserida no banco
  @CreateDateColumn()
  createdAt?: Date;

  // Define automaticamente a data de atualização da entidade sempre que modificada no banco
  @UpdateDateColumn()
  updatedAt?: Date;

  @Column({ type: "boolean", default: false })
  active: boolean;

  @Column({ type: "varchar", default: Role.COMMON })
  role: Role;

  // Relacionamento de um morador para muitos avisos, pois um morador pode criar vários avisos
  // OneToMany define o lado "um" da relação (1:N)
  // Primeiro parâmetro: entidade relacionada (Notice)
  // Segundo parâmetro: propriedade inversa que aponta de volta para esta entidade (notice.createdBy)
  // Este lado não cria coluna no banco, apenas permite acessar os avisos do morador
  @OneToMany(() => Notice, (notice) => notice.createdBy)
  notices: Notice[];
}
