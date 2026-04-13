import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import type { RootState } from "../utils/appStore";

export const Chat = () => {
  const { toUserId } = useParams();
  const [messages, setMessages] = useState<{ text: string, id: string, firstName: string }[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [textId, setTextId] = useState(1);
  const user = useSelector((state: RootState) => state.user);
  const targetUserId = user?._id;
  

  useEffect(() => {
    const socket = createSocketConnection();
    if(toUserId && targetUserId)
    socket.emit("joinChat", { toUserId, targetUserId });

    socket.on("messageReceived", ({firstName, text, textId}) => {
        const id = textId;
        setMessages(prev => [...prev, { firstName, text, id: textId }]);
        setTextId(id + 1);
    })

    return () => {
        socket.disconnect();
    }
  }, [toUserId, targetUserId])

  const sendMessage = () => {
    const socket = createSocketConnection();
    console.log("sending Message!: ", {firstName: user?.firstName, toUserId, targetUserId, text: newMessage, textId});
    
    socket.emit("sendMessage", {firstName: user?.firstName, toUserId, targetUserId, text: newMessage, textId});
    setNewMessage("");
  }

  return (
    <div className="flex flex-col overflow-scroll h-[80vh]">
      <div className="flex justify-center mt-2 text-3xl">Chat</div>
      <div className="flex flex-col justify-center border border-white h-[70vh] p-5 m-14">
        <div className="flex-1 overflow-scroll p-5">
          {messages.map((message) => {
            return (
              <div key={message.id} className={`chat ${message.firstName === user?.firstName ? "chat-start" : "chat-end"}`}>
                <div className="chat-header">
                  {message.firstName}
                  <time className="text-xs opacity-50">12:45</time>
                </div>
                <div className="chat-bubble">{message.text}</div>
                <div className="chat-footer opacity-50">Delivered</div>
              </div>
            );
          })}
        </div>
        <div className="flex gap-2 justify-center">
          <input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            type="text"
            placeholder="Write your message here!"
            className="input overflow-visible"
          ></input>
          <button className="btn btn-secondary" onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
};
