const {
  getAllCompanyInfo,
  getOneCompanyInfo,
  createCompanyInfo,
  updateCompanyInfo,
  deleteCompanyInfo,
} = require("../controller/companyInfo.controller");

const router = require("express").Router();

router.get("/", getAllCompanyInfo);
router.post("/", createCompanyInfo);
router.get("/:companyInfoId", getOneCompanyInfo);
router.put("/:companyInfoId", updateCompanyInfo);
router.delete("/:companyInfoId", deleteCompanyInfo);

module.exports = router;
