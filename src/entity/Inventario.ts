import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { EspacoInventarioModel } from './EspacoInventario';
import { UsuarioModel } from './Usuario';
import { PatrimonioModel } from './Patrimonio';

export enum StatusInventario {
  PENDENTE_INICIO,
  INICIADO,
  COMPLETO,
}
@Entity('inventario')
export class InventarioModel {
  @PrimaryGeneratedColumn({ primaryKeyConstraintName: 'pk_inventario_id' })
  id: number;

  @ManyToOne((type) => UsuarioModel, (usuarioModel) => usuarioModel.inventarios)
  @JoinColumn()
  responsavel: UsuarioModel;

  @ManyToOne(
    (type) => EspacoInventarioModel,
    (espacoInventario) => espacoInventario.inventario
  )
  espacosInventario: EspacoInventarioModel[];

  @ManyToOne(
    (type) => PatrimonioModel,
    (patrimonioModel) => patrimonioModel.inventario
  )
  patrimonios: PatrimonioModel[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Column({ name: 'status', type: 'enum', enum: StatusInventario })
  status: StatusInventario;
}
