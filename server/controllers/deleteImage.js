const cloudinary = require('cloudinary').v2;
const uploadImage = (req, res) => {


  const { public_id } = req.body;
console.log
  cloudinary.uploader.destroy(public_id, (err, result) => {
   
    if (err) {
      return res.status(400).json({ msg: 'error in uploading image', err });
    }
   
    return res.status(200).json({ result });
  });
};

module.exports = uploadImage;
