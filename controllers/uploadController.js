import { v2 as cloudinary } from 'cloudinary';

export const uploadFile = async (req, res) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(404).json({
        ok: false,
        message: "No file specified",
      });
    }

    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      uploadStream.end(file.buffer);
    });

    res.status(201).json({
      ok: true,
      message: "File uploaded successfully",
      data: {
        secure_url: result.secure_url,
        public_id: result.public_id,
      },
    });
  } catch (error) {
    console.error("Upload Error:", error);
    res.status(500).json({
      ok: false,
      message: "Internal server error uploading file",
    });
  }
};
