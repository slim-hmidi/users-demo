import { Types } from "mongoose";
import request from "supertest";
import { app } from "../server/app";
import db from "../server/database/connection";

describe("Server Apis", () => {
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

  describe("POST /users", () => {
    it("should create a user successfully!!", async () => {
      const mockUser = {
        address: "user address",
        email: "user@gmail.com",
        name: "user",
      };

      const { status, body } = await request(app).post("/users").send(mockUser);

      expect(status).toBe(201);
      expect(body.name).toBe(mockUser.name);
    });

    it("should create a list of users successfully!!", async () => {
      const mockUsers = [{
        address: "user 1",
        email: "user1@gmail.com",
        name: "user 1",
      },
      {
        address: "user 2",
        email: "user2@gmail.com",
        name: "user 2",
      }];

      const { status, body } = await request(app).post("/users").send(mockUsers);

      expect(status).toBe(201);
      expect(body).toHaveLength(2);
    });

    it("should return an error while a user attribute missing", async () => {
      const mockUser = {
        address: "user address",
        email: "user@gmail.com",
      };

      const { status, error } = await request(app).post("/users").send(mockUser);

      expect(status).toBe(500);
      expect(error.text).toMatch("name: Path `name` is required.");
    });
  });

  describe("DELETE /users/:id", () => {
    it("should delete a user successfully!!", async () => {
      const mockUser = {
        address: "user address",
        email: "user@gmail.com",
        name: "user",
      };

      const { _id } = (await request(app).post("/users").send(mockUser)).body;
      const { status, body } = await request(app).delete(`/users/${_id}`);

      expect(status).toBe(200);
      expect(body.name).toBe(mockUser.name);
    });

    it("should return an error while the user does not exist", async () => {
      const { status, error } = await request(app).delete(`/users/${Types.ObjectId()}`);

      expect(status).toBe(404);
      expect(error.text).toMatch("User not found");
    });
  });

  describe("UPDATE /users/:id", () => {
    it("should update a user successfully!!", async () => {
      const mockUser = {
        address: "user address",
        email: "user@gmail.com",
        name: "user",
      };

      const { _id } = (await request(app).post("/users").send(mockUser)).body;
      const { status, body } = await request(app).patch(`/users/${_id}`).send({
        name: "updated user",
      });

      expect(status).toBe(200);
      expect(body.name).toBe("updated user");
    });

    it("should return an error while the user does not exist", async () => {
      const { status, error } = await request(app).patch(`/users/${Types.ObjectId()}`).send({
        name: "updated user",
      });

      expect(status).toBe(404);
      expect(error.text).toMatch("User not found");
    });
  });

  describe("GET /users/:id", () => {
    it("should return a user successfully!!", async () => {
      const mockUser = {
        address: "user address",
        email: "user@gmail.com",
        name: "user",
      };

      const { _id } = (await request(app).post("/users").send(mockUser)).body;
      const { status, body } = await request(app).get(`/users/${_id}`);

      expect(status).toBe(200);
      expect(body.name).toBe(mockUser.name);
    });

    it("should return an error while the user does not exist", async () => {
      const { status, error } = await request(app).get(`/users/${Types.ObjectId()}`);

      expect(status).toBe(404);
      expect(error.text).toMatch("User not found");
    });
  });

  describe("GET /users", () => {
    it("should return a list of users successfully!!", async () => {
      const users = [
        {
          address: "address 1",
          email: "user1@gmail.com",
          name: "user1",
        },
        {
          address: "address 2",
          email: "user2@gmail.com",
          name: "user2",
        },
      ];

      await request(app).post("/users").send(users);
      const { status, body } = await request(app).get("/users");

      expect(status).toBe(200);
      expect(body).toHaveLength(2);
    });

    it("should return an empty array when there are no users", async () => {
      const { status, body } = await request(app).get("/users");

      expect(status).toBe(200);
      expect(body).toHaveLength(0);
    });
  });

  describe("GET /search", () => {
    it("Should return successfully the list of users for a given filter", async () => {
      const users = [
        {
          address: "address 1",
          email: "john.paul@gmail.com",
          name: "John Paul",
        },
        {
          address: "address 2",
          email: "john.smith@gmail.com",
          name: "John Smith",
        },
        {
          address: "address 3",
          email: "anna.lauren@gmail.com",
          name: "Anna Lauren",
        },
      ];

      await request(app).post("/users").send(users);
      const { status, body } = await request(app).get("/search?filter=john");

      expect(status).toBe(200);
      expect(body).toHaveLength(2);
    });

    it("Should return successfully an empty list of users for a given filter", async () => {
      const users = [
        {
          address: "address 1",
          email: "john.paul@gmail.com",
          name: "John Paul",
        },
        {
          address: "address 2",
          email: "john.smith@gmail.com",
          name: "John Smith",
        },
        {
          address: "address 3",
          email: "anna.lauren@gmail.com",
          name: "Anna Lauren",
        },
      ];

      await request(app).post("/users").send(users);
      const { status, body } = await request(app).get("/search?filter=tom");

      expect(status).toBe(200);
      expect(body).toHaveLength(0);
    });

    it("Should return all the users when the filter is empty", async () => {
      const users = [
        {
          address: "address 1",
          email: "john.paul@gmail.com",
          name: "John Paul",
        },
        {
          address: "address 2",
          email: "john.smith@gmail.com",
          name: "John Smith",
        },
        {
          address: "address 3",
          email: "anna.lauren@gmail.com",
          name: "Anna Lauren",
        },
      ];

      await request(app).post("/users").send(users);
      const { status, body } = await request(app).get("/search?filter=");

      expect(status).toBe(200);
      expect(body).toHaveLength(3);
    });
  });
});
