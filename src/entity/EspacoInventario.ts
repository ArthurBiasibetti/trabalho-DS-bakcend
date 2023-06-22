import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { UserModel } from '../models';
import { UsuarioModel } from './User';

@Entity('espaco_inventario')
export class EspacoInventarioModel {
  @PrimaryColumn()
  id_espaco: number;

  @PrimaryColumn()
  id_inventario: number;

  @ManyToOne(() => UsuarioModel, (inventario) => inventario.patrimonios)
  @JoinColumn([{ name: 'inventario', referencedColumnName: 'id' }])
  inventario: InventarioModel;

  @ManyToOne(() => UsuarioModel, (responsavel) => responsavel.espacosInventario)
  responsavel: UsuarioModel;

  @Column({ name: 'quantidade_patrimonios', type: 'integer' })
  quantidadePatrimonios: number;

  @Column({ name: 'patrimonios_lidos', type: 'integer' })
  patrimoniosLidos: number;

  @Column({ name: 'patrimonios_lidos', type: 'enum' })
  status: StatusEspacoInventario;
}
