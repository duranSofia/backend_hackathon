const client = require("../config/db");

exports.getAllOffices = async (req, res, next) => {
  try {
    const allOffices = await client.office.findMany({
      include: { employee: true },
    });
    res.status(200).json(allOffices);
  } catch (err) {
    next(err);
  }
};

exports.getOneOffice = async (req, res, next) => {
  try {
    const officeId = Number(req.params.officeId);
    const uniqueOffice = await client.office.findUnique({
      where: { id: officeId },
      include: { employee: true },
    });
    res.status(200).json(uniqueOffice);
  } catch (err) {
    next(err);
  }
};

exports.createOffice = async (req, res, next) => {
  try {
    const { location } = req.body;
    const newOffice = await client.office.create({
      data: {
        location: location,
      },
    });
    res.status(200).json(newOffice);
  } catch (err) {
    next(err);
  }
};

exports.updateOffice = async (req, res, next) => {
  try {
    const officeId = Number(req.params.officeId);
    const { location } = req.body;
    const updatedOffice = await client.office.update({
      where: { id: officeId },
      data: {
        location: location,
      },
      include: { employee: true },
    });
    res.status(200).json(updatedOffice);
  } catch (err) {
    next(err);
  }
};

exports.deleteOffice = async (req, res, next) => {
  try {
    const officeId = Number(req.params.officeId);
    const deletedOffice = await client.office.delete({
      where: { id: officeId },
    });
    res.status(200).json(deletedOffice);
  } catch (err) {
    next(err);
  }
};
