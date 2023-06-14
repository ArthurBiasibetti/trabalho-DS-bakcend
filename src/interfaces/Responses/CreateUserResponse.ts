import { UserModel } from '../../models';

export type ICreateUserResponse = Omit<UserModel, 'password'>;
