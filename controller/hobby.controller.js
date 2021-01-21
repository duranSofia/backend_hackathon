const client = require("../config/db");

const fakeHobbies = [
  { id: 1, name: "Hobby 1" },
  { id: 2, name: "Hobby 2" },
  { id: 3, name: "Hobby 3" },
];

exports.getAllHobbys = async (req, res, next) => {
  try {
    // const allHobby = await client.hobby.findMany();
    // res.status(200).json(allHobby);
    res.status(200).json(fakeHobbys);
  } catch (err) {
    next(err);
  }
};

exports.getOneHobby = async (req, res, next) => {
  try {
    const hobbyId = Number(req.params.hobbyId);
    // const uniqueHobby = await client.hobby.findUnique({
    //   where: { id: hobbyId },
    // });
    res.status(200).json(fakeHobbys.find((hobby) => hobby.id === hobbyId)); // this is just for testing
  } catch (err) {
    next(err);
  }
};

exports.createHobby = async (req, res, next) => {
  try {
    const hobbyId = Number(req.params.hobbyId);
    const { name, type } = req.body;
    const newHobby = await client.hobby.create({
      data: {
        name: name,
        type: type,
        employee: { connect: { id: employeeId } },
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
        name,
        type,
      },
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
