const router = require("express").Router();
const skillRoutes = require("./skill.routes");
const educationRoutes = require("./education.routes");
const wishRoutes = require("./wish.routes");
const positionRoutes = require("./position.routes");
const departmentRoutes = require("./department.routes");
const experienceRoutes = require("./experience.routes");
const hobbyRoutes = require("./hobby.routes");
const officeRoutes = require("./office.routes");
// const employeeRoutes = require("./employee.routes");

router.get("/", (req, res, next) => {
  res.json({ ok: "index :)" });
});

// router.use("/api/employee", employeeRoutes); // manage employees
router.use("/api/skill", skillRoutes); // manage skills
router.use("/api/experience", experienceRoutes); // manage experiences
router.use("/api/education", educationRoutes);
router.use("/api/wish", wishRoutes);
router.use("/api/position", positionRoutes);
router.use("/api/department", departmentRoutes);
router.use("/api/hobby", hobbyRoutes);
router.use("/api/office", officeRoutes);


module.exports = router;
