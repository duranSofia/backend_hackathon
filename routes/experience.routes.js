const {
  getAllExperiences,
  getOneExperience,
  createExperience,
  updateExperience,
  deleteExperience,
} = require("../controller/experience.controller");

const router = require("express").Router();

router.get("/", getAllExperiences);
router.post("/", createExperience);
router.get("/:experienceId", getOneExperience);
router.put("/:experienceId", updateExperience);
router.delete("/:experienceId", deleteExperience);

module.exports = router;
