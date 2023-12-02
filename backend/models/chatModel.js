// since we are doing Chat-App we should adjust the Schema of the DataBase.
// We will want that our chat will containe:  ChatName, isGroupChat, Users, latestMessage, Group Admin, (sender)

// We will use mongoose package to connect our DB

const mongoose = require("mongoose");

const chatModel = mongoose.Schema(
  {
    chatName: { type: String, trim: true },
    isGroupChat: { type: Boolean, default: false },
    users: [
      {
        // In that way it will display the users on Database.
        type: mongoose.Schema.Types.ObjectId,
        ref: "User ",
      },
    ],
    latestMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
    groupAdmin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User ",
    },
  },
  {
    timestamps: true,
  }
);

const Chat = mongoos.model("Chat", chatModel);
module.exports = Chat;
