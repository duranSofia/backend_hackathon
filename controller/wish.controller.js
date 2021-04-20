const client = require("../config/db");

exports.getAllWishes = async (req, res, next) => {
  try {
    const wishes = await client.wish.findMany({
      include: { employee: true, clients: true, industry: true },
    });
    res.status(200).json(wishes);
  } catch (err) {
    next(err);
  }
};

exports.getWish = async (req, res, next) => {
  try {
    const wishId = Number(req.params.wishId);
    const wish = await client.wish.findUnique({
      where: { id: wishId },
      include: { employee: true, clients: true, industry: true },
    });
    res.status(200).json(wish);
  } catch (err) {
    next(err);
  }
};

exports.createWish = async (req, res, next) => {
  try {
    const { project, further_education } = req.body;
    const createdWish = await client.wish.create({
      data: { project, further_education },
      include: { employee: true, clients: true, industry: true },
    });
    res.status(200).json(createdWish);
  } catch (err) {
    next(err);
  }
};

exports.updateWish = async (req, res, next) => {
  try {
    const wishId = Number(req.params.wishId);
    const { project, industry, further_education } = req.body;
    const updatedWish = await client.wish.update({
      where: { id: wishId },
      data: { project, industry, further_education },
      include: { employee: true, clients: true, industry: true },
    });
    res.status(200).json(updatedWish);
  } catch (err) {
    next(err);
  }
};

exports.deleteWish = async (req, res, next) => {
  try {
    const wishId = Number(req.params.wishId);
    const deletedWish = await client.wish.delete({
      where: { id: wishId },
    });
    res.status(200).json(deletedWish);
  } catch (err) {
    next(err);
  }
};

exports.connectWishIndustry = async (req, res, next) => {
  try {
    const industryId = Number(req.params.industryId);
    const { wishId } = req.body;
    const wishUpdate = await client.wish.update({
      where: { id: wishId },
      data: {
        industry: { connect: { id: industryId } },
      },
      include: { employee: true, clients: true, industry: true },
    });
    res.status(200).json(wishUpdate);
  } catch (err) {
    next(err);
  }
};

exports.disconnectWishIndustry = async (req, res, next) => {
  try {
    const industryId = Number(req.params.industryId);
    const { wishId } = req.body;
    const wishUpdate = await client.wish.update({
      where: { id: wishId },
      data: {
        industry: { disconnect: { id: industryId } },
      },
      include: { employee: true, clients: true, industry: true },
    });
    res.status(200).json(wishUpdate);
  } catch (err) {
    next(err);
  }
};

exports.connectWishClient = async (req, res, next) => {
  try {
    const clientId = Number(req.params.clientId);
    const { wishId } = req.body;
    const wishUpdate = await client.wish.update({
      where: { id: wishId },
      data: {
        clients: { connect: { id: clientId } },
      },
      include: { employee: true, clients: true, industry: true },
    });
    res.status(200).json(wishUpdate);
  } catch (err) {
    next(err);
  }
};

exports.disconnectWishClient = async (req, res, next) => {
  try {
    const clientId = Number(req.params.clientId);
    const { wishId } = req.body;
    const wishUpdate = await client.wish.update({
      where: { id: wishId },
      data: {
        clients: { disconnect: { id: clientId } },
      },
      include: { employee: true, clients: true, industry: true },
    });
    res.status(200).json(wishUpdate);
  } catch (err) {
    next(err);
  }
};
