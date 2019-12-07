import { Router } from "express";
import {
  createUser,
  deleteUser,
  fetchManyUsers,
  fetchOneUser,
  getIndexPage,
  updateUser,
} from "../controllers/index";

const router = Router();

router.route("/index")
  .get(getIndexPage);

// Create a user
router.route("/users")
  .get(fetchManyUsers)
  .post(createUser);

router.route("/users/:id")
  .delete(deleteUser)
  .get(fetchOneUser)
  .patch(updateUser);

export default router;
