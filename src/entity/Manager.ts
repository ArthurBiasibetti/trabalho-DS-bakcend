import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ManagerModel } from '../models/manager';

@Entity('managers')
export class Manager implements ManagerModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;
}
