import { Types } from "mongoose";
import User from "../server/models/User";

describe("Create users", () => {
  it("Should create a new user successfully!", () => {
    const mockUser = {
      address: "user address",
      email: "user@gmail.com",
      name: "John",
    };
    const spy = jest.spyOn(User, "create").mockReturnValueOnce(mockUser as any);
    User.create(mockUser);
    const spyCreatedUser = spy.mock.results[0].value;
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spyCreatedUser.name).toEqual(mockUser.name);
    spy.mockReset();
  });

  it("Should retruns an error when the name is missing", () => {
    const mockUser = {
      address: "user address",
      email: "user@gmail.com",
    };
    const spy = jest.spyOn(User, "create").mockReturnValueOnce("Name is required" as any);
    User.create(mockUser);
    const spyCreatedUser = spy.mock.results[0].value;
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spyCreatedUser).toEqual("Name is required");

    spy.mockReset();
  });

  it("Should retruns an error when the email is missing", () => {
    const mockUser = {
      address: "user address",
      name: "John",
    };
    const spy = jest.spyOn(User, "create").mockReturnValueOnce("Email is required" as any);
    User.create(mockUser);
    const spyCreatedUser = spy.mock.results[0].value;
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spyCreatedUser).toEqual("Email is required");
    spy.mockReset();
  });
});

describe("READ users", () => {
  it("Should return the list of users successfully", () => {
    const mockedUserList = [
      {
        _id: Types.ObjectId(),
        address: "user address 1",
        email: "john@gmail.com",
        name: "John",
      },
      {
        _id: Types.ObjectId(),
        address: "user address 2",
        email: "smith@gmail.com",
        name: "Smith",
      },
    ];

    const spy = jest.spyOn(User, "find").mockReturnValueOnce(mockedUserList as any);
    User.find({});

    const spyFetchedUsers = spy.mock.results[0].value;
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spyFetchedUsers).toHaveLength(2);
    spy.mockReset();
  });

  it("Should return an empty list if there are no user", () => {
    const spy = jest.spyOn(User, "find").mockReturnValueOnce([] as any);
    User.find({});

    const spyFetchedUsers = spy.mock.results[0].value;
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spyFetchedUsers).toHaveLength(0);
    spy.mockReset();
  });

  it("Should return a user successfully!", () => {
    const mockUser = {
      _id: Types.ObjectId(),
      address: "user address 1",
      email: "john@gmail.com",
      name: "John",
    };
    const spy = jest.spyOn(User, "findById").mockReturnValueOnce(mockUser as any);
    User.findById(mockUser._id);

    const spyFetchedUser = spy.mock.results[0].value;
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spyFetchedUser.name).toEqual(mockUser.name);
    spy.mockReset();
  });

  it("Should return an error when the user does not exit", () => {
    const id = Types.ObjectId();
    const spy = jest.spyOn(User, "findById").mockReturnValueOnce("User not found" as any);
    User.findById(id);

    const spyFetchedUser = spy.mock.results[0].value;
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spyFetchedUser).toEqual("User not found");
    spy.mockReset();
  });
});

describe("UPDATE users", () => {
  it("Should update a user successfully!", () => {
    const mockUser = {
      _id: Types.ObjectId(),
      address: "user address 1",
      email: "john@gmail.com",
      name: "John",
    };
    const spy = jest.spyOn(User, "findByIdAndUpdate").mockReturnValueOnce(mockUser as any);
    User.findByIdAndUpdate(mockUser._id, {
      email: "john@gmail.com",
    }, {
      new: true,
    });

    const spyUpdatedUser = spy.mock.results[0].value;
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spyUpdatedUser.email).toEqual("john@gmail.com");
    spy.mockReset();
  });

  it("Should returns an error if a user does not exist", () => {
    const spy = jest.spyOn(User, "findByIdAndUpdate").mockReturnValueOnce("Id provided does not match any user" as any);
    User.findByIdAndUpdate(Types.ObjectId(), {
      email: "john@gmail.com",
    }, {
      new: true,
    });

    const spyUpdatedUser = spy.mock.results[0].value;
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spyUpdatedUser).toEqual("Id provided does not match any user");
    spy.mockReset();
  });
});

describe("DELETE users", () => {
  it("Should delete a user successfully!", () => {
    const mockUser = {
      _id: Types.ObjectId(),
      address: "user address 1",
      email: "john@gmail.com",
      name: "John",
    };
    const spy = jest.spyOn(User, "findByIdAndRemove").mockReturnValueOnce(mockUser as any);
    User.findByIdAndRemove(mockUser._id);

    const spyDeletedUser = spy.mock.results[0].value;
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spyDeletedUser._id).toEqual(mockUser._id);
    spy.mockReset();
  });

  it("Should returns an error if a user does not exist", () => {
    const spy = jest.spyOn(User, "findByIdAndRemove").mockReturnValueOnce("Id provided does not match any user" as any);
    User.findByIdAndRemove(Types.ObjectId());

    const spyDeletedUser = spy.mock.results[0].value;
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spyDeletedUser).toEqual("Id provided does not match any user");
    spy.mockReset();
  });
});
