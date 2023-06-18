const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');


cloudinary.config({
    cloud_name: 'dfimffemz',
    api_key: '552156145432743',
    api_secret: '5qThxW7pTN6vzQhFJNzyW2KYzrQ',
});


module.exports = {
    uploadCloudinary: async(file, typeFile, tag) => {
        return new Promise((resolve, reject) => {
            let stream = cloudinary.uploader.upload_stream({
                    folder: 'test',
                    resource_type: typeFile,
                    chunk_size: 100 * 1024 * 1024,
                    tags: tag,
                },
                (error, result) => {
                    if (result) {
                        resolve(result);
                    } else {
                        reject(error);
                    }
                }
            );
            streamifier.createReadStream(file.buffer).pipe(stream);
        });
    },

    destroyCloudinary: async(public_id, type) => {
        cloudinary.uploader.destroy(public_id, { resource_type: type })
            .catch(error => console.log(error))
    },

    destroyCloudinaryByTags: async(tags) => {
        cloudinary.api.delete_resources_by_tag(tags, { resource_type: 'video' })
            .catch(error => console.log(error))
    }

}