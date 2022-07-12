const router = require("express").Router();

const { ensureAuthenticated, ensureAuthorized } = require("../middleware/authMiddleware");
const { addOne, removeOne } = require("../controllers/commentsController");

router.post("/comments", ensureAuthenticated, async (req, res) => {
    await addOne(req, res);
});

router.delete("/comments/:id", ensureAuthenticated, async (req, res) => {
    await removeOne(req, res);
});

module.exports = router;