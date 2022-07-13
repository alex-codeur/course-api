const router = require("express").Router();
// const multer = require("multer");
// const upload = multer();

const { ensureAuthenticated } = require("../middleware/authMiddleware");
const { register, login, verify, forgotPassword, resetPassword, changePassword } = require("../controllers/authController");
const { validationRules, validate } = require("../validations/userValidator");
const { validationRules: passwordValidationRules, validate: passwordValidate } = require("../validations/changePasswordValidator,");
// const { uploadImage } = require("../controllers/uploadController");

router.post("/login", async (req, res) => {
    /*  #swagger.tags = ['Auth']
    	#swagger.parameters['obj'] = {
            in: 'body',
            required: true,
            schema: { $ref: "#/definitions/LoginModel" }
    } */

    await login(req.body, res);
});

router.get("/logout", async (req, res) => {
    await logout(req, res);
});

router.post("/register", validationRules(), validate, async (req, res) => {
    /*  #swagger.tags = ['Auth']
    	#swagger.parameters['obj'] = {
            in: 'body',
            required: true,
            schema: { $ref: "#/definitions/RegisterModel" }
    } */
    
    await register(req.body, "user", res);
});

router.post("/verify", async (req, res) => {
    /*  #swagger.tags = ['Auth']
    	#swagger.parameters['obj'] = {
            in: 'body',
            required: true,
            schema: { $ref: "#/definitions/VerifyEmailModel" }
    } */

    await verify(req.body, res);
});

router.post("/forgotPassword", async (req, res) => {
    /*  #swagger.tags = ['Auth']
    	#swagger.parameters['obj'] = {
            in: 'body',
            required: true,
            schema: { $ref: "#/definitions/ForgotPassWordModel" }
    } */

    await forgotPassword(req.body, res);
});

router.post("/resetPassword", async (req, res) => {
    /*  #swagger.tags = ['Auth']
    	#swagger.parameters['obj'] = {
            in: 'body',
            required: true,
            schema: { $ref: "#/definitions/ResetPasswordModel" }
    } */

    await resetPassword(req.body, res);
});

router.post("/changePassword", ensureAuthenticated, async (req, res) => {
    /*  #swagger.tags = ['Auth']
        #swagger.security = [{
        "Authorization": []
        }]
    	#swagger.parameters['obj'] = {
            in: 'body',
            required: true,
            schema: { $ref: "#/definitions/ChangePasswordModel" }
    } */   
    
    await changePassword(req.body, res);
});

// upload
// router.post('/upload', upload.single('file'), async (req, res) => {
//     await uploadImage(req, res);
// });

module.exports = router;