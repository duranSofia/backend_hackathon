const {
  getAllPositions,
  getPosition,
  createPosition,
  updatePosition,
  deletePosition,
} = require("../controller/position.controller");

const router = require("express").Router();

router.get("/", getAllPositions);
router.get("/:positionId", getPosition);
router.post("/", createPosition);
router.put("/:positionId", updatePosition);
router.delete("/:positionId", deletePosition);

module.exports = router;
