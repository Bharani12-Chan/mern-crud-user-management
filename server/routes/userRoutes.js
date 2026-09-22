import express from "express";

import {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";

const router = express.Router();


// CREATE USER
router.post("/", createUser);


// READ ALL USERS
router.get("/", getUsers);


// READ ONE USER
router.get("/:id", getUserById);


// UPDATE USER
router.put("/:id", updateUser);


// DELETE USER
router.delete("/:id", deleteUser);


export default router;