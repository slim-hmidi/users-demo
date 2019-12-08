import { Request, Response } from "express";
import User from "../models/User";
import { ErrorHandler } from "../utils/error";

interface IUser {
  address?: string;
  name: string;
  email: string;
}

export const getIndexPage = (req: Request, res: Response) => {
  return res.status(200).json("OK");
};

export const createUser = async (req: Request, res: Response) => {
  try {
    if ((req.body.constructor === Object && !Object.keys(req.body).length) ||
      (req.body.constructor === Array && !req.body.length)) {
      throw new ErrorHandler(404, "Request body should contain at least one user");
    }
    const createdUser = await User.create(req.body);
    return res.status(201).send(createdUser);
  } catch (error) {
    return res.status(error.statusCode || 500).send(error.message);
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const fetchedUser = await User.findById(id);
    if (!fetchedUser) {
      throw new ErrorHandler(404, "User not found");
    }
    const deletedUser = await User.findByIdAndRemove({ _id: id });
    return res.status(200).send(deletedUser);
  } catch (error) {
    return res.status(error.statusCode || 500).send(error.message);
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const fetchedUser = await User.findById(id);
    if (!fetchedUser) {
      throw new ErrorHandler(404, "User not found");
    }
    const updatedUser = await User.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    return res.status(200).send(updatedUser);
  } catch (error) {
    return res.status(error.statusCode || 500).send(error.message);
  }
};

export const fetchManyUsers = async (req: Request, res: Response) => {
  try {
    const fetchedUser = await User.find({});
    return res.status(200).send(fetchedUser);
  } catch (error) {
    return res.status(error.statusCode || 500).send(error.message);
  }
};

export const fetchOneUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const fetchedUser = await User.findById(id);
    if (!fetchedUser) {
      throw new ErrorHandler(404, "User not found");
    }
    return res.status(200).send(fetchedUser);
  } catch (error) {
    return res.status(error.statusCode || 500).send(error.message);
  }
};
