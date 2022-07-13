const router = require("express").Router();
const multer = require("multer");
const upload = multer();

const { ensureAuthenticated, ensureAuthorized } = require("../middleware/authMiddleware");
const { getAll, getOne, addOne, updateOne, removeOne, getTopCourses, getOneBySlug } = require("../controllers/coursesController");

router.get("/courses", async (req, res) => {
    await getAll(req, res);
});

router.get("/courses/:id", async (req, res) => {
    await getOne(req, res);
});

router.post("/courses", upload.single('file'), ensureAuthenticated, ensureAuthorized(["admin"]), async (req, res) => {
    await addOne(req, res);
});

router.put("/courses/:id", ensureAuthenticated, ensureAuthorized(["admin"]), async (req, res) => {
    await updateOne(req, res);
});

router.delete("/courses/:id", ensureAuthenticated, ensureAuthorized(["admin"]), async (req, res) => {
    await removeOne(req, res);
});

router.get("/courses/top", async (req, res) => {
    await getTopCourses(req, res);
});

router.get("/courses/slug/:slug", async (req, res) => {
    await getOneBySlug(req, res);
});

module.exports = router;