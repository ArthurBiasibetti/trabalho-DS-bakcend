import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { UserModel } from '../models';
import { UsuarioModel } from './User';

@Entity('cargos')
export class CargoModel {
  @PrimaryGeneratedColumn({ primaryKeyConstraintName: 'pk_cargo_id' })
  id: number;

  @Column()
  name: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @OneToMany((type) => UsuarioModel, (usuarioModel) => usuarioModel.cargo)
  usuarios: UsuarioModel[];
}
