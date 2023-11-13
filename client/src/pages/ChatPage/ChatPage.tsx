import React, { useContext, useEffect, useState } from "react";
import { Card, Input, List } from "antd";
import { ClientMessageContext } from "../../App";
import { Empty, MessageList, Message, UserId } from "../../proto/message_pb";
import { useParams } from "react-router-dom";

interface ChatProps {}

const Chat: React.FC<ChatProps> = () => {
  const client = useContext(ClientMessageContext);
  const params = useParams();

  const [messages, setmessages] = useState<any[]>([]);

  const id = localStorage.getItem("userId");
  useEffect(() => {
    if (!id || !params.id) return;
    const userId: UserId = new UserId();
    const empty = new Empty();
    userId.setReceiverid(+id);
    userId.setSenderid(+params?.id);
    client.getMessagesByUser(userId, {}, (err, result) => {
      setmessages(result.toObject().messagesList);
    });
    client.joinChat(empty).on("data", (result: MessageList) => {
      const message = result.toObject().messagesList[0];
      console.log(message);

      setmessages((prev) => {
        if (!prev.some(({ id }) => id === message.id)) {
          return [...prev, ...result.toObject().messagesList];
        }
        return prev;
      });
    });
  }, [client, id, params]);

  const [inputMessage, setInputMessage] = useState("");

  const handleSendMessage = () => {
    if (inputMessage.trim() !== "" && params?.id && id) {
      const message: Message = new Message();
      message.setText(inputMessage);
      message.setSenderid(+id);
      message.setReceiverid(+params.id);
      message.setId(2);
      message.setTime(new Date().toString());

      client.sendMessage(message, null);
      setInputMessage("");
    }
  };

  return (
    <Card title="Чат">
      <List
        dataSource={messages}
        renderItem={(message) => <List.Item>{message.text}</List.Item>}
      />
      <Input
        placeholder="Введите сообщение"
        value={inputMessage}
        onChange={(e) => setInputMessage(e.target.value)}
        onPressEnter={handleSendMessage}
        addonAfter={<button onClick={handleSendMessage}>Отправить</button>}
      />
    </Card>
  );
};

export default Chat;
