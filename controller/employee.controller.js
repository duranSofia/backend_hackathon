// const { PrismaClient } = require("@prisma/client");
// const client = new PrismaClient();
// const createError = require("http-errors");

// const fakeEmployee = {
//   id: 1,
//   name: "Susan",
//   last_name: "Jackson",
//   email: "mail@mailtest.com",
//   phone: "213193579138",
//   start_date: 2020 - 10 - 02,
//   network: "networktest",
// };

// exports.getAllEmployees = async (req, res, next) => {
//   try {
//     const employees = await client.employee.findMany();
//     res.status(200).json(fakeEmployee);
//   } catch (err) {
//     next(err);
//   }
// };

// exports.getEmployee = async (req, res, next) => {
//   try {
//     const employeeId = Number(req.params.employeeId);
//     const employee = await client.employee.findUnique({
//       where: { id: employeeId },
//     });
//     if (!employee) {
//       throw createError(404, "employee not found");
//     }
//     res.status(200).json(employee);
//   } catch (err) {
//     next(err);
//   }
// };

// exports.createEmployee = async (req, res, next) => {
//   try {
//     const { name, last_name, email, phone, start_date, network } = req.body;
//     const createdEmployee = await client.employee.create({
//       data: {
//         name: name,
//         last_name: last_name,
//         email: email,
//         phone: phone,
//         start_date: start_date,
//         network: network,
//       },
//     });
//     res.status(200).json(createdEmployee);
//   } catch (err) {
//     next(err);
//   }
// };

// exports.updateEmployee = async (req, res, next) => {
//   try {
//     const employeeId = req.params.employeeId;
//     const newTitle = req.body.title;
//     const updatedEmployee = await client.employee.update({
//       where: { id: employeeId },
//       data: { title: newTitle },
//     });
//     res.status(200).json(updatedEmployee);
//   } catch (err) {
//     next(err);
//   }
// };

// exports.deleteEmployee = async (req, res, next) => {
//   try {
//     const employeeId = Number(req.params.employeeId);
//     const deletedEmployee = await client.employee.delete({
//       where: { id: employeeId },
//     });
//     res.status(200).json(deletedEmployee);
//   } catch (err) {
//     next(err);
//   }
// }
