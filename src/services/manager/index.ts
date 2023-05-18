import { ManagerModel } from '../../models/manager';
import { Manager } from '../../entity/Manager';
import { AppDataSource } from '../../config/database/data-source';
import { NotFoundError } from '../../Errors/instances/NotFoundError';

// A post request should not contain an id.
export type ManagerCreationParams = Omit<ManagerModel, 'id'>;
export type ManagerGetResponse = Omit<ManagerModel, 'password'>;

export class ManagersService {
  #managerRepository = AppDataSource.getRepository(Manager);

  public async get(id: number): Promise<ManagerGetResponse> {
    const manager = await this.#managerRepository.findOneBy({ id });

    if (!manager) {
      throw new NotFoundError('No manager found!');
    }

    return manager;
  }

  public create(userCreationParams: ManagerCreationParams): ManagerModel {
    const newManger = this.#managerRepository.create(userCreationParams);
    this.#managerRepository.save(newManger);

    return newManger;
  }
}
