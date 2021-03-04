const {
  getAllSkillTypes,
  getOneSkillType,
  createSkillType,
  //updateSkill,
  deleteSkillType,
} = require("../../controller/skill/skilltype.controller");

const router = require("express").Router();

router.get("/", getAllSkillTypes);
router.post("/", createSkillType);
router.get("/:skillTypeId", getOneSkillType);
// router.put("/:skillId", updateSkill);
router.delete("/:skillTypeId", deleteSkillType);

module.exports = router;
