import { User } from '../../entity/User';
import { AppDataSource } from '../../config/database/data-source';

import {
  ICreateUserResponse,
  ICreateUserParams,
  IGetUserResponse,
} from '../../interfaces';

import { NotFoundError } from '../../Errors';

// A post request should not contain an id.
export class UserService {
  #managerRepository = AppDataSource.getRepository(User);

  public async get(id: number): Promise<IGetUserResponse> {
    const manager = await this.#managerRepository.findOneBy({ id });

    if (!manager) {
      throw new NotFoundError('No manager found!');
    }

    return manager;
  }

  public async create(
    userCreationParams: ICreateUserParams
  ): Promise<ICreateUserResponse> {
    const newManger = this.#managerRepository.create(userCreationParams);

    await this.#managerRepository.save(newManger);

    return newManger;
  }
}
