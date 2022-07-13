const router = require("express").Router();
const multer = require("multer");
const upload = multer();

const { ensureAuthenticated } = require("../middleware/authMiddleware");
const { register, login, verify, forgotPassword, resetPassword, changePassword } = require("../controllers/authController");
const { validationRules, validate } = require("../validations/userValidator");
const { validationRules: passwordValidationRules, validate: passwordValidate } = require("../validations/changePasswordValidator,");
const { uploadImage } = require("../controllers/uploadController");

router.post("/login", async (req, res) => {
    await login(req.body, res);
});

router.get("/logout", async (req, res) => {
    await logout(req, res);
});

router.post("/register", validationRules(), validate, async (req, res) => {
    await register(req.body, "user", res);
});

router.post("/verify", async (req, res) => {
    await verify(req.body, res);
});

router.post("/forgotPassword", async (req, res) => {
    await forgotPassword(req.body, res);
});

router.post("/resetPassword", async (req, res) => {
    await resetPassword(req.body, res);
});

router.post("/changePassword", ensureAuthenticated, async (req, res) => {
    await changePassword(req.body, res);
});

// upload
router.post('/upload', upload.single('file'), async (req, res) => {
    await uploadImage(req, res);
});

module.exports = router;