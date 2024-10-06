import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const deleteFile = async (req, res) => {
  const { public_id } = req.body;

  if (!public_id) {
    return res.status(404).json({
      ok: false,
      message: "No public_id provided",
    });
  }

  try {
    const response = await cloudinary.uploader.destroy(public_id);

    if (response.result !== 'ok') {
      console.error(`Failed to delete image with public_id: ${public_id}`);
      return res.status(500).json({
        ok: false,
        message: "Internal server error deleting file",
      });
    }

    res.status(202).json({
      ok: true,
      message: "File deleted successfully",
      data: response,
    });
  } catch (error) {
    console.log("Error deleting image", error);
    res.status(500).json({
      ok: false,
      message: "Internal server error deleting file",
    });
  }
};
