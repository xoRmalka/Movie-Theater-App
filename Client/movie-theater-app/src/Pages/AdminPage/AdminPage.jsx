import React, { useEffect } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { Menu } from "antd";
import { VideoCameraOutlined, CalendarOutlined } from "@ant-design/icons";

export default function AdminPage() {
  const navigate = useNavigate();

  const useAuthHandling = () => {
    useEffect(() => {
      const adminToken = localStorage.getItem("adminToken");

      if (!adminToken) {
        localStorage.removeItem("adminToken");
        navigate("/");
      }
    }, [navigate]);
  };

  useAuthHandling();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/");
  };

  const menuItems = [
    {
      key: "movies",
      icon: <VideoCameraOutlined />,
      title: "Movies Management",
      link: "movies",
    },
    {
      key: "schedule",
      icon: <CalendarOutlined />,
      title: "Schedule",
      link: "schedule",
    },
    {
      key: "homepage",
      title: "Homepage",
      link: "/",
    },
    {
      key: "logout",
      title: "Logout",
      onClick: handleLogout,
    },
  ];

  return (
    <div>
      <Menu mode="horizontal" theme="dark">
        {menuItems.map((item) => (
          <Menu.Item
            key={item.key}
            icon={item.icon}
            title={item.title}
            onClick={item.onClick}
          >
            <Link to={item.link}>{item.title}</Link>
          </Menu.Item>
        ))}
      </Menu>
      <Outlet />
    </div>
  );
}
