import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { dataSource } from '../db/data-source';
import { Images } from '../images/images.entity';
import { v4 as uuid } from 'uuid';

@Injectable()
export class S3Service {
  constructor() { }

  private async uploadS3Image(dataBuffer: Buffer, filename: string) {
    const s3 = new S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION,
    });
    return await s3
      .upload({
        Bucket: process.env.AWS_PUBLIC_BUCKET_NAME,
        Body: dataBuffer,
        Key: `${uuid()}-${filename}`,
      })
      .promise();
  }
  async uploadImage(dataBuffer: Buffer, filename: string) {
    const uploadResult = await this.uploadS3Image(dataBuffer, filename);
    const newImage = new Images();
    newImage.path = uploadResult.Key;
    newImage.url = uploadResult.Location;
    await dataSource.manager.save(newImage);
    return newImage;
  }

  async updateImage(id: number, dataBuffer: Buffer, filename: string) {
    const image = await dataSource.getRepository(Images).findOneBy({ id });
    await this.deleteS3Image(image);
    const uploadResult = await this.uploadS3Image(dataBuffer, filename);
    image.url = uploadResult.Location;
    image.path = uploadResult.Key;
    return await dataSource.manager.save(image);
  }

  private async deleteS3Image(image: Images) {
    const s3 = new S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION,
    });
    await s3
      .deleteObject({
        Bucket: process.env.AWS_PUBLIC_BUCKET_NAME,
        Key: image.path,
      })
      .promise();
    return s3;
  }

  async deleteImage(id: number) {
    const image = await dataSource.getRepository(Images).findOneBy({ id });
    await this.deleteS3Image(image);
    return await dataSource.getRepository(Images).delete(id);
  }
}
