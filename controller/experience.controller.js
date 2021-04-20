const client = require("../config/db");

exports.getAllExperiences = async (req, res, next) => {
  try {
    const allExperiences = await client.experience.findMany({
      include: { employee: true, industry: true, network: true, clients: true },
    });
    res.status(200).json(allExperiences);
  } catch (err) {
    next(err);
  }
};

exports.getOneExperience = async (req, res, next) => {
  try {
    const experienceId = Number(req.params.experienceId);
    const uniqueExperience = await client.experience.findUnique({
      where: { id: experienceId },
      include: { employee: true, industry: true, network: true, clients: true },
    });
    res.status(200).json(uniqueExperience);
  } catch (err) {
    next(err);
  }
};

exports.createExperience = async (req, res, next) => {
  try {
    const { clients, industry, network } = req.body;
    const newExperience = await client.experience.create({
      data: {
        clients,
        industry,
        network,
      },
    });
    res.status(200).json(newExperience);
  } catch (err) {
    next(err);
  }
};

exports.updateExperience = async (req, res, next) => {
  try {
    const experienceId = Number(req.params.experienceId);
    const { clients, industry, network } = req.body;
    const updatedExperience = await client.experience.update({
      where: { id: experienceId },
      data: {
        clients,
        industry,
        network,
      },
      include: { employee: true },
    });
    res.status(200).json(updatedExperience);
  } catch (err) {
    next(err);
  }
};

exports.deleteExperience = async (req, res, next) => {
  try {
    const experienceId = Number(req.params.experienceId);
    const deletedExperience = await client.experience.delete({
      where: { id: experienceId },
    });
    res.status(200).json(deletedExperience);
  } catch (err) {
    next(err);
  }
};
