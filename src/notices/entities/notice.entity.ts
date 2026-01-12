import { Resident } from "../../residents/entities/resident.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class Notice {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", length: 50 })
  title: string;

  @Column({ type: "varchar", length: 250 })
  description: string;

  // Adaptar para ENUM
  @Column({ type: "varchar" })
  priority: string;

  // Adaptar para ENUM
  @Column({ type: "varchar" })
  status: string;

  @CreateDateColumn()
  createdAt?: Date;

  //Criar relacionamento com Resident
  // Relação de muitos para um, pois um morador pode criar vários avisos
  // Muitos avisos podem estar relacionados a uma pessoa
  @ManyToOne(() => Resident, { onDelete: "CASCADE" }) // onDelete: "CASCADE" - Se o morador (Resident) for deletado, todos os avisos criados por ele também serão deletados automaticamente
  @JoinColumn({ name: "createdBy" }) // JoinColumn especifica qual coluna armazena a chave estrangeira (FK)
  createdBy: Resident;

  @UpdateDateColumn()
  updatedAt?: Date;
}
