const client = require("../../config/db");

exports.getAllSkills = async (req, res, next) => {
  try {
    const allSkills = await client.skill.findMany({
      include: { employee: true, SkillType: true },
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
      include: {
        employee: true,
        SkillType: true,
      },
    });
    res.status(200).json(uniqueSkill);
  } catch (err) {
    next(err);
  }
};

exports.createSkill = async (req, res, next) => {
  try {
    const { name } = req.body;
    const newSkill = await client.skill.create({
      data: { name },
    });
    res.status(200).json(newSkill);
  } catch (err) {
    next(err);
  }
};

exports.updateSkill = async (req, res, next) => {
  try {
    const skillId = Number(req.params.skillId);
    const { softskill } = req.body;
    const updatedSkill = await client.skill.update({
      where: { id: skillId },

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

//ADD SKILLTYPE TO SKILL TABLE

const findSkill = async (id) => {
  const skill = await client.skill.findUnique({
    where: { id },
  });
  return skill;
};

const findSkillType = async (id) => {
  const skillType = await client.skillType.findUnique({ where: { id } });
  return skillType;
};

exports.createNewSkillSkillType = async (req, res, next) => {
  try {
    const skillId = Number(req.params.skillId);
    const { type } = req.body;
    const skill = await findSkill(skillId);
    if (!skill) {
      throw createError(404, "Skill not Found");
    }
    const createdSkillType = await client.skillType.create({
      data: {
        type,
        skill: { connect: { id: skillId } },
      },
    });

    res.status(200).json(createdSkillType);
  } catch (err) {
    next(err);
  }
};

exports.addSkillSkillTypeById = async (req, res, next) => {
  try {
    const skillId = Number(req.params.skillId);
    const skill = await findSkill(skillId);
    if (!skill) {
      throw createError(404, "Skill not Found");
    }
    const skillTypeId = req.body.skillTypeId;
    const skillType = await findSkillType(skillTypeId);
    if (!skillType) {
      throw createError(404, "Skill Type not Found");
    }
    const updatedSkillType = await client.skillType.update({
      where: { id: skillTypeId },
      data: { skill: { connect: { id: skillId } } },
      include: { skill: true },
    });
    res.status(200).json(updatedSkillType);
  } catch (err) {
    next(err);
  }
};

exports.removeSkillTypeById = async (req, res, next) => {
  try {
    const skillId = Number(req.params.skillId);
    const skillTypeId = Number(req.params.skillTypeId);
    const skill = await findSkill(skillId);
    const skillType = await findSkillType(skillTypeId);
    if (!skill) {
      throw createError(404, "Skill not Found");
    }
    if (!skillType) {
      throw createError(404, "Skill Type not Found");
    }
    const removedSkillType = await client.skillType.update({
      where: { id: skillTypeId },
      data: { skill: { disconnect: { id: skillId } } },
      include: { skill: true },
    });
    res.status(200).json(removedSkillType);
  } catch (err) {
    next(err);
  }
};
