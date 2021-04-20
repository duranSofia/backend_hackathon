const {
  getAllInterest,
  getOneInterest,
  createInterest,
  updateInterest,
  deleteInterest,
  connectEmployee,
  disconnectEmployee,
} = require("../controller/interests.controller");

const router = require("express").Router();

// "/api/hobby/ ....

router.get("/", getAllInterest);
router.post("/", createInterest);
router.get("/:interestId", getOneInterest);
router.put("/:interestId", updateInterest);
router.delete("/:interestId", deleteInterest);
router.put("/connect/:employeeId", connectEmployee);

//this controller is not working
router.put("/disconnect/:employeeId", disconnectEmployee);

module.exports = router;
