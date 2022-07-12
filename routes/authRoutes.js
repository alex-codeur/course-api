const router = require("express").Router();

const { ensureAuthenticated } = require("../middleware/authMiddleware");
const { register, login, verify, forgotPassword, resetPassword, changePassword } = require("../controllers/authController");

router.post("/login", async (req, res) => {
    await login(req.body, res);
});

router.post("/register", async (req, res) => {
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

module.exports = router;