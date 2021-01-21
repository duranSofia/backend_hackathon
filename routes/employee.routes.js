const {
  getAllEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  getOneEmployee,
} = require("../controller/employee.controller");

const router = require("express").Router();

router.get("/", getAllEmployees);
router.get("/:employeeId", getOneEmployee);
router.post("/", createEmployee);
router.put("/:employeeId", updateEmployee);
router.delete("/:employeeId", deleteEmployee);

module.exports = router;
