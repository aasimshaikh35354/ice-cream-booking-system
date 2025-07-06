const express = require("express");
const {
  getUsers,
  addUser,
  updateUser,
  deleteUser,
  loginRoute,
} = require("../controllers/userController");

const router = express.Router();

router.get("/users", getUsers);
router.post("/login", loginRoute);
router.post("/register", addUser);
router.put("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);

module.exports = router;
