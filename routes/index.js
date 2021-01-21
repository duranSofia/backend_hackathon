const router = require("express").Router();
const skillRoutes = require("./skill.routes");
const educationRoutes = require("./education.routes");
const experienceRoutes = require("./experience.routes");
const employeeRoutes = require("./employee.routes");

router.get("/", (req, res, next) => {
  res.json({ ok: "index :)" });
});

router.use("/api/skills", skillRoutes); // manage skills
router.use("/api/experiences", experienceRoutes); // manage experiences
router.use("/api/", employeeRoutes); // manage employees

router.use("/api/education", educationRoutes);

module.exports = router;
