const router = require("express").Router();
const skillRoutes = require("./skill/skill.routes");
const skillTypeRoutes = require("./skill/skilltypes.routes");
const educationRoutes = require("./education.routes");
const wishRoutes = require("./wish.routes");
const experienceRoutes = require("./experience.routes");
const otherRoutes = require("./other.routes");
const companyInfoRoutes = require("./companyInfo.routes");
const employeeRoutes = require("./employee.routes");

router.get("/", (req, res, next) => {
  res.json({ ok: "index :)" });
});

router.use("/api/employee", employeeRoutes);
router.use("/api/skill", skillRoutes);
router.use("/api/skilltype", skillTypeRoutes);
router.use("/api/experience", experienceRoutes);
router.use("/api/education", educationRoutes);
router.use("/api/wish", wishRoutes);
router.use("/api/other", otherRoutes);
router.use("/api/companyinfo", companyInfoRoutes);

module.exports = router;
