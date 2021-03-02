const client = require("../config/db");

exports.getAllOthers = async (req, res, next) => {
  try {
    const allOthers = await client.other.findMany({
      include: { employee: true },
    });
    res.status(200).json(allOthers);
  } catch (err) {
    next(err);
  }
};

exports.getOneOther = async (req, res, next) => {
  try {
    const otherId = Number(req.params.otherId);
    const uniqueOther = await client.other.findUnique({
      where: { id: otherId },
      include: { employee: true },
    });
    res.status(200).json(uniqueOther);
  } catch (err) {
    next(err);
  }
};

exports.createOther = async (req, res, next) => {
  try {
    const { hobbies, special_skills } = req.body;
    const newOther = await client.other.create({
      data: {
        hobbies,
        special_skills,
      },
    });
    res.status(200).json(newOther);
  } catch (err) {
    next(err);
  }
};

exports.updateOther = async (req, res, next) => {
  try {
    const otherId = Number(req.params.otherId);
    const { hobbies, special_skills } = req.body;
    const updatedOther = await client.other.update({
      where: { id: otherId },
      data: {
        hobbies,
        special_skills,
      },
      include: { employee: true },
    });
    res.status(200).json(updatedOther);
  } catch (err) {
    next(err);
  }
};

exports.deleteOther = async (req, res, next) => {
  try {
    const otherId = Number(req.params.otherId);
    const deletedOther = await client.other.delete({
      where: { id: otherId },
    });
    res.status(200).json(deletedOther);
  } catch (err) {
    next(err);
  }
};
