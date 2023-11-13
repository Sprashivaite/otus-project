import React, { useContext } from "react";
import { Card, Input, Button, Form } from "antd";
import { ClientAuthContext, TokenContext } from "../../App";
import { LoginRequest } from "../../proto/auth_pb";

interface AuthFormProps {
  isRegister?: boolean;
}

const AuthForm: React.FC<AuthFormProps> = ({ isRegister = false }) => {
  const { settoken } = useContext(TokenContext);
  const [form] = Form.useForm();
  const client = useContext(ClientAuthContext);

  const handleFormSubmit = async ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => {
    const request = new LoginRequest();
    request.setUsername(username);
    request.setPassword(password);
    client.login(request, null).then((response) => {
      localStorage.setItem("token", response.getToken());
      localStorage.setItem("userId", username);
      settoken && settoken(response.getToken());
    });
  };

  return (
    <Card title={isRegister ? "Регистрация" : "Вход"}>
      <Form form={form} onFinish={handleFormSubmit} layout="vertical">
        <Form.Item
          label="Имя пользователя"
          name="username"
          rules={[{ required: true, message: "Введите имя пользователя" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Пароль"
          name="password"
          rules={[{ required: true, message: "Введите пароль" }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            {isRegister ? "Зарегистрироваться" : "Войти"}
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default AuthForm;
