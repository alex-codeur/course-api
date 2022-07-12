const { Schema, model } = require("mongoose");

const courseSchema = new Schema(
    {
        category: {
            type: Schema.Types.ObjectId,
            ref: "category"
        },
        title: {
            type: String,
            required: true,
        },
        imageUrl: {
            type: String,
            required: true,
        },
        slug: {
            type: String,
            required: true,
            unique: true,
        },
        body: {
            type: String,
            required: true,
        },
        viewsCount: {
            type: Number,
            default: 0,
        },
        comments: [{
            type: Schema.Types.ObjectId,
            ref: "comment"
        }],
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: "user"
        }
    },
    { timestamps: true }
);

module.exports = model("course", courseSchema);