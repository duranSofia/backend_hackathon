const {
  getAllEducation,
  getEducation,
  createEducation,
  updateEducation,
  deleteEducation,
} = require("../controller/education.controller");

const router = require("express").Router();

router.get("/", getAllEducation);
router.get("/:educationId", getEducation);
router.post("/", createEducation);
router.put("/:educationId", updateEducation);
router.delete("/:educationId", deleteEducation);

module.exports = router;
