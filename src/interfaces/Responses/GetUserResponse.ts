import { UserModel } from '../../models';

export type IGetUserResponse = Omit<UserModel, 'password'>;
