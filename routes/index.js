const router = require("express").Router();

const skillRoutes = require("./skill/skill.routes");
const skillTypeRoutes = require("./skill/skilltypes.routes");
// const educationRoutes = require("./education.routes");
// const wishRoutes = require("./wish.routes");
const experienceRoutes = require("./experience.routes");
// const intrestsRoutes = require("./intersts.routes");
// const companyInfoRoutes = require("./companyInfo.routes");
// const employeeRoutes = require("./employee.routes");

router.get("/", (req, res, next) => {
  res.json({ ok: "index :)" });
});

// router.use("/employee", employeeRoutes);
router.use("/skill", skillRoutes);
router.use("/skilltype", skillTypeRoutes);
router.use("/experience", experienceRoutes);
// router.use("/education", educationRoutes);
// router.use("/wish", wishRoutes);
// router.use("/intrests", intrestsRoutes);
// router.use("/companyinfo", companyInfoRoutes);

module.exports = router;
