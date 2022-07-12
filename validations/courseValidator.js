const { check, validationResult } = require("express-validator");

const validationRules = () => {
    return [
        check("title")
            .trim()
            .isLength({ min: 2, max: 256 })
            .withMessage("Course must be between 2 and 256 characters long"),
        check("body")
            .trim()
            .isLength({ min: 2 })
            .withMessage("Course must be atleast 2 characters long")
    ];
};

const validate = (req, res, next) => {
    const errors = validationRules(req);

    if (errors.isEmpty()) {
        return next();
    }

    const resultErrors = [];

    errors.array().map((err) => resultErrors.push({[err.param]: err.mss}));
    resultErrors.push({ message: "Action unsuccessfully" });
    resultErrors.push({ succes: false });

    const errorObject = Object.assign({}, ...resultErrors);

    return res.status(422).json(errorObject);
};

module.exports = {
    validationRules,
    validate
};