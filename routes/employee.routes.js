const {
  getAllEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  getOneEmployee,
  createSkill,
  updateSkill,
  removeSkill,
  createHobby,
  updateHobby,
  removeHobby,
  createExperience,
  updateExperience,
  removeExperience,
  createWish,
  updateWish,
  removeWish,
} = require("../controller/employee.controller");

const router = require("express").Router();

router.get("/", getAllEmployees);
router.get("/:employeeId", getOneEmployee);
router.post("/", createEmployee);
router.put("/:employeeId", updateEmployee);
router.delete("/:employeeId", deleteEmployee);

// employee SKILLS router
router.post("/:employeeId/skill/create", createSkill);
router.put("/:employeeId/skill", updateSkill);
router.delete("/:employeeId/skill/:skillId", removeSkill);

// employee HOBBY router
router.post("/:employeeId/hobby", createHobby);
router.put("/:employeeId/hobby", updateHobby);
router.delete("/:employeeId/hobby/:hobbyId", removeHobby);

// employee EXPERIENCE router
router.post("/:employeeId/experience", createExperience);
router.put("/:employeeId/experience", updateExperience);
router.delete("/:employeeId/experience/:experienceId", removeExperience);

// employee WISH router
router.post("/:employeeId/wish", createWish);
router.put("/:employeeId/wish", updateWish);
router.delete("/:employeeId/wish/:wishId", removeWish);

module.exports = router;
