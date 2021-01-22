const { PrismaClient } = require("@prisma/client");
const client = new PrismaClient();
const createError = require("http-errors");

exports.getAllEmployees = async (req, res, next) => {
  try {
    const employees = await client.employee.findMany({
      include: {
        experience: true,
        skill: true,
        wish: true,
        education: true,
        hobby: true,
      },
    });
    res.status(200).json(employees);
  } catch (err) {
    next(err);
  }
};

exports.getOneEmployee = async (req, res, next) => {
  try {
    const employeeId = Number(req.params.employeeId);
    const employee = await client.employee.findUnique({
      where: { id: employeeId },
      include: {
        experience: true,
        skill: true,
        wish: true,
        education: true,
        hobby: true,
      },
    });
    if (!employee) {
      throw createError(404, "employee not found");
    }
    res.status(200).json(employee);
  } catch (err) {
    next(err);
  }
};

exports.createEmployee = async (req, res, next) => {
  try {
    const { name, last_name, email, phone, start_date } = req.body;
    // const convertedDate = new Date(start_date).toISOString(); //TODO change it in the FrontEnd
    const newEmployee = await client.employee.create({
      data: {
        name: name,
        last_name: last_name,
        email: email,
        phone: phone,
        start_date: start_date,
      },
    });
    res.status(200).json(newEmployee);
  } catch (err) {
    next(err);
  }
};

exports.updateEmployee = async (req, res, next) => {
  try {
    const employeeId = req.params.employeeId;
    const { name, last_name, email, phone, start_date } = req.body;
    const updatedEmployee = await client.employee.update({
      where: { id: employeeId },
      data: {
        name: name,
        last_name: last_name,
        email: email,
        phone: phone,
        start_date: start_date,
      },
      include: {
        experience: true,
        skill: true,
        wish: true,
        education: true,
        hobby: true,
      },
    });
    res.status(200).json(updatedEmployee);
  } catch (err) {
    next(err);
  }
};

exports.deleteEmployee = async (req, res, next) => {
  try {
    const employeeId = Number(req.params.employeeId);
    const deletedEmployee = await client.employee.delete({
      where: { id: employeeId },
    });
    res.status(200).json(deletedEmployee);
  } catch (err) {
    next(err);
  }
};

// add SKILL to employee

const findEmployee = async (id) => {
  const employee = await client.employee.findUnique({ where: { id } });
  return employee;
};
const findSkill = async (id) => {
  const skill = await client.skill.findUnique({ where: { id } });
  return skill;
};

exports.createSkill = async (req, res, next) => {
  try {
    const employeeId = Number(req.params.employeeId);
    const { name, type } = req.body;
    const employee = await findEmployee(employeeId);
    if (!employee) {
      throw createError(404, "Employee not Found");
    }
    const createdSkill = await client.skill.create({
      data: {
        name: name,
        type: type,
        employee: { connect: { id: employeeId } },
      },
    });
    res.status(200).json(createdSkill);
  } catch (err) {
    next(err);
  }
};

//{ pass this in postman
//   "skillId": 11
// }

