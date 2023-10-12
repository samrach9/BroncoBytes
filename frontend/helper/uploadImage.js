import { S3 } from 'aws-sdk';

const s3 = new S3({
  region: process.env.EXPO_PUBLIC_S3_REGION,
  accessKeyId: process.env.EXPO_PUBLIC_S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.EXPO_PUBLIC_S3_SECRET_ACCESS_KEY,
});

export default uploadImage = async (uri, key) => {
  const response = await fetch(uri);
  const blob = await response.blob();
  const params = {
    Bucket: process.env.EXPO_PUBLIC_S3_BUCKET_NAME,
    Key: key,
    Body: blob,
  };

  const upload = s3.upload(params);

  const promise = upload.promise();

  return promise;
};