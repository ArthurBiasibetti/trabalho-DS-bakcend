import csv from 'papaparse';
import {
  Controller,
  Post,
  Res,
  Route,
  SuccessResponse,
  UploadedFile,
} from 'tsoa';
import { Response } from 'express';

@Route('csv')
export class CsvController extends Controller {
  @SuccessResponse('200')
  @Post('/importar')
  public async userLogin(
    @UploadedFile() file: Express.Multer.File
    // @Res() response: Response
  ) {
    let data = null;

    if (file) {
      data = csv.parse(file.buffer.toString(), { header: true });
    }
    return { message: 'sucesso' };
    // return response
    //   .status(201)
    //   .json({ message: 'Arquivo importado com sucesso!' });
  }
}
