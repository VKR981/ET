import React, { useState } from "react";
import { Input, Menu, Sidebar} from "semantic-ui-react";
import { useSelector } from "react-redux";
import { Setlogintofalse } from "../actions/auth";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";


export default function Navbar({isMobile,visible,setVisible}) {
  const history = useHistory();
  const dispatch = useDispatch();
  const loginstate = useSelector((state) => state.loginstate.state);
  const username = useSelector((state) => state.loginstate.username);
  const [activeItem, setActiveItem] = useState("");

  

  if (isMobile){
    return (
      <Sidebar
            as={Menu}
            animation='overlay'
            icon='labeled'
            inverted
            onHide={() => setVisible(false)}
            vertical
            visible={visible}
            width='thin'
            onClick={() => { setVisible(false)}}
            
          >
            {loginstate && <Menu.Item name={`Welcome,${username}`} />}
            <Menu.Item
          name="home"
          active={activeItem === "home"}
          onClick={() => {history.push("/");}}
        />

        <Menu.Item
          name="option1"
          active={activeItem === "post new course"}
          onClick={() => {
            loginstate ? history.push("/post-course") : history.push("/login");  
          }}
        />
        

        
          
          {loginstate && (
            <Menu.Item
              name="logout"
              active={activeItem === "logout"}
              onClick={() => dispatch(Setlogintofalse())}
            />
          )}
          {!loginstate && (
            <Menu.Item
              name="login"
              active={activeItem === "logout"}
              onClick={() => history.push("/login")}
            ></Menu.Item>
          )}
        
      </Sidebar>
    )
  }

  return (
    <div className="navbar">
      <Menu secondary inverted>
        <Menu.Item
          name="home"
          active={activeItem === "home"}
          onClick={() => history.push("/")}
        />

        <Menu.Item
          name="Option 1"
          active={activeItem === "post new course"}
          onClick={() => {
            loginstate ? history.push("/post-course") : history.push("/login");
          }}
        />
        

        <Menu.Menu position="right">
          <Menu.Item>
            <Input icon="search" placeholder="Search..." />
          </Menu.Item>
          {loginstate && (
            <Menu.Item
              name="logout"
              active={activeItem === "logout"}
              onClick={() => {dispatch(Setlogintofalse()); history.push('/login');}}
            />
          )}
          {!loginstate && (
            <Menu.Item
              name="login"
              active={activeItem === "logout"}
              onClick={() => history.push("/login")}
            ></Menu.Item>
          )}
        </Menu.Menu>
      </Menu>
    </div>
  );
  
}
