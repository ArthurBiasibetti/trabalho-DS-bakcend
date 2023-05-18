import {
  Body,
  Controller,
  Get,
  Path,
  Post,
  Route,
  SuccessResponse,
  Example,
} from 'tsoa';
import { ManagerModel } from '../models/manager';
import {
  ManagersService,
  ManagerGetResponse,
  ManagerCreationParams,
} from '../services/manager';

@Route('manager')
export class ManagerController extends Controller {
  /**
   * Retrieves the details of an existing user.
   * Supply the unique user ID from either and receive corresponding user details.
   * @param userId The user's identifier
   * @param name Provide a username to display
   */
  @Example<ManagerGetResponse>({
    id: 1,
    name: 'tsoa manager',
    email: 'hello@tsoa.com',
  })
  @Get('{userId}')
  public async getUser(@Path() userId: number): Promise<ManagerGetResponse> {
    const foundManager = await new ManagersService().get(userId);

    return foundManager;
  }

  @SuccessResponse('201', 'Created') // Custom success response
  @Post()
  public async createUser(
    @Body() requestBody: ManagerCreationParams
  ): Promise<ManagerModel> {
    const response = new ManagersService().create(requestBody);

    return response;
  }
}
