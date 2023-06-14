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
import { UserService } from '../services/user';
import {
  ICreateUserParams,
  ICreateUserResponse,
  IGetUserResponse,
} from '../interfaces';

@Route('manager')
export class UserController extends Controller {
  #userService = new UserService();

  /**
   * Retrieves the details of an existing user.
   * Supply the unique user ID from either and receive corresponding user details.
   * @param userId The user's identifier
   * @param name Provide a username to display
   */
  @Example<IGetUserResponse>({
    id: 1,
    name: 'tsoa manager',
    email: 'hello@tsoa.com',
  })
  @Get('{userId}')
  public async getUser(@Path() userId: number): Promise<IGetUserResponse> {
    const foundManager = await this.#userService.get(userId);

    return foundManager;
  }

  @SuccessResponse('201', 'Created') // Custom success response
  @Post()
  public async createUser(
    @Body() requestBody: ICreateUserParams
  ): Promise<ICreateUserResponse> {
    const response = await this.#userService.create(requestBody);

    return response;
  }
}
