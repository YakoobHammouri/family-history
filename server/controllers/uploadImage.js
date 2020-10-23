const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');
const uploadImage = (req, res) => {
  const file = req.files.Image;
  cloudinary.uploader.upload(
    file.tempFilePath,
    { folder: process.env.default_folder },
    (err, result) => {
      if (err) {
        return res.status(400).json({ msg: 'error in uploading image', err });
      }
      console.log({ url: result.url, public_id: result.public_id });

      const directory = 'tmp';

      try {
        if (fs.existsSync(directory)) {
          fs.readdir(directory, (err, files) => {
            if (!err) {
              for (const file of files) {
                fs.unlink(path.join(directory, file), (err) => {
                  if (err) {
                    console.log('err delete file :', err);
                    throw err;
                  }
                });
              }
            }
          });
        }
      } catch (err) {
        console.error(err);
      }

      return res
        .status(200)
        .json({ url: result.url, public_id: result.public_id });
    },
  );
};

module.exports = uploadImage;
