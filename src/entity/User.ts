import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { UserModel } from '../models';
import { CargoModel } from './Cargo';
import { EspacoInventarioModel } from './EspacoInventario';

@Entity('usuarios')
export class UsuarioModel {
  @PrimaryGeneratedColumn({ primaryKeyConstraintName: 'pk_user_id' })
  id: number;

  @Column()
  nome: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'update_at' })
  updatedAt: Date;

  @ManyToOne(() => CargoModel, (cargoModel) => cargoModel.usuarios)
  @JoinColumn({ name: 'cargo', referencedColumnName: 'id' })
  cargo: CargoModel;

  @OneToMany(
    () => EspacoInventarioModel,
    (espacoInventario) => espacoInventario.responsavel
  )
  espacosInventario: EspacoInventarioModel;
}
