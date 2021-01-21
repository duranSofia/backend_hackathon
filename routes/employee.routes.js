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
} = require("../controller/employee.controller");

const router = require("express").Router();

router.get("/", getAllEmployees);
router.get("/:employeeId", getOneEmployee);
router.post("/", createEmployee);
router.put("/:employeeId", updateEmployee);
router.delete("/:employeeId", deleteEmployee);

// employee skills router
router.post("/:employeeId/skill", createSkill);
router.put("/:employeeId/skill", updateSkill);
router.delete("/:employeeId/skill/:skillId", removeSkill);

// employee hobby router
router.post("/:employeeId/hobby", createHobby);
router.put("/:employeeId/hobby", updateHobby);
router.delete("/:employeeId/hobby/:hobbyId", removeHobby);

module.exports = router;
