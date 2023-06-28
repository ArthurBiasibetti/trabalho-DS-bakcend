import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { InventarioModel } from './Inventario';

export enum TiposCriacaoPatrimonio {
  IMPORTADO,
  ON_FLY,
}
@Entity('patrimonios')
export class PatrimonioModel {
  @PrimaryColumn()
  numero: number;

  @PrimaryColumn()
  @ManyToOne(() => InventarioModel, (inventario) => inventario.patrimonios)
  @JoinColumn()
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

  @Column({ name: 'tipo_criacao', enum: TiposCriacaoPatrimonio })
  tipoCriacao: TiposCriacaoPatrimonio;
}
