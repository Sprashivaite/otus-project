import React from "react";
import { Button, Card } from "antd";

interface FriendProps {
  name: string;
  onWriteMessageClick: () => void;
}

const Friend: React.FC<FriendProps> = ({ name, onWriteMessageClick }) => {
  return (
    <Card title={name}>
      <Button type="primary" onClick={onWriteMessageClick}>
        Написать
      </Button>
    </Card>
  );
};

export default Friend;
