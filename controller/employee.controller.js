const { PrismaClient } = require("@prisma/client");
const client = new PrismaClient();
const createError = require("http-errors");

exports.getAllEmployees = async (req, res, next) => {
  try {
    const employees = await client.employee.findMany();
    res.status(200).json(employees);
  } catch (err) {
    next(err);
  }
};

exports.getOneEmployee = async (req, res, next) => {
  try {
    const employeeId = Number(req.params.employeeId);
    const employee = await client.employee.findUnique({
      where: { id: employeeId },
    });
    if (!employee) {
      throw createError(404, "employee not found");
    }
    res.status(200).json(employee);
  } catch (err) {
    next(err);
  }
};

exports.createEmployee = async (req, res, next) => {
  try {
    const { name, last_name, email, phone, start_date } = req.body;
    // const convertedDate = new Date(start_date).toISOString(); //TODO change it in the FE
    const newEmployee = await client.employee.create({
      data: {
        name: name,
        last_name: last_name,
        email: email,
        phone: phone,
        start_date: start_date,
      },
    });
    res.status(200).json(newEmployee);
  } catch (err) {
    next(err);
  }
};

exports.updateEmployee = async (req, res, next) => {
  try {
    const employeeId = req.params.employeeId;
    const { name, last_name, email, phone, start_date } = req.body;
    const updatedEmployee = await client.employee.update({
      where: { id: employeeId },
      data: {
        name: name,
        last_name: last_name,
        email: email,
        phone: phone,
        start_date: new Date(start_date).toISOString(),
      },
    });
    res.status(200).json(updatedEmployee);
  } catch (err) {
    next(err);
  }
};

exports.deleteEmployee = async (req, res, next) => {
  try {
    const employeeId = Number(req.params.employeeId);
    const deletedEmployee = await client.employee.delete({
      where: { id: employeeId },
    });
    res.status(200).json(deletedEmployee);
  } catch (err) {
    next(err);
  }
};
