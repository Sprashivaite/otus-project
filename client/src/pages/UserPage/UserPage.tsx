import React, { useContext, useEffect, useState } from "react";
import { User } from "../../proto/user_pb";
import { Button, Card, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { ClientUserContext, ClientFilesContext } from "../../App";
import { FileInfo, FileUpload, ImageFile } from "../../proto/files_pb";
import { RcFile } from "antd/es/upload";

const UserPage: React.FC = () => {
  const userContext = useContext(ClientUserContext);
  const filesContext = useContext(ClientFilesContext);

  const [userInfo, setUserInfo] = useState<User.AsObject>();
  const id = localStorage.getItem("userId");

  useEffect(() => {
    const userId: User = new User();
    if (!id) return;
    userId.setId(+id);
    const Authorization = localStorage.getItem("token");
    if (Authorization) {
      userContext.getUser(
        userId,
        {
          token: Authorization,
        },
        (err, result) => {
          setUserInfo(result?.toObject());
        }
      );
    }
  }, [id, userContext]);

  const handleUnload = (file: RcFile) => {
    if (!id) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      const uint8Array = new Uint8Array(reader.result as ArrayBuffer);

      const fileUpload = new FileUpload();
      fileUpload.setContent(uint8Array);
      fileUpload.setFilename(file.name);
      fileUpload.setUserid(+id);
      filesContext.uploadFile(fileUpload, null);
    };
    reader.readAsArrayBuffer(file);
  };

  const [avatar, setAvatar] = useState<any>(null);

  useEffect(() => {
    const fileUpload = new FileInfo();
    const faliname = userInfo?.avatar as string;
    if (!faliname) return;
    fileUpload.setFilename(faliname);
    filesContext
      .getImage(fileUpload, undefined)
      .on("data", (file: ImageFile) => {
        console.log(file.getContent());
        const blob = new Blob([file.getContent()]);
        setAvatar(URL.createObjectURL(blob));
      });
  }, [filesContext, userInfo]);
  return (
    <div>
      <Card title="Информация о пользователе">
        <img src={avatar} alt="" />
        <p>
          <strong>Имя:</strong> {userInfo?.firstname}
        </p>
        <p>
          <strong>Фамилия:</strong> {userInfo?.lastname}
        </p>
        <p>
          <strong>Возраст:</strong> {userInfo?.age}
        </p>
        <Upload showUploadList={false} beforeUpload={handleUnload}>
          <Button icon={<UploadOutlined />}>Загрузить аватар</Button>
        </Upload>
      </Card>
    </div>
  );
};

export default UserPage;
