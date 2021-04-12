const {
  getAllEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  getOneEmployee,
  updateEmployeeIntrests,
  createNewEmployeeSkill,
  addEmployeeSkillById,
  removeSkillById,
  createNewEmployeeOther,
  addEmployeeOtherById,
  removeOtherById,
  createNewEmployeeExperience,
  addEmployeeExperienceById,
  removeExperienceById,
  createNewEmployeeEducation,
  addEmployeeEducationById,
  removeEducationById,
  createNewEmployeeCompanyInfo,
  addEmployeeCompanyInfoById,
  removeCompanyInfoById,
  createNewEmployeeWish,
  addEmployeeWishById,
  removeWishById,
} = require("../controller/employee.controller");

const router = require("express").Router();

router.get("/", getAllEmployees);
router.get("/:employeeId", getOneEmployee);
router.post("/", createEmployee);
router.put("/:employeeId", updateEmployee);
// router.delete("/:employeeId", deleteEmployee);

// employee SKILLS router
// router.post("/:employeeId/skill/create", createNewEmployeeSkill);
// router.put("/:employeeId/skill", addEmployeeSkillById);
// router.delete("/:employeeId/skill/:skillId", removeSkillById);

// employee INTRESTS router
// router.post("/:employeeId/other/create", createNewEmployeeOther);
router.put("/:employeeId/intrests", updateEmployeeIntrests);
// router.delete("/:employeeId/other/:otherId", removeOtherById);

// employee EXPERIENCE router
// router.post("/:employeeId/experience/create", createNewEmployeeExperience);
// router.put("/:employeeId/experience", addEmployeeExperienceById);
// router.delete("/:employeeId/experience/:experienceId", removeExperienceById);

// // employee EDUCATION router
// router.post("/:employeeId/education/create", createNewEmployeeEducation);
// router.put("/:employeeId/education", addEmployeeEducationById);
// router.delete("/:employeeId/education/:educationId", removeEducationById);

// // employee WISHES router
// router.post("/:employeeId/wish/create", createNewEmployeeWish);
// router.put("/:employeeId/wish", addEmployeeWishById);
// router.delete("/:employeeId/wish/:wishId", removeWishById);

// // employee COMPANY INFORMATION router
// router.post("/:employeeId/companyinfo/create", createNewEmployeeCompanyInfo);
// router.put("/:employeeId/companyinfo", addEmployeeCompanyInfoById);
// router.delete("/:employeeId/companyinfo/:companyInfoId", removeCompanyInfoById);

module.exports = router;
