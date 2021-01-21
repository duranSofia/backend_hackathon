const router = require("express").Router();
const skillRoutes = require("./skill.routes");
const hobbyRoutes = require("./hobby.routes");

router.get("/", (req, res, next) => {
  res.json({ ok: "index :)" });
});

router.use("/api/skills", skillRoutes); // manage skills
// router.use("/hobby", hobbyRoutes); // manage hobbies

module.exports = router;
