const router = require("express").Router();
const skillRoutes = require("./skill.routes");
const hobbyRoutes = require("./hobby.routes");
const educationRoutes = require("./education.routes");
const wishRoutes = require("./wish.routes");

router.get("/", (req, res, next) => {
  res.json({ ok: "index :)" });
});

router.use("/api/skills", skillRoutes); // manage skills
// router.use("/hobby", hobbyRoutes); // manage hobbies

router.use("/api/education", educationRoutes);
router.use("/api/wish", wishRoutes);

module.exports = router;
