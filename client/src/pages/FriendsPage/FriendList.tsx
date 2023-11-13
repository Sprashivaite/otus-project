import React, { useContext, useEffect, useState } from "react";
import Friend from "./FriendItem";
import { User } from "../../proto/user_pb";
import { ClientUserContext } from "../../App";
import { useNavigate } from "react-router-dom";

const FriendsList: React.FC = () => {
  const client = useContext(ClientUserContext);
  const navigate = useNavigate();
  const [friends, setfriends] = useState<User[]>();
  useEffect(() => {
    const id = localStorage.getItem("userId");
    if (!id) return;
    const userId: User = new User();
    userId.setId(+id);
    client.getFriends(userId, {}, (err, result) => {
      setfriends(result.getFriendsList());
    });
  }, []);

  const onWriteMessageClickHandler = (id: number) => {
    navigate(`/messages/${id}`);
  };

  return (
    <div>
      {friends?.map((friend) => (
        <Friend
          key={friend.getId()}
          name={friend.getFirstname() || friend.getUsername()}
          onWriteMessageClick={() => {
            onWriteMessageClickHandler(friend.getId());
          }}
        />
      ))}
    </div>
  );
};

export default FriendsList;
