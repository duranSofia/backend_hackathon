const {
  getAllHobbies,
  getOneHobby,
  createHobby,
  updateHobby,
  deleteHobby,
} = require("../controller/hobby.controller");

const router = require("express").Router();

// "/api/hobby/ ....

router.get("/", getAllHobbies);
router.post("/", createHobby);
router.get("/:hobbyId", getOneHobby);
router.put("/:hobbyId", updateHobby);
router.delete("/:hobbyId", deleteHobby);

module.exports = router;
