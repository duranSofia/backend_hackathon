const {
  createContactInfo,
  getAllContactInfo,
  contactInfoEmployee,
  deleteContactInfo,
} = require("../controller/contactInfo.controller");

const router = require("express").Router();

//   router.get("/", getAllCompanyInfo);
router.post("/", createContactInfo);
router.get("/", getAllContactInfo);
router.put("/:employeeId", contactInfoEmployee);
router.delete("/:contactInfoId", deleteContactInfo);
//   router.get("/:companyInfoId", getOneCompanyInfo);
//   router.put("/:companyInfoId", updateCompanyInfo);
//   router.delete("/:companyInfoId", deleteCompanyInfo);

module.exports = router;
