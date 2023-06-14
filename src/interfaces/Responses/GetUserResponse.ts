import { UserModel } from '../../models';

export interface IGetUserResponse extends Omit<UserModel, 'password'> {}
