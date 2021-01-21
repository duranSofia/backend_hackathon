const {
  getAllOffices,
  getOneOffice,
  createOffice,
  updateOffice,
  deleteOffice,
} = require("../controller/office.controller");

const router = require("express").Router();

router.get("/", getAllOffices);
router.post("/", createOffice);
router.get("/:officeId", getOneOffice);
router.put("/:officeId", updateOffice);
router.delete("/:officeId", deleteOffice);

module.exports = router;
