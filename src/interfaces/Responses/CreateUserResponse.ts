import { UserModel } from '../../models';

export interface ICreateUserResponse extends Omit<UserModel, 'password'> {}
