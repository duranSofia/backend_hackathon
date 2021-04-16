const {
  getAllClients,
  GetOneClient,
  AddClient,
  connectClientExperience,
  disconnectClientExperience,
} = require("../controller/clients.controller");

const router = require("express").Router();

router.get("/", getAllClients);
router.get("/:clientId", GetOneClient);
router.post("/", AddClient);
router.put("/connect/:experienceId", connectClientExperience);
router.put("/disconnect/:experienceId", disconnectClientExperience);

module.exports = router;
