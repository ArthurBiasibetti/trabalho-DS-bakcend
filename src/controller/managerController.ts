import {
  Body,
  Controller,
  Get,
  Path,
  Post,
  Query,
  Route,
  SuccessResponse,
  Example,
} from 'tsoa';
import {
  ManagersService,
  ManagerGetResponse,
  ManagerCreationParams,
} from '../services/manager';

@Route('manager')
export class UsersController extends Controller {
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
  public async getUser(
    @Path() userId: number,
    @Query() name?: string
  ): Promise<ManagerGetResponse> {
    return new ManagersService().get(userId, name);
  }

  @SuccessResponse('201', 'Created') // Custom success response
  @Post()
  public async createUser(
    @Body() requestBody: ManagerCreationParams
  ): Promise<void> {
    this.setStatus(201); // set return status 201
    new ManagersService().create(requestBody);
    return;
  }
}
