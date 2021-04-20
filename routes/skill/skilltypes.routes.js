const {
  getAllSkillTypes,
  getOneSkillType,
  createSkillType,
  deleteSkillType,
  connectSkillTypeSkill,
  disconnectSkillTypeSkill,
} = require("../../controller/skill/skilltype.controller");

const router = require("express").Router();

router.get("/", getAllSkillTypes);
router.post("/", createSkillType);
router.get("/:skillTypeId", getOneSkillType);
router.delete("/:skillTypeId", deleteSkillType);
router.put("/connect/:skillId", connectSkillTypeSkill);

//this controller is not workig!
router.put("/disconnect/:skillId", disconnectSkillTypeSkill);

module.exports = router;
