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
        intrests: true,
        companyInfo: true,
        contactInfo: true,
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
        intrests: true,
        companyInfo: true,
        contactInfo: true,
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
    const { name, last_name } = req.body;
    const newEmployee = await client.employee.create({
      data: {
        name,
        last_name,
      },
      // select: { companyInfo: { location: "", department: "", position: "" } },
      // select: { contactInfo: { email: "", phone: "", address: "" } },
      // select: { education: { degree: "" } },
      //select: { experience: { industry: "", network: "", clients: "" } },
      //select: { wish: { project: "", further_education: "" } },
    });
    const newEmployeeContactInfo = await client.contactInfo.create({
      data: {
        email: "",
        phone: "",
        address: "",
        employee: { connect: { id: newEmployee.id } },
      },
    });
    const newEmployeeCompanyInfo = await client.companyInfo.create({
      data: {
        location: "",
        department: "",
        position: "",
        employee: { connect: { id: newEmployee.id } },
      },
    });
    const newEmployeeExperience = await client.experience.create({
      data: {
        industry: [],
        network: [],
        clients: [],
        employee: { connect: { id: newEmployee.id } },
      },
    });
    const newEmployeeIntrests = await client.intrests.create({
      data: {
        hobbies: "",
        special_skills: "",
        employee: { connect: { id: newEmployee.id } },
      },
    });
    const createdEmployee = await client.employee.findUnique({
      where: { id: newEmployee.id },
      include: {
        experience: true,
        skill: true,
        wish: true,
        education: true,
        intrests: true,
        companyInfo: true,
        contactInfo: true,
      },
    });

    res.status(200).json(createdEmployee);
  } catch (err) {
    next(err);
  }
};

exports.updateEmployee = async (req, res, next) => {
  try {
    const employeeId = Number(req.params.employeeId);
    const { name, last_name, picture } = req.body;
    const updatedEmployee = await client.employee.update({
      where: { id: employeeId },
      data: {
        name,
        last_name,
        picture,
      },
      include: {
        experience: true,
        skill: true,
        wish: true,
        education: true,
        intrests: true,
        companyInfo: true,
        contactInfo: true,
      },
    });
    res.status(200).json(updatedEmployee);
  } catch (err) {
    next(err);
  }
};

// update INTRESTS to employee

exports.updateEmployeeIntrests = async (req, res, next) => {
  try {
    const employeeId = Number(req.params.employeeId);
    const { hobbies, special_skills } = req.body;
    console.log(special_skills, hobbies);
    const employee = await findEmployee(employeeId);
    if (!employee) {
      throw createError(404, "Employee not Found");
    }
    const EmployeeIntrests = await client.employee.update({
      where: { id: employeeId },
      data: { intrests: { update: { hobbies, special_skills } } },
      include: {
        experience: true,
        skill: true,
        wish: true,
        education: true,
        intrests: true,
        companyInfo: true,
        contactInfo: true,
      },
    });
    res.status(200).json(EmployeeIntrests);
  } catch (err) {
    next(err);
  }
};

// update CONTACT-INFO to employee
exports.updateEmployeeContact = async (req, res, next) => {
  try {
    const employeeId = Number(req.params.employeeId);
    const { email, phone, address } = req.body;
    const updatedEmployeeContact = await client.employee.update({
      where: { id: employeeId },
      data: { contactInfo: { update: { email, phone, address } } },
      include: {
        experience: true,
        skill: true,
        wish: true,
        education: true,
        intrests: true,
        companyInfo: true,
        contactInfo: true,
      },
    });
    res.status(200).json(updatedEmployeeContact);
  } catch (err) {
    next(err);
  }
};

