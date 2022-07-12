const router = require("express").Router();

const { ensureAuthenticated, ensureAuthorized } = require("../middleware/authMiddleware");
const { getAll, getOne, addOne, updateOne, removeOne, getTopVideos } = require("../controllers/videosController");

router.get("/videos", async (req, res) => {
    await getAll(req, res);
});

router.get("/videos/:id", async (req, res) => {
    await getOne(req, res);
});

router.post("/videos", ensureAuthenticated, ensureAuthorized(["admin"]), async (req, res) => {
    await addOne(req, res);
});

router.put("/videos/:id", ensureAuthenticated, ensureAuthorized(["admin"]), async (req, res) => {
    await updateOne(req, res);
});

router.delete("/videos/:id", ensureAuthenticated, ensureAuthorized(["admin"]), async (req, res) => {
    await removeOne(req, res);
});

router.get("/videos/top", async (req, res) => {
    await getTopVideos(req, res);
});

module.exports = router;