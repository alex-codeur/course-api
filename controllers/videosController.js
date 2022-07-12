const videoModel = require("../models/videoModel");
const paginate = require("express-paginate");

const getAll = async (req, res) => {
    try {
        const [results, itemCount] = await Promise.all([
            videoModel.find({})
                .sort({ createdAt: -1 })
                .limit(req.query.limit)
                .skip(req.skip)
                .lean()
                .exec(),
            videoModel.count({})
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
        const item = await videoModel.findByIdAndUpdate(req.params.id, {
            $inc: { viewsCount: 1 },
        });

        if (item) {
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
    try {
        const newRecord = new videoModel({
            ...req.body,
            createdBy: req.user._id
        });

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
        await videoModel.findByIdAndUpdate(req.params.id, req.body);

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
        const deleted = await videoModel.findByIdAndDelete(req.params.id);

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

const getTopVideos = async (req, res) => {
    try {
        let results = await videoModel.find({})
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

module.exports = {
    getAll,
    getOne,
    addOne,
    updateOne,
    removeOne,
    getTopVideos
};