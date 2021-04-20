const router = require("express").Router();

const skillRoutes = require("./skill/skill.routes");
const skillTypeRoutes = require("./skill/skilltypes.routes");
const contactInfoRoutes = require("./contactInfo.routes");
const educationRoutes = require("./education.routes");
const wishRoutes = require("./wish.routes");
const experienceRoutes = require("./experience.routes");
const interestsRoutes = require("./interests.routes");
const companyInfoRoutes = require("./companyInfo.routes");
const employeeRoutes = require("./employee.routes");
const clientRoutes = require("./clients.routes");
const industryRoutes = require("./industry.routes");

router.get("/", (req, res, next) => {
  res.json({ ok: "index :)" });
});

router.use("/employee", employeeRoutes);
router.use("/skill", skillRoutes);
router.use("/skilltype", skillTypeRoutes);
router.use("/experience", experienceRoutes);
router.use("/client", clientRoutes);
router.use("/contactinfo", contactInfoRoutes);
router.use("/industry", industryRoutes);
router.use("/education", educationRoutes);
router.use("/wish", wishRoutes);
router.use("/interest", interestsRoutes);
router.use("/companyinfo", companyInfoRoutes);

module.exports = router;
