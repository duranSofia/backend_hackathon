const {
  getAllSkillTypes,
  getOneSkillType,
  createSkillType,
  deleteSkillType,
} = require("../../controller/skill/skilltype.controller");

const router = require("express").Router();

router.get("/", getAllSkillTypes);
router.post("/", createSkillType);
router.get("/:skillTypeId", getOneSkillType);
router.delete("/:skillTypeId", deleteSkillType);

module.exports = router;
