const {
  getAllWishes,
  getWish,
  createWish,
  updateWish,
  deleteWish,
  connectWishIndustry,
  disconnectWishIndustry,
  connectWishClient,
  disconnectWishClient,
} = require("../controller/wish.controller");

const router = require("express").Router();

router.get("/", getAllWishes);
router.get("/:wishId", getWish);
router.post("/", createWish);
router.put("/:wishId", updateWish);
router.delete("/:wishId", deleteWish);
router.put("/connectindustry/:industryId", connectWishIndustry);
router.put("/disconnectindustry/:industryId", disconnectWishIndustry);
router.put("/connectclient/:clientId", connectWishClient);
router.put("/disconnectclient/:clientId", disconnectWishClient);

module.exports = router;
