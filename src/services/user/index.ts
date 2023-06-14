import { AppDataSource } from '../../config/database/data-source';
import { User } from '../../entity/User';

import {
  ICreateUserResponse,
  ICreateUserParams,
  IGetUserResponse,
  ILoginUserParams,
} from '../../interfaces';

import { NotFoundError } from '../../Errors';
import { compare, hash, signJwt } from '../../utils/security';
import { UnauthorizedError } from '../../Errors/instances/UnauthorizedError';

// A post request should not contain an id.
export class UserService {
  #userRepository = AppDataSource.getRepository(User);

  public async get(id: number): Promise<IGetUserResponse> {
    const user = await this.#userRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundError('No user found!');
    }

    return user;
  }

  public async login(userLogin: ILoginUserParams): Promise<string> {
    const user = await this.#userRepository.findOne({
      where: {
        email: userLogin.email,
      },
    });

    if (!user) {
      throw new UnauthorizedError('Senha ou Email invalidos!');
    }

    const isLoginValid = await compare(user.password, userLogin.password);

    if (!isLoginValid) {
      throw new UnauthorizedError('Senha ou Email invalidos!');
    }

    const token = await signJwt({ id: user.id });

    return token;
  }

  public async create(
    userCreationParams: ICreateUserParams
  ): Promise<ICreateUserResponse> {
    const user = this.#userRepository.create(userCreationParams);

    user.password = await hash(user.password);
    await this.#userRepository.save(user);

    const newUser: ICreateUserResponse = {
      email: user.email,
      id: user.id,
      name: user.name,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };

    return newUser;
  }
}
