const router = require("express").Router();

const authRoutes = require("./authRoutes");
const adminRoutes = require("./adminRoutes");
const profileRoutes = require("./profileRoutes");

const categoriesRoutes = require("./categoriesRoutes");
const coursesRoutes = require("./coursesRoutes");
const commentsRoutes = require("./commentsRoutes");

router.use("/auth", authRoutes);
router.use("/api", adminRoutes);
router.use("/api", profileRoutes);

router.use("/api", categoriesRoutes);
router.use("/api", coursesRoutes);
router.use("/api", commentsRoutes);

module.exports = router;