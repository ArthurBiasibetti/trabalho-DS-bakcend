import { UserModel } from '../../models';

export type ICreateUserParams = Omit<UserModel, 'id'>;
