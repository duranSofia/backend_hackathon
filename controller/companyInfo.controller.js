const client = require("../config/db");

exports.getAllCompanyInfo = async (req, res, next) => {
  try {
    const allCompanyInfo = await client.companyInfo.findMany({
      include: { employee: true },
    });
    res.status(200).json(allCompanyInfo);
  } catch (err) {
    next(err);
  }
};

exports.getOneCompanyInfo = async (req, res, next) => {
  try {
    const companyInfoId = Number(req.params.companyInfoId);
    const uniqueCompanyInfoId = await client.companyInfo.findUnique({
      where: { id: companyInfoId },
      include: { employee: true },
    });
    res.status(200).json(uniqueCompanyInfoId);
  } catch (err) {
    next(err);
  }
};

exports.createCompanyInfo = async (req, res, next) => {
  try {
    const { location, department, position } = req.body;
    const newcompanyInfo = await client.companyInfo.create({
      data: {
        location,
        department,
        position,
      },
    });
    res.status(200).json(newcompanyInfo);
  } catch (err) {
    next(err);
  }
};

exports.updateCompanyInfo = async (req, res, next) => {
  try {
    const companyInfoId = Number(req.params.companyInfoId);
    const { location, department, position } = req.body;
    const updatedCompanyInfoId = await client.companyInfo.update({
      where: { id: companyInfoId },
      data: {
        location,
        department,
        position,
      },
      include: { employee: true },
    });
    res.status(200).json(updatedCompanyInfoId);
  } catch (err) {
    next(err);
  }
};

exports.deleteCompanyInfo = async (req, res, next) => {
  try {
    const companyInfoId = Number(req.params.companyInfoId);
    const deletedCompanyInfo = await client.companyInfo.delete({
      where: { id: companyInfoId },
    });
    res.status(200).json(deletedCompanyInfo);
  } catch (err) {
    next(err);
  }
};

exports.connectEmployee = async (req, res, next) => {
  try {
    const employeeId = Number(req.params.employeeId);
    const { companyInfoId } = req.body;
    const companyInfoUpdate = await client.companyInfo.update({
      where: { id: companyInfoId },
      data: {
        employee: { connect: { id: employeeId } },
      },
      include: { employee: true },
    });
    res.status(200).json(companyInfoUpdate);
  } catch (err) {
    next(err);
  }
};

//this controller is not working
exports.disconnectEmployee = async (req, res, next) => {
  try {
    const employeeId = Number(req.params.employeeId);
    const { companyInfoId } = req.body;
    const companyInfoUpdate = await client.companyInfo.update({
      where: { id: companyInfoId },
      data: {
        employee: { disconnect: { id: employeeId } },
      },
      include: { employee: true },
    });
    res.status(200).json(companyInfoUpdate);
  } catch (err) {
    next(err);
  }
};
