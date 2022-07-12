const router = require("express").Router();

const authRoutes = require("./authRoutes");
const adminRoutes = require("./adminRoutes");
const profileRoutes = require("./profileRoutes");

router.use("/auth", authRoutes);
router.use("/api", adminRoutes);
router.use("/api", profileRoutes);

module.exports = router;