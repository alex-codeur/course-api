const { Schema, model } = require("mongoose");

const commentSchema = new Schema(
    {
        body: {
            type: String,
            required: true,
        },
        course: [{
            type: Schema.Types.ObjectId,
            ref: "course"
        }],
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: "user"
        }
    },
    { timestamps: true }
);

module.exports = model("comment", commentSchema);