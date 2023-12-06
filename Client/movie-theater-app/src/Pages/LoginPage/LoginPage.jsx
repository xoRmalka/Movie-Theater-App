import React, { useState } from "react";
import { Button, Form, Input } from "antd";
import axiosUtils from "../../Utils/axiosUtils";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axiosUtils.createItem(
        "http://localhost:8001/users/login",
        {
          username,
          password,
        }
      );

      const data = response.data;

      localStorage.setItem("adminToken", data.token);
      navigate("/admin/movies");
    } catch (error) {
      console.error(error.response.data.message);
    }
  };

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className="container">
      <Form
        className="form"
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
          className="form-item"
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
          <Input
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username" 
          />
        </Form.Item>

        <Form.Item
          className="form-item"
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
          <Input.Password
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password" 
          />
        </Form.Item>
        <Form.Item
          className="button-group"
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Login
          </Button>
          <Button style={{ marginLeft: 8 }} onClick={handleBack}>
            Back
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
