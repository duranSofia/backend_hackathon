// all "todo values" to be updated with real values

const {
  getAllTodolist,
  createTodolist,
  updateTodolist,
  getTodolist,
  deleteTodolist,
  createTask,
  updateTask,
  deleteTask,
} = require("../controller/todolist.controller");

const {
  createTodolistValidator,
  updateTodolistValidator,
} = require("../validators/todolist.validators");

const authMiddleware = require("../middleware/auth.middleware");

const router = require("express").Router();

router.get("/", getAllTodolist);
router.get("/:todolistId", getTodolist);
router.post("/", createTodolist);
router.put("/:todolistId", updateTodolistValidator, updateTodolist);
router.delete("/:todolistId", deleteTodolist);

router.put("/:todolistId/task/:taskId", updateTask);
router.post("/:todolistId/task", authMiddleware, createTask);
router.delete("/:todolistId/task/:taskId", deleteTask);

module.exports = router;
