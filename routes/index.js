const router = require("express").Router();
const skillRoutes = require("./skill.routes");
const hobbyRoutes = require("./hobby.routes");
const educationRoutes = require("./education.routes");
const wishRoutes = require("./wish.routes");
const positionRoutes = require("./position.routes");
const departmentRoutes = require("./department.routes");
const { route } = require("./skill.routes");

router.get("/", (req, res, next) => {
  res.json({ ok: "index :)" });
});

router.use("/api/skills", skillRoutes); // manage skills
// router.use("/hobby", hobbyRoutes); // manage hobbies

router.use("/api/education", educationRoutes);
router.use("/api/wish", wishRoutes);
router.use("/api/position", positionRoutes);
router.use("/api/department", departmentRoutes);

module.exports = router;
