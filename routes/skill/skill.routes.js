const {
  getAllSkills,
  getOneSkill,
  createSkill,
  updateSkill,
  deleteSkill,
  createNewSkillSkillType,
  addSkillSkillTypeById,
  removeSkillTypeById,
} = require("../../controller/skill/skill.controller");

const router = require("express").Router();

router.get("/", getAllSkills);
router.post("/", createSkill);
router.get("/:skillId", getOneSkill);
router.put("/:skillId", updateSkill);
router.delete("/:skillId", deleteSkill);

//CONECTION WITH SKILLTYPES

router.post("/:skillId/skilltype/create", createNewSkillSkillType);
router.put("/:skillId/skilltype", addSkillSkillTypeById);
router.delete("/:skillId/skilltype/:skillTypeId", removeSkillTypeById);

module.exports = router;
