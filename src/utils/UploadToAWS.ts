import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

export default class UploadToAWS {
  static async uploadAllToAWS(files: { blob: Blob; fileName: string }[]): Promise<boolean> {
    const s3Client = new S3Client({
      region: import.meta.env.VITE_AWS_REGION,
      credentials: {
        accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY,
        secretAccessKey: import.meta.env.VITE_AWS_SECRET_KEY,
      },
    });

    let allSuccessful = true;

    for (const { blob, fileName } of files) {
      const params = {
        Bucket: import.meta.env.VITE_BUCKET_NAME,
        Key: fileName,
        Body: blob,
        ContentType: 'image/webp',
      };

      try {
        const command = new PutObjectCommand(params);
        const response = await s3Client.send(command);

        if (response.$metadata.httpStatusCode !== 200) {
          console.error(`Failed to upload file: ${fileName}`);
          allSuccessful = false;
        }
      } catch (error) {
        console.error(`Error uploading file "${fileName}":`, error);
        allSuccessful = false;
      }
    }

    return allSuccessful;
  }
}
