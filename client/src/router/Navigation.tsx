import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu } from "antd";
import { MenuItemType } from "antd/es/menu/hooks/useItems";
import "./style.css";
import { TokenContext } from "../App";

const Navigation: React.FC = () => {
  const navigate = useNavigate();
  const { token, settoken } = useContext(TokenContext);
  const menuItems: MenuItemType[] = [
    {
      key: "auth",
      label: !token ? "Войти" : "Выйти",
      onClick: () => {
        if (token) {
          localStorage.removeItem("token");
          settoken && settoken(null);
          navigate("/");
        } else {
          navigate("/");
        }
      },
    },
    {
      key: "my-page",
      label: "Моя страница",
      onClick: () => {
        navigate("info");
      },
      disabled: !token,
    },
    {
      key: "friends",
      label: "Друзья",
      onClick: () => {
        navigate("/friends");
      },
      disabled: !token,
    },
    // {
    //   key: "messages",
    //   label: "Сообщения",
    //   onClick: () => {
    //     navigate("/messages");
    //   },
    //   disabled: !token,
    // },
  ];

  return (
    <div className="nav">
      <Menu
        theme="light"
        mode="vertical"
        defaultSelectedKeys={["my-page"]}
        items={menuItems}
      ></Menu>
    </div>
  );
};

export default Navigation;
