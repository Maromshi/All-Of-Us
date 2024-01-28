import React, { createContext, useContext, useEffect, useState } from "react";

import { useHistory } from "react-router-dom";

const ChatContext = createContext(); // This function returns two components: a Provider and a Consumer.

// Now we create Provider compoonent. This provider holds the shared states.
const ChatProvider = ({ children }) => {
  //  Those states will be avilable in the while app
  const [user, setUser] = useState();
  const [selectedChat, setSelectedChat] = useState();
  const [chats, setChats] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    setUser(userInfo);

    if (!userInfo) history.push("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history]);

  return (
    <ChatContext.Provider
      value={{ user, setUser, selectedChat, setSelectedChat, chats, setChats }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const ChatState = () => {
  // Return the shared states from ChatProvider
  return useContext(ChatContext);
};

export default ChatProvider;

// summary:
// Since 'ChatContext' was created with 'createContext', it provides both a 'Provider' and a 'Consumer'
// We use 'useContext' hook get updated with the new value.
// The returned value from 'useContext(ChatContext)' is the current value of the context, (user,setUser)
// which, based on 'ChatProvider' implementation,
