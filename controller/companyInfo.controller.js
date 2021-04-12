const client = require("../config/db");

exports.getAllCompanyInfo = async (req, res, next) => {
  try {
    const allCompanyInfo = await client.company_info.findMany({
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
    const uniqueCompanyInfoId = await client.company_info.findUnique({
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
    const newcompanyInfo = await client.company_info.create({
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
    const updatedCompanyInfoId = await client.company_info.update({
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
    const deletedCompanyInfo = await client.company_info.delete({
      where: { id: companyInfoId },
    });
    res.status(200).json(deletedCompanyInfo);
  } catch (err) {
    next(err);
  }
};
