import {
  Controller,
  Post,
  Get,
  UseInterceptors,
  UploadedFile,
  Param,
  Delete,
  HttpStatus,
  HttpException,
  Req,
  Res,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
} from '@nestjs/common';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileStoreService } from './file-store.service';
import { TgUser } from '../bot-users/types/tg-user';

@Controller('file-store')
export class FileStoreController {
  constructor(private readonly fileStoreService: FileStoreService) {}

  @Get('image/:hash')
  async getImage(@Param('hash') hash: string, @Res() res: Response) {
    try {
      const data = await this.fileStoreService.getFromS3(hash);
      res.set({ 'Content-Type': 'image/jpeg', 'Cache-Control': 'public, max-age=31536000' });
      res.send(data);
    } catch (error) {
      throw new HttpException('Image not found', HttpStatus.NOT_FOUND);
    }
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @Req() req: Request,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 50 * 1024 * 1024 }),
          new FileTypeValidator({ fileType: /^image\/(jpeg|png|heic|webp)$/ }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    const authString = req.headers['authorization'];
    const { id } = this.getUser(authString);
    if (!file || !file.buffer) {
      throw new HttpException('No file uploaded', HttpStatus.BAD_REQUEST);
    }

    try {
      // Удалить уже имеющиеся картинки со статусом INITIAL
      await this.fileStoreService.removeUnusedImages(id);

      // Вы можете добавить дополнительные проверки на тип и размер файла здесь, если это необходимо
      // Перед вызовом метода сервиса для загрузки
      const hash = await this.fileStoreService.uploadToS3(file.buffer, id);
      return { id: hash };
    } catch (error) {
      throw new HttpException(
        'Не удалось загрузить фотографию',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id')
  async deleteFile(@Req() req: Request, @Param('id') id: string) {
    const authString = req.headers['authorization'];
    const { id: userId } = this.getUser(authString);
    const fileRecord = this.fileStoreService.checkOwnership(userId, id);

    if (!fileRecord) {
      throw new Error('Фотография не найдена или не принадлежит вам');
    }

    try {
      await this.fileStoreService.deleteFromS3(id);
      return { message: 'Файл успешно удален' };
    } catch (error) {
      throw new HttpException(
        'Не удалось загрузить фотографию',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  getUser(authString: string): TgUser | null {
    const actualDataString = authString.replace('twa-init-data ', '');
    const data = new URLSearchParams(actualDataString);

    const userData = data.get('user');
    return userData ? JSON.parse(userData) : null;
  }
}
