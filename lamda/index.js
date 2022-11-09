const AWS = require('aws-sdk');
const sharp = require('sharp');

const s3 = new AWS.S3();
 
exports.handler = async (event, context, callback) => {
  const Bucket = event.Records[0].s3.bucket.name; //react-project-s3-image
  const Key = decodeURIComponent(event.Records[0].s3.object.key); //original_12312312_abc.png
  console.log(Bucket, Key);
  const filename = Key.split('/')[Key.split('/').length -1]; //12312312_abc.png
  const ext = Key.split('.')[Key.split('.').length-1].toLowerCase();//png
  const requiredFormat = ext === 'jpg' ? 'jpeg' : ext;
  console.log('filename', filename, 'ext', ext);

  try{
    const s3Object = await s3.getObject({Bucket, Key}).promise(); //가져와서
    console.log('origianl', s3Object.Body.length); //몇바이트인지 확인
    const resizedImage = await sharp(s3Object.Body) //사이즈 바꾸고
      .resize(400, 400, { fit: 'inside' })
      .toFormat(requiredFormat)
      .toBuffer();
    await s3.putObject({ //재업로드
      Bucket,
      Key: `thumb/${filename}`,
      Body: resizedImage,
    }).promise();
    console.log('put', resizedImage.length);
    return callback(null,`thumb/${filename}`); //return할때 첫번째는 에러가 없어서 null 두번째는 성공
  } catch (error) {
    console.error(error);
    return callback(error);
  }

}