import presignedGet from '@/actions/s3/presignedGet';

const sign = presignedGet({
  bucketName: 'company-avatars',
  objectName: 'c94e9f76-ee01-4de8-8c5d-8a625c914775.jpg',
  expires: 3600,
});

export default sign.noInput();
