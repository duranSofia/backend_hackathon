const client = require("../../config/db");

exports.getAllSkillTypes = async (req, res, next) => {
  try {
    const allSkillsTypes = await client.skillType.findMany({
      include: { skill: true },
    });
    res.status(200).json(allSkillsTypes);
  } catch (err) {
    next(err);
  }
};

exports.getOneSkillType = async (req, res, next) => {
  try {
    const skillTypeId = Number(req.params.skillTypeId);
    const uniqueSkillType = await client.skillType.findUnique({
      where: { id: skillTypeId },
      include: {
        skill: true,
      },
    });
    res.status(200).json(uniqueSkillType);
  } catch (err) {
    next(err);
  }
};

exports.createSkillType = async (req, res, next) => {
  try {
    const { type } = req.body;
    const newSkillType = await client.skillType.create({
      data: {
        type,
      },
      include: {
        skill: true,
      },
    });
    res.status(200).json(newSkillType);
  } catch (err) {
    next(err);
  }
};

exports.deleteSkillType = async (req, res, next) => {
  try {
    const skillTypeId = Number(req.params.skillTypeId);
    const deletedSkillType = await client.skillType.delete({
      where: { id: skillTypeId },
    });
    res.status(200).json(deletedSkillType);
  } catch (err) {
    next(err);
  }
};

exports.connectSkillTypeSkill = async (req, res, next) => {
  try {
    const skillId = Number(req.params.skillId);
    const { skillTypeId } = req.body;
    const skillUpdate = await client.skill.update({
      where: { id: skillId },
      data: {
        SkillType: { connect: { id: skillTypeId } },
      },
    });
    res.status(200).json(skillUpdate);
  } catch (err) {
    next(err);
  }
};

// this controller is not working!
exports.disconnectSkillTypeSkill = async (req, res, next) => {
  try {
    const skillId = Number(req.params.skillId);
    const { skillTypeId } = req.body;
    const skillUpdate = await client.skill.update({
      where: { id: skillId },
      data: {
        SkillType: { disconnect: { id: skillTypeId } },
      },
    });
    res.status(200).json(skillUpdate);
  } catch (err) {
    next(err);
  }
};
