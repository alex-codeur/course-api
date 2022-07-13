const userModel = require("../models/userModel");
const fs = require("fs");
const { promisify } = require("util");
const pipeline = promisify(require("stream").pipeline);

const uploadImage = async (req, res) => {
    try {
        if (
            req.file.detectedMimeType != "image/jpg" &&
            req.file.detectedMimeType != "image/png" &&
            req.file.detectedMimeType != "image/jpeg"
        )
        {
            throw Error("Invalid file");
        }

        if (req.file.size > 500000) {
            throw Error("max size");
        }
    } catch (err) {
        return res.status(201).json(err);
    }

    const filename = req.body.name + ".jpg";

    await pipeline(
        req.file.stream,
        fs.createWriteStream(
            `${__dirname}/../client/public/uploads/image/${filename}`
        )
    );

    try {
        await userModel.findByIdAndUpdate(
            req.body.userId,
            { $set: { image: "./uploads/image/" + filename } },
            { new: true, upsert: true, setDefaultsOnInsert: true },
            (err, docs) => {
                if (!err) {
                    return res.send(docs);
                } else {
                    return res.status(500).send({ message: err });
                }
            }
        );
    } catch (err) {
        return res.status(500).send({ message: err });
    }
};

module.exports = { uploadImage };
