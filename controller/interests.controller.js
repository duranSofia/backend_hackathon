const client = require("../config/db");

exports.getAllInterest = async (req, res, next) => {
  try {
    const interests = await client.intrests.findMany({
      include: { employee: true },
    });
    res.status(200).json(interests);
  } catch (err) {
    next(err);
  }
};

exports.getOneInterest = async (req, res, next) => {
  try {
    const interestId = Number(req.params.interestId);
    const interest = await client.intrests.findUnique({
      where: { id: interestId },
      include: { employee: true },
    });
    res.status(200).json(interest);
  } catch (err) {
    next(err);
  }
};

exports.createInterest = async (req, res, next) => {
  try {
    const { hobbies, special_skills } = req.body;
    const newInterest = await client.intrests.create({
      data: {
        hobbies,
        special_skills,
      },
      include: { employee: true },
    });
    res.status(200).json(newInterest);
  } catch (err) {
    next(err);
  }
};

exports.updateInterest = async (req, res, next) => {
  try {
    const interestId = Number(req.params.interestId);
    const { hobbies, special_skills } = req.body;
    const updatedInterest = await client.intrests.update({
      where: { id: interestId },
      data: {
        hobbies,
        special_skills,
      },
      include: { employee: true },
    });
    res.status(200).json(updatedInterest);
  } catch (err) {
    next(err);
  }
};

exports.deleteInterest = async (req, res, next) => {
  try {
    const interestId = Number(req.params.interestId);
    const deletedInterested = await client.intrests.delete({
      where: { id: interestId },
      include: { employee: true },
    });
    res.status(200).json(deletedInterested);
  } catch (err) {
    next(err);
  }
};

exports.connectEmployee = async (req, res, next) => {
  try {
    const employeeId = Number(req.params.employeeId);
    const { interestId } = req.body;
    const interestUpdate = await client.intrests.update({
      where: { id: interestId },
      data: {
        employee: { connect: { id: employeeId } },
      },
      include: { employee: true },
    });
    res.status(200).json(interestUpdate);
  } catch (err) {
    next(err);
  }
};

//this controller is not working!!

exports.disconnectEmployee = async (req, res, next) => {
  try {
    const employeeId = Number(req.params.employeeId);
    const { interestId } = req.body;
    const employeeUpdate = await client.employee.update({
      where: { id: employeeId },
      data: {
        intrests: { disconnect: { id: interestId } },
      },
    });
    const interestUpdate = await client.intrests.findUnique({
      where: { id: interestId },
      include: { employee: true },
    });
    res.status(200).json(interestUpdate);
  } catch (err) {
    next(err);
  }
};
