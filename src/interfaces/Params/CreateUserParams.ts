import { UserModel } from '../../models';

export interface ICreateUserParams
  extends Omit<UserModel, 'id' | 'createdAt' | 'updatedAt'> {}
