const {
  getAllSkills,
  getOneSkill,
  createSkill,
  updateSkill,
  deleteSkill,
} = require("../../controller/skill/skill.controller");

const router = require("express").Router();

router.get("/", getAllSkills);
router.post("/", createSkill);
router.get("/:skillId", getOneSkill);
router.put("/:skillId", updateSkill);
router.delete("/:skillId", deleteSkill);

module.exports = router;
