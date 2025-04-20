const { PutObjectCommand, S3Client } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV || "development"}`,
});

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});
const generateS3PresignedUrl = async (fileName, contentType, bucketName) => {
  try {
    if (!["bidderapptest"].includes(bucketName)) {
      throw new Error("Invalid bucket name");
    }
    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: fileName,
      ContentType: contentType,
    });
    const signedUrl = await getSignedUrl(s3, command, { expiresIn: 120 });

    //final url of your file
    const finalURL = `https://${bucketName}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;

    //Cloudfront url for public access
    const cloudfrontURL = `${process.env.CLOUDFRONT_URL}/${fileName}`;

    return {
      signedUrl,
      fileName,
      finalURL,
    };
  } catch (error) {
    console.log(error.message);
    throw new Error(error.message);
  }
};

module.exports = { generateS3PresignedUrl };
