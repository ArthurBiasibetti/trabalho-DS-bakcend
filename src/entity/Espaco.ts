import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { EspacoInventarioModel } from './EspacoInventario';

@Entity('espaco')
export class EspacoModel {
  @PrimaryGeneratedColumn({ primaryKeyConstraintName: 'pk_espaco_id' })
  id: number;

  @Column()
  nome: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @OneToMany(
    (type) => EspacoInventarioModel,
    (espacoInventario) => espacoInventario.espaco
  )
  espacosInventario: EspacoInventarioModel[];
}
