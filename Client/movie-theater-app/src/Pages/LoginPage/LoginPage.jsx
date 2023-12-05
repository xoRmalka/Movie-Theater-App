// login page.jsx
import React, { useState } from "react";
import { Button, Form, Input } from "antd";
import axiosUtils from "../../Utils/axiosUtils";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axiosUtils.createItem(
        "http://localhost:8001/admin/login",
        {
          username,
          password,
        }
      );

      const data = response.data;

      localStorage.setItem("adminToken", data.token);
      navigate("/admin/movies");
    } catch (error) {
      // Handle login failure
      console.error(error.response.data.message);
    }
  };

  return (
    <div style={{ backgroundColor: "white", borderRadius: 4, width: "800px" }}>
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={() => handleLogin()}
        autoComplete="off"
      >
        <Form.Item
          id="username"
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input onChange={(e) => setUsername(e.target.value)} />
        </Form.Item>

        <Form.Item
          id="Password"
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password onChange={(e) => setPassword(e.target.value)} />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
