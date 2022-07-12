const { Schema, model } = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const categorySchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true
        },
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: "user"
        }
    },
    { timestamps: true }
);

categorySchema.plugin(uniqueValidator);

module.exports = model("category", categorySchema);