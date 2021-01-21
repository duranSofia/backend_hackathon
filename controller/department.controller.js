const client = require("../config/db");

exports.getAllDepartments = async (req, res, next) => {
  try {
    const departments = await client.department.findMany({
      include: { position: true },
    });
    res.status(200).json(departments);
  } catch (err) {
    next(err);
  }
};

exports.getDepartment = async (req, res, next) => {
  try {
    const departmentId = Number(req.params.departmentId);
    const department = await client.department.findUnique({
      where: { id: departmentId },
      include: { position: true },
    });
    res.status(200).json(department);
  } catch (err) {
    next(err);
  }
};

exports.createDepartment = async (req, res, next) => {
  try {
    const { name } = req.body;
    const createdDepartment = await client.department.create({
      data: { name: name },
    });
    res.status(200).json(createdDepartment);
  } catch (err) {
    next(err);
  }
};

exports.updateDepartment = async (req, res, next) => {
  try {
    const departmentId = Number(req.params.departmentId);
    const { name } = req.body;
    const updatedDepartment = await client.department.update({
      where: { id: departmentId },
      data: { name: name },
      include: { position: true },
    });
    res.status(200).json(updatedDepartment);
  } catch (err) {
    next(err);
  }
};

exports.deleteDepartment = async (req, res, next) => {
  try {
    const departmentId = Number(req.params.departmentId);
    const deletedDepartment = await client.department.delete({
      where: { id: departmentId },
    });
    res.status(200).json(deletedDepartment);
  } catch (err) {
    next(err);
  }
};
