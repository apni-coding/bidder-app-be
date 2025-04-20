const awsService = require("../../service/aws/awsService");
const {
  SUCCESS_MESSAGE,
  ERROR_MESSAGE,
} = require("../../utils/propertyResolver");
const {
  sendSuccessResponse,
  sendErrorResponse,
} = require("../../utils/response");

const generatePreSignedUrl = async (req, res) => {
  try {
    const fileName = req.query.fileName || `upload-${DAte.now()}.jpg`;
    const contentType = req.query.contentType;
    const bucketName = req.query.bucketName;

    if (!contentType) {
      throw new Error("Content type required");
    }
    if (!bucketName) {
      throw new Error("Bucket name required");
    }
    const result = await awsService.generateS3PresignedUrl(
      fileName,
      contentType,
      bucketName
    );
    sendSuccessResponse(res, SUCCESS_MESSAGE.PRESIGNED_GENERATED, result, 200);
  } catch (error) {
    sendErrorResponse(
      res,
      error.message || ERROR_MESSAGE.PRESIGNED_GENERATED,
      "",
      500
    );
  }
};

module.exports = { generatePreSignedUrl };

// /aws/get-presigned-url?fileName="myphoto.jpg"&