import cloudinary, { configureCloudinary } from '../config/cloudinary.js';

export const uploadToCloudinary = async (file, folder = 'eventsphere') => {
  const ready = configureCloudinary();

  if (!ready || !file) {
    return null;
  }

  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: 'image'
      },
      (error, result) => {
        if (error) {
          reject(error);
          return;
        }

        resolve(result);
      }
    );

    stream.end(file.buffer);
  });
};
