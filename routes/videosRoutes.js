const router = require("express").Router();

const { validationRules, validate } = require("../validations/courseValidator");
const { ensureAuthenticated, ensureAuthorized } = require("../middleware/authMiddleware");
const { getAll, getOne, addOne, updateOne, removeOne, getTopVideos } = require("../controllers/videosController");

router.get("/videos", async (req, res) => {
    // #swagger.tags = ['Posts']

    await getAll(req, res);
});

router.get("/videos/top", async (req, res) => {
    // #swagger.tags = ['Posts']

    await getTopVideos(req, res);
});

router.get("/videos/:id", async (req, res) => {
    await getOne(req, res);
});

router.post("/videos", ensureAuthenticated, ensureAuthorized(["admin"]), validationRules(), validate, async (req, res) => {
    /*
        #swagger.tags = ['Posts']
        #swagger.security = [{
            "Authorization": []
        }]
        #swagger.parameters['obj'] = {
            in: 'body',
            required: true,
            schema: { $ref: "#/defintions/VideoModel" }
        }
     */
    
    await addOne(req, res);
});

router.put("/videos/:id", ensureAuthenticated, ensureAuthorized(["admin"]), validationRules(), validate, async (req, res) => {
    await updateOne(req, res);
});

router.delete("/videos/:id", ensureAuthenticated, ensureAuthorized(["admin"]), async (req, res) => {
    await removeOne(req, res);
});

module.exports = router;