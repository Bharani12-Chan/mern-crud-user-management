import User from "../models/User.js";


// =====================================================
// CREATE USER
// POST /api/users
// =====================================================

export const createUser = async (req, res) => {
  try {
    const { name, phone, email } = req.body;

    // Check required fields
    if (!name || !phone || !email) {
      return res.status(400).json({
        success: false,
        message:
          "Name, phone number and email are required.",
      });
    }

    // Check whether email already exists
    const existingUser = await User.findOne({
      email: email.toLowerCase(),
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message:
          "A user with this email already exists.",
      });
    }

    const user = await User.create({
      name,
      phone,
      email,
    });

    res.status(201).json({
      success: true,
      message: "User created successfully.",
      data: user,
    });
  } catch (error) {
    console.error("Create User Error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to create user.",
      error: error.message,
    });
  }
};


// =====================================================
// GET ALL USERS
// GET /api/users
// =====================================================

export const getUsers = async (req, res) => {
  try {
    const users = await User.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: users.length,
      data: users,
    });
  } catch (error) {
    console.error("Get Users Error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to fetch users.",
      error: error.message,
    });
  }
};


// =====================================================
// GET SINGLE USER
// GET /api/users/:id
// =====================================================

export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(
      req.params.id
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error("Get User Error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to fetch user.",
      error: error.message,
    });
  }
};


// =====================================================
// UPDATE USER
// PUT /api/users/:id
// =====================================================

export const updateUser = async (req, res) => {
  try {
    const { name, phone, email } = req.body;

    if (!name || !phone || !email) {
      return res.status(400).json({
        success: false,
        message:
          "Name, phone number and email are required.",
      });
    }

    // Check if another user already has this email
    const existingUser = await User.findOne({
      email: email.toLowerCase(),
      _id: { $ne: req.params.id },
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message:
          "Another user already uses this email.",
      });
    }

    const updatedUser =
      await User.findByIdAndUpdate(
        req.params.id,
        {
          name,
          phone,
          email,
        },
        {
          new: true,
          runValidators: true,
        }
      );

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "User updated successfully.",
      data: updatedUser,
    });
  } catch (error) {
    console.error("Update User Error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to update user.",
      error: error.message,
    });
  }
};


// =====================================================
// DELETE USER
// DELETE /api/users/:id
// =====================================================

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(
      req.params.id
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "User deleted successfully.",
      data: user,
    });
  } catch (error) {
    console.error("Delete User Error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to delete user.",
      error: error.message,
    });
  }
};