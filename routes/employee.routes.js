const {
  getAllEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  getOneEmployee,
  createNewEmployeeSkill,
  addEmployeeSkillById,
  removeSkillById,
  createHobby,
  updateHobby,
  removeHobby,
  createExperience,
  updateExperience,
  removeExperience,
} = require("../controller/employee.controller");

const router = require("express").Router();

router.get("/", getAllEmployees);
router.get("/:employeeId", getOneEmployee);
router.post("/", createEmployee);
router.put("/:employeeId", updateEmployee);
router.delete("/:employeeId", deleteEmployee);

// employee SKILLS router
router.post("/:employeeId/skill/create", createNewEmployeeSkill);
router.put("/:employeeId/skill", addEmployeeSkillById);
router.delete("/:employeeId/skill/:skillId", removeSkillById);

// employee HOBBY router
router.post("/:employeeId/hobby", createHobby);
router.put("/:employeeId/hobby", updateHobby);
router.delete("/:employeeId/hobby/:hobbyId", removeHobby);

// employee EXPERIENCE router
router.post("/:employeeId/experience", createExperience);
router.put("/:employeeId/experience", updateExperience);
router.delete("/:employeeId/experience/:experienceId", removeExperience);

module.exports = router;
