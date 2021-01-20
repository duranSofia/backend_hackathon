const { PrismaClient } = require("@prisma/client");
const client = new PrismaClient();
const createError = require("http-errors");

// all "todo values" to be updated with real values
const findTodolist = async (id) => {
  const todolist = await client.todolist.findUnique({ where: { id } });
  return todolist;
};
const findTask = async (id) => {
  const task = await client.task.findUnique({ where: { id } });
  return task;
};
exports.getAllTodolist = async (req, res, next) => {
  try {
    const todolists = await client.todolist.findMany();
    res.status(200).json(todolists);
  } catch (err) {
    next(err);
  }
};
exports.getTodolist = async (req, res, next) => {
  try {
    const todolistId = Number(req.params.todolistId);
    const todolist = await client.todolist.findUnique({
      where: { id: todolistId },
      include: {
        task: {
          orderBy: {
            title: "desc",
          },
        },
      },
    });
    if (!todolist) {
      throw createError(404, "todolist not found");
    }

    res.status(200).json(todolist);
  } catch (err) {
    next(err);
  }
};

exports.createTodolist = async (req, res, next) => {
  try {
    const title = req.body.title;
    const createdTodolist = await client.todolist.create({
      data: { title: title },
    });
    res.status(200).json(createdTodolist);
  } catch (err) {
    next(err);
  }
};

exports.updateTodolist = async (req, res, next) => {
  try {
    const todolistId = req.params.todolistId;
    const newTitle = req.body.title;
    const updatedTodolist = await client.todolist.update({
      where: { id: todolistId },
      data: { title: newTitle },
    });
    res.status(200).json(updatedTodolist);
  } catch (err) {
    next(err);
  }
};

exports.deleteTodolist = async (req, res, next) => {
  try {
    const todolistId = Number(req.params.todolistId);
    const deletedTodolist = await client.todolist.delete({
      where: { id: todolistId },
    });
    res.status(200).json(deletedTodolist);
  } catch (err) {
    next(err);
  }
};

exports.createTask = async (req, res, next) => {
  try {
    const todolistId = Number(req.params.todolistId);
    const { title } = req.body;
    const todolist = await findTodolist(todolistId);
    if (!todolist) {
      throw createError(404, "Todolist not Found");
    }

    const createdTask = await client.task.create({
      data: { title, done: false, todolist: { connect: { id: todolistId } } },
    });
    res.status(200).json(createdTask);
  } catch (err) {
    next(err);
  }
};

exports.updateTask = async (req, res, next) => {
  try {
    const todolistId = Number(req.params.todolistId);
    const todolist = await findTodolist(todolistId);

    if (!todolist) {
      throw createError(404, "Todolist not Found");
    }

    const taskId = Number(req.params.taskId);
    const newTitle = req.body.title;
    const newDone = req.body.done;
    const updatedTask = await client.task.update({
      where: { id: taskId },
      data: { title: newTitle, done: newDone },
    });
    res.status(200).json(updatedTask);
  } catch (err) {
    next(err);
  }
};

exports.deleteTask = async (req, res, next) => {
  try {
    const todolistId = Number(req.params.todolistId);
    const taskId = Number(req.params.taskId);
    const todolist = await findTodolist(todolistId);
    const task = await findTask(taskId);
    if (!todolist) {
      throw createError(404, "Todolist not Found");
    }
    if (!task) {
      throw createError(404, "Task not Found");
    }

    const deletedTask = await client.task.delete({
      where: { id: taskId },
    });
    res.status(200).json(deletedTask);
  } catch (err) {
    next(err);
  }
};
