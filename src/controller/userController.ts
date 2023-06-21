import {
  Body,
  Controller,
  Get,
  Path,
  Post,
  Route,
  SuccessResponse,
  Example,
  Security,
  Request,
} from 'tsoa';
import { UserService } from '../services/user';
import {
  ICreateUserParams,
  ICreateUserResponse,
  IGetUserResponse,
  ILoginUserParams,
} from '../interfaces';

@Route('user')
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
    createdAt: new Date(),
    updatedAt: new Date(),
  })
  @Security('jwt')
  @Get('{userId}')
  public async getUser(
    @Request() request: any,
    @Path() userId: number
  ): Promise<IGetUserResponse> {
    console.log(request.user.id);
    const foundManager = await this.#userService.get(userId);

    return foundManager;
  }

  @SuccessResponse('201', 'Created')
  @Post()
  public async createUser(
    @Body() requestBody: ICreateUserParams
  ): Promise<ICreateUserResponse> {
    const response = await this.#userService.create(requestBody);

    return response;
  }

  @SuccessResponse('201', 'Session Created')
  @Post('login')
  public async userLogin(@Body() requestBody: ILoginUserParams) {
    const token = await this.#userService.login(requestBody);

    this.setHeader('token', `Bearer ${token}`);
  }
}
