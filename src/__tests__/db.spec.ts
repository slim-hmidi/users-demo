import { Types } from "mongoose";
import "../server/config";
import db from "../server/db/connection";
import User from "../server/models/User";

describe("Users", () => {
  beforeAll(() => {
    db.on("open", () => {
      console.log("Database starts successfully");
    });
  });
  beforeEach(() => {
    if (db.collection("users").countDocuments()) {
      return db.collection("users").deleteMany({});
    }
  });

  afterAll(() => {
    return db.close();
  });

  // Creation
  describe("User Creation", () => {
    it("Should add a new user to database", async () => {
      const newUser = new User({
        address: "user address",
        email: "user@gmail.com",
        name: "user 1",
      });
      const createdUser = await User.create(newUser);
      expect(createdUser).toEqual(createdUser);
    });

    it("Should add a list of users to database", async () => {
      const users = [
        {
          address: "address 1",
          email: "user1@gmail.com",
          name: "user 1",
        },
        {
          address: "address 2",
          email: "user2@gmail.com",
          name: "user 2",
        },
      ];
      const createdUsers = await User.create(users);
      expect(createdUsers).toHaveLength(2);
    });
    it("Should returns an error if a name is missing", async () => {
      const newUser = new User({
        address: "address",
        email: "user@gmail.com",
      });
      await expect(User.create(newUser)).rejects.toThrow("Path `name` is required");
    });

    it("Should returns an error if a user email is missing", async () => {
      const newUser = new User({
        address: "address",
        name: "user",
      });
      await expect(User.create(newUser)).rejects.toThrow("Path `email` is required");
    });
  });

  // Update
  describe("User Update", () => {
    it("Should update a user successfully", async () => {
      const newUser = new User({
        address: "user address",
        email: "user@gmail.com",
        name: "user 1",
      });
      const updatedEmail = "new_email@gmail.com";
      const { _id } = await User.create(newUser);
      const updatedUser = await User.findByIdAndUpdate(_id, {
        email: updatedEmail,
      }, {
        new: true,
      });

      if (updatedUser) {
        return expect(updatedUser.email).toEqual(updatedEmail);
      }
    });

    it("Should not update unexistant user", async () => {
      const updatedUser = await User.findByIdAndUpdate(Types.ObjectId(), {
        name: "user updated",
      }, {
        new: true,
      });

      expect(updatedUser).toBeNull();
    });
  });

  // Delete
  describe("User Delete", () => {
    it("Should delete a user successfully", async () => {
      const newUser = new User({
        address: "user address",
        email: "user@gmail.com",
        name: "user 1",
      });
      const { _id } = await User.create(newUser);
      const deletedUser = await User.findByIdAndRemove(_id);

      if (deletedUser) {
        expect(deletedUser.name).toBe(newUser.name);
      }

    });

    it("Should not delete unexistant user", async () => {
      const updatedUser = await User.findByIdAndRemove(Types.ObjectId());
      expect(updatedUser).toBeNull();
    });
  });

  // Read
  describe("User Read", () => {
    it("Should return a user successfully", async () => {
      const newUser = new User({
        address: "user address",
        email: "user@gmail.com",
        name: "user 1",
      });
      const { _id } = await User.create(newUser);
      const returnedUser = await User.findOne(_id);
      if (returnedUser) {
        expect(returnedUser.name).toBe(newUser.name);
      }

    });

    it("Should not retrun unexistant user", async () => {
      const returnedUser = await User.findOne(Types.ObjectId());
      expect(returnedUser).toBeNull();
    });
  });
});
