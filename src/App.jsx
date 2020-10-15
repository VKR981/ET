import React, { Fragment, useState,useEffect } from "react";
import { useMediaQuery } from 'react-responsive'
import Navbar from "./comps/Navbar";
import Content from "./comps/content";
import { BrowserRouter as Router, Switch, Route, } from "react-router-dom";
import Login_register from "./comps/login_register";
import { useDispatch } from "react-redux";
import NotFound from "./comps/notfound";
import { Input, Menu, Sidebar,Icon,Segment } from "semantic-ui-react";
import { useJwt } from "react-jwt";
import { useHistory } from "react-router";
import { Setlogintotrue } from "./actions/auth";
import "./App.css";

function App() {
  const dispatch = useDispatch();
  const history = useHistory();

  var token = localStorage.getItem("token");
  const { decodedToken, isExpired } = useJwt(token);
  if(decodedToken&&isExpired){
      
    dispatch(Setlogintotrue({token:token}))
    // history.push("/login")
  }




  
  
  const isMobile = useMediaQuery({ query: '(max-width: 760px)' });
  console.log(isMobile);
  const [visible, setVisible] = useState(false)
  return (
    <div className="App">
      <Router>
      <Segment className='mainsegment'>
        <Sidebar.Pushable  >
          <Navbar  isMobile={isMobile} visible={visible} setVisible={setVisible}/>

      <Sidebar.Pusher dimmed={visible}>
        
  <div >{isMobile&&Mobilenavbar(setVisible)}<Fragment>
          <Switch>
            <Route exact path="/" component={Content} />
            <Route exact path="/login" component={Login_register} />
            
            <Route component={NotFound} />
          </Switch>
        </Fragment></div>
        
      </Sidebar.Pusher>
    </Sidebar.Pushable>
  
    </Segment>
      </Router>
    </div>
  );
}

export default App;


const Mobilenavbar=(setVisible)=>{

  
  return(
    <div className="navbar">
      <Menu secondary inverted>
        
      <Menu.Item>
      <Icon size='large' name='bars' onClick={()=>setVisible(true)} />
          </Menu.Item>
        

        <Menu.Menu position="right">
          <Menu.Item>
            <Input icon="search" placeholder="Search..." size='small'/>
          </Menu.Item>
          
        </Menu.Menu>
      </Menu>
      
      
    </div>
  )
}