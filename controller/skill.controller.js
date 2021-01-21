const client = require("../config/db");

const fakeSkills = [
  { id: 1, name: "Skill 1" },
  { id: 2, name: "Skill 2" },
  { id: 3, name: "Skill 3" },
];

exports.getAllSkills = async (req, res, next) => {
  try {
    // const allSkill = await client.skill.findMany();
    // res.status(200).json(allSkill);
    res.status(200).json(fakeSkills);
  } catch (err) {
    next(err);
  }
};

exports.getOneSkill = async (req, res, next) => {
  try {
    const skillId = Number(req.params.skillId);
    // const uniqueSkill = await client.skill.findUnique({
    //   where: { id: skillId },
    // });
    res.status(200).json(fakeSkills.find((skill) => skill.id === skillId)); // this is just for testing
  } catch (err) {
    next(err);
  }
};

exports.createSkill = async (req, res, next) => {
  try {
    const skillId = Number(req.params.skillId);
    const { name, type } = req.body;
    const newSkill = await client.skill.create({
      data: {
        name: name,
        type: type,
        employee: { connect: { id: employeeId } },
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
        name,
        type,
      },
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
