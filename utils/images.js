const { BadRequestError } = require("../errors");
const cloudinary = require("cloudinary").v2;

const cloudinaryConfig = cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
  secure: true,
});

const deleteImage = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (error) {
    console.log(error);
    // Handle errors as needed
    throw error;
  }
};

const uploadImage = async (imagePath) => {
  // Use the uploaded file's name as the asset's public ID and
  // allow overwriting the asset with new versions
  const options = {
    use_filename: true,
    unique_filename: false,
    overwrite: true,
  };

  try {
    const result = await cloudinary.uploader.upload(imagePath, options);

    return { publicId: result.public_id, url: result.url };
  } catch (error) {
    console.log(error);

    throw new BadRequestError(
      "Something went wrong with the image, please try again later"
    );
  }
};

module.exports = {uploadImage, deleteImage};
