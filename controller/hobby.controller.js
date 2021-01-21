const client = require("../config/db");

exports.getAllHobbies = async (req, res, next) => {
  try {
    const allHobbys = await client.hobby.findMany({
      include: { employee: true },
    });
    res.status(200).json(allHobbys);
  } catch (err) {
    next(err);
  }
};

exports.getOneHobby = async (req, res, next) => {
  try {
    const hobbyId = Number(req.params.hobbyId);
    const uniqueHobby = await client.hobby.findUnique({
      where: { id: hobbyId },
      include: { employee: true },
    });
    res.status(200).json(uniqueHobby);
  } catch (err) {
    next(err);
  }
};

exports.createHobby = async (req, res, next) => {
  try {
    const { name, type } = req.body;
    const newHobby = await client.hobby.create({
      data: {
        name: name,
        type: type,
      },
    });
    res.status(200).json(newHobby);
  } catch (err) {
    next(err);
  }
};

exports.updateHobby = async (req, res, next) => {
  try {
    const hobbyId = Number(req.params.hobbyId);
    const { name, type } = req.body;
    const updatedHobby = await client.hobby.update({
      where: { id: hobbyId },
      data: {
        name: name,
        type: type,
      },
      include: { employee: true },
    });
    res.status(200).json(updatedHobby);
  } catch (err) {
    next(err);
  }
};

exports.deleteHobby = async (req, res, next) => {
  try {
    const hobbyId = Number(req.params.hobbyId);
    const deletedHobby = await client.hobby.delete({
      where: { id: hobbyId },
    });
    res.status(200).json(deletedHobby);
  } catch (err) {
    next(err);
  }
};
