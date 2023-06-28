import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { EspacoModel } from './Espaco';
import { InventarioModel } from './Inventario';
import { UsuarioModel } from './Usuario';

export enum StatusEspacoInventario {
  PENDENTE_INICIO,
  INICIADO,
  COMPLETO,
}

@Entity('espaco_inventario')
export class EspacoInventarioModel {
  // @PrimaryColumn()
  // id_espaco: number;

  // @PrimaryColumn()
  // id_inventario: number;

  @PrimaryColumn()
  @ManyToOne(
    () => InventarioModel,
    (inventario) => inventario.espacosInventario
  )
  @JoinColumn()
  inventario: InventarioModel;

  @ManyToOne(() => UsuarioModel, (responsavel) => responsavel.espacosInventario)
  @JoinColumn()
  responsavel: UsuarioModel;

  @Column({ name: 'quantidade_patrimonios', type: 'integer' })
  quantidadePatrimonios: number;

  @Column({ name: 'patrimonios_lidos', type: 'integer' })
  patrimoniosLidos: number;

  @Column({ name: 'status', type: 'enum', enum: StatusEspacoInventario })
  status: StatusEspacoInventario;

  @PrimaryColumn()
  @ManyToOne(
    (type) => EspacoModel,
    (espacoModel) => espacoModel.espacosInventario
  )
  @JoinColumn()
  espaco: EspacoModel;
}
