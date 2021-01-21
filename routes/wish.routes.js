const {
  getAllWishes,
  getWish,
  createWish,
  updateWish,
  deleteWish,
} = require("../controller/wish.controller");

const router = require("express").Router();

router.get("/", getAllWishes);
router.get("/:wishId", getWish);
router.post("/", createWish);
router.put("/:wishId", updateWish);
router.delete("/:wishId", deleteWish);

module.exports = router;