exports.updateSkill = async (req, res, next) => {
  try {
    const employeeId = Number(req.params.employeeId);
    const employee = await findEmployee(employeeId);

    if (!employee) {
      throw createError(404, "Employee not Found");
    }
    const skillId = req.body.skillId;
    const skill = await findSkill(skillId);
    if (!skill) {
      throw createError(404, "Skill not Found");
    }
    const updatedUser = await client.employee.update({
      where: { id: employeeId },
      data: { skill: { connect: { id: skillId } } },
      include: { skill: true },
    });
    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
};

exports.removeSkill = async (req, res, next) => {
  try {
    const employeeId = Number(req.params.employeeId);
    const skillId = Number(req.params.skillId);
    const employee = await findEmployee(employeeId);
    const skill = await findSkill(skillId);
    if (!employee) {
      throw createError(404, "Employee not Found");
    }
    if (!skill) {
      throw createError(404, "Skill not Found");
    }
    const removedSkill = await client.employee.update({
      where: { id: employeeId },
      data: { skill: { disconnect: { id: skillId } } },
      include: { skill: true },
    });
    res.status(200).json(removedSkill);
  } catch (err) {
    next(err);
  }
};

// add HOBBY to employee
const findHobby = async (id) => {
  const hobby = await client.hobby.findUnique({ where: { id } });
  return hobby;
};

exports.createHobby = async (req, res, next) => {
  try {
    const employeeId = Number(req.params.employeeId);
    const { name, type } = req.body;
    const employee = await findEmployee(employeeId);
    if (!employee) {
      throw createError(404, "Employee not Found");
    }
    const createdHobby = await client.hobby.create({
      data: {
        name: name,
        type: type,
        employee: { connect: { id: employeeId } },
      },
    });
    res.status(200).json(createdHobby);
  } catch (err) {
    next(err);
  }
};

exports.updateHobby = async (req, res, next) => {
  try {
    const employeeId = Number(req.params.employeeId);
    const employee = await findEmployee(employeeId);

    if (!employee) {
      throw createError(404, "Employee not Found");
    }
    const hobbyId = req.body.hobbyId;
    const updatedUser = await client.employee.update({
      where: { id: employeeId },
      data: { hobby: { connect: { id: hobbyId } } },
      include: { hobby: true },
    });
    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
};

exports.removeHobby = async (req, res, next) => {
  try {
    const employeeId = Number(req.params.employeeId);
    const hobbyId = Number(req.params.hobbyId);
    const employee = await findEmployee(employeeId);
    const hobby = await findHobby(hobbyId);
    if (!employee) {
      throw createError(404, "Employee not Found");
    }
    if (!hobby) {
      throw createError(404, "Hobby not Found");
    }
    const removedHobby = await client.employee.update({
      where: { id: employeeId },
      data: { hobby: { disconnect: { id: hobbyId } } },
      include: { hobby: true },
    });
    res.status(200).json(removedHobby);
  } catch (err) {
    next(err);
  }
};

// add EXPERIENCE to employee
const findExperience = async (id) => {
  const experience = await client.experience.findUnique({ where: { id } });
  return experience;
};

exports.createExperience = async (req, res, next) => {
  try {
    const employeeId = Number(req.params.employeeId);
    const { name, type } = req.body;
    const employee = await findEmployee(employeeId);
    if (!employee) {
      throw createError(404, "Employee not Found");
    }
    const createdExperience = await client.experience.create({
      data: {
        name: name,
        type: type,
        employee: { connect: { id: employeeId } },
      },
    });
    res.status(200).json(createdExperience);
  } catch (err) {
    next(err);
  }
};

exports.updateExperience = async (req, res, next) => {
  try {
    const employeeId = Number(req.params.employeeId);
    const employee = await findEmployee(employeeId);

    if (!employee) {
      throw createError(404, "Employee not Found");
    }
    const experienceId = req.body.experienceId;
    const updatedUser = await client.employee.update({
      where: { id: employeeId },
      data: { experience: { connect: { id: experienceId } } },
      include: { experience: true },
    });
    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
};

exports.removeExperience = async (req, res, next) => {
  try {
    const employeeId = Number(req.params.employeeId);
    const experienceId = Number(req.params.experienceId);
    const employee = await findEmployee(employeeId);
    const experience = await findExperience(experienceId);
    if (!employee) {
      throw createError(404, "Employee not Found");
    }
    if (!experience) {
      throw createError(404, "Experience not Found");
    }
    const removedExperience = await client.employee.update({
      where: { id: employeeId },
      data: { experience: { disconnect: { id: experienceId } } },
      include: { experience: true },
    });
    res.status(200).json(removedExperience);
  } catch (err) {
    next(err);
  }
};

// add WISH to employee

const findWish = async (id) => {
  const wish = await client.wish.findUnique({ where: { id } });
  return wish;
};

exports.createWish = async (req, res, next) => {
  try {
    const employeeId = Number(req.params.employeeId);
    const { name, type } = req.body;
    const employee = await findEmployee(employeeId);
    if (!employee) {
      throw createError(404, "Employee not Found");
    }
    const createdWish = await client.wish.create({
      data: {
        name: name,
        type: type,
        employee: { connect: { id: employeeId } },
      },
    });
    res.status(200).json(createdWish);
  } catch (err) {
    next(err);
  }
};

exports.updateWish = async (req, res, next) => {
  try {
    const employeeId = Number(req.params.employeeId);
    const employee = await findEmployee(employeeId);

    if (!employee) {
      throw createError(404, "Employee not Found");
    }
    const { wishId, name, type } = req.body;
    const updatedWish = await client.wish.update({
      where: { id: wishId },
      data: { name, type },
    });
    const updatedEmployee = await client.employee.update({
      where: { id: employeeId },
      data: { wish: { connect: { id: wishId } } },
      include: { wish: true },
    });
    res.status(200).json(updatedEmployee);
  } catch (err) {
    next(err);
  }
};

exports.removeWish = async (req, res, next) => {
  try {
    const employeeId = Number(req.params.employeeId);
    const wishId = Number(req.params.wishId);
    const employee = await findEmployee(employeeId);
    const wish = await findWish(wishId);
    if (!employee) {
      throw createError(404, "Employee not Found");
    }
    if (!wish) {
      throw createError(404, "Wish not Found");
    }
    const removedWish = await client.employee.update({
      where: { id: employeeId },
      data: { wish: { disconnect: { id: wishId } } },
      include: { wish: true },
    });
    res.status(200).json(removedWish);
  } catch (err) {
    next(err);
  }
};
