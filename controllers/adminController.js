const userModel = require("../models/userModel");
const paginate = require("express-paginate");

const getAll = async (req, res) => {
    try {
        const [results, itemCount] = await Promise.all([
            userModel.find({})
                .sort({ createdAt: -1 })
                .limit(req.query.limit)
                .skip(req.skip)
                .lean()
                .exec(),
            userModel.count({}),
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
        const item = await userModel.findById(req.params.id);

        if (item) {
            return res.status(200).json(item);
        }

        return res.status(400).json({
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

module.exports = {
    getAll,
    getOne
};