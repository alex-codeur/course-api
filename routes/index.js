const router = require("express").Router();

const authRoutes = require("./authRoutes");
const adminRoutes = require("./adminRoutes");
const profileRoutes = require("./profileRoutes");

const categoriesRoutes = require("./categoriesRoutes");
const coursesRoutes = require("./coursesRoutes");

router.use("/auth", authRoutes);
router.use("/api", adminRoutes);
router.use("/api", profileRoutes);
router.use("/api", categoriesRoutes);
router.use("/api", coursesRoutes);

module.exports = router;