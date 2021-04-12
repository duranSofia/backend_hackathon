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
    const { type, name } = req.body;
    const newSkillType = await client.skillType.create({
      data: {
        type,
        name,
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
