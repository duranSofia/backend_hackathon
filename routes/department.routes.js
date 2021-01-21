const {
  getAllDepartments,
  getDepartment,
  createDepartment,
  updateDepartment,
  deleteDepartment,
} = require("../controller/department.controller");

const router = require("express").Router();

router.get("/", getAllDepartments);
router.get("/:departmentId", getDepartment);
router.post("/", createDepartment);
router.put("/:departmentId", updateDepartment);
router.delete("/:departmentId", deleteDepartment);

module.exports = router;
