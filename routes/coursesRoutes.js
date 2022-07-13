const router = require("express").Router();
const path = require("path");
const multer = require("multer");
// const upload = multer();

const { ensureAuthenticated, ensureAuthorized } = require("../middleware/authMiddleware");
const { validationRules, validate } = require("../validations/courseValidator");
const { getAll, getOne, addOne, updateOne, removeOne, getTopCourses, getOneBySlug } = require("../controllers/coursesController");

const PATH = "../client/public/uploads/image/"

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, PATH));
    },
    filename: (req, file, cb) => {
        const fileName = Date.now() + path.extname(file.originalname);
        req.body.imageUrl = fileName;
        cb(null, fileName);
    },
});

const upload = multer({
    storage: storage,
});

router.get("/courses", async (req, res) => {
    await getAll(req, res);
});

router.get("/courses/:id", async (req, res) => {
    await getOne(req, res);
});

router.post(
    "/courses", 
    ensureAuthenticated, 
    ensureAuthorized(["admin"]), 
    upload.any("files")
);

router.post("/courses", ensureAuthenticated, ensureAuthorized(["admin"]), validationRules(), validate, async (req, res) => {
    await addOne(req, res);
});

// router.post("/courses", upload.single('file'), ensureAuthenticated, ensureAuthorized(["admin"]), async (req, res) => {
//     await addOne(req, res);
// });

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