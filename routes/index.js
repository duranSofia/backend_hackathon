const router = require("express").Router();
const skillRoutes = require("./skill.routes");

router.get("/", (req, res, next) => {
  res.json({ ok: "index :)" });
});

router.use("/api/skills", skillRoutes); // manage skills
// router.use("/hobbie", skillRoutes); // manage hobbies

module.exports = router;
