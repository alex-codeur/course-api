// const fs = require("fs");
// const { promisify } = require("util");
// const pipeline = promisify(require("stream").pipeline);

const courseModel = require("../models/courseModel");
const commentModel = require("../models/commentModel");
const paginate = require("express-paginate");

const getAll = async (req, res) => {
    try {
        const [results, itemCount] = await Promise.all([
            courseModel.find({})
                .populate("category", "title")
                .sort({ createdAt: -1 })
                .limit(req.query.limit)
                .skip(req.skip)
                .lean()
                .exec(),
            courseModel.count({})
        ]);

        const pageCount = Math.ceil(itemCount / req.query.limit);

        return res.status(201).json({
            object: "list",
            has_more: paginate.hasNextPages(req)(pageCount),
            data: results,
            pageCount,
            itemCount,
            currentPage: req.query.page,
            pages: paginate.getArrayPages(req)(3, pageCount, req.query.page),
        });
    } catch (err) {
        return res.status(500).json({
            message: err.message,
            success: false,
        });
    }
};

const getOne = async (req, res) => {
    try {
        const item = await courseModel.findByIdAndUpdate(req.params.id, {
            $inc: { viewsCount: 1 },
        }).populate("category", "title");

        if (item) {
            item.comments = await commentModel.find({ course: item._id });

            return res.status(200).json(item);
        }

        return res.status(404).json({
            message: "Item not found",
            success: false,
        });
    } catch (err) {
        return res.status(500).json({
            message: err.message,
            success: false,
        });
    }
};

const addOne = async (req, res) => {
    // let filename;

    // if (req.file !== null) {
    //     try {
    //         if (
    //             req.file.detectedMimeType != "image/jpg" &&
    //             req.file.detectedMimeType != "image/png" &&
    //             req.file.detectedMimeType != "image/jpeg"
    //         )
    //         {
    //             throw Error("Invalid file");
    //         }
    
    //         if (req.file.size > 500000) {
    //             throw Error("max size");
    //         }
    //     } catch (err) {
    //         return res.status(201).json(err);
    //     }

    //     filename = req.body.userId + Date.now() + '.jpg';

    //     await pipeline(
    //         req.file.stream,
    //         fs.createWriteStream(
    //             `${__dirname}/../client/public/uploads/image/${filename}`
    //         )
    //     );
    // }

    const newRecord = new courseModel({
        ...req.body,
        // imageUrl: req.file !== null ? "./uploads/courses/" + filename : "",
        createdBy: req.user._id
    });

    try {
        if (!newRecord.slug) {
            newRecord.slug = generateSlug(newRecord.title);
        }

        await newRecord.save();

        return res.status(201).json({
            message: "Item successfully created",
            success: true,
        });
    } catch (err) {
        return res.status(500).json({
            message: err.message,
            success: false,
        });
    }
};

const updateOne = async (req, res) => {
    try {
        await courseModel.findByIdAndUpdate(req.params.id, req.body);

        return res.status(201).json({
            message: "Item successfully updated",
            success: true,
        });
    } catch (err) {
        return res.status(500).json({
            message: err.message,
            success: false,
        });
    }
};

const removeOne = async (req, res) => {
    try {
        const deleted = await courseModel.findByIdAndDelete(req.params.id);

        if (!deleted) {
            return res.status(404).json({
                message: "Item not found",
                success: false,
            });
        }

        return res.status(204).json({
            message: "Item successfully deleted",
            success: true,
        });
    } catch (err) {
        return res.status(500).json({
            message: err.message,
            success: false,
        });
    }
};

const getTopCourses = async (req, res) => {
    try {
        let results = await courseModel.find({})
                .populate("category", "title")
                .sort({ viewsCount: -1 })
                .limit(3)
                .lean()
                .exec();

        return res.status(201).json({
            data: results,
        });
    } catch (err) {
        return res.status(500).json({
            message: err.message,
            success: false,
        });
    }
};

const getOneBySlug = async (req, res) => {
    try {
        const item = await courseModel.findByIdAndUpdate(req.params.slug, {
            $inc: { viewsCount: 1 },
        }).populate("category", "title");

        if (item) {
            item.comments = await commentModel.find({ course: item._id });

            return res.status(200).json(item);
        }

        return res.status(404).json({
            message: "Item not found",
            success: false,
        });
    } catch (err) {
        return res.status(500).json({
            message: err.message,
            success: false,
        });
    }
};

const generateSlug = (title) => {
    const slugText = title.toString()
        .trim()
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\w\-]+/g, "")
        .replace(/\-\-+/g, "-")
        .replace(/^-+/, "")
        .replace(/-+$/, "");

    return slugText;
};

module.exports = {
    getAll,
    getOne,
    addOne,
    updateOne,
    removeOne,
    getTopCourses,
    getOneBySlug
};