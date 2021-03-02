const {
  getAllOthers,
  getOneOther,
  createOther,
  updateOther,
  deleteOther,
} = require("../controller/other.controller");

const router = require("express").Router();

// "/api/hobby/ ....

router.get("/", getAllOthers);
router.post("/", createOther);
router.get("/:otherId", getOneOther);
router.put("/:otherId", updateOther);
router.delete("/:otherId", deleteOther);

module.exports = router;
