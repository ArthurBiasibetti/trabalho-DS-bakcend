import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { UserModel } from '../models';
import { UsuarioModel } from './Usuario';

@Entity('cargo')
export class CargoModel {
  @PrimaryGeneratedColumn({ primaryKeyConstraintName: 'pk_cargo_id' })
  id: number;

  @Column()
  nome: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @OneToMany((type) => UsuarioModel, (usuarioModel) => usuarioModel.cargo)
  usuarios: UsuarioModel[];
}
