import Axios from "axios";
import React, { useState } from "react";
import { Button, Checkbox, Form } from "semantic-ui-react";
import { Setlogintotrue } from "../actions/auth";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { useJwt } from "react-jwt";



export default function Login_register() {





  const [formData, setFormData] = useState({
    username: "asdf2@gmail.com",
    password: "asdfgh",
    email: "",
    password2: "",
  });
  const [form, setForm] = useState("login");
  const dispatch = useDispatch();
  const history = useHistory();






  const registeruser = () => {
    const config = { headers: { "Content-Type": "application/json" } };
    const user_name = formData.username;
    const email = formData.email;
    const password = formData.password;
    const body = JSON.stringify({ user_name, email, password });

    if (password !== formData.password2) {
      alert("password do not match");
      return 0;
    }

    Axios.post("https://expense-manager-shipmnts.herokuapp.com/api/v1/register", body, config)
      .then((res) => {
        dispatch(
          Setlogintotrue({
            token: res.data.token,
            username: user_name,
          })
        );
        localStorage.setItem("token", res.data.token);
        history.push("/");
      })
      .catch((e) => alert(JSON.stringify(e.response.data.message)));
  };





  const loginuser = (event) => {

    event.preventDefault();
    const config = { headers: { "Content-Type": "application/json" } };
    const email = formData.username;
    const password = formData.password;
    const body = JSON.stringify({ email, password });
    

    Axios.defaults.xsrfCookieName = "csrftoken";
    Axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
    Axios.post("https://expense-manager-shipmnts.herokuapp.com/api/v1/login", body, config)
      .then((res) => {
        
        dispatch(
          Setlogintotrue({
            token: res.data.token,
            
          })
        );
        localStorage.setItem("token", res.data.token);

        history.push("/");
      })
      .catch((e) => alert(JSON.stringify(e.response.data.message)));
  };







  const onchange = (e, { name, value }) => {
    setFormData((prevstate) => {
      return { ...prevstate, [name]: value };
    });
  };






  return (
    <div className="login-form" >
      {/* Login form */}

      {form === "login" && (
        <Form>
          <Form.Input
            placeholder="User name"
            onChange={onchange}
            name="username"
            value={formData.username}
          />

          <Form.Input
            placeholder="Password"
            onChange={onchange}
            name="password"
            type="password"
            value={formData.password}
          />

          <Button type="submit" onClick={loginuser}>
            Login
          </Button>
          <Button
            type="submit"
            onClick={() => {
              setForm("register");
              setFormData({
                username: "",
                password: "",
                email: "",
                password2: "",
              });
            }}
          >
            Register
          </Button>
        </Form>
      )}

      {/* Registration form */}

      {form === "register" && (
        <Form>
          <Form.Input
            placeholder="User name"
            onChange={onchange}
            name="username"
          />
          <Form.Input placeholder="Email" onChange={onchange} name="email" />
          <Form.Input
            placeholder="Password"
            onChange={onchange}
            name="password"
            type="password"
          />
          <Form.Input
            placeholder="Re-enter password"
            onChange={onchange}
            name="password2"
            type="password"
          />

          <Button type="submit" onClick={registeruser}>
            Register
          </Button>
          <Button
            type="submit"
            onClick={() => {
              setForm("login");
              setFormData({
                username: "Visitor",
                password: "asdfgh",
                email: "",
                password2: "",
              });
            }}
          >
            Login
          </Button>
        </Form>
      )}
      
    </div>
  );
}
