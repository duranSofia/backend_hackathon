const client = require("../config/db");

exports.getAllSkills = async (req, res, next) => {
  try {
    const allSkills = await client.skill.findMany({
      include: { employee: true },
    });
    res.status(200).json(allSkills);
  } catch (err) {
    next(err);
  }
};

exports.getOneSkill = async (req, res, next) => {
  try {
    const skillId = Number(req.params.skillId);
    const uniqueSkill = await client.skill.findUnique({
      where: { id: skillId },
      include: { employee: true },
    });
    res.status(200).json(uniqueSkill);
  } catch (err) {
    next(err);
  }
};

exports.createSkill = async (req, res, next) => {
  try {
    const { name, type } = req.body;
    const newSkill = await client.skill.create({
      data: {
        name: name,
        type: type,
      },
    });
    res.status(200).json(newSkill);
  } catch (err) {
    next(err);
  }
};

exports.updateSkill = async (req, res, next) => {
  try {
    const skillId = Number(req.params.skillId);
    const { name, type } = req.body;
    const updatedSkill = await client.skill.update({
      where: { id: skillId },
      data: {
        name: name,
        type: type,
      },
      include: { employee: true },
    });
    res.status(200).json(updatedSkill);
  } catch (err) {
    next(err);
  }
};

exports.deleteSkill = async (req, res, next) => {
  try {
    const skillId = Number(req.params.skillId);
    const deletedSkill = await client.skill.delete({
      where: { id: skillId },
    });
    res.status(200).json(deletedSkill);
  } catch (err) {
    next(err);
  }
};
