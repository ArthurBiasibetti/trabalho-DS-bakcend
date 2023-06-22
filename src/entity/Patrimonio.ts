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

@Entity('patrimonios')
export class PatrimonioModel {
  @PrimaryColumn()
  numero: number;

  @PrimaryColumn()
  @ManyToOne(() => InventarioModel, (inventario) => inventario.patrimonios)
  @JoinColumn([{ name: 'inventario', referencedColumnName: 'id' }])
  inventario: InventarioModel;

  @Column({ name: 'descricao', type: 'text' })
  descricao: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Column({ name: 'lido', type: 'boolean' })
  lido: boolean;

  @Column({ name: 'data_leitura' })
  dataLeitura: Date;

  @Column({ name: 'observacao' })
  observacao: string;

  @Column({ name: 'tipo_criacao' })
  tipoCriacao: number; //TODO ENUM
}
