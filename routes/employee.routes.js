const {
  getAllEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  getOneEmployee,
  createNewEmployeeSkill,
  addEmployeeSkillById,
  removeSkillById,
  createNewEmployeeHobby,
  addEmployeeHobbyById,
  removeHobbyById,
  createNewEmployeeExperience,
  addEmployeeExperienceById,
  removeExperienceById,
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
router.post("/:employeeId/hobby/create", createNewEmployeeHobby);
router.put("/:employeeId/hobby", addEmployeeHobbyById);
router.delete("/:employeeId/hobby/:hobbyId", removeHobbyById);

// employee EXPERIENCE router
router.post("/:employeeId/experience/create", createNewEmployeeExperience);
router.put("/:employeeId/experience", addEmployeeExperienceById);
router.delete("/:employeeId/experience/:experienceId", removeExperienceById);

// employee EDUCATION router
router.post("/:employeeId/education/create", createNewEmployeeEducation);
router.put("/:employeeId/education", addEmployeeEducationById);
router.delete("/:employeeId/education/:educationId", removeEducationById);

// employee WISHES router

module.exports = router;
