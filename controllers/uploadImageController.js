const {StatusCodes} = require('http-status-codes')
const cloudinary = require('cloudinary').v2
const fs = require('fs')

const uploadImage = async(req, res) => {
    console.log(req.files)
    const result = await cloudinary.uploader.upload(
        req.files.images.tempFilePath, {
            use_filename: true, folder: 'teck-upload',
        }
    )
    console.log(result)
    fs.unlinkSync(req.files.images.tempFilePath)
    return res.status(StatusCodes.OK).json({image: {src: result.secure_url}})
}

module.exports = uploadImage