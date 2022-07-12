const userModel = require("../models/userModel");

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

const updateOne = async (req, res) => {
    try {
        await userModel.findByIdAndUpdate(req.params.id, req.body);

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

module.exports = {
    getOne,
    updateOne
};