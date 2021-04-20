const {
  getAllIndustries,
  GetOneIndustry,
  AddIndustry,
  connectIndustryExperience,
  disconnectIndustryExperience,
} = require("../controller/industry.controller");

const router = require("express").Router();

router.get("/", getAllIndustries);
router.get("/:industryId", GetOneIndustry);
router.post("/", AddIndustry);
router.put("/connect/:experienceId", connectIndustryExperience);
router.put("/disconnect/:experienceId", disconnectIndustryExperience);

module.exports = router;