// update CONP-INFO to employee
exports.updateEmployeeCompanyInfo = async (req, res, next) => {
  try {
    const employeeId = Number(req.params.employeeId);
    const { location, department, position } = req.body;
    const updatedEmployeeCompanyInfo = await client.employee.update({
      where: { id: employeeId },
      data: { companyInfo: { update: { location, department, position } } },
      include: {
        experience: true,
        skill: true,
        wish: true,
        education: true,
        intrests: true,
        companyInfo: true,
        contactInfo: true,
      },
    });
    res.status(200).json(updatedEmployeeCompanyInfo);
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
  const employee = await client.employee.findUnique({
    where: { id },
  });
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
    const { software, languages, professional, softskill } = req.body;
    const employee = await findEmployee(employeeId);
    if (!employee) {
      throw createError(404, "Employee not Found");
    }
    const createdSkill = await client.skill.create({
      data: {
        software,
        languages,
        professional,
        softskill,
        employee: { connect: { id: employeeId } },
      },
      include: { employee: true },
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

// add EXPERIENCE to employee
const findExperience = async (id) => {
  const experience = await client.experience.findUnique({ where: { id } });
  return experience;
};

exports.createNewEmployeeExperience = async (req, res, next) => {
  try {
    const employeeId = Number(req.params.employeeId);
    const { clients, industry, network } = req.body;
    const employee = await findEmployee(employeeId);
    if (!employee) {
      throw createError(404, "Employee not Found");
    }
    const createdExperience = await client.experience.create({
      data: {
        clients,
        industry,
        network,
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
    const { degree } = req.body;
    const employee = await findEmployee(employeeId);
    if (!employee) {
      throw createError(404, "Employee not Found");
    }
    const createdEducation = await client.education.create({
      data: {
        degree,
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

//ADD COMPANY INFO TO EMPLOYEE

const findCompanyInfo = async (id) => {
  const companyInfo = await client.companyInfo.findUnique({ where: { id } });
  return companyInfo;
};

exports.createNewEmployeeCompanyInfo = async (req, res, next) => {
  try {
    const employeeId = Number(req.params.employeeId);
    const { location, department, position } = req.body;
    const employee = await findEmployee(employeeId);
    if (!employee) {
      throw createError(404, "Employee not Found");
    }
    const createdCompanyInfo = await client.companyInfo.create({
      data: {
        location,
        department,
        position,
        employee: { connect: { id: employeeId } },
      },
    });
    res.status(200).json(createdCompanyInfo);
  } catch (err) {
    next(err);
  }
};
// POST connect an existing pcompany information to an employee

exports.addEmployeeCompanyInfoById = async (req, res, next) => {
  try {
    const employeeId = Number(req.params.employeeId);
    const employee = await findEmployee(employeeId);
    if (!employee) {
      throw createError(404, "Employee not Found");
    }
    const companyInfoId = req.body.companyInfoId;
    const companyInfo = await findCompanyInfo(companyInfoId);
    if (!companyInfo) {
      throw createError(404, "Company Information not Found");
    }
    const updatedEmployee = await client.employee.update({
      where: { id: employeeId },
      data: { companyInfo: { connect: { id: companyInfoId } } },
      include: { companyInfo: true },
    });
    res.status(200).json(updatedEmployee);
  } catch (err) {
    next(err);
  }
};

exports.removeCompanyInfoById = async (req, res, next) => {
  try {
    const employeeId = Number(req.params.employeeId);
    const companyInfoId = Number(req.params.companyInfoId);
    const employee = await findEmployee(employeeId);
    const companyInfo = await findCompanyInfo(companyInfoId);
    if (!employee) {
      throw createError(404, "Employee not Found");
    }
    if (!companyInfo) {
      throw createError(404, "Company Information not Found");
    }
    const removedCompanyInfo = await client.employee.update({
      where: { id: employeeId },
      data: { companyInfo: { disconnect: { id: companyInfoId } } },
    });
    res.status(200).json(removedCompanyInfo);
  } catch (err) {
    next(err);
  }
};

// add WISH to employee

const findWish = async (id) => {
  const wish = await client.wish.findUnique({ where: { id } });
  return wish;
};

exports.createNewEmployeeWish = async (req, res, next) => {
  try {
    const employeeId = Number(req.params.employeeId);
    const { project, industry, further_education } = req.body;
    const employee = await findEmployee(employeeId);
    if (!employee) {
      throw createError(404, "Employee not Found");
    }
    const createdWish = await client.wish.create({
      data: {
        project,
        industry,
        further_education,
        employee: { connect: { id: employeeId } },
      },
    });
    res.status(200).json(createdWish);
  } catch (err) {
    next(err);
  }
};

exports.addEmployeeWishById = async (req, res, next) => {
  try {
    const employeeId = Number(req.params.employeeId);
    const employee = await findEmployee(employeeId);

    if (!employee) {
      throw createError(404, "Employee not Found");
    }
    const wishId = req.body.wishId;
    const wish = await findWish(wishId);
    if (!wish) {
      throw createError(404, "Wish not Found");
    }
    const updatedUser = await client.employee.update({
      where: { id: employeeId },
      data: { wish: { connect: { id: wishId } } },
      include: { wish: true },
    });
    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
};

exports.removeWishById = async (req, res, next) => {
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
