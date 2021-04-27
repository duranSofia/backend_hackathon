const client = require("../config/db");
const Joi = require("joi");

exports.employeeValidator = async (err, req, res, next) => {
  const employeeId = Number(req.params.employeeId);
  const employee = await findEmployee(employeeId);
  if (!employee) {
    err.status = 400;
    err.message = "employee not found";
  }
  res.status(err.status).json({ message: err.message });
  next(employeeId);
};

exports.skillValidator = async (err, req, res, next) => {
  const skillId = Number(req.params.skillId);
  const skill = await client.skill.findUnique(skillId);
  if (!skill) {
    err.status = 400;
    err.message = "skill not found";
  }
  res.status(err.status).json({ message: err.message });
};
