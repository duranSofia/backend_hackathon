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

//POST create a skill and connect it to an employee
// create a function to check if the skill already exists

exports.createNewEmployeeSkill = async (req, res, next) => {
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

//POST connect an existing skill to an employee

//{ pass this in postman  "skillId": 11}

exports.addEmployeeSkillById = async (req, res, next) => {
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
    const updatedEmployee = await client.employee.update({
      where: { id: employeeId },
      data: { skill: { connect: { id: skillId } } },
      include: { skill: true },
    });
    res.status(200).json(updatedEmployee);
  } catch (err) {
    next(err);
  }
};

exports.removeSkillById = async (req, res, next) => {
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

exports.createNewEmployeeHobby = async (req, res, next) => {
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

exports.addEmployeeHobbyById = async (req, res, next) => {
  try {
    const employeeId = Number(req.params.employeeId);
    const employee = await findEmployee(employeeId);

    if (!employee) {
      throw createError(404, "Employee not Found");
    }
    const hobbyId = req.body.hobbyId;
    const hobby = await findHobby(hobbyId);
    if (!hobby) {
      throw createError(404, "Hobby not Found");
    }
    const updatedEmployee = await client.employee.update({
      where: { id: employeeId },
      data: { hobby: { connect: { id: hobbyId } } },
      include: { hobby: true },
    });
    res.status(200).json(updatedEmployee);
  } catch (err) {
    next(err);
  }
};

exports.removeHobbyById = async (req, res, next) => {
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

exports.createNewEmployeeExperience = async (req, res, next) => {
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

exports.addEmployeeExperienceById = async (req, res, next) => {
  try {
    const employeeId = Number(req.params.employeeId);
    const employee = await findEmployee(employeeId);

    if (!employee) {
      throw createError(404, "Employee not Found");
    }
    const experienceId = req.body.experienceId;
    const experience = await findExperience(experienceId);
    if (!experience) {
      throw createError(404, "Experience not Found");
    }
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

exports.removeExperienceById = async (req, res, next) => {
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

// add EDUCATION to employee

const findEducation = async (id) => {
  const education = await client.education.findUnique({ where: { id } });
  return education;
};

//POST create a education and connect it to an employee
// create a function to check if the education already exists

exports.createNewEmployeeEducation = async (req, res, next) => {
  try {
    const employeeId = Number(req.params.employeeId);
    const { name, type } = req.body;
    const employee = await findEmployee(employeeId);
    if (!employee) {
      throw createError(404, "Employee not Found");
    }
    const createdEducation = await client.education.create({
      data: {
        name: name,
        type: type,
        employee: { connect: { id: employeeId } },
      },
    });
    res.status(200).json(createdEducation);
  } catch (err) {
    next(err);
  }
};

//POST connect an existing education to an employee

//{ pass this in postman  "educationId": 11}

exports.addEmployeeEducationById = async (req, res, next) => {
  try {
    const employeeId = Number(req.params.employeeId);
    const employee = await findEmployee(employeeId);
    if (!employee) {
      throw createError(404, "Employee not Found");
    }
    const educationId = req.body.educationId;
    const education = await findEducation(educationId);
    if (!education) {
      throw createError(404, "Education not Found");
    }
    const updatedEmployee = await client.employee.update({
      where: { id: employeeId },
      data: { education: { connect: { id: educationId } } },
      include: { education: true },
    });
    res.status(200).json(updatedEmployee);
  } catch (err) {
    next(err);
  }
};

exports.removeEducationById = async (req, res, next) => {
  try {
    const employeeId = Number(req.params.employeeId);
    const educationId = Number(req.params.educationId);
    const employee = await findEmployee(employeeId);
    const education = await findEducation(educationId);
    if (!employee) {
      throw createError(404, "Employee not Found");
    }
    if (!education) {
      throw createError(404, "Education not Found");
    }
    const removedEducation = await client.employee.update({
      where: { id: employeeId },
      data: { education: { disconnect: { id: educationId } } },
      include: { education: true },
    });
    res.status(200).json(removedEducation);
  } catch (err) {
    next(err);
  }
};
