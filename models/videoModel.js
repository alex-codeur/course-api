const { Schema, model } = require("mongoose");

const videoSchema = new Schema(
    {
        videoId: {
            type: String,
            required: true,
        },
        title: [{
            type: Schema.Types.ObjectId,
            ref: "course"
        }],
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: "user"
        },
        viewsCount: {
            type: Number,
            default: 0,
        }
    },
    { timestamps: true }
);

module.exports = model("video", videoSchema);