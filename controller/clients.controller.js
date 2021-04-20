const client = require("../config/db");

// will be used for a dropdown
exports.getAllClients = async (req, res, next) => {
  try {
    const allClients = await client.clients.findMany({
      include: { experience: true, wish: true },
    });
    res.status(200).json(allClients);
  } catch (err) {
    next(err);
  }
};

exports.GetOneClient = async (req, res, next) => {
  try {
    const clientId = Number(req.params.clientId);
    const oneClient = await client.clients.findUnique({
      where: { id: clientId },
      include: { experience: true, wish: true },
    });
    res.status(200).json(oneClient);
  } catch (err) {
    next(err);
  }
};

exports.AddClient = async (req, res, next) => {
  try {
    const { name } = req.body;
    const AddedClient = await client.clients.create({
      data: { name },
    });
    res.status(200).json(AddedClient);
  } catch (err) {
    next(err);
  }
};

exports.connectClientExperience = async (req, res, next) => {
  try {
    const experienceId = Number(req.params.experienceId);
    const { clientId } = req.body;
    const experienceUpdate = await client.experience.update({
      where: { id: experienceId },
      data: {
        clients: { connect: { id: clientId } },
      },
    });
    res.status(200).json(experienceUpdate);
  } catch (err) {
    next(err);
  }
};

exports.disconnectClientExperience = async (req, res, next) => {
  try {
    const experienceId = Number(req.params.experienceId);
    const { clientId } = req.body;
    const experienceUpdate = await client.experience.update({
      where: { id: experienceId },
      data: {
        clients: { disconnect: { id: clientId } },
      },
    });
    res.status(200).json(experienceUpdate);
  } catch (err) {
    next(err);
  }
};
