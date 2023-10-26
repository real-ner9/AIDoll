import { Injectable, Logger } from '@nestjs/common';
import { createHash } from 'crypto';
import * as S3 from 'aws-sdk/clients/s3';
import * as process from 'process';

@Injectable()
export class FileStoreService {
  private readonly s3: S3;
  private readonly logger = new Logger(FileStoreService.name);

  constructor() {
    this.s3 = new S3({
      accessKeyId: process.env.S3_ACCESSKEY_ID,
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
      endpoint: process.env.S3_ROOT_URL,
      s3ForcePathStyle: true,
      region: 'ru-1',
      apiVersion: 'latest',
    });
  }

  async uploadToS3(fileBuffer: Buffer): Promise<string> {
    const hashName = createHash('md5').update(fileBuffer).digest('hex');

    const params = {
      Bucket: process.env.S3_BUCKET,
      Key: `${hashName}`,
      Body: fileBuffer,
      ContentType: 'image/jpeg',
      ACL: 'public-read',
    };

    try {
      const res = await this.s3.putObject(params).promise();
      this.logger.log(`File uploaded successfully. ${res.ETag}`);
      return hashName;
    } catch (error) {
      this.logger.error(`Error uploading file. ${error}`);
      throw error;
    }
  }

  async deleteFromS3(id: string): Promise<void> {
    const params = {
      Bucket: process.env.S3_BUCKET,
      Key: id,
    };

    try {
      await this.s3.deleteObject(params).promise();
      this.logger.log(`File deleted successfully.`);
    } catch (error) {
      this.logger.error(`Error deleting file. ${error}`);
      throw error;
    }
  }
}
