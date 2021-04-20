const {
  getAllEducation,
  getEducation,
  createEducation,
  updateEducation,
  deleteEducation,
  connectEmployee,
  disconnectEmployee,
} = require("../controller/education.controller");

const router = require("express").Router();

router.get("/", getAllEducation);
router.get("/:educationId", getEducation);
router.post("/", createEducation);
router.put("/:educationId", updateEducation);
router.delete("/:educationId", deleteEducation);
router.put("/connect/:employeeId", connectEmployee);
router.put("/disconnect/:employeeId", disconnectEmployee);

module.exports = router;
