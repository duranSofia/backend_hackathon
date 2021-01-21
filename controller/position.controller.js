const client = require("../config/db");

exports.getAllPositions = async (req, res, next) => {
  try {
    const positions = await client.position.findMany({
      include: { employee: true },
    });
    res.status(200).json(positions);
  } catch (err) {
    next(err);
  }
};

exports.getPosition = async (req, res, next) => {
  try {
    const positionId = Number(req.params.positionId);
    const position = await client.position.findUnique({
      where: { id: positionId },
      include: { employee: true },
    });
    res.status(200).json(position);
  } catch (err) {
    next(err);
  }
};

exports.createPosition = async (req, res, next) => {
  try {
    const { name } = req.body;
    const createdPosition = await client.position.create({
      data: { name: name },
    });
    res.status(200).json(createdPosition);
  } catch (err) {
    next(err);
  }
};

exports.updatePosition = async (req, res, next) => {
  try {
    const positionId = Number(req.params.positionId);
    const { name } = req.body;
    const updatedPosition = await client.position.update({
      where: { id: positionId },
      data: { name: name },
      include: { employee: true },
    });
    res.status(200).json(updatedPosition);
  } catch (err) {
    next(err);
  }
};

exports.deletePosition = async (req, res, next) => {
  try {
    const positionId = Number(req.params.positionId);
    const deletedPosition = await client.position.delete({
      where: { id: positionId },
    });
    res.status(200).json(deletedPosition);
  } catch (err) {
    next(err);
  }
};
