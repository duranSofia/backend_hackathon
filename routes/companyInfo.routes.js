const {
  getAllCompanyInfo,
  getOneCompanyInfo,
  createCompanyInfo,
  updateCompanyInfo,
  deleteCompanyInfo,
  connectEmployee,
  disconnectEmployee,
} = require("../controller/companyInfo.controller");

const router = require("express").Router();

router.get("/", getAllCompanyInfo);
router.post("/", createCompanyInfo);
router.get("/:companyInfoId", getOneCompanyInfo);
router.put("/:companyInfoId", updateCompanyInfo);
router.delete("/:companyInfoId", deleteCompanyInfo);
router.put("/connect/:employeeId", connectEmployee);

//this controller is not working
router.put("/disconnect/:employeeId", disconnectEmployee);

module.exports = router;
