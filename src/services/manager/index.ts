import { ManagerModel } from '../../models/manager';

// A post request should not contain an id.
export type ManagerCreationParams = Omit<ManagerModel, 'id'>;
export type ManagerGetResponse = Omit<ManagerModel, 'password'>;

export class ManagersService {
  public get(id: number, name?: string): ManagerGetResponse {
    return {
      id,
      email: 'jane@doe.com',
      name: name ?? 'Jane Doe',
    };
  }

  public create(userCreationParams: ManagerCreationParams): ManagerModel {
    return {
      id: Math.floor(Math.random() * 10000),
      ...userCreationParams,
    };
  }
}
