const client = require("../config/db");
const createError = require("http-errors");

exports.createContactInfo = async (req, res, next) => {
  try {
    const { email, phone, address } = req.body;
    const newContactInfo = await client.contactInfo.create({
      data: {
        email,
        phone,
        address,
      },
      include: {
        employee: true,
      },
    });
    res.status(200).json(newContactInfo);
  } catch (err) {
    next(err);
  }
};

exports.getAllContactInfo = async (req, res, next) => {
  try {
    const contatcInfo = await client.contactInfo.findMany({
      include: { employee: true },
    });
    res.status(200).json(contatcInfo);
  } catch (err) {
    next(err);
  }
};

exports.contactInfoEmployee = async (req, res, next) => {
  try {
    const employeeId = Number(req.params.employeeId);
    const { contactInfoId } = req.body;
    const contactInfoUpdate = await client.contactInfo.update({
      where: { id: contactInfoId },
      data: {
        employee: { connect: { id: employeeId } },
      },
    });
    res.status(200).json(contactInfoUpdate);
  } catch (err) {
    next(err);
  }
};

exports.deleteContactInfo = async (req, res, next) => {
  try {
    const contactInfoId = Number(req.params.contactInfoId);
    const deletedContactInfo = await client.contactInfo.delete({
      where: { id: contactInfoId },
    });
    res.status(200).json(deletedContactInfo);
  } catch (err) {
    next(err);
  }
};
