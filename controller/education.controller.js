const client = require("../config/db");

exports.getAllEducation = async (req, res, next) => {
  try {
    const educations = await client.education.findMany({
      include: { employee: true },
    });
    res.status(200).json(educations);
  } catch (err) {
    next(err);
  }
};

exports.getEducation = async (req, res, next) => {
  try {
    const educationId = Number(req.params.educationId);
    const education = await client.education.findUnique({
      where: { id: educationId },
      include: { employee: true },
    });
    res.status(200).json(education);
  } catch (err) {
    next(err);
  }
};

exports.createEducation = async (req, res, next) => {
  try {
    const { degree } = req.body;
    const createdEducation = await client.education.create({
      data: { degree },
      include: { employee: true },
    });
    res.status(200).json(createdEducation);
  } catch (err) {
    next(err);
  }
};

exports.updateEducation = async (req, res, next) => {
  try {
    const educationId = Number(req.params.educationId);
    const { degree } = req.body;
    const updatedEducation = await client.education.update({
      where: { id: educationId },
      data: { degree },
      include: { employee: true },
    });
    res.status(200).json(updatedEducation);
  } catch (err) {
    next(err);
  }
};

exports.deleteEducation = async (req, res, next) => {
  try {
    const educationId = Number(req.params.educationId);
    const deletedEducation = await client.education.delete({
      where: { id: educationId },
      include: { employee: true },
    });
    res.status(200).json(deletedEducation);
  } catch (err) {
    next(err);
  }
};

exports.connectEmployee = async (req, res, next) => {
  try {
    const employeeId = Number(req.params.employeeId);
    const { educationId } = req.body;
    const educationUpdate = await client.education.update({
      where: { id: educationId },
      data: {
        employee: { connect: { id: employeeId } },
      },
      include: { employee: true },
    });
    res.status(200).json(educationUpdate);
  } catch (err) {
    next(err);
  }
};

exports.disconnectEmployee = async (req, res, next) => {
  try {
    const employeeId = Number(req.params.employeeId);
    const { educationId } = req.body;
    const educationUpdate = await client.education.update({
      where: { id: educationId },
      data: {
        employee: { disconnect: { id: employeeId } },
      },
      include: { employee: true },
    });
    res.status(200).json(educationUpdate);
  } catch (err) {
    next(err);
  }
};
