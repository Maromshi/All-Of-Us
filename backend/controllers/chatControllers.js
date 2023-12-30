const asyncHandler = require("express-async-handler");
const Chat = require("../models/chatModel");
const User = require("../models/userModel");

// This route will access to 1 on 1 chat
const accessChat = asyncHandler(async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    console.log("UserId param not sent with request ");
    return res.sendStatus(400);
  }
  //Checkig if chat already exist between users
  let isChat = await Chat.find({
    isGroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: req.user._id } } },
      { users: { $elemMatch: { $eq: userId } } },
    ],
  })
    .populate("users", "-password")
    .populate("latestMessage");
  // populating the Sender from User
  isChat = await User.populate(isChat, {
    path: "latestMessage.sender",
    select: "name pic email",
  });

  if (isChat.length > 0) {
    res.send(isChat[0]);
  } else {
    let chatData = {
      chatName: "sender",
      isGroupChat: false,
      users: [req.user._id, userId],
    };

    try {
      // Store the chat in DB
      const createdChat = await Chat.create(chatData);
      const fullChat = await Chat.findOne({ _id: createdChat._id }).populate(
        "users",
        "-password"
      );
      res.status(200).send(fullChat);
    } catch (error) {
      console.log("Failed to create Chat", error);
    }
  }
});
// Fetch all chats for logged in user
const fetchChats = asyncHandler(async (req, res) => {
  try {
    Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 })
      .then(async (results) => {
        results = await User.populate(results, {
          path: "latestMessage.sender",
          select: "name pic email",
        });
        res.send(results);
      });
  } catch (error) {
    console.log(error);
  }
});
// Suplly users and chat name
const createGroupChat = asyncHandler(async (req, res) => {
  if (!req.body.users || !req.body.name) {
    return res.status(400).send({ message: "Please provide all fields! " });
  }
  const users = JSON.parse(req.body.users);
  // Adding the logged-in user
  users.push(req.user);
  if (users.length < 2) {
    res.send("Group has to be more then 2 users!");
  }
  try {
    const newGroupChat = await Chat.create({
      chatName: req.body.name,
      isGroupChat: true,
      users: users,
      groupAdmin: req.user,
    });

    const fullGroupChat = await Chat.findOne({ _id: newGroupChat._id })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    res.status(200).send(fullGroupChat);
  } catch (error) {
    console.log(error);
  }
});

const renameGroup = asyncHandler(async (req, res) => {
  const { chatId, name } = req.body;

  if (!chatId || !name) {
    res.status(400).send("Please provde valid fields!");
  }
  try {
    const chatRename = await Chat.findOne({ _id: chatId });
    chatRename.chatName = name;
    await chatRename.save();
    res.status(200).send(chatRename);
  } catch (error) {
    console.log("Failed to change name:", error);
  }
});

const AddToGroup = asyncHandler(async (req, res) => {
  const { chatId, userId } = req.body;

  if (!chatId || !userId) {
    return res.status(400).send("Please provide valid fields!");
  }
  try {
    // Check if the user exists
    const addedUser = await User.findOne({ _id: userId });
    if (!addedUser) {
      return res.status(404).send("User not found");
    }
    // Add user to the group
    const addToGroup = await Chat.findByIdAndUpdate(chatId, {
      $push: { users: userId },
    })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");
    if (addToGroup) {
      res.status(200).json({ message: "User added to group successfully" });
    } else {
      res.status(404).send("Chat not found");
    }
  } catch (error) {
    console.log("Fialed to add user", error);
    res.status(500).send("Internal Server Error");
  }
});
// Delete user from group
const removeFromGroup = asyncHandler(async (req, res) => {
  const { chatId, userId } = req.body;

  // check if the requester is admin

  const removed = await Chat.findByIdAndUpdate(
    chatId,
    {
      $pull: { users: userId },
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!removed) {
    res.status(404);
    throw new Error("Chat Not Found");
  } else {
    res.json(removed);
  }
});
module.exports = {
  accessChat,
  fetchChats,
  createGroupChat,
  renameGroup,
  removeFromGroup,
  AddToGroup,
};
