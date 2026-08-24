import User from "../models/User.js";
import { hashPassword } from "../utils/password.js";

export const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();

    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ error: "name, email and password are required" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    const existing = await User.findOne({ where: { email } });

    if (existing) {
      return res.status(409).json({ error: "Email is already registered" });
    }

    const hashed = await hashPassword(password);
    const user = await User.create({
      name,
      email,
      password: hashed,
      role: role === "admin" ? "admin" : "user",
    });

    res.status(201).json(user);
  } catch (err) {
    console.log(req.body);

    res.status(400).json({ error: "err.message" });
  }
};

export const updateUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const { name, email, password, role } = req.body;
    const updates = {};

    if (name !== undefined) {
      updates.name = name;
    }
    if (email !== undefined) {
      updates.email = email;
    }
    if (role !== undefined) {
      updates.role = role;
    }
    if (password !== undefined) {
      updates.password = await hashPassword(password);
    }

    await user.update(updates);
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const changeUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password, role } = req.body;
    
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (!name || !email || !password || !role) {
      return res.status(400).json({ error: 'name, email, role and password are required' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    const existing = await User.findOne({ where: { email } });
    if (existing && existing.id !== user.id) {
      return res.status(409).json({ error: 'Email is already registered' });
    }

    const hashed = await hashPassword(password);

    await user.update({
      name,
      email,
      password: hashed,
      role: role
    });

    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    await user.destroy();
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
